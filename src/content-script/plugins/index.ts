import { hideBlueBadge } from './hideBlueBadge'
import { hideDiscoverMore } from './hideDiscoverMore'
import { hideHomeTabs } from './hideHomeTabs'
import { hideOther } from './hideOther'
import { hideRightSidebar } from './hideRightSidebar'
import { hideSearchAndExplore } from './hideSearchAndExplore'
import { hideTimelineExplore } from './hideTimelineExplore'
import { hideViewTweetAnalytics } from './hideViewTweetAnalytics'

export const plugins = () => [
  hideBlueBadge(),
  hideDiscoverMore(),
  hideHomeTabs(),
  hideRightSidebar(),
  hideSearchAndExplore(),
  hideTimelineExplore(),
  hideViewTweetAnalytics(),
  hideOther(),
]
