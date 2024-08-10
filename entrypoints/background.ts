import { CreateTokenWebFlowOptions } from '@octokit/oauth-app/dist-types/methods/create-token'
import { oAuthApp } from './constants/github'
import { Octokit } from '@octokit/rest'
import { TweetInfo } from './content-script/utils/initIndexeddb'

export interface Channel<T extends string> {
  name: T
}

export interface BackgroundChannel extends Channel<'background'> {
  get(url: string): Promise<any>
  createToken(
    data: CreateTokenWebFlowOptions & {
      scopes?: string[]
    },
  ): Promise<string>
  createIssue(tweet: TweetInfo & { link: string }): Promise<void>
}

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  function backApi(): BackgroundChannel {
    return {
      name: 'background',
      async get(url) {
        return await (await fetch(url)).json()
      },
      async createToken(data) {
        const auth = await oAuthApp.createToken(data)
        return auth.authentication.token
      },
      async createIssue(tweet) {
        const auth = await browser.storage.local.get([
          'refreshToken',
          'accessToken',
        ])
        const octokit = new Octokit({ auth: auth.accessToken })
        const owner = import.meta.env.VITE_GITHUB_BLOCKLIST_OWNER
        const repo = import.meta.env.VITE_GITHUB_BLOCKLIST_REPO
        const issues = await octokit.rest.search.issuesAndPullRequests({
          q: `repo:${owner}/${repo} ${tweet.userId} in:title type:issue`,
        })
        if (issues.data.total_count > 0) {
          console.log('issue is exist')
          return
        }
        await octokit.rest.issues.create({
          owner,
          repo,
          title: `Block ${tweet.userId} ${tweet.username}`,
          body:
            '```json\n' +
            JSON.stringify(tweet, undefined, 2) +
            '\n```' +
            `\n${tweet.link}`,
        })
        console.log('issue created')
      },
    }
  }

  function register<T extends Channel<string>>(api: T) {
    browser.runtime.onMessage.addListener((message, _sender, sendMessage) => {
      if (
        typeof message.method !== 'string' ||
        !message.method.startsWith(api.name + '.')
      ) {
        return
      }
      const p = (message.method as string).slice((api.name + '.').length)
      if (typeof (api as any)[p] !== 'function') {
        throw new Error('method not found')
      }
      ;(async () => {
        console.log('background receive message', message)
        try {
          const r = await (api as any)[p](...message.params)
          // @ts-expect-error
          sendMessage({ result: r })
        } catch (err: any) {
          // @ts-expect-error
          sendMessage({
            error: {
              code: err.code,
              message: err.message,
              data: err.stack,
            },
          })
        }
      })()
      return true
    })
  }

  register(backApi())
})
