// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // just matches the testserver login page
  var gettestpage = /(testserver\/login\/cms.[a-z0-9]+git.test.html)/i;
  if (tab.url.match(gettestpage)) {
    //chrome.pageAction.show(tabId);
    
    chrome.tabs.executeScript(null, {file: "testlogin.js"});
    chrome.tabs.insertCSS(null, {file: "css/testlogin.css"});
    //chrome.tabs.executeScript(null, {file: "http://www.cornify.com/js/cornify.js"});
    //<a href="http://www.cornify.com" onclick="cornify_add();return false;"><img src="http://www.cornify.com/assets/cornify.gif" width="61" height="16" border="0" alt="Cornify" /></a><script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
