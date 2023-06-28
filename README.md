# Clean Twitter

<!-- markdownlint-disable MD033 -->

<a href="https://chrome.google.com/webstore/detail/lbbfmkbgembfbohdadeggdcgdkmfdmpb"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get uBlock Origin for Chromium"></a> <a href="https://addons.mozilla.org/zh-CN/firefox/addon/clean-twitter-2333/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get uBlock Origin for Firefox"></a> <a href="https://www.producthunt.com/posts/clean-twitter?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-clean&#0045;twitter" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401819&theme=light" alt="Clean&#0032;Twitter - Some&#0032;features&#0032;of&#0032;cleaning&#0032;Twitter | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

Some features of cleaning Twitter include: Blue check, Twitter Blue, Verified Organization, Communities, Trending, Search & Explore, Who to follow, For you. All gone.

Support for multiple languages:

- en-US
- zh-CN
- zh-TW
- ja-JP

If you want to support a new language, you can add a new language file under the `src/i18n` directory, which should at least include the `symbol.` part of Twitter's translation, which is used as a dependency for the CSS selector.

## Limitations

Since Firefox does not support the CSS feature `:has` by default, it needs to be manually enabled. Refer to: <https://developer.mozilla.org/en-US/docs/Web/CSS/:has#browser_compatibility>
