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

function beautifyElement(id, currentHTMLLiElement, isOdd) {
	currentHTMLLiElement.className = (isOdd ? ' odd ' : ' even ');

	var surroundingSpan = document.createElement('span');
	surroundingSpan.className = "testlogin";
	currentHTMLLiElement.appendChild(surroundingSpan);
	initCurrentDescription(id, surroundingSpan);
}

function initCurrentDescription(id, surroundingSpan) {

	storage.get(null, function(result) {
		var text = result[id];
		text = text ? text : '';
		addCurrentDescriptionField(id, surroundingSpan, text);
		addEditTextField(id, surroundingSpan, text);
	});
}

function addCurrentDescriptionField(id, element, desc) {
	var textSpan = document.createElement('span');
	textSpan.className = "currentDescription";
	textSpan.id = "desc-" + id;
	textSpan.innerHTML = desc;
	element.appendChild(textSpan);	
}

function addEditTextField(id, element, desc) {
	var descriptionInput = document.createElement('input');
	descriptionInput.name = "description";
	descriptionInput.type = "text";
	descriptionInput.value = desc;
	descriptionInput.id = id;
	descriptionInput.addEventListener("keyup", updateDescriptionForId);
	element.appendChild(descriptionInput);
}

function updateDescriptionForId() {
	var inputField = this;
	var currentValue = inputField.value;
	var currentId = inputField.id;
	saveUpdatedDescription(currentId, currentValue);
}

function saveUpdatedDescription(id, desc) {
	if (desc) {
		var dataObj = {};
		dataObj[id] = desc;
		storage.set(dataObj);
		updateCurrentText(id, desc);
	}
}

function updateCurrentText(id, desc) {
	var field = document.getElementById('desc-' + id);
	if (field) {
		field.innerHTML = desc;
	}
}

initView();