# HTML Components

This directory contains modular HTML components that are dynamically loaded into the main application.

## Component Structure

### Layout Components
- **header.html** - Application header with title and branding
- **dock.html** - Floating action dock with quick access buttons

### Form Components (Multi-step)
- **form-step1.html** - Step 1: Reporter Profile
- **form-step2.html** - Step 2: Vulnerability Details (includes CVSS calculator)
- **form-step3.html** - Step 3: Description & Impact
- **form-step4.html** - Step 4: Screenshots & Evidence

### Modal Components
- **modal-settings.html** - Settings and PDF export configuration
- **modal-drafts.html** - Draft management interface
- **modal-custom.html** - Generic modal for alerts/confirms/prompts
- **modal-templates.html** - Vulnerability templates selection
- **modal-docs.html** - Documentation viewer

## Loading Components

Components are loaded dynamically using the `ComponentLoader` utility defined in `modules/js/component-loader.js`.

### Basic Usage

```javascript
// Load a single component
await ComponentLoader.loadInto('modules/html/header.html', '#app-header');

// Load multiple components in parallel
await ComponentLoader.loadAll([
  { path: 'modules/html/header.html', target: '#app-header' },
  { path: 'modules/html/dock.html', target: '#app-dock' }
]);
```

## Benefits of Modular Structure

1. **Maintainability** - Each component is isolated in its own file
2. **Reusability** - Components can be reused across different pages
3. **Performance** - Components can be cached and loaded in parallel
4. **Development** - Easier to work on individual components
5. **Organization** - Clear separation of concerns

## Component Dependencies

All components depend on:
- **CSS**: `modules/css/*.css` (base, layout, components, dock, modals)
- **JS**: `modules/js/app.js` (event handlers and business logic)
- **Libraries**: Tailwind, Bootstrap Icons, Carbon Components

## Notes

- Components use ES6 fetch API, so must be served through a web server
- File protocol (`file://`) will not work due to CORS restrictions
- Use `python -m http.server` or VS Code Live Server for local development
