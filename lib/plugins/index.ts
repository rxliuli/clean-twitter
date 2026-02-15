// Branding
import { restoreLogo } from './restoreLogo'

// Layout
import { hideRightSidebar } from './hideRightSidebar'

// Left Navigation
import { hideNavHome } from './hideNavHome'
import { hideNavExplore } from './hideNavExplore'
import { hideNavNotifications } from './hideNavNotifications'
import { hideNavFollow } from './hideNavFollow'
import { hideNavArticles } from './hideNavArticles'
import { hideNavChat } from './hideNavChat'
import { hideNavBookmarks } from './hideBookmarks'
import { hideNavLists } from './hideNavLists'
import { hideNavCommunities } from './hideCommunities'
import { hideNavPremium } from './hideNavPremium'
import { hideNavGrok } from './hideNavGrok'
import { hideNavProfile } from './hideNavProfile'
import { hideNavCreatorStudio } from './hideNavCreatorStudio'
import { hideNavCreateSpace } from './hideNavCreateSpace'
import { hideNavMore } from './hideNavMore'

// Tweet Actions
import { hideActionAnalytics } from './hideActionAnalytics'

// Content Area
import { hideSearchExplore } from './hideTimelineExplore'
import { hideDiscoverMore } from './hideDiscoverMore'
import { hideAdvertisement } from './hideAdvertisement'
import { hideTodayNews } from './hideTodayNews'
import { hideActionGrok } from './hideActionGrok'
import { hideActionBookmarks } from './hideActionBookmarks'
import { hideNavAds } from './hideNavAds'
import { hideWhoToFollow } from './hideWhoToFollow'
import { hideAppDownload } from './hideAppDownload'
import { hideNotificationRecommendation } from './hideNotificationRecommendation'
import { textMode } from './textMode'

export const pluginGroups = {
  branding: [restoreLogo()],
  layout: [hideRightSidebar()],
  leftNavigation: [
    // hideNavHome(),
    // hideNavExplore(),
    // hideNavNotifications(),
    hideNavFollow(),
    hideNavArticles(),
    hideNavChat(),
    hideNavGrok(),
    hideNavLists(),
    hideNavBookmarks(),
    hideNavCommunities(),
    hideNavPremium(),
    hideNavProfile(),
    hideNavCreatorStudio(),
    hideNavAds(),
    hideNavCreateSpace(),
    hideNavMore(),
    hideAppDownload(),
  ],
  tweetActions: [
    hideActionGrok(),
    hideActionAnalytics(),
    hideActionBookmarks(),
  ],
  contentArea: [
    hideSearchExplore(),
    hideDiscoverMore(),
    hideAdvertisement(),
    hideTodayNews(),
    hideWhoToFollow(),
    hideNotificationRecommendation(),
    textMode(),
  ],
}

// Flat array for backward compatibility
export const plugins = [
  ...pluginGroups.branding,
  ...pluginGroups.layout,
  ...pluginGroups.leftNavigation,
  ...pluginGroups.tweetActions,
  ...pluginGroups.contentArea,
]
