# PRISM Project Replication Prompt

Use this prompt to generate an exact copy of the PRISM vulnerability report builder:

---

## Replication Prompt

> Create a browser-based vulnerability report builder with:
> - CVSS v3.1 calculator (score, vector, severity)
> - 6 pre-configured vulnerability templates (XSS, SQLi, CSRF, IDOR, SSRF, Auth Bypass)
> - Screenshot upload, drag-drop, reordering, captions
> - Google Fonts search and dynamic loading for PDF export
> - Markdown export, PDF preview/download (html2pdf.js)
> - Custom modals for alerts, confirms, prompts
> - Draft system (save/load, autosave, localStorage)
> - Beautiful gradient backgrounds, dark/light themes
> - Floating dock for quick actions (grouped dropdowns)
> - In-app documentation viewer (markdown rendered in modal)
> - Responsive design for desktop, tablet, mobile
> - All data stored client-side (privacy by design)
> - SEO-rich HTML (meta tags, Open Graph, JSON-LD, canonical, keywords)
> - Use vanilla JavaScript, Tailwind CSS, IBM Carbon Design, Bootstrap Icons, html2pdf.js, marked.js, DOMPurify

---

## Additional Instructions
- Structure code with clear separation: HTML, CSS, JS, templates, sample data, storage
- Use semantic HTML5 and ARIA for accessibility
- Implement keyboard shortcuts for save, export, preview
- Provide a documentation viewer that loads markdown from a `doc/` folder
- Ensure all features work offline and are privacy-preserving
- Include a root README.md linking to full documentation in `doc/`

---

**This prompt will help you reproduce the PRISM project exactly, with all features and architecture.**
