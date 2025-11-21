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
    // Check cache first
    if (useCache && this.cache.has(path)) {
      return this.cache.get(path);
    }
    
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${path} (${response.status})`);
      }
      
      const html = await response.text();
      
      // Cache the result
      if (useCache) {
        this.cache.set(path, html);
      }
      
      return html;
    } catch (error) {
      console.error(`Error loading component from ${path}:`, error);
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
