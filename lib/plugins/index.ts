import { hideDiscoverMore } from './hideDiscoverMore'
import { hideRightSidebar } from './hideRightSidebar'
import { hideTimelineExplore } from './hideTimelineExplore'
import { restoreLogo } from './restoreLogo'
import { hidePremium } from './hidePremium'
import { hideCommunities } from './hideCommunities'
import { hideBookmarks } from './hideBookmarks'
import { hideGrok } from './hideGrok'
import { hideJobs } from './hideJobs'
import { hideAnalytics } from './hideAnalytics'
import { hideLists } from './hideList'
import { hideTodayNews } from './hideTodayNews'
import { hideAdvertisement } from './hideAdvertisement'
import { hideWhoToFollow } from './ hideWhoToFollow'
import { hideSpace } from './hideSpace'

export const plugins = [
  restoreLogo(),
  hideRightSidebar(),
  hideTimelineExplore(),
  hideDiscoverMore(),
  hideTodayNews(),
  hideWhoToFollow(),
  hideAdvertisement(),
  hidePremium(),
  hideCommunities(),
  hideLists(),
  hideBookmarks(),
  hideGrok(),
  hideJobs(),
  hideAnalytics(),
  hideSpace(),
]
