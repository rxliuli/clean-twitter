import { defineCustomEventMessaging } from '@webext-core/messaging/page'

export const eventMessager = defineCustomEventMessaging<{
  /** content main world => content isolated world */
  getConfig(): Record<string, boolean>
}>({ namespace: 'clean-twitter' })
