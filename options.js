document.addEventListener('DOMContentLoaded', () => {
    // 读取设置
    browser.storage.local.get([
        'purlEnable', 'purlWhitelistEnable', 'purlWhitelist',
        'srcEnable', 'srcWhitelistEnable', 'srcWhitelist'
    ]).then(items => {
        document.getElementById('purl-enable').checked = !!items.purlEnable;
        document.getElementById('purl-whitelist-enable').checked = !!items.purlWhitelistEnable;
        document.getElementById('purl-whitelist').value = items.purlWhitelist || '';
        document.getElementById('src-enable').checked = !!items.srcEnable;
        document.getElementById('src-whitelist-enable').checked = !!items.srcWhitelistEnable;
        document.getElementById('src-whitelist').value = items.srcWhitelist || '';
    });

    // 保存设置
    document.getElementById('save').onclick = () => {
        browser.storage.local.set({
            purlEnable: document.getElementById('purl-enable').checked,
            purlWhitelistEnable: document.getElementById('purl-whitelist-enable').checked,
            purlWhitelist: document.getElementById('purl-whitelist').value,
            srcEnable: document.getElementById('src-enable').checked,
            srcWhitelistEnable: document.getElementById('src-whitelist-enable').checked,
            srcWhitelist: document.getElementById('src-whitelist').value
        }).then(() => {
            document.getElementById('status').textContent = '已保存！';
            setTimeout(() => document.getElementById('status').textContent = '', 1000);
        });
    };
});