// storage.js - simple localStorage-based persistence for reporter, drafts, and screenshots
const STORAGE_KEYS = {
  REPORTER: 'vrb_reporter',
  DRAFTS: 'vrb_drafts',
  SCREENSHOTS: 'vrb_screenshots',
  SETTINGS: 'vrb_settings'
};

const Storage = {
  saveReporter(reporter){
    localStorage.setItem(STORAGE_KEYS.REPORTER, JSON.stringify(reporter));
  },
  loadReporter(){
    const v = localStorage.getItem(STORAGE_KEYS.REPORTER);
    return v ? JSON.parse(v) : null;
  },
  saveDraft(id, report){
    const all = Storage._loadAllDrafts();
    all[id] = { id, data: report, updated: Date.now() };
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(all));
  },
  loadDraft(id){
    const all = Storage._loadAllDrafts();
    return all[id] ? all[id].data : null;
  },
  listDrafts(){
    const all = Storage._loadAllDrafts();
    return Object.values(all).sort((a,b)=>b.updated-a.updated);
  },
  _loadAllDrafts(){
    const v = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return v ? JSON.parse(v) : {};
  },
  saveScreenshots(arr){
    // arr = [{id,name,data}]
    localStorage.setItem(STORAGE_KEYS.SCREENSHOTS, JSON.stringify(arr));
  },
  loadScreenshots(){
    const v = localStorage.getItem(STORAGE_KEYS.SCREENSHOTS);
    return v ? JSON.parse(v) : [];
  },
  clearAll(){
    localStorage.removeItem(STORAGE_KEYS.REPORTER);
    localStorage.removeItem(STORAGE_KEYS.DRAFTS);
    localStorage.removeItem(STORAGE_KEYS.SCREENSHOTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  },
  saveSettings(s){
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(s));
  },
  loadSettings(){
    const v = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return v ? JSON.parse(v) : { pageSize: 'a4', headerText:'', footerText:'', headerImage:'', footerImage:'', includeReporter:true, pdfFont:'Inter' };
  }
};

// helper: export and import json file
function exportJSON(obj, filename='vrb-export.json'){
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),10000);
}

function importJSONFile(file){
  return new Promise((res,reject)=>{
    const r = new FileReader();
    r.onload = ()=>{
      try{ res(JSON.parse(r.result)); }catch(e){ reject(e); }
    };
    r.onerror = reject;
    r.readAsText(file);
  });
}

window.VRBStorage = Storage;
window.vrbExportJSON = exportJSON;
window.vrbImportJSON = importJSONFile;
