import { Hook, UIConfig } from "./defaults";

export function isHook(obj: any): obj is Hook {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.name === 'string' &&
        typeof obj.priority === 'number' &&
        typeof obj.hook === 'function'
    );
}

export function findHooksInConfig(obj: Record<string, any>): Hook[] {
    const hooks: Hook[] = [];

    // Helper function to recursively search for hooks
    function search(current: any) {
        if (!current || typeof current !== 'object') return;

        // Check if current item is a hook
        if (isHook(current)) {
            hooks.push(current);
            return;
        }

        // Process arrays
        if (Array.isArray(current)) {
            current.forEach(item => search(item));
            return;
        }

        // Process objects
        Object.values(current).forEach(value => search(value));
    }

    search(obj);
    return hooks;
}

export function processHooks(hooks: Hook[], config: UIConfig): UIConfig {
    // Sort hooks by priority (ascending)
    const sortedHooks = [...hooks].sort((a, b) => a.priority - b.priority);

    // Apply each hook in order
    sortedHooks.forEach(hook => {
        try {
            hook.hook(config);
        } catch (error) {
            console.error(`Error applying hook "${hook.name}":`, error);
        }
    });

    return config;
}
