// script.js
document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdownInput');
    const preview = document.getElementById('preview');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const md = window.markdownit();

    markdownInput.addEventListener('input', () => {
        const markdownText = markdownInput.value;
        const html = md.render(markdownText);
        preview.innerHTML = html;
    });

    copyButton.addEventListener('click', () => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = preview.innerHTML;
        document.body.appendChild(tempElement);

        const range = document.createRange();
        range.selectNode(tempElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');
            alert('Rendered text copied to clipboard!');
        } catch (e) {
            console.error('Failed to copy text: ', e);
        } finally {
            document.body.removeChild(tempElement);
        }
    });

    clearButton.addEventListener('click', () => {
        markdownInput.value = '';
        preview.innerHTML = '';
    });
});