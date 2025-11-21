// storage.js - simple localStorage-based persistence for reporter, drafts, and screenshots
const STORAGE_KEYS = {
  REPORTER: 'vrb_reporter',
  DRAFTS: 'vrb_drafts',
  SCREENSHOTS: 'vrb_screenshots',
  SETTINGS: 'vrb_settings'
};

const Storage = {
  // Security: Maximum storage size limits (in bytes)
  MAX_SIZES: {
    REPORTER: 10 * 1024,      // 10KB
    DRAFT: 500 * 1024,        // 500KB per draft
    SCREENSHOTS: 5 * 1024 * 1024,  // 5MB total
    SETTINGS: 50 * 1024       // 50KB
  },
  
  _validateSize(key, data) {
    const jsonStr = JSON.stringify(data);
    const size = new Blob([jsonStr]).size;
    const maxSize = this.MAX_SIZES[key.toUpperCase().replace('VRB_', '')];
    
    if (maxSize && size > maxSize) {
      throw new Error(`Data exceeds maximum size limit for ${key}`);
    }
    return jsonStr;
  },
  
  saveReporter(reporter){
    try {
      const jsonStr = this._validateSize(STORAGE_KEYS.REPORTER, reporter);
      localStorage.setItem(STORAGE_KEYS.REPORTER, jsonStr);
    } catch (e) {
      console.error('Failed to save reporter:', e.message);
      throw e;
    }
  },
  loadReporter(){
    try {
      const v = localStorage.getItem(STORAGE_KEYS.REPORTER);
      return v ? JSON.parse(v) : null;
    } catch (e) {
      console.error('Failed to load reporter data:', e);
      return null;
    }
  },
  saveDraft(id, report){
    try {
      const all = Storage._loadAllDrafts();
      all[id] = { id, data: report, updated: Date.now() };
      
      // Security: Validate draft size
      const draftSize = new Blob([JSON.stringify(all[id])]).size;
      if (draftSize > this.MAX_SIZES.DRAFT) {
        throw new Error(`Draft exceeds maximum size limit of ${this.MAX_SIZES.DRAFT / 1024}KB`);
      }
      
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save draft:', e.message);
      throw e;
    }
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
    try {
      const v = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      if (!v) return {};
      
      // Security: Parse JSON safely and filter out prototype pollution attempts
      const parsed = JSON.parse(v);
      if (typeof parsed !== 'object' || parsed === null) return {};
      
      // Security: Remove dangerous keys
      const dangerous = ['__proto__', 'constructor', 'prototype'];
      for (const key of dangerous) {
        delete parsed[key];
      }
      
      return parsed;
    } catch (e) {
      console.error('Failed to load drafts:', e);
      return {};
    }
  },
  saveScreenshots(arr){
    try {
      // Security: Validate total screenshot size
      const jsonStr = this._validateSize(STORAGE_KEYS.SCREENSHOTS, arr);
      localStorage.setItem(STORAGE_KEYS.SCREENSHOTS, jsonStr);
    } catch (e) {
      console.error('Failed to save screenshots:', e.message);
      throw e;
    }
  },
  loadScreenshots(){
    try {
      const v = localStorage.getItem(STORAGE_KEYS.SCREENSHOTS);
      if (!v) return [];
      
      const parsed = JSON.parse(v);
      if (!Array.isArray(parsed)) return [];
      
      // Security: Validate screenshot structure
      return parsed.filter(item => {
        return item && 
               typeof item === 'object' && 
               typeof item.id === 'string' && 
               typeof item.name === 'string' && 
               typeof item.data === 'string' &&
               item.data.startsWith('data:image/');
      });
    } catch (e) {
      console.error('Failed to load screenshots:', e);
      return [];
    }
  },
  clearAll(){
    localStorage.removeItem(STORAGE_KEYS.REPORTER);
    localStorage.removeItem(STORAGE_KEYS.DRAFTS);
    localStorage.removeItem(STORAGE_KEYS.SCREENSHOTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  },
  saveSettings(s){
    try {
      const jsonStr = this._validateSize(STORAGE_KEYS.SETTINGS, s);
      localStorage.setItem(STORAGE_KEYS.SETTINGS, jsonStr);
    } catch (e) {
      console.error('Failed to save settings:', e.message);
      throw e;
    }
  },
  loadSettings(){
    try {
      const v = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!v) {
        return { 
          pageSize: 'a4', 
          headerText:'', 
          footerText:'', 
          headerImage:'', 
          footerImage:'', 
          includeReporter:true, 
          pdfFont:'Inter' 
        };
      }
      
      const parsed = JSON.parse(v);
      if (typeof parsed !== 'object' || parsed === null) {
        return { pageSize: 'a4', headerText:'', footerText:'', headerImage:'', footerImage:'', includeReporter:true, pdfFont:'Inter' };
      }
      
      // Security: Validate and sanitize settings
      const allowed = ['pageSize', 'headerText', 'footerText', 'headerImage', 'footerImage', 'includeReporter', 'pdfFont'];
      const safe = { pageSize: 'a4', headerText:'', footerText:'', headerImage:'', footerImage:'', includeReporter:true, pdfFont:'Inter' };
      
      for (const key of allowed) {
        if (key in parsed) {
          safe[key] = parsed[key];
        }
      }
      
      return safe;
    } catch (e) {
      console.error('Failed to load settings:', e);
      return { pageSize: 'a4', headerText:'', footerText:'', headerImage:'', footerImage:'', includeReporter:true, pdfFont:'Inter' };
    }
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
