(function() {

  'use strict';

  function parseMelindaURL(query) {
    query = query.trim();
    var idArray = (query.indexOf(',') > -1) ? query.split(',') : query.split(' ');
    return idArray.map(function(id) {
      return 'http://melinda.kansalliskirjasto.fi/byid/' + id.trim();
    });
  }

  // MARC field codes are parsed into three-digit format (e.g. '10' -> '010')
  function parseMARCField(field) {
    while (field.length < 3) {
      field = "0" + field;
    }
    return field;
  }

  function parseMARC21Url(field, type) {
    field = (Number(field) >= 590 && Number(field) <= 599) ? '59x' : parseMARCField(field);
    var wikiRoot = 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=';
    var rdaRoot = "https://www.kiwi.fi/pages/viewpage.action?pageId=";
    var marc21Root = 'http://www.kansalliskirjasto.fi/extra/marc21/bib/';
    var urlData = getUrlData();
    var url = '';

    for (var i = 0; url.length < 1; i++) {
      if (Number(field) >= urlData[i].firstCode && Number(field) <= urlData[i].lastCode) {
        if (type === 'marc21') {
          url += marc21Root + urlData[i].formatField + '.htm#' + field;
        } else if (type === 'sovellusohjeisbd') {
          url = wikiRoot + urlData[i].pageId;
          if (urlData[i].anchor) {
            url += urlData[i].anchor;
            url += field;
          }
        } else if (type === 'sovellusohjerda') {
          url = rdaRoot + urlData[i].rdaPageId;
          if (urlData[i].anchor) {
            url += urlData[i].anchor;
            url += field;
          }
        }
      }
    }
    return url;
  }

  function parseLOCMARCUrl(field) {
    return 'http://www.loc.gov/marc/bibliographic/bd' + parseMARCField(field) + '.html';
  }

  function redirect(parsedUrl) {
    // Only open tabs if a the parsed URL is valid
    if (parsedUrl.indexOf('http') > -1) {
      chrome.tabs.create({url: parsedUrl});
    }
  }

  function unrecognizedValue() {
    alert('Virheellinen syöte.');
  }

  function containsNumbers(input) {
    return /[0-9]/.test(input);
  }

  function containsAlphabeticalCharacters(input) {
    return /[a-zäöå]/i.test(input);
  }

  function getUrlData() {
    return [
      {'formatField': '000', 'firstCode': 0, 'lastCode': 0, 'pageId': '28195289', 'rdaPageId': '51282124', 'anchor': false},
      {'formatField': '001-006', 'firstCode': 1, 'lastCode': 6, 'pageId': '28195301', 'rdaPageId': '51282125', 'anchor': false},
      {'formatField': '007', 'firstCode': 7, 'lastCode': 7, 'pageId': '28195745', 'rdaPageId': '51282132', 'anchor': false},
      {'formatField': '008', 'firstCode': 8, 'lastCode': 8, 'pageId': '28195750', 'rdaPageId': '51282049', 'anchor': false},
      {'formatField': '01X-04X', 'firstCode': 10, 'lastCode': 49, 'pageId': '28195782', 'rdaPageId': '51282032', 'anchor': '#id-6.Numero-jakoodikentät(01X-04X)-'},
      {'formatField': '05X-08X', 'firstCode': 50, 'lastCode': 89, 'pageId': '28201092', 'rdaPageId': '51282131', 'anchor': false},
      {'formatField': '1XX', 'firstCode': 100, 'lastCode': 199, 'pageId': '28201245', 'rdaPageId': '51282046', 'anchor': '#id-8.Pääkirjauskentät(1XX)-'},
      {'formatField': '20X-24X', 'firstCode': 200, 'lastCode': 249, 'pageId': '28201255', 'rdaPageId': '51282044', 'anchor': '#id-9.Nimeke-janimekkeeseenliittyvätkentät(20X-24X)-'},
      {'formatField': '250-270', 'firstCode': 250, 'lastCode': 270, 'pageId': '28201803', 'rdaPageId': '51282130', 'anchor': '#id-10.Julkaisu-jajakelutietojenjne.kentät(250-270)-'},
      {'formatField': '3XX', 'firstCode': 300, 'lastCode': 399, 'pageId': '28201880', 'rdaPageId': '51282054', 'anchor': '#id-11.Fyysisenkuvailunjne.kentät(3XX)-'},
      {'formatField': '4XX', 'firstCode': 400, 'lastCode': 499, 'pageId': '28202275', 'rdaPageId': '51282126', 'anchor': false},
      {'formatField': '50X-53X', 'firstCode': 500, 'lastCode': 535, 'pageId': '28202285', 'rdaPageId': '51282051', 'anchor': '#id-13.Huomautuskentät,osa1(50X-53X)-'},
      {'formatField': '53X-58X', 'firstCode': 536, 'lastCode': 599, 'pageId': '28202292', 'rdaPageId': '51282059', 'anchor': '#id-14.Huomautuskentät,osa2(53X-59X)-'},
      {'formatField': '6XX', 'firstCode': 600, 'lastCode': 699, 'pageId': '28202299', 'rdaPageId': '51282133', 'anchor': '#id-15.Asiasanakentät(6XX)-'},
      {'formatField': '70X-75X', 'firstCode': 700, 'lastCode': 759, 'pageId': '28202301', 'rdaPageId': '51282134', 'anchor': '#id-16.Lisäkirjauskentät(70X-75X)-'},
      {'formatField': '76X-78X', 'firstCode': 760, 'lastCode': 799, 'pageId': '28202303', 'rdaPageId': '51282062', 'anchor': '#id-17.Linkkikentät(76X-79X)-'},
      {'formatField': '80X-830', 'firstCode': 800, 'lastCode': 830, 'pageId': '28202305', 'rdaPageId': '51282135', 'anchor': '#id-18.Sarjalisäkirjauskentät(80X-830)-'},
      {'formatField': '841-88X', 'firstCode': 841, 'lastCode': 899, 'pageId': '28202307', 'rdaPageId': '51282070', 'anchor': '#id-19.Varasto-jasijainti-ym.tietojenkentät(841-88X)-'},
      {'formatField': '9XX', 'firstCode': 900, 'lastCode': 999, 'pageId': '28203469', 'rdaPageId': '51282136', 'anchor': '#id-20.Suomalaisetkentät(9XX)-'}
    ];
  }

  function processForm() {
    var urls = [];
    var type = '';
    var submittedQuery = document.getElementById('querystring').value;
    if (containsNumbers(submittedQuery) && !containsAlphabeticalCharacters(submittedQuery)) {
      if (document.getElementById('melinda').checked) {
        urls = parseMelindaURL(submittedQuery);
      } else if (document.getElementById('marc21').checked) {
        type = 'marc21';
        urls.push(parseMARC21Url(submittedQuery, type));
      } else if (document.getElementById('marc21loc').checked) {
        urls.push(parseLOCMARCUrl(submittedQuery));
      } else if (document.getElementById('sovellusohjeisbd').checked) {
        type = 'sovellusohjeisbd';
        urls.push(parseMARC21Url(submittedQuery, type));
      } else if (document.getElementById('sovellusohjerda').checked) {
        type = 'sovellusohjerda';
        urls.push(parseMARC21Url(submittedQuery, type));
      }
      urls.map(redirect);
    } else {
      unrecognizedValue();
    }
  }

  // Send the form by pressing the button

  document.getElementById('sendButton').addEventListener('click', processForm);

  // Send the form by hitting enter

  document.getElementById('querystring').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      processForm();
    }
  });

  // Pressing enter when one of the radio buttons is highlighted

  var elements = document.getElementsByClassName('teksti');

  [].forEach.call(elements, function(el) {
      el.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
          processForm();
        }
    });
  });
}());
