import Browser from 'webextension-polyfill'

Browser.runtime.onMessage.addListener((message, _sender, sendMessage) => {
  ;(async () => {
    switch (message.action) {
      case 'get':
        sendMessage(
          // @ts-expect-error
          await (await fetch(message.url)).json(),
        )
        break
      default:
        break
    }
  })()
  return true
})
