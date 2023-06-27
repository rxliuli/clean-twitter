# Clean Twitter

清理 Twitter 的一些功能，包括：获得认证, Twitter Blue, 验证的组织, 社区, 发现更多, 搜索和发现, 推荐关注, 时间线：当前趋势 等.

支持多语言

- en-US
- zh-CN
- zh-TW
- ja-JP

如果想支持新的语言，可以在 `src/i18n` 目录下增加新的语言文件，其中至少需要包括 `symbol.` 部分 Twitter 的翻译，这用来作为 CSS 选择器的依赖。

> 之前也编写过一些清理 twitter 的 css 和脚本，但最终还是写了一个插件。

## 安装

从 [Release](https://github.com/rxliuli/clean-twttier/releases) 下载 zip 文件，解压后使用 Chrome 加载已解压的扩展程序。或者从 Chrome 商店安装（还未通过审核）。

## 局限性

由于 Firefox 不支持 CSS 特性 `:has`，所以这个插件没有 Firefox 版本。参考：<https://developer.mozilla.org/en-US/docs/Web/CSS/:has#browser_compatibility>
