// Because all browsers' clipboard operation APIs lack advanced featurs,
// here I won't do anything to modify the clipboard data
// only transfer a global variable hodling the source URL just like Microsoft OneNote does.
// and this variable is pure string and is gbobal as window.purl, which means easy to use.
// 默认设置
const defaultSettings = {
    purlEnable: true,
    purlWhitelistEnable: false,
    purlWhitelist: '',
    srcEnable: true,
    srcWhitelistEnable: false,
    srcWhitelist: ''
};
let settings = { ...defaultSettings };

// 工具函数：判断当前域名是否在白名单
function inWhitelist(listStr) {
    if (!listStr) return false;
    const host = window.location.hostname;
    return listStr.split(',').map(s => s.trim()).filter(Boolean).some(domain => host.endsWith(domain));
}

// 读取设置
function loadSettings() {
    return browser.runtime.sendMessage({ type: 'getSettings' }).then(items => {
        settings = { ...defaultSettings, ...items };
    });
}

let purl;

document.oncopy = function (ev) {
    loadSettings();
    console.log('oncopy triggered', settings);
    if (!settings.purlEnable) return;
    if (settings.purlWhitelistEnable && !inWhitelist(settings.purlWhitelist)) return;

    let msg = { purl: window.location.href };
    purl = msg.purl;
    browser.runtime.sendMessage(msg);

    const selection = window.getSelection();
    if (!selection) return;

    let html = '';
    if (selection.rangeCount > 0) {
        const container = document.createElement('div');
        for (let i = 0; i < selection.rangeCount; i++) {
            container.appendChild(selection.getRangeAt(i).cloneContents());
        }
        html = container.innerHTML;
    } else {
        html = selection.toString();
    }

    const aTag = `<a href="${purl}">${purl}</a>`;
    const newHtml = html + '<br>' + aTag;
    const newText = selection.toString() + '\n' + purl;

    ev.clipboardData.setData('text/html', newHtml);
    ev.clipboardData.setData('text/plain', newText);
    ev.preventDefault();
};


// receive the purl value from the background script, which has been updated from any other copy operations in any tabs inside the browser window.

browser.runtime.onMessage.addListener(msg => {
    purl = msg.purl;
    window.wrappedJSObject.purl = cloneInto( //public and update the global variable.
        purl,
        window,
        { cloneFunctions: false }
    );
    console.log('window.purl updated.');
    // eval('console.log("New global value arrived! window.purl = ", purl);');
});

// Ctrl+Alt+C功能
document.addEventListener('keydown', async function (ev) {
    await loadSettings();
    if (!settings.srcEnable) return;
    if (settings.srcWhitelistEnable && !inWhitelist(settings.srcWhitelist)) return;

    // 检查是否按下 Ctrl+Alt+C
    if (ev.ctrlKey && ev.altKey && (ev.key === 'c' || ev.key === 'C')) {
        // 1. 在body最后添加一个p标签，p里包含a标签，a有id
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = window.location.href;
        a.textContent = window.location.href;
        a.id = 'source-url-link-z';
        a.style.display = 'block';
        p.appendChild(a);
        document.body.appendChild(p);

        // 2. 复制整个网页HTML源码到剪贴板
        try {
            await navigator.clipboard.writeText(document.documentElement.outerHTML);
            console.log('已复制整个网页HTML源码到剪贴板');
        } catch (err) {
            console.error('复制网页源码失败:', err);
        }
    }
});

