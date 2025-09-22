// background-script.js

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // 1. 处理设置请求
    if (msg.type === 'getSettings') {
        browser.storage.local.get([
            'purlEnable', 'purlWhitelistEnable', 'purlWhitelist',
            'srcEnable', 'srcWhitelistEnable', 'srcWhitelist'
        ]).then(items => {
            sendResponse(items);
        }).then(
            tems => {
                console.log('getSettings', items);
            });
        return true; // 必须返回true以支持异步sendResponse
    }

    // 2. 继续原有的URL转发逻辑
    browser.tabs.query({ currentWindow: true }).then(tabs => {
        for (const t of tabs) {
            browser.tabs.sendMessage(t.id, msg)
                .then(res => {
                    console.dir(res);
                })
                .catch(err => {
                    // 某些tab没有注入content-script会报错，忽略即可
                });
        }
        if (msg.purl) {
            console.log(msg.purl, 'forwarded.');
        }
    });
});
