function parseURL(query) {
	var input = query;
	if (input.length === 3) {
		url = parseMARCUrl(query);
	} else if (input.length > 5) {
		url = 'http://melinda.kansalliskirjasto.fi/byid/' + query;
	} else {
		url = "Unknown url";
	}
  return url;
}

function parseMARCUrl(field) {
	var fieldNumber = Number(field);
	if (fieldNumber === 0) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/000.htm';
	} else if (fieldNumber > 0 && fieldNumber <= 6) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/001-006.htm#' + field;
	} else if (fieldNumber === 7) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/007.htm';
	} else if (fieldNumber === 8) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/008.htm';
	} else if (fieldNumber >= 10 && fieldNumber <= 49) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/01X-04X.htm#' + field;
	} else if (fieldNumber >= 10 && fieldNumber <= 49) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/01X-04X.htm#' + field;
	} else if (fieldNumber >= 50 && fieldNumber < 90) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/05X-08X.htm#' + field;
	} else if (fieldNumber >= 100 && fieldNumber <= 130) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/1XX.htm#' + field;
	} else if (fieldNumber >= 210 && fieldNumber < 250) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/20X-24X.htm#' + field;
	} else if (fieldNumber >= 250 && fieldNumber <= 270) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/250-270.htm#' + field;
	} else if (fieldNumber >= 300 && fieldNumber < 400) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/3XX.htm#' + field;
	} else if (fieldNumber >= 400 && fieldNumber < 500) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/4XX.htm#' + field;
	} else if (fieldNumber >= 500 && fieldNumber < 540) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/50X-53X.htm#' + field;
	} else if (fieldNumber >= 530 && fieldNumber < 600) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/53X-58X.htm#' + field;
	} else if (fieldNumber >= 600 && fieldNumber < 700) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/6XX.htm#' + field;
	} else if (fieldNumber >= 700 && fieldNumber < 760) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/70X-75X.htm#' + field;
	} else if (fieldNumber >= 760 && fieldNumber < 790) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/76X-78X.htm#' + field;
	} else if (fieldNumber >= 800 && fieldNumber <= 830) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/80X-830.htm#' + field;
	} else if (fieldNumber >= 841 && fieldNumber < 890) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/841-88X.htm#' + field;
	} else if (fieldNumber >= 900) {
		return 'http://www.kansalliskirjasto.fi/extra/marc21/bib/9XX.htm#' + field;
	}	else {
		alert('Unrecognized value.');
	}
}

function redirect(parsedUrl) {
  chrome.tabs.create({url: parsedUrl});
}

function processForm() {
	var queryString = document.getElementById('querystring').value;
	var url = parseURL(queryString);
	redirect(url);
}

document.getElementById("sendButton").addEventListener("click", processForm);