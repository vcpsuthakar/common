var matchingTarget = arguments[0];
var matchingIndex = 0;

var actionElements = document.evaluate("//div[contains(@class,'listViewPickerPanel') and ((contains(@class,'open') and contains(@class,'active')) or contains(@aria-hidden, 'false'))]//ul",
		document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var listOptionItems = null;
var actionEle = actionElements.iterateNext();
if (actionEle) {
	var auraId = actionEle.getAttribute("data-aura-rendered-by");
	var component = auraId ? $A.getComponent(auraId) : null;
	if(component && component.getAttributeValueProvider() && component.getAttributeValueProvider().getConcreteComponent()) {
		listOptionItems = component.getAttributeValueProvider().getConcreteComponent().get("v.items");
	}
}
if(listOptionItems) {
	listOptionItems = listOptionItems.filter((e)=> !e['header'] && e['visible']);
	var arrayLength = listOptionItems.length;
	for (var i = 0; i < arrayLength; i++) {
		var item = listOptionItems[i];
		if(item.value === matchingTarget) {
			matchingIndex = i;
			break;
		}
	}
}
return matchingIndex; // header is also an item