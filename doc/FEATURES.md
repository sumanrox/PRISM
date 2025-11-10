# Features Guide

## Floating Dock

The floating dock provides quick access to all tools:

### File Operations
- **New Report** - Start fresh (clears all fields)
- **Load Options**
  - Sample Report - Load example vulnerability data
  - Templates - Choose from 6 vulnerability types

### Drafts
- **Save Draft** - Save current work with a custom name
- **Drafts Manager** - View, load, or delete saved drafts

### Export Options
- **Preview PDF** - Open PDF preview in new tab
- **Download PDF** - Generate and download PDF
- **Export Markdown** - Download as .md file

### Configuration
- **Settings** - Customize PDF appearance
  - Google Fonts search
  - Page size (A4/Letter)
  - Header/footer text and images
  - Reporter information toggle
- **Theme Toggle** - Switch between light/dark mode

## Templates

Six pre-configured vulnerability templates:

1. **Stored XSS** - Cross-site scripting with persistence
2. **SQL Injection** - Database compromise scenarios
3. **CSRF** - Cross-site request forgery
4. **IDOR** - Insecure direct object references
5. **SSRF** - Server-side request forgery
6. **Authentication Bypass** - Complete auth circumvention

Each template includes:
- Complete CVSS vector
- Detailed attack steps
- Impact analysis
- Mitigation recommendations

## CVSS Calculator

Calculate severity scores using CVSS v3.1:

### Metrics
- **Attack Vector** - Network, Adjacent, Local, Physical
- **Attack Complexity** - Low, High
- **Privileges Required** - None, Low, High
- **User Interaction** - None, Required
- **Scope** - Unchanged, Changed
- **Confidentiality Impact** - None, Low, High
- **Integrity Impact** - None, Low, High
- **Availability Impact** - None, Low, High

### Features
- Real-time score calculation
- Severity rating (None to Critical)
- CVSS vector string generation
- Paste vector to auto-fill metrics

## Progress Tracking

### Completeness Indicator
Visual progress bar showing:
- Percentage complete
- Color-coded (red → yellow → green)
- Missing field count

### Character Counters
Live counts on:
- Summary
- Steps to Reproduce
- Impact
- Mitigation

Shows both character and word count.

## Screenshot Management

### Upload
- Click to select files
- Drag & drop support
- Multiple files at once

### Organization
- Drag to reorder screenshots
- Click X to remove
- Edit captions inline

### Export
Screenshots are embedded in PDF with captions.

## Settings

### Font Customization
- Search 1000+ Google Fonts
- Live preview in dropdown
- Font loads dynamically for PDF

### Page Layout
- A4 or Letter size
- Custom header/footer text
- Logo images (header/footer)
- Toggle reporter info section

### Data Persistence
All settings saved automatically in browser localStorage.
