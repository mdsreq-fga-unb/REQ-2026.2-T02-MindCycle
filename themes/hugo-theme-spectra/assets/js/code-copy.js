// ===== Code Copy Button: adds header bar with copy functionality to code blocks =====
// Also handles: line number toggle, filename detection, highlighted lines

(function () {
document.addEventListener('DOMContentLoaded', function () {
  var COPY_FEEDBACK_DURATION_MS = 2000;

  // Read i18n text from body data attributes, with defaults
  var body = document.body;
  var txtCopy = body.getAttribute('data-i18n-copy') || 'Copy';
  var txtCopied = body.getAttribute('data-i18n-copied') || 'Copied!';
  var txtCode = body.getAttribute('data-i18n-code') || 'CODE';
  var txtToggleLineNos = body.getAttribute('data-i18n-toggle-line-numbers') || 'Toggle line numbers';

  // Iterate all Hugo-generated highlight blocks
  var highlights = document.querySelectorAll('.highlight');

  highlights.forEach(function (block) {
    // Find the code <pre> — in table mode (linenos), there are two <pre>s:
    // the first holds line numbers, the second holds actual code.
    // Use the code element with data-lang or language-* class to detect properly.
    var codePre = null;
    var lang = '';
    var allCode = block.querySelectorAll('code[data-lang]');
    if (allCode.length > 0) {
      // Hugo adds data-lang on the code element — most reliable way
      lang = (allCode[0].getAttribute('data-lang') || '').toUpperCase();
      codePre = allCode[0].closest('pre');
    }
    if (!codePre) {
      // Fallback: find any code with language-* class
      var allCodes = block.querySelectorAll('code');
      for (var codeIndex = 0; codeIndex < allCodes.length; codeIndex++) {
        var classNames = allCodes[codeIndex].className.split(' ');
        for (var classIndex = 0; classIndex < classNames.length; classIndex++) {
          if (classNames[classIndex].indexOf('language-') === 0) {
            lang = classNames[classIndex].replace('language-', '').toUpperCase();
            codePre = allCodes[codeIndex].closest('pre');
            break;
          }
        }
        if (codePre) break;
      }
    }
    // Last fallback: first pre in block
    var pre = codePre || block.querySelector('pre');
    if (!pre) return;

    // Create outer wrapper and header bar (language label + copy button)
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    var header = document.createElement('div');
    header.className = 'code-header';

    var langSpan = document.createElement('span');
    langSpan.className = 'code-lang';
    langSpan.textContent = lang || txtCode;

    // Detect filename from preceding HTML comment (<!-- file: xxx -->)
    // Hugo content convention: authors can place <!-- file: path/to/file --> before a code block
    var prev = block.previousSibling;
    while (prev && prev.nodeType === Node.TEXT_NODE && prev.textContent.trim() === '') {
      prev = prev.previousSibling;
    }
    if (prev && prev.nodeType === Node.COMMENT_NODE && prev.textContent.trim().startsWith('file:')) {
      var fileName = prev.textContent.trim().replace('file:', '').trim();
      langSpan.textContent = fileName;
      langSpan.classList.add('code-filename');
    }

    var rightGroup = document.createElement('div');
    rightGroup.className = 'code-header-actions';

    // Feature A: Line number toggle button
    var hasLineNos = block.querySelector('.lnt') || block.querySelector('.ln');
    if (hasLineNos) {
      var lineToggle = document.createElement('button');
      lineToggle.className = 'code-line-toggle';
      lineToggle.textContent = '#';
      lineToggle.setAttribute('aria-label', txtToggleLineNos);
      lineToggle.addEventListener('click', function () {
        wrapper.classList.toggle('hide-line-numbers');
      });
      rightGroup.appendChild(lineToggle);
    }

    var copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy';
    copyBtn.textContent = txtCopy;
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    rightGroup.appendChild(copyBtn);

    header.appendChild(langSpan);
    header.appendChild(rightGroup);

    // Wrap the header and highlight block into the outer wrapper
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(header);
    wrapper.appendChild(block);

    // Copy button click handler: use Clipboard API, with success/failure feedback
    var resetTimer = null; // clearTimeout+setTimeout reset for copy feedback text
    copyBtn.addEventListener('click', function () {
      clearTimeout(resetTimer);
      // When line numbers are in a table, only copy the code column
      var codeTable = block.querySelector('td:last-child code');
      var codeText = codeTable ? (codeTable.textContent || codeTable.innerText) : (pre.textContent || pre.innerText);
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        copyBtn.textContent = '\u2717';
        resetTimer = setTimeout(function () {
          copyBtn.textContent = txtCopy;
          resetTimer = null;
        }, COPY_FEEDBACK_DURATION_MS);
        return;
      }
      navigator.clipboard.writeText(codeText).then(function () {
        copyBtn.textContent = txtCopied;
        copyBtn.classList.add('copied');
        resetTimer = setTimeout(function () {
          copyBtn.textContent = txtCopy;
          copyBtn.classList.remove('copied');
          resetTimer = null;
        }, COPY_FEEDBACK_DURATION_MS);
      }).catch(function (err) {
        console.error('Code copy failed:', err);
        copyBtn.textContent = '\u2717';
        resetTimer = setTimeout(function () {
          copyBtn.textContent = txtCopy;
          resetTimer = null;
        }, COPY_FEEDBACK_DURATION_MS);
      });
    });
  });
});
})();
