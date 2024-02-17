/* 
  Copyright 2024. Jefferson "jscher2000" Scher. License: MPL-2.0.
  version 0.1 - initial concept
*/

/**** Context menu item (no icon for 0.1) ****/

let linkcontext = browser.menus.create({
  id: "link_samecontainerpopup",
  title: "Open Link in Same Container Window",
  contexts: ["link"]
});

/**** Context menu handler ****/

browser.menus.onClicked.addListener((menuInfo, currTab) => {
	switch (menuInfo.menuItemId) {
		case 'link_samecontainerpopup':
			var winstyle = 'normal';
			// Check for Shift as modifier
			if (menuInfo.modifiers){
				if (menuInfo.modifiers.includes('Shift')){
					winstyle = 'popup'; // BUG: odd behavior if the linked site is already assigned to a different container
				}
			}
			browser.windows.create({
				url: menuInfo.linkUrl,
				type: winstyle,
				cookieStoreId: currTab.cookieStoreId
			}).then().catch((err) => {console.log('Error creating window: '+err.message);});
			break;
		default:
			// WTF?
	}
});
