var xpath = "//div[(contains(@class, 'appLauncher') and contains(@role, 'navigation')) or contains(@class, 'oneAppNavContainer')]";
var matchingElements = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var appNavEle = null;
while (appNavEle = matchingElements.iterateNext()){
	if(null == appNavEle) {
		break;
	}
    var component = $A.getComponent(appNavEle);
    if (!component) {
    	continue;
    }
    if(component.getAttributeValueProvider() && component.getAttributeValueProvider().getConcreteComponent() ) {
    	var comp = component.getAttributeValueProvider().getConcreteComponent();
    	var label = null;
    	var appProps = {};
    	const appDefinition = comp.get('v.appMetadata.appDefinition') || {};
		if(comp.type && "one:appNavContainer" === comp.type) {
			label = appDefinition.label;
		}
		else {
			label = comp.get('v.appName');		
		}
    	if(!label) {
    		label = appDefinition.label;
    	}
    	
    	appProps['label'] = label;
    	appProps['appId'] = appDefinition.id;
    	appProps['appName'] = appDefinition.developerName;
    	
    	return appProps;
    }
}
return null;
