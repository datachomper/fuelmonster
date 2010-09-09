var allElements, thisElement;
allElements = document.evaluate(
	'//*[@onmouseover]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i=0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);
	price = document.createElement('span');
	price.id = thisElement.text;
	thisElement.parentNode.insertBefore(price, thisElement.nextSibling);
	chrome.extension.sendRequest({'action' : 'fetchFuel', 'id' : thisElement.text}, onPrice);
}
console.log(allElements);

function onPrice(data) {
	if(data[0] == null)
		return;
	id = data[0];
	prices = data[1].responseText.match(/\$\d.\d\d/g);
	price = 99.99;
	for (var i in prices) {
		prices[i] = parseFloat(prices[i].replace(/\$/g, ''));
		if(prices[i] < price)
			price = prices[i];	
	}
	console.log(id + ": $"+price);
	var target = document.getElementById(id);
	if(price != 99.99)
		target.innerHTML = " $"+price;
	else
		target.innerHTML = " $-.--";

}
