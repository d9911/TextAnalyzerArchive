// Text Analyzer
class TextAnalyzer {
    constructor() {
        this.textarea = document.getElementById('textInput');
        this.wordCountElement = document.getElementById('wordCount');
        this.charCountWithSpacesElement = document.getElementById('charCountWithSpaces');
        this.charCountWithoutSpacesElement = document.getElementById('charCountWithoutSpaces');
        
        this.init();
    }

    analyzeText() {
        const text = this.textarea.value;
        
        // Word count (split by whitespace and filter empty strings)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = text.trim() === '' ? 0 : words.length;
        
        // Character counts
        const charCountWithSpaces = text.length;
        const charCountWithoutSpaces = text.replace(/\s/g, '').length;
        
        // Update display
        this.wordCountElement.textContent = wordCount;
        this.charCountWithSpacesElement.textContent = charCountWithSpaces;
        this.charCountWithoutSpacesElement.textContent = charCountWithoutSpaces;
    }

    init() {
        const updateEvents = window.config?.text_analysis?.update_events || ['input'];
        
        updateEvents.forEach(eventType => {
            this.textarea.addEventListener(eventType, () => {
                this.analyzeText();
            });
        });
        
        // Initial analysis
        this.analyzeText();
    }
} 