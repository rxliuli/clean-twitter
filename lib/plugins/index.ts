// Branding
import { restoreLogo } from './restoreLogo'

// Layout
import { hideRightSidebar } from './hideRightSidebar'

// Left Navigation
import { hideNavHome } from './hideNavHome'
import { hideNavExplore } from './hideNavExplore'
import { hideNavNotifications } from './hideNavNotifications'
import { hideNavFollow } from './hideNavFollow'
import { hideNavChat } from './hideNavChat'
import { hideNavBookmarks } from './hideBookmarks'
import { hideNavLists } from './hideNavLists'
import { hideNavCommunities } from './hideCommunities'
import { hideNavPremium } from './hideNavPremium'
import { hideNavGrok } from './hideNavGrok'
import { hideNavProfile } from './hideNavProfile'
import { hideNavMore } from './hideNavMore'

// Tweet Actions
import { hideActionAnalytics } from './hideActionAnalytics'

// Content Area
import { hideSearchExplore } from './hideTimelineExplore'
import { hideDiscoverMore } from './hideDiscoverMore'
import { hideAdvertisement } from './hideAdvertisement'
import { hideActionGrok } from './hideActionGrok'
import { hideActionBookmarks } from './hideActionBookmarks'
import { hideNavAds } from './hideNavAds'

export const pluginGroups = {
  branding: [restoreLogo()],
  layout: [hideRightSidebar()],
  leftNavigation: [
    // hideNavHome(),
    // hideNavExplore(),
    // hideNavNotifications(),
    hideNavFollow(),
    hideNavChat(),
    hideNavGrok(),
    hideNavLists(),
    hideNavBookmarks(),
    hideNavCommunities(),
    hideNavPremium(),
    hideNavProfile(),
    hideNavAds(),
    hideNavMore(),
  ],
  tweetActions: [
    hideActionGrok(),
    hideActionAnalytics(),
    hideActionBookmarks(),
  ],
  contentArea: [hideSearchExplore(), hideDiscoverMore(), hideAdvertisement()],
}

// Flat array for backward compatibility
export const plugins = [
  ...pluginGroups.branding,
  ...pluginGroups.layout,
  ...pluginGroups.leftNavigation,
  ...pluginGroups.tweetActions,
  ...pluginGroups.contentArea,
]
