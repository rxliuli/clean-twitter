export function hideElement(selector: string[], tag?: string) {
  insertCSS(`${selector.join(',')}{ display: none !important; }`, tag)
}

export function wrapCSSOnMobile(selector: string) {
  return `@media (max-width: 768px) { ${selector} }`
}

export function hideElementOnMobile(selector: string[], tag?: string) {
  insertCSS(
    wrapCSSOnMobile(`${selector.join(',')}{ display: none !important; }`),
    tag,
  )
}

export function hideElementOnDesktop(selector: string[], tag?: string) {
  insertCSS(
    `@media (min-width: 769px) { ${selector.join(
      ',',
    )}{ display: none !important; } }`,
    tag,
  )
}

export function insertCSS(css: string, tag: string = '') {
  // 创建一个新的 <style> 元素
  const style = document.createElement('style')
  style.dataset.cleanTwitter = tag
  // 将 CSS 文本设置为 style 元素的内容
  style.textContent = css
  // 将 style 元素添加到文档的 <head> 中
  document.head.appendChild(style)
}

export function generateHideCSS(...selector: string[]) {
  return `${selector.join(',')}{ display: none !important; }`
}

export function cleanCSS(tag?: string) {
  const selector = tag
    ? `style[data-clean-twitter="${tag}"]`
    : 'style[data-clean-twitter]'
  ;[...document.querySelectorAll(selector)].forEach((it) => it.remove())
}

export function hasCSS(tag: string) {
  return !!document.querySelector(`style[data-clean-twitter="${tag}"]`)
}
