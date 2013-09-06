storage = chrome.storage.sync;

function addInputFields() {

	var allSiteIds = {};
	console.log("addInputFields");
	initView();
}

function initView() {
	// nothing yet
	var elements = document.getElementsByTagName("li");
	console.log("initView");
	for (i=0; i<elements.length; i++) {
		var element = elements[i];
		var id = element.textContent;
		beautifyElement(id, element);
	}
}

function beautifyElement(id, currentHTMLElement) {
	var surroundingSpan = document.createElement('span');
	surroundingSpan.className = "testlogin";
	currentHTMLElement.appendChild(surroundingSpan);
	showCurrentText(id, surroundingSpan, getCurrentDescription(id));
	addEditTextForm(id, surroundingSpan);
}

function showCurrentText(id, element, desc) {
	var textSpan = document.createElement('span');
	textSpan.className = "currentDescription";
	textSpan.innerHTML = desc;
	element.appendChild(textSpan);	
}

function addEditTextForm(id, element) {
	var descriptionInput = document.createElement('input');
	descriptionInput.name = "description";
	descriptionInput.type = "text";
	descriptionInput.id = id;
	descriptionInput.addEventListener("keyup", updateValue);
	element.appendChild(descriptionInput);
}

function updateValue() {
	var inputField = this;
	var currentValue = inputField.value;
	var currentId = inputField.id;
	console.log("fffd " + currentValue + " " + currentId);
	setCurrentDescription(currentId, currentValue);
}

function getCurrentDescription(id) {

	var resultDesc = " ";
	var foobar = storage.get(null, function(result)
	{
		var text = result[id];
		resultDesc = text ? text : '-';
	});
	// console.log(foobar)
	// console.log(" resultDesc2 " + id + " "  + resultDesc + " --- " + foobar);
	return resultDesc;
}

function setCurrentDescription(id, desc) {
	if (desc) {
		var dataObj = {};
		dataObj[id] = desc;
		storage.set(dataObj);
		console.log("gespeichert " + id);
	}
}

function saveChanges() {

	var nameOne = "al 2";
	var nameTwo = "bob 3ssd3";
	var nameThree = "carl";
	var nameFour = "dan";

	//var foo = {};
	var dataObj = {};
	//foo["id"] = dataObj;

	dataObj[nameOne] = nameTwo;
	//dataObj[nameThree] = nameFour;

	storage.set(dataObj);

	storage.get(null, function(result)
	{
		console.log(result[nameOne]);
		console.log(result[nameThree]);
	});

}

//saveChanges();
addInputFields();