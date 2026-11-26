export function hideElement(selector: string[], tag?: string) {
  insertCSS(`${selector.join(',')}{ display: none !important; }`, tag)
}

/**
 * Hide virtualized TanStack Virtual `li[data-index]` rows on New X without leaving blank gaps.
 * Setting `display: none` breaks ResizeObserver measurement; keeping `height: 1px` while hiding
 * children triggers an immediate reflow.
 */
export function hideVirtualListItem(selectors: string[], tag?: string) {
  const joined = selectors.join(',')
  const children = selectors.map((s) => `${s} > *`).join(',')
  insertCSS(
    `${joined} { height: 1px !important; min-height: 0 !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; border: 0 !important; opacity: 0 !important; pointer-events: none !important; } ${children} { display: none !important; }`,
    tag,
  )
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
