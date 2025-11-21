# PRISM Project Architecture & Implementation

## Overview
PRISM (Professional Reporting Interface for Security Metrics) is a modern, browser-based vulnerability report builder. It enables security professionals to create, manage, and export professional vulnerability reports with CVSS scoring, screenshots, templates, and more—all client-side, with no server required.

---

## File Structure
```
Report/
├── index.html           # Main application HTML, SEO-rich, semantic
├── css/styles.css       # Custom styles, gradients, responsive, modal, dock
├── js/app.js            # Main UI logic, event listeners, modals, builder
├── js/pdf.js            # PDF/print preview and export logic
├── js/templates.js      # Vulnerability report templates (6 types)
├── js/sample-data.js    # Sample vulnerability report data
├── js/storage.js        # LocalStorage wrapper for drafts/settings
├── doc/README.md        # Main documentation (features, setup, SEO)
├── doc/FEATURES.md      # Detailed feature guide
├── doc/ARCHITECTURE.md  # (This file) Architecture & implementation
├── README.md            # Root: links to docs, quick start, badges
```

---

## Main Modules & Responsibilities

### 1. `index.html`
- SEO meta tags, Open Graph, Twitter Card, JSON-LD structured data
- Semantic HTML5: header, main, aside, section
- Floating dock for quick actions (new, load, export, settings, docs)
- Modals for settings, drafts, templates, documentation
- Responsive layout (desktop, tablet, mobile)

### 2. `css/styles.css`
- Gradient backgrounds (light/dark)
- Theming via CSS variables
- Floating dock positioning, modal centering
- Responsive breakpoints (768px, 1280px)
- Custom scrollbars, flat design
- Utility classes for hover, cursor, etc.

### 3. `js/app.js`
- Main UI logic and event listeners
- Custom modal system (alert, confirm, prompt)
- Form builder: fields, validation, autosave
- CVSS v3.1 calculator (score, vector, severity)
- Screenshot upload, drag-drop, reordering
- Google Fonts search & dynamic loading
- Character counters, completeness indicator
- Markdown export, PDF preview/download
- Documentation modal: fetches and renders markdown
- Keyboard shortcuts (save, export, preview)

### 4. `js/pdf.js`
- PDF/print preview generation (html2pdf.js)
- Markdown-to-HTML conversion for printable view
- Custom headers/footers, logo images
- PDF download and preview logic

### 5. `js/templates.js`
- 6 pre-configured vulnerability templates:
  - Stored XSS, SQL Injection, CSRF, IDOR, SSRF, Auth Bypass
- Each template includes: title, category, OWASP, severity, CVSS vector, summary, steps, observables, impact, mitigation, notes

### 6. `js/sample-data.js`
- Example vulnerability report for demo/load sample

### 7. `js/storage.js`
- LocalStorage wrapper for drafts, settings, screenshots
- All data stored client-side (privacy by design)

---

## Dependencies
- **Tailwind CSS** (CDN): Utility-first styling
- **IBM Carbon Design System**: Color palette, UI consistency
- **Bootstrap Icons**: Icon set for dock/buttons
- **Google Fonts API**: 1000+ fonts, live search
- **html2pdf.js**: PDF generation client-side
- **marked.js**: Markdown parsing
- **DOMPurify**: XSS protection for rendered markdown

---

## Custom Logic Highlights
- **Custom modals**: Replaces browser alert/confirm/prompt for consistent UI
- **Floating dock**: Quick access to all features, grouped dropdowns
- **CVSS calculator**: Real-time scoring, vector parsing, severity rating
- **Screenshot management**: Drag-drop, reordering, captions, preview
- **Google Fonts integration**: Search, preview, dynamic loading for PDF
- **Markdown export**: One-click .md file download
- **PDF preview/download**: Live preview, custom branding, export
- **Templates**: 6 vulnerability types, instant form population
- **Draft system**: Save/load multiple drafts, autosave
- **Documentation viewer**: In-app modal, fetches markdown from doc/
- **Accessibility**: Keyboard shortcuts, ARIA labels, semantic HTML
- **SEO**: Rich meta tags, Open Graph, JSON-LD, canonical, keywords

---

## UI Components
- Floating dock (aside)
- Modals (settings, drafts, templates, documentation)
- Form builder (main)
- CVSS calculator (section)
- Screenshot gallery (section)
- Completeness indicator (progress bar)
- Character counters (textareas)
- Dropdowns (load/export)
- Documentation viewer (modal)

---

## How to Make an Exact Copy (Prompt)

> "Create a browser-based vulnerability report builder with:
> - CVSS v3.1 calculator (score, vector, severity)
> - 6 pre-configured vulnerability templates
> - Screenshot upload, drag-drop, reordering
> - Google Fonts search and dynamic loading
> - Markdown export, PDF preview/download
> - Custom modals for alerts/confirms
> - Draft system (save/load, autosave)
> - Beautiful gradient backgrounds, dark/light themes
> - Floating dock for quick actions (grouped dropdowns)
> - In-app documentation viewer (markdown)
> - Responsive design for desktop/mobile
> - All data stored client-side (privacy)
> - SEO-rich HTML (meta tags, Open Graph, JSON-LD)
> - Use vanilla JS, Tailwind CSS, IBM Carbon, Bootstrap Icons, html2pdf.js, marked.js, DOMPurify"

---

## Author & License
Open source project by [sumanrox](https://github.com/sumanrox) for the security community.
