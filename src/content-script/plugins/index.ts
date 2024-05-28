import { restoreTabbar } from './restoreTabbar'
import { hideDiscoverMore } from './hideDiscoverMore'
import { hideHomeTabs } from './hideHomeTabs'
import { hideLive } from './hideLive'
import { hideRightSidebar } from './hideRightSidebar'
import { hideTimelineExplore } from './hideTimelineExplore'
import { hideViewTweetAnalytics } from './hideViewTweetAnalytics'
import { restoreLogo } from './restoreLogo'
import { restoreShareLink } from './restoreShareLink'
import { hidePremium } from './hidePremium'
import { hideCommunities } from './hideCommunities'

export const plugins = () => [
  hideHomeTabs(),
  hideTimelineExplore(),
  hideRightSidebar(),
  hideViewTweetAnalytics(),
  hideDiscoverMore(),
  hideLive(),
  hidePremium(),
  hideCommunities(),
  // hideOther(),
  restoreShareLink(),
  restoreLogo(),
  restoreTabbar(),
]
