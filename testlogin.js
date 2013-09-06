storage = chrome.storage.sync;

function addInputFields() {

	var allSiteIds = {};
	initList(allSiteIds);
	saveList(allSiteIds);
	updateList(allSiteIds);

}

function updateList(allSiteIds) {
	// nothing yet

}

function initList(allSiteIds) {

	var elements = document.getElementsByTagName("li");

	for (i=0; i<elements.length; i++) {
		var element = elements[i];
		var id = element.textContent;
		allSiteIds[element.textContent] = storeElementData(id, element);
		addText(element);
	}
}

function beautifyElement(id, link) {

}

function addText(element) {
	var textSpan = document.createElement( 'span' );
	textSpan.innerHTML="foo";
	element.appendChild( textSpan );
}

function storeElementData(id, element) {

	return {
		"link" : element.getElementsByTagName("a")[0].href,
		"foo" : "bar"
	}
}

function saveList(allSiteIds) {

	storage.set(allSiteIds);
}

function saveChanges(allSiteIds) {

	var nameOne = "al";
	var nameTwo = "bob";
	var nameThree = "carl";
	var nameFour = "dan";

	var dataObj = {};

	dataObj[nameOne] = nameTwo;
	dataObj[nameThree] = nameFour;


	storage.get(dataObj, function(result)
	{
		console.log(result[nameOne]);
		console.log(result[nameThree]);
	});

}


//cornify_add();
addInputFields();