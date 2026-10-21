// Typography uses the original sizes at 1728px; project media retains its own scale.
export function fluidValue(value, property = '') {
  return value.replace(/(-?\d*\.?\d+)px\b/g, (match, number) => {
    const n = Number(number);
    if (n === 0 || Math.abs(n) <= 1) return match;
    const bodyText = (property.includes('font-size') && n <= 20) || (property.includes('line-height') && n <= 24);
    const typography = /font-size|line-height|letter-spacing/.test(property);
    return `calc(var(${bodyText ? '--text-unit' : typography ? '--type-unit' : '--layout-unit'}) * ${n})`;
  });
}
export function fluidSection(html) {
  return polishText(html.replace(/style=("[^"]*"|'[^']*')/g, (attribute, quoted) => {
    const quote = quoted[0];
    const css = quoted.slice(1, -1).replace(/([\w-]+):([^;]+)/g, (_, property, value) => `${property}:${fluidValue(value, property)}`);
    return `style=${quote}${css}${quote}`;
  }).replace(/<br\b[^>]*>/gi, ' '));
}

// Format text nodes only; leave attributes, URLs and intentional compound words untouched.
export function polishText(html) {
  const repairs = { 'combi-ned': 'combined', 'develo-pers': 'developers', 'minu-tes': 'minutes', 'ques-tions': 'questions', 'exe-cutive': 'executive', 'toge-ther': 'together' };
  return html.split(/(<[^>]+>)/g).map(part => {
    if (part.startsWith('<')) return part;
    // These narrow paragraphs read better without stray conjunctions or legacy line separators.
    if (/^(The referral program connects|As Lead Product Designer|We designed an in-context survey)/.test(part.trim())) {
      part = part.replace(/[\u2028\u2029]+/g, ' ')
        .replace(/(?<![\w-])(I|and|or) +(?=[A-Za-z])/g, '$1\u00a0');
    }
    return part
      .replace(/\b(?:combi-ned|develo-pers|minu-tes|ques-tions|exe-cutive|toge-ther)\b/g, word => repairs[word])
      .replace(/(?<![\w-])(a|an|the|in|on|at|to|of|for|by|as|with|from|into|over) +(?!&)(?=[A-Za-z0-9])/gi, '$1\u00a0');
  }).join('');
}
