# Clean Twitter

<!-- markdownlint-disable MD033 -->

<a href="https://chrome.google.com/webstore/detail/lbbfmkbgembfbohdadeggdcgdkmfdmpb"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get uBlock Origin for Chromium"></a> <a href="https://addons.mozilla.org/zh-CN/firefox/addon/clean-twitter-2333/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get uBlock Origin for Firefox"></a> <a href="https://www.producthunt.com/posts/clean-twitter?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-clean&#0045;twitter" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401819&theme=light" alt="Clean&#0032;Twitter - Some&#0032;features&#0032;of&#0032;cleaning&#0032;Twitter | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

清理 Twitter 的一些功能，包括：获得认证, Twitter Blue, 验证的组织, 社区, 发现更多, 搜索和发现, 推荐关注, 时间线：当前趋势 等.

支持多语言

- en-US
- zh-CN
- zh-TW
- ja-JP

如果想支持新的语言，可以在 `src/i18n` 目录下增加新的语言文件，其中至少需要包括 `symbol.` 部分 Twitter 的翻译，这用来作为 CSS 选择器的依赖。

> 之前也编写过一些清理 twitter 的 css 和脚本，但最终还是写了一个插件。

## 局限性

由于 Firefox 默认不支持 CSS 特性 `:has`，所以需要手动启用它，参考：<https://developer.mozilla.org/en-US/docs/Web/CSS/:has#browser_compatibility>
