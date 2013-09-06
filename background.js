// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {	

	if (changeInfo.status !== 'complete') {
		return;
	}
	// just matches the testserver login page
	var gettestpage = /(testserver\/login\/cms.[a-z0-9]+git.test.html)/i;
	if (tab.url.match(gettestpage)) {
    	chrome.pageAction.show(tabId);
    	chrome.tabs.executeScript(null, {file: "js/testlogin.js"});
    	chrome.tabs.insertCSS(null, {file: "css/testlogin.css"});
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
