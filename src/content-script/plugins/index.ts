import { disableTransparency } from './disableTransparency'
import { hideBlockTweet } from './hideBlockTweet'
import { hideBlueBadge } from './hideBlueBadge'
import { hideDiscoverMore } from './hideDiscoverMore'
import { hideHomeTabs } from './hideHomeTabs'
import { hideLive } from './hideLive'
import { hideOther } from './hideOther'
import { hideRightSidebar } from './hideRightSidebar'
import { hideSearchAndExplore } from './hideSearchAndExplore'
import { hideTimelineExplore } from './hideTimelineExplore'
import { hideViewTweetAnalytics } from './hideViewTweetAnalytics'
import { restoreLogo } from './restoreLogo'
import { restoreShareLink } from './restoreShareLink'

export const plugins = () => [
  hideBlueBadge(),
  hideDiscoverMore(),
  hideHomeTabs(),
  hideRightSidebar(),
  hideSearchAndExplore(),
  hideTimelineExplore(),
  hideViewTweetAnalytics(),
  hideOther(),
  hideLive(),
  restoreLogo(),
  hideBlockTweet(),
  restoreShareLink(),
  disableTransparency(),
]
