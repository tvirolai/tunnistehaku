(function() {

  'use strict';

  function parseMelindaURL(query) {
    var idArray = [];
    var urlArray = [];
    var url;
    query = query.trim();

    // Comma or whitespace can be used as a separator when inputting multiple ID's
    if (query.indexOf(',') > -1 ) {
      idArray = query.split(',');
    } else if (query.indexOf(' ') > -1 ) {
      idArray = query.split(' ');
    } else {
      idArray.push(query);
    }
    for (var i = 0; i < idArray.length; i++) {
      if (containsNumbers(idArray[i]) && !containsAlphabeticalCharacters(idArray[i])) {
        url = 'http://melinda.kansalliskirjasto.fi/byid/' + idArray[i].trim();
        urlArray.push(url);
      }
    }
    return urlArray;
  }

  // MARC field codes are parsed into three-digit format (e.g. '10' -> '010')
  function parseMARCField(field) {
    if (field.length == 1) {
      field = '00' + field;
    }
    if (field.length == 2) {
      field = '0' + field;
    }
    return field;
  }

  function parseMARCUrl(field) {
    var fieldNumber = Number(field);
    field = parseMARCField(field);
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
      unrecognizedValue();
    }
  }

  function parseLOCMARCUrl(field) {
    if (containsNumbers(field) && !containsAlphabeticalCharacters(field)) {
      return 'http://www.loc.gov/marc/bibliographic/bd' + field + '.html';
    } else {
      unrecognizedValue();
    }
  }

  function parseSovellusohjeUrl(field) {
    var fieldNumber = Number(field);
    var wikiRoot = 'https://wiki.helsinki.fi/pages/viewpage.action?pageId=';
    var sovellusohjeUrl = '';

    var wikiPages = [
      {'field': '000', 'firstcode': 0, 'lastcode': 0, 'pageId': '28195289', 'anchor': false, 'anchoredTags': false},
      {'field': '001-006', 'firstcode': 1, 'lastcode': 6, 'pageId': '28195301', 'anchor': false, 'anchoredTags': false},
      {'field': '007', 'firstcode': 7, 'lastcode': 7, 'pageId': '28195745', 'anchor': false, 'anchoredTags': false},
      {'field': '008', 'firstcode': 8, 'lastcode': 8, 'pageId': '28195750', 'anchor': false, 'anchoredTags': false},
      {'field': '01X-04X', 'firstcode': 10, 'lastcode': 49, 'pageId': '28195782', 'anchor': '#id-6.Numero-jakoodikentät(01X-04X)-', 
      'anchoredTags': ['010','013','015','016','017','018','019','020','022','024','025','026','027','028','030','031','032','033',
      '034','035','036','037','038','039','040','041','042','043','044','045','046','047','048','049']},
      {'field': '05X-08X', 'firstcode': 50, 'lastcode': 89, 'pageId': '28201092', 'anchor': false, 'anchoredTags': false},
      {'field': '1XX', 'firstcode': 100, 'lastcode': 199, 'pageId': '28201245',
      'anchor': '#id-8.Pääkirjauskentät(1XX)-', 'anchoredTags': ['100', '110', '111', '130']},
      {'field': '20X-24X', 'firstcode': 200, 'lastcode': 249, 'pageId': '28201255',
      'anchor': '#id-9.Nimeke-janimekkeeseenliittyvätkentät(20X-24X)-',
      'anchoredTags': ['210','222','240','242','243','245','246','247']},
      {'field': '250-270', 'firstcode': 250, 'lastcode': 270, 'pageId': '28201803', 
      'anchor': '#id-10.Julkaisu-jajakelutietojenjne.kentät(250-270)-',
      'anchoredTags': ['250','254','255','256','257','260','263','264','270']},
      {'field': '3XX', 'firstcode': 300, 'lastcode': 399, 'pageId': '28201880',
      'anchor': '#id-11.Fyysisenkuvailunjne.kentät(3XX)-',
      'anchoredTags': ['300','306','307','310','321','336','337','338','340','342','343','344','345','346','347',
      '351','352','355','357','362','363','365','366','370','377','380','381','382','383','384','385','386','388']},
      {'field': '4XX', 'firstcode': 400, 'lastcode': 499, 'pageId': '28202275', 'anchor': false, 'anchoredTags': false},
      {'field': '50x-53X', 'firstcode': 500, 'lastcode': 535, 'pageId': '28202285',
      'anchor': '#id-13.Huomautuskentät,osa1(50X-53X)-',
      'anchoredTags': ['500','501','502','504','505','506','507','508','509','510','511','513','514','515','516','518','520','521','522',
      '524','525','526','530','533','534','535']},
      {'field': '53X-59X', 'firstcode': 536, 'lastcode': 599, 'pageId': '28202292', 
      'anchor': '#id-14.Huomautuskentät,osa2(53X-59X)-',
      'anchoredTags': ['536','538','540','541','542','544','545','546','547','550','552','555','556','561','562','563','565','567','579',
      '580','581','583','584','585','586','588','59x']},
      {'field': '6XX', 'firstcode': 600, 'lastcode': 699, 'pageId': '28202299',
      'anchor': '#id-15.Asiasanakentät(6XX)-',
      'anchoredTags': ['600','610','611','630','648','650','651','653','654','655','656','657','658','662']},
      {'field': '70X-75X', 'firstcode': 700, 'lastcode': 759, 'pageId': '28202301',
      'anchor': '#id-16.Lisäkirjauskentät(70X-75X)-', 
      'anchoredTags': ['700','710','711','720','730','740','751','752','753','754']},
      {'field': '76X-79X', 'firstcode': 760, 'lastcode': 799, 'pageId': '28202303',
      'anchor': '#id-17.Linkkikentät(76X-79X)-',
      'anchoredTags': ['760','762','765','767','770','772','773','774','775','776','777','780','785','786','787','790']},
      {'field': '80X-830', 'firstcode': 800, 'lastcode': 830, 'pageId': '28202305',
      'anchor': '#id-18.Sarjalisäkirjauskentät(80X-830)-',
      'anchoredTags': ['800','810','811','830']},
      {'field': '841-88X', 'firstcode': 841, 'lastcode': 889, 'pageId': '28202307',
      'anchor': '#id-19.Varasto-jasijainti-ym.tietojenkentät(841-88X)-',
      'anchoredTags': ['850','852','856','880','882','883','884','886','887']},
      {'field': '9XX', 'firstcode': 900, 'lastcode': 999, 'pageId': '28203469',
      'anchor': '#id-20.Suomalaisetkentät(9XX)-',
      'anchoredTags': ['900','901','902','903','904','905','906','907','908','910','911','930','931','932','933','935','940','960','971','972']}
    ];

    if (fieldNumber >= 590 && fieldNumber <= 599) {
      field = '59x';
    }

    for (var i = 0; sovellusohjeUrl.length < 1; i++) {
      if (fieldNumber >= wikiPages[i].firstcode && fieldNumber <= wikiPages[i].lastcode) {
        sovellusohjeUrl = wikiRoot + wikiPages[i].pageId;
        if (wikiPages[i].anchor && wikiPages[i].anchoredTags.indexOf(field) > -1) {
          sovellusohjeUrl += wikiPages[i].anchor;
          sovellusohjeUrl += field;
        }
      }
    }

    return sovellusohjeUrl;
  }

  function redirect(parsedUrl) {
    // Avataan välilehtiä vain, jos syötteenä saadaan oikea URL
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

  function processForm() {
    var urls = [];
    var submittedQuery = document.getElementById('querystring').value;
    if (document.getElementById('melinda').checked) {
      urls = parseMelindaURL(submittedQuery);
    } else if (document.getElementById('marc21').checked) {
      urls.push(parseMARCUrl(submittedQuery));
    } else if (document.getElementById('marc21loc').checked) {
      urls.push(parseLOCMARCUrl(submittedQuery));
    } else if (document.getElementById('sovellusohje').checked) {
      urls.push(parseSovellusohjeUrl(submittedQuery));
    }
    for (var i = 0; i < urls.length; i++) {
      redirect(urls[i]);
    }
  }

  // Send the form by pressing the button

  document.getElementById('sendButton').addEventListener('click', processForm);

  // Send the form by hitting enter

  // Pressing enter when the search box is highlighted

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