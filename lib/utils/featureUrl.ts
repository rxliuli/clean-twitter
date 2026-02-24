/**
 * Convert plugin name (camelCase) to feature URL fragment (kebab-case)
 * Examples:
 * - restoreLogo -> feature-restore-logo
 * - hideRightSidebar -> feature-hide-right-sidebar
 * - hideNavPremium -> feature-hide-nav-premium
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export function getFeatureUrl(pluginName: string): string {
  const fragment = `feature-${toKebabCase(pluginName)}`
  return `https://store.rxliuli.com/extensions/clean-twitter/screenshots#${fragment}`
}
