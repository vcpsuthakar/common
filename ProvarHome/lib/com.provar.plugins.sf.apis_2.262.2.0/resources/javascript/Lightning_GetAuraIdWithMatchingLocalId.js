var xpathToMatch = arguments[0];
var attributeName = arguments[1];
var component = null;
var attributeValue = null;
var matchingLocalId = null;

if (xpathToMatch === null || attributeName === null) {
	return null;
}
var actionElements = document.evaluate(xpathToMatch, document, null,
		XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var actionEle = actionElements.iterateNext();
while (actionEle) {
	var auraId = actionEle.getAttribute("data-aura-rendered-by");
	component = auraId ? $A.getComponent(auraId) : null;
	if (component && component.getAttributeValueProvider()
			&& component.getAttributeValueProvider().getConcreteComponent()) {
		attributeValue = component.getAttributeValueProvider()
				.getConcreteComponent().getLocalId();
		if (attributeValue === attributeName) {
			matchingLocalId = auraId;
			break;
		}
	}
	actionEle = actionElements.iterateNext();
}
return matchingLocalId;

