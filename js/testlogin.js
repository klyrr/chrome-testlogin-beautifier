storage = chrome.storage.sync;

function initView() {
	var elements = document.getElementsByTagName("li");
	for (i=0; i<elements.length; i++) {
		var element = elements[i];
		var id = element.textContent;
		var isOdd = i % 2 == 0;
		beautifyElement(id, element, isOdd);
	}
}

function beautifyElement(id, currentHTMLElement, isOdd) {
	var surroundingSpan = document.createElement('span');
	surroundingSpan.className = "testlogin";
	currentHTMLElement.appendChild(surroundingSpan);
	currentHTMLElement.className = (isOdd ? ' odd ' : ' even ')
	initCurrentDescription(id, surroundingSpan);
	addEditTextField(id, surroundingSpan);
}

function showCurrentText(id, element, desc) {
	var textSpan = document.createElement('span');
	textSpan.className = "currentDescription";
	textSpan.id = "desc-" + id;
	textSpan.innerHTML = desc;
	element.appendChild(textSpan);	
}

function updateCurrentText(id, desc) {
	var field = document.getElementById('desc-' + id);
	if (field) {
		field.innerHTML = desc;
	}
}

function addEditTextField(id, element) {
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
	setCurrentDescription(currentId, currentValue);
}

function initCurrentDescription(id, surroundingSpan) {

	storage.get(null, function(result)
	{
		var text = result[id];
		if(text){
			showCurrentText(id, surroundingSpan, text);
		}
	});
}

function setCurrentDescription(id, desc) {
	if (desc) {
		var dataObj = {};
		dataObj[id] = desc;
		storage.set(dataObj);
		updateCurrentText(id, desc);
	}
}

initView();