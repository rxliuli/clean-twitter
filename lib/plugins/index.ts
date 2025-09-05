import { hideDiscoverMore } from './hideDiscoverMore'
import { hideRightSidebar } from './hideRightSidebar'
import { hideTimelineExplore } from './hideTimelineExplore'
import { restoreLogo } from './restoreLogo'
import { hidePremium } from './hidePremium'
import { hideCommunities } from './hideCommunities'
import { hideBookmarks } from './hideBookmarks'
import { hideGrok } from './hideGrok'
import { hideJobs } from './hideJobs'
import { hideAnalytics } from './hideCommunities copy'

export const plugins = [
  restoreLogo(),
  hideRightSidebar(),
  hideTimelineExplore(),
  hideDiscoverMore(),
  hidePremium(),
  hideCommunities(),
  hideBookmarks(),
  hideGrok(),
  hideJobs(),
  hideAnalytics(),
]
