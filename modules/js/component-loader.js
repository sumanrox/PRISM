// component-loader.js - Dynamic HTML component loader

const ComponentLoader = {
  cache: new Map(),
  
  /**
   * Load an HTML component from a file
   * @param {string} path - Path to the HTML file
   * @param {boolean} useCache - Whether to use cached version (default: true)
   * @returns {Promise<string>} - The HTML content
   */
  async load(path, useCache = true) {
    // Security: Validate path to prevent directory traversal
    if (!path || typeof path !== 'string') {
      throw new Error('Invalid path parameter');
    }
    
    // Security: Only allow loading from modules/html directory
    if (!path.startsWith('modules/html/') || path.includes('..')) {
      throw new Error('Invalid component path. Only modules/html/ components are allowed.');
    }
    
    // Security: Sanitize path
    const sanitizedPath = path.replace(/\.\./g, '').replace(/\/\//g, '/');
    
    // Check cache first
    if (useCache && this.cache.has(sanitizedPath)) {
      return this.cache.get(sanitizedPath);
    }
    
    try {
      const response = await fetch(sanitizedPath);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${sanitizedPath} (${response.status})`);
      }
      
      // Security: Validate content type
      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('text/html') && !contentType.includes('text/plain')) {
        throw new Error('Invalid content type for component');
      }
      
      const html = await response.text();
      
      // Security: Validate HTML size (max 100KB per component)
      if (html.length > 100 * 1024) {
        throw new Error('Component size exceeds limit');
      }
      
      // Cache the result
      if (useCache) {
        this.cache.set(sanitizedPath, html);
      }
      
      return html;
    } catch (error) {
      console.error(`Error loading component from ${sanitizedPath}:`, error);
      throw error;
    }
  },
  
  /**
   * Load and inject a component into a target element
   * @param {string} path - Path to the HTML file
   * @param {string|HTMLElement} target - Target element selector or element
   * @param {string} position - Position to insert ('beforeend', 'afterbegin', 'beforebegin', 'afterend')
   * @returns {Promise<void>}
   */
  async loadInto(path, target, position = 'beforeend') {
    const html = await this.load(path);
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!targetElement) {
      throw new Error(`Target element not found: ${target}`);
    }
    
    targetElement.insertAdjacentHTML(position, html);
  },
  
  /**
   * Load multiple components in parallel
   * @param {Array<{path: string, target: string|HTMLElement, position?: string}>} components
   * @returns {Promise<void>}
   */
  async loadAll(components) {
    const promises = components.map(({ path, target, position }) => 
      this.loadInto(path, target, position)
    );
    
    await Promise.all(promises);
  },
  
  /**
   * Preload components into cache without injecting them
   * @param {string[]} paths - Array of component paths
   * @returns {Promise<void>}
   */
  async preload(paths) {
    const promises = paths.map(path => this.load(path));
    await Promise.all(promises);
  },
  
  /**
   * Clear the component cache
   */
  clearCache() {
    this.cache.clear();
  }
};

// Make it globally available
window.ComponentLoader = ComponentLoader;
