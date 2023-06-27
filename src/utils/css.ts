export function addCSS(css: string) {
  // 创建一个新的 <style> 元素
  const style = document.createElement('style')
  style.dataset.cleanTwitter = 'true'
  // 将 CSS 文本设置为 style 元素的内容
  style.textContent = css
  // 将 style 元素添加到文档的 <head> 中
  document.head.appendChild(style)
}

export function generateHideCSS(...selector: string[]) {
  return `${selector.join(',')}{ display: none !important; }`
}

export function cleanCSS() {
  ;[...document.querySelectorAll('style[data-clean-twitter="true"]')].forEach(
    (it) => it.remove(),
  )
}
