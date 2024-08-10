import Browser from 'webextension-polyfill'

export const getSyncStorage = () => browser.storage.sync
