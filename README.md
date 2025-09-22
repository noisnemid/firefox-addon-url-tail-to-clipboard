# URL Tail to Clipboard

## 简介

**URL Tail to Clipboard** 是一个浏览器扩展，能在你复制网页内容时，自动将当前页面的 URL 作为可点击链接追加到剪贴板内容末尾。  
它还提供了灵活的选项设置和快捷操作，方便你在不同场景下使用。

---

## 主要功能

1. **复制内容自动追加来源链接**  
   每当你从网页复制内容时，扩展会自动在复制内容的末尾添加当前页面的 URL（以可点击链接形式）。

2. **快捷键操作**  
   按下 `Ctrl+Alt+C`，会在页面底部插入当前页面的 URL，并将整个网页的 HTML 源码复制到剪贴板。

3. **自定义选项**  
   - 可在扩展设置页开启/关闭各项功能。
   - 支持设置白名单，仅在指定网站生效。

4. **开发者辅助**  
   每次复制操作后，会将当前页面 URL 存入全局变量 `window.purl`，便于开发调试。

---

## 使用方法

1. 安装扩展后，正常复制网页内容即可自动追加来源链接。
2. 如需复制整个网页源码并插入链接，可按下 `Ctrl+Alt+C`。
3. 可在扩展的“选项”页面自定义功能开关和白名单。

---

## 权限说明

- 需要访问剪贴板、标签页和存储权限，以实现自动追加链接和保存设置。

---

## 作者

NoisnemiD

---

## 备注

本扩展仅在支持 WebExtension 的现代浏览器（如 Firefox、Chrome）下有效。

---

# English Version

## Introduction

**URL Tail to Clipboard** is a browser extension that automatically appends the current page URL as a clickable link to the end of copied content when you copy from a webpage.  
It also provides flexible options and shortcut operations for different usage scenarios.

---

## Main Features

1. **Automatically Append Source URL on Copy**  
   Whenever you copy content from a webpage, the extension automatically adds the current page URL (as a clickable link) to the end of the copied content.

2. **Shortcut Operation**  
   Press `Ctrl+Alt+C` to insert the current page URL at the bottom of the page and copy the entire HTML source of the page to the clipboard.

3. **Customizable Options**  
   - Enable or disable each feature in the extension's options page.
   - Support for domain whitelisting, so features only work on specified sites.

4. **Developer Helper**  
   After each copy operation, the current page URL is stored in the global variable `window.purl` for development and debugging purposes.

---

## Usage

1. After installing the extension, simply copy content from any webpage to automatically append the source URL.
2. To copy the entire HTML source and insert the URL, press `Ctrl+Alt+C`.
3. Customize feature switches and whitelists in the extension's options page.

---

## Permissions

- Requires clipboard, tab, and storage permissions to append links and save settings.

---

## Author

NoisnemiD

---

## Note

This extension works only in modern browsers that support WebExtensions (such as Firefox and Chrome).
