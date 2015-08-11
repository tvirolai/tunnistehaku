function parseMelindaURL(query) {
	var idArray = [];
	var urlArray = [];
	query = query.trim();
	
	// Melinda-idt voi syöttää pilkulla tai välilyönnillä erotettuna
	if (query.indexOf(',') > -1 ) {
		idArray = query.split(',');
	} else if (query.indexOf(' ') > -1 ) {
		idArray = query.split(' ');
	} else {
		idArray.push(query.trim());
	}
	for (var i = 0; i < idArray.length; i++) {
		url = 'http://melinda.kansalliskirjasto.fi/byid/' + idArray[i].trim();
		urlArray.push(url);
	}
	return urlArray;
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
	} else {
		alert('Unrecognized value.');
	}
}

function parseLOCMARCUrl(field) {
	return 'http://www.loc.gov/marc/bibliographic/bd' + field + '.html';
}

function parseSovellusohjeUrl(field) {
	var fieldNumber = Number(field);
		if (fieldNumber === 0) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28195289';
	} else if (fieldNumber > 0 && fieldNumber <= 6) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28195301';
	} else if (fieldNumber === 7) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28195745';
	} else if (fieldNumber === 8) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28195750';
	} else if (fieldNumber >= 10 && fieldNumber <= 49) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28195782';
	} else if (fieldNumber >= 50 && fieldNumber < 90) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28201092';
	} else if (fieldNumber >= 100 && fieldNumber <= 130) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28201245';
	} else if (fieldNumber >= 210 && fieldNumber < 250) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28201255';
	} else if (fieldNumber >= 250 && fieldNumber <= 270) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28201803';
	} else if (fieldNumber >= 300 && fieldNumber < 400) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28201880';
	} else if (fieldNumber >= 400 && fieldNumber < 500) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202275';
	} else if (fieldNumber >= 500 && fieldNumber < 540) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202285';
	} else if (fieldNumber >= 530 && fieldNumber < 600) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202292';
	} else if (fieldNumber >= 600 && fieldNumber < 700) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202299';
	} else if (fieldNumber >= 700 && fieldNumber < 760) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202301';
	} else if (fieldNumber >= 760 && fieldNumber < 790) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202303';
	} else if (fieldNumber >= 800 && fieldNumber <= 830) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202305';
	} else if (fieldNumber >= 841 && fieldNumber < 890) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28202307';
	} else if (fieldNumber >= 900) {
		return 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=28203469';
	} else {
		alert('Unrecognized value.');
	}

}

function redirect(parsedUrl) {
  chrome.tabs.create({url: parsedUrl});
}

function processForm() {
	var urls = [];
	var queryString = document.getElementById('querystring').value;
	if (document.getElementById('melinda').checked) {
		urls = parseMelindaURL(queryString);
	} else if (document.getElementById('marc21').checked) {
		urls.push(parseMARCUrl(queryString));
	} else if (document.getElementById('marc21loc').checked) {
		urls.push(parseLOCMARCUrl(queryString));
	} else if (document.getElementById('sovellusohje').checked) {
		urls.push(parseSovellusohjeUrl(queryString));
	}
	for (var i = 0; i < urls.length; i++) {
		redirect(urls[i]);
	}
}

// Lomakkeen lähetys painamalla hae-nappia

document.getElementById('sendButton').addEventListener('click', processForm);

// Lomakkeen lähetys painamalla enteriä

querystring.addEventListener('keypress', function(event) {
	if (event.keyCode == 13) {
		processForm();
	}
});