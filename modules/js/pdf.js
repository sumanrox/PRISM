// pdf.js - basic printable preview and PDF generation using html2pdf

const VRBPDF = (function(){
  function buildPrintableHtml(model){
    const s = VRBStorage.loadSettings();
    const title = model.vulnerability.title || 'Vulnerability Report';
    const header = s.headerText || '';
    const footer = s.footerText || '';
    const headerImg = s.headerImage || '';
    const footerImg = s.footerImage || '';

    // render markdown to sanitized HTML
    let md = `# ${escapeMarkdown(title)}\n\n`;
    md += `**Severity:** ${escapeMarkdown(model.vulnerability.severity)}  \n`;
    md += `**Category:** ${escapeMarkdown(model.vulnerability.category)}  \n\n`;
    md += `## Summary\n\n${model.vulnerability.summary}  \n\n`;
    md += `---\n\n## Steps to Reproduce\n\n${model.vulnerability.steps}\n\n`;
    md += `---\n\n## Observables / Evidence\n\n`;
    if(model.vulnerability.observables && model.vulnerability.observables.length){
      md += model.vulnerability.observables.map(o=>`- ${o}`).join('\n') + '\n\n';
    }
    md += `---\n\n## Impact\n\n${model.vulnerability.impact}\n\n`;
    if(model.vulnerability.mitigation){
      md += `---\n\n## Mitigation / Recommendations\n\n${model.vulnerability.mitigation}\n\n`;
    }
    if(model.vulnerability.notes){
      md += `---\n\n## Notes for Triage Team\n\n${model.vulnerability.notes}\n\n`;
    }
    if(model.screenshots && model.screenshots.length){
      md += `---\n\n## Evidence (Screenshots)\n\n`;
      model.screenshots.forEach(snap=>{
        md += `### ${escapeMarkdown(snap.name)}\n\n![${escapeMarkdown(snap.name)}](${snap.data})\n\n`;
      });
    }

    if(s.includeReporter){
      md += `---\n\n### Reporter Information\n\n`;
      const r = model.reporter || {};
      if(r.name) md += `- **Name:** ${escapeMarkdown(r.name)}\n`;
      if(r.email) md += `- **Email:** ${escapeMarkdown(r.email)}\n`;
      if(r.handle) md += `- **Handle:** ${escapeMarkdown(r.handle)}\n`;
      if(r.disclosure) md += `- **Disclosure Preference:** ${escapeMarkdown(r.disclosure)}\n`;
    }

    const content = DOMPurify.sanitize(marked.parse(md));

    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><style>
      body{font-family:'Segoe UI',Arial,Helvetica,sans-serif;padding:20px;color:#1a1a1a;line-height:1.6;max-width:800px;margin:0 auto}
      .header,.footer{text-align:center;margin:12px 0}
      .header img,.footer img{max-width:100%;height:auto;max-height:60px}
      .header-text,.footer-text{color:#666;font-size:11px;margin:6px 0}
      h1{font-size:24px;margin:18px 0 12px;border-bottom:2px solid #333;padding-bottom:8px}
      h2{font-size:18px;margin:16px 0 8px;color:#333}
      h3{font-size:14px;margin:12px 0 6px}
      p{margin:8px 0}
      ul,ol{margin:8px 0;padding-left:24px}
      code{background:#f4f4f4;padding:2px 4px;font-family:monospace;font-size:90%}
      pre{background:#f4f4f4;padding:12px;overflow-x:auto}
      pre code{background:none;padding:0}
      img{max-width:100%;height:auto;border:1px solid #ddd;margin:8px 0}
      hr{border:none;border-top:1px solid #ddd;margin:20px 0}
      strong{font-weight:600}
      @media (max-width:768px){
        body{padding:12px;max-width:100%}
        h1{font-size:20px}
        h2{font-size:16px}
        h3{font-size:13px}
        .header-text,.footer-text{font-size:10px}
      }
      @media print{body{padding:0}}
    </style></head><body>
      ${headerImg ? `<div class="header"><img src="${headerImg}" alt="Header" /></div>` : ''}
      ${header ? `<div class="header-text">${escapeHtml(header)}</div>` : ''}
      <div style="margin-top:20px">${content}</div>
      ${footer ? `<div class="footer-text" style="margin-top:30px">${escapeHtml(footer)}</div>` : ''}
      ${footerImg ? `<div class="footer"><img src="${footerImg}" alt="Footer" /></div>` : ''}
    </body></html>`;

    return html;
  }

  function escapeMarkdown(s){ return (s||''); }
  function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function previewPrintable(model){
    const html = buildPrintableHtml(model);
    const w = window.open('', '_blank');
    w.document.write(html);
    w.document.close();
  }

  async function downloadPDF(model){
    const html = buildPrintableHtml(model);
    // create container
    const container = document.createElement('div');
    container.style.width = '210mm'; // A4 width by default; html2pdf will adapt
    container.innerHTML = html;
    document.body.appendChild(container);

    const pageSize = VRBStorage.loadSettings().pageSize || 'a4';
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     (model.vulnerability.title||'vulnerability-report').replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.pdf',
      image:        { type: 'jpeg', quality: 0.95 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: pageSize, orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(container).save();
    } catch(e) {
      console.error(e);
      alert('PDF export failed: ' + e.message);
    } finally {
      container.remove();
    }
  }

  return { previewPrintable, downloadPDF };
})();

window.VRBPDF = VRBPDF;
