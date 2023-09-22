import Browser from 'webextension-polyfill'

interface Service {
  get(url: string): Promise<any>
}

Browser.runtime.onMessage.addListener((message, _sender, sendMessage) => {
  ;(async () => {
    switch (message.method) {
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
