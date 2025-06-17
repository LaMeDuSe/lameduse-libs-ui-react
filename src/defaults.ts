// src/defaults.ts - Base library defaults
import fs from 'fs';
import path from 'path';
import { findHooksInConfig, processHooks } from './hookprocessor';
import { blocsfullclass } from './hooksdef';

// Define the configuration interface
export interface UIConfig {
    blocs: {
        marginX: string,
        marginY: string,
        paddingX: string,
        paddingY: string,
        fullclass: Hook,
    }
  // Add other theme options as needed
}

export interface Hook {
    name: string;
    priority: number; // Lower number = executed first
    hook: (config: UIConfig) => void;
    result?: any; // Optional result of the hook
}

// Library default configuration
const defaultConfig: UIConfig = {
    blocs: {
        marginX: "mx-auto",
        marginY: "",
        paddingX: "px-5",
        paddingY: "py-24",
        fullclass: blocsfullclass
    },
    // Add other default options as needed
};

// Function to deeply merge configuration objects
function mergeConfigs(base: any, override: any): any {
  const result: any = { ...base };

  for (const key in override) {
    if (
      override[key] &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key])
    ) {
      result[key] = mergeConfigs(result[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }

  return result;
}

// Try to load user config from project root
function loadUserConfig(): Partial<UIConfig> | null {
  try {
    // Attempt to find the app root directory (where package.json is located)
    const appDirectory = findAppRoot();
    
    if (!appDirectory) {
      return null;
    }

    // Look for the user config file
    const userConfigPath = path.join(appDirectory, 'lameduse-ui-config.ts');
    
    if (!fs.existsSync(userConfigPath)) {
      // No user config found, which is fine
      return null;
    }

    const userConfig = require(userConfigPath).default;

    return userConfig;
  } catch (error) {
    console.warn('Failed to load user config:', error);
    return null;
  }
}

// Helper to find the root directory of the project
function findAppRoot(): string | null {
  try {
    // Start from current directory
    let currentDir = process.cwd();
    
    // Go up the directory tree looking for package.json
    while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, 'package.json'))) {
        return currentDir;
      }
      currentDir = path.dirname(currentDir);
    }
    
    return null;
  } catch (error) {
    console.warn('Error finding app root:', error);
    return null;
  }
}

export function loadAndProcessHook(config: UIConfig): UIConfig {    
    // Find all hooks in the merged config
    const hooks = findHooksInConfig(config);
    
    // Apply hooks to the merged config in priority order
    return processHooks(hooks, config);
  }

// Merge default config with user config (if any)
const userConfig = loadUserConfig();
const config: UIConfig = userConfig 
  ? mergeConfigs(defaultConfig, userConfig) 
  : defaultConfig;

loadAndProcessHook(config);

// Export the final config as default
export default config;