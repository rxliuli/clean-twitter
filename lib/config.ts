export interface Config {
  restoreLogo?: boolean
  hideRightSidebar?: boolean
  hideTimelineExplore?: boolean
  hideDiscoverMore?: boolean
  hideTodayNews?: boolean
  hideAdvertisement?: boolean
  hidePremium?: boolean
  hideCommunities?: boolean
  hideLists?: boolean
  hideBookmarks?: boolean
  hideGrok?: boolean
  hideJobs?: boolean
  hideAnalytics?: boolean
}

export async function getConfig() {
  return (
    (
      await browser.storage.sync.get<{
        config: Config
      }>('config')
    ).config ?? {}
  )
}

export async function setConfig(config: Partial<Config>) {
  await browser.storage.sync.set({ config })
}
