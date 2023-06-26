import { t } from './constants/i18n'
import Browser from 'webextension-polyfill'
import { Lang } from './constants/langs'
import i18next from 'i18next'

function addCSS(css: string) {
  // 创建一个新的 <style> 元素
  let style = document.createElement('style')

  // 将 CSS 文本设置为 style 元素的内容
  style.textContent = css

  // 将 style 元素添加到文档的 <head> 中
  document.head.appendChild(style)
}

function generateHideCSS(...selector: string[]) {
  return `${selector.join(',')}{ display: none !important; }`
}

function selectedFollowingTab() {
  if (window.location.pathname !== '/home') {
    // console.log('selectedFollowingTab ignore url')
    return
  }
  const tabs = [
    ...document.querySelectorAll('[href="/home"][role="tab"]'),
  ] as HTMLElement[]
  if (tabs.length === 2 && tabs[1].getAttribute('aria-selected') === 'false') {
    tabs[1].click()
  }
}

function getSelectedElements(): HTMLElement[] {
  // 首先，我们选择所有带有特定属性的元素
  let elements = [
    ...document.querySelectorAll('[data-testid="cellInnerDiv"]'),
  ] as HTMLElement[]

  const findMoreIndex = elements.findIndex((it) => {
    const s = it.textContent
    if (!s) {
      return false
    }
    return (
      (s.includes(t('twitter.symbol.DiscoverMore')) &&
        s.includes(t('twitter.symbol.SourcedFromAcrossTwitter'))) ||
      s.includes(t('twitter.symbol.MoreTween'))
    )
  })
  if (findMoreIndex === -1) {
    return []
  }
  return elements.slice(findMoreIndex)
}

function hideDiscoverMore() {
  const regex = /^https:\/\/twitter\.com\/[^\/]+\/status\/[^\/]+$/
  if (!regex.test(location.href)) {
    // console.log('hideDiscoverMore ignore url')
    return
  }

  // 每次 DOM 变化时，重新计算 selectedElements
  const selectedElements = getSelectedElements()
  // 打印 selectedElements
  console.log('selectedElements', selectedElements)
  // 隐藏 selectedElements
  selectedElements.forEach((it) => (it.style.display = 'none'))
}

/**
 * 隐藏主页的 Following Tab
 */
function hideSelectedFollowingTab() {
  addCSS(generateHideCSS('[role="tablist"]:has([href="/home"][role="tab"])'))
}

/**
 * 隐藏 twitter 蓝标
 */
function hideBlueBadge() {
  addCSS(
    generateHideCSS(
      `[aria-label="${t('twitter.symbol.Trending')}"] *:has(> [aria-label="${t(
        'twitter.symbol.VerifiedAccount',
      )}"])`,
    ),
  )
}

/**
 * 清理其他部分
 */
function hideOther() {
  addCSS(
    generateHideCSS(
      `[aria-label="${t(
        'twitter.symbol.CommunitiesNewItems',
      )}"], [aria-label="${t('twitter.symbol.Communities')}"], [aria-label="${t(
        'twitter.symbol.TwitterBlue',
      )}"], [aria-label="${t('twitter.symbol.Verified')}"], [aria-label="${t(
        'twitter.symbol.TimelineTrendingNow',
      )}"], [aria-label="${t('twitter.symbol.WhoToFollow')}"], [aria-label="${t(
        'twitter.symbol.SearchAndExplore',
      )}"], [aria-label="${t('twitter.symbol.VerifiedOrganizations')}"]`,
      // submean
      '* > [href="/i/verified-orgs-signup"]',
      // sidebar
      `[aria-label="${t(
        'twitter.symbol.Trending',
      )}"] > * > *:nth-child(3), [aria-label="${t(
        'twitter.symbol.Trending',
      )}"] > * > *:nth-child(4), [aria-label="${t(
        'twitter.symbol.Trending',
      )}"] > * > *:nth-child(5)`,
      // "Verified" tab
      '[role="presentation"]:has(> [href="/notifications/verified"][role="tab"])',
    ),
  )
}

const storage = (await Browser.storage.sync.get([
  'selectedFollowingTab',
  'hideDiscoverMore',
  'language',
])) as {
  selectedFollowingTab?: boolean
  hideDiscoverMore?: boolean
  language?: Lang
}

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(async function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          storage.selectedFollowingTab && selectedFollowingTab()
          storage.hideDiscoverMore && hideDiscoverMore()
        }
      })
    }
  })
})

storage.language && i18next.changeLanguage(storage.language)
storage.selectedFollowingTab && hideSelectedFollowingTab()
hideBlueBadge()
hideOther()
observer.observe(document.body, { childList: true, subtree: true })
