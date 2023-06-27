import { hideBlueBadge } from './hideBlueBadge'
import { hideDiscoverMore } from './hideDiscoverMore'
import { hideHomeTabs } from './hideHomeTabs'
import { hideOther } from './hideOther'
import { hideRightSidebar } from './hideRightSidebar'
import { hideSearchAndExplore } from './hideSearchAndExplore'

export const plugins = () => [
  hideBlueBadge(),
  hideDiscoverMore(),
  hideHomeTabs(),
  hideRightSidebar(),
  hideSearchAndExplore(),
  hideOther(),
]
