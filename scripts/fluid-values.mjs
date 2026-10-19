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
  return html.replace(/style=("[^"]*"|'[^']*')/g, (attribute, quoted) => {
    const quote = quoted[0];
    const css = quoted.slice(1, -1).replace(/([\w-]+):([^;]+)/g, (_, property, value) => `${property}:${fluidValue(value, property)}`);
    return `style=${quote}${css}${quote}`;
  }).replace(/<br\b[^>]*>/gi, ' ');
}
