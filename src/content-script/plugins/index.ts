import { restoreTabbar } from './restoreTabbar'
import { blockScamTweets } from './blockScamTweets'
import { hideDiscoverMore } from './hideDiscoverMore'
import { hideHomeTabs } from './hideHomeTabs'
import { hideLive } from './hideLive'
import { hideOther } from './hideOther'
import { hideRightSidebar } from './hideRightSidebar'
import { hideTimelineExplore } from './hideTimelineExplore'
import { hideViewTweetAnalytics } from './hideViewTweetAnalytics'
import { restoreLogo } from './restoreLogo'
import { restoreShareLink } from './restoreShareLink'

export const plugins = () => [
  hideHomeTabs(),
  hideTimelineExplore(),
  hideRightSidebar(),
  hideViewTweetAnalytics(),
  hideDiscoverMore(),
  hideLive(),
  hideOther(),
  restoreShareLink(),
  restoreLogo(),
  restoreTabbar(),
  blockScamTweets(),
]
