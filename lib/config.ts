export interface Config {
  // Branding
  restoreLogo?: boolean

  // Layout
  hideRightSidebar?: boolean

  // Left Navigation
  hideNavHome?: boolean
  hideNavExplore?: boolean
  hideNavNotifications?: boolean
  hideNavFollow?: boolean
  hideNavChat?: boolean
  hideNavBookmarks?: boolean
  hideNavLists?: boolean
  hideNavCommunities?: boolean
  hideNavPremium?: boolean
  hideNavGrok?: boolean
  hideNavJobs?: boolean
  hideNavProfile?: boolean
  hideNavAds?: boolean
  hideNavMore?: boolean

  // Tweet Actions
  hideActionAnalytics?: boolean
  hideActionBookmarks?: boolean
  hideActionGrok?: boolean

  // Content Area
  hideSearchExplore?: boolean
  hideDiscoverMore?: boolean
  hideAdvertisement?: boolean
}

export const DEFAULT_CONFIG: Config = {
  restoreLogo: true,
  hideRightSidebar: true,
  hideNavPremium: true,
  hideActionAnalytics: true,
  hideSearchExplore: true,
  hideDiscoverMore: true,
  hideAdvertisement: true,
}

export async function getConfig() {
  const stored =
    (
      await browser.storage.sync.get<{
        config: Config
      }>('config')
    ).config ?? {}
  return {
    ...DEFAULT_CONFIG,
    ...stored,
  }
}

export async function setConfig(config: Partial<Config>) {
  await browser.storage.sync.set({ config })
}
