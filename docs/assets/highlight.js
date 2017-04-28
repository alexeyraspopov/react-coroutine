const codeSnippets = document.querySelectorAll('pre');

const whiteListIdentifiers = ['create', 'retrieve', 'update', 'destroy', 'render'];
const reservedWords = ['class', 'extends', 'return', 'throw', 'yield', 'new', 'function', 'async', 'await',
                       'for', 'if', 'of', 'switch', 'case', 'default', 'this', 'const', 'let',
                       'var', 'true', 'false', 'try', 'catch', 'finally', 'static', 'import',
                       'from', 'export', 'default'];

for (const snippet of codeSnippets) {
  for (const textNode of getTextNodes(snippet)) {
    transform(textNode);
  }
}

function transform(textNode) {
  const words = textNode.textContent.split(/\b/);
  const fragment = document.createDocumentFragment();

  const transformed = words.map(word => {
    if (whiteListIdentifiers.includes(word)) {
      return wrapTextNode(word, 'primary');
    }

    if (reservedWords.includes(word)) {
      return wrapTextNode(word, 'secondary');
    }

    return document.createTextNode(word);
  });

  transformed.forEach(node => fragment.appendChild(node));
  requestAnimationFrame(() => textNode.parentNode.replaceChild(fragment, textNode));
}

function* getTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode });
  let node;

  while (node = walker.nextNode()) {
    yield node;
  }
}

function acceptNode(node) {
  if (node.textContent.trim().length > 0) {
    return NodeFilter.FILTER_ACCEPT;
  }

  return NodeFilter.FILTER_REJECT;
}

function wrapTextNode(text, type) {
  const wrapper = document.createElement('span');

  wrapper.setAttribute('class', `${type}-accent`);
  wrapper.appendChild(document.createTextNode(text));

  return wrapper;
}
