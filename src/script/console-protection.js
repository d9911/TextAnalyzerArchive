// Console Protection System
// Prevents recursive logging issues and provides safe console override functionality
// See LOGGING_FIX_DOCUMENTATION.md for technical details

class ConsoleProtection {
    constructor() {
        this.isLoggingInProgress = false;
        this.originalMethods = {};
        this.debugElement = null;
        this.init();
    }

    init() {
        // Store original console methods
        this.originalMethods = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info
        };

        // Store references for safe access
        console.log.__original = this.originalMethods.log;
        console.error.__original = this.originalMethods.error;
        console.warn.__original = this.originalMethods.warn;
        console.info.__original = this.originalMethods.info;

        // Set up protected console methods
        this.setupProtectedConsole();
    }

    setupProtectedConsole() {
        const self = this;

        console.log = function(...args) {
            self.originalMethods.log.apply(console, args);
            self.safeCustomLog(args.join(' '), 'info');
        };

        console.error = function(...args) {
            self.originalMethods.error.apply(console, args);
            self.safeCustomLog(args.join(' '), 'error');
        };

        console.warn = function(...args) {
            self.originalMethods.warn.apply(console, args);
            self.safeCustomLog(args.join(' '), 'warning');
        };

        console.info = function(...args) {
            self.originalMethods.info.apply(console, args);
            self.safeCustomLog(args.join(' '), 'info');
        };
    }

    safeCustomLog(message, type = 'info') {
        // Recursion guard
        if (this.isLoggingInProgress) {
            return;
        }

        this.isLoggingInProgress = true;
        
        try {
            // Only log to debug area if it exists (for test.html)
            if (this.debugElement) {
                this.logToDebugArea(message, type);
            }
        } finally {
            this.isLoggingInProgress = false;
        }
    }

    logToDebugArea(message, type = 'info') {
        if (!this.debugElement) {
            return;
        }

        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.innerHTML = `<span style="color: #666;">[${timestamp}]</span> <span class="status-${type}">${message}</span>`;
        this.debugElement.appendChild(logEntry);
        this.debugElement.scrollTop = this.debugElement.scrollHeight;
    }

    // Enable debug area logging (for test.html)
    enableDebugArea(elementId = 'debugLog') {
        this.debugElement = document.getElementById(elementId);
        if (!this.debugElement) {
            console.warn(`Debug element with ID '${elementId}' not found`);
        }
    }

    // Disable debug area logging
    disableDebugArea() {
        this.debugElement = null;
    }

    // Restore original console methods
    restore() {
        console.log = this.originalMethods.log;
        console.error = this.originalMethods.error;
        console.warn = this.originalMethods.warn;
        console.info = this.originalMethods.info;
    }

    // Clear debug log
    clearDebugLog() {
        if (this.debugElement) {
            this.debugElement.innerHTML = '';
        }
    }
}

// Initialize console protection immediately
window.consoleProtection = new ConsoleProtection();

// Auto-enable debug area for test.html
document.addEventListener('DOMContentLoaded', () => {
    const debugLog = document.getElementById('debugLog');
    if (debugLog) {
        window.consoleProtection.enableDebugArea('debugLog');
    }
});