function byAlphabeticalURLOrder(tab1, tab2) {
    const cleanURL = (url) => url.replace(/^https?:\/\/(www\.)?/, '');
    const url1 = cleanURL(tab1.url);
    const url2 = cleanURL(tab2.url);

    if (url1 < url2) {
        return -1;
    } else if (url1 > url2) {
        return 1;
    }
    return 0;
}

chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
    tabs.sort(byAlphabeticalURLOrder);
    document.write(`<h3>The tabs you're on are:</h3>`);
    document.write('<ul>');
    for (let i = 0; i < tabs.length; i++) {
        document.write(`<li>${tabs[i].url}</li>`);
        chrome.tabs.move(tabs[i].id, {index: i});
    }
    document.write('</ul>');
});