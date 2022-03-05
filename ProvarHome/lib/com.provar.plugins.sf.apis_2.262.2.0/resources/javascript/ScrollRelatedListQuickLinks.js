/**
 *  Make sure scrolling should be on hover pop-up and not on browser window, otherwise it will close hover pop-up.
 *  There can only be 2 possibilities, provided hover pop-up is active:
 *  		1. Element already in focus and no scrolling required at all
 *  		2. Element is not in focus that means there has to be a vertical scroll bar on hover pop-up to scroll element in view
 */
var element = arguments[0];
if(element) {
	const hoverXpath = "//div[contains(@class, 'forceHoverPanel') and contains(@class, 'open') and contains(@class, 'active')]//div[contains(@class, 'listPreview')]";
	const hoverElem = document.evaluate(hoverXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if (!hoverElem || !hoverElem.singleNodeValue) {
		return false;
	}
	
	const scrollableContainerXpath = "ancestor::div[contains(@class, 'container') and ancestor::div[contains(@class, 'forceHoverPanel') and contains(@class, 'active')]]";
	const scrollableContainer = document.evaluate(scrollableContainerXpath, element, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (scrollableContainer && scrollableContainer.style.overflowY === 'scroll') {
		const elementOffset = element.getBoundingClientRect().y;
		const scrollableContainerOffset = scrollableContainer.getBoundingClientRect().y;
		scrollableContainer.scrollTop = elementOffset - scrollableContainerOffset;
	}
	
	// Either element already in focus or it should have been scrolled by scrollable container by now
	return true;
}