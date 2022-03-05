const lightningMenuItemXpath = arguments[0];
let tabAttribute = arguments[1];
let dataLabel = arguments[2];
let useTitle = arguments[3];
if (!tabAttribute || !lightningMenuItemXpath) {
	return -1;
}

let iteration = 1;
let nodeIterator = document.evaluate(lightningMenuItemXpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
while(true) {
	const lightningMenuItem = nodeIterator.iterateNext();
	if (!lightningMenuItem) {
		break;
	}
	let matchedUsingTitle = useTitle && lightningMenuItem.label === tabAttribute;
	let matchedWithoutUsingTitle = !useTitle
		&& ((lightningMenuItem.value && lightningMenuItem.value.startsWith(tabAttribute)) || lightningMenuItem.label === dataLabel);

	if (matchedUsingTitle || matchedWithoutUsingTitle) {
		return iteration;
	}
	iteration++;
}
return -1;
