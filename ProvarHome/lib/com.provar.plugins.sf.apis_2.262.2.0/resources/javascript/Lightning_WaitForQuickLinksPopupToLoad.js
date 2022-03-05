var element = arguments[0];
var callback = arguments[arguments.length - 1];
var interval = setInterval(() => {
  try {
    var retry = 5;
    element.dispatchEvent(new Event("mouseover"));
    var uiContainer = document.evaluate(
    		"//div[contains(@class,'DESKTOP') and contains(@class,'uiContainerManager')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    setTimeout(() => {
      if (
        retry-- < 0 ||
        (uiContainer && uiContainer.childElementCount !== 0)) {
        {
          clearInterval(interval);
          callback();
        }
      }
    }, 500);
  } catch (e) {
    console.log(e);
  }
}, 1000);