"use strict";

function parseMARC21Url(field, type, data) {
  field = (Number(field) >= 590 && Number(field) <= 599) ? "59x" : parseMARCField(field);
  const urlInfo = data.filter(line => Number(field) >= line.firstCode && Number(field) <= line.lastCode).pop();
  if (type === "marc21") {
    return "http://www.kansalliskirjasto.fi/extra/marc21/bib/"+ urlInfo.formatField + ".htm#" + field;
  } else if (type === "sovellusohjeisbd") {
    return "https://wiki.helsinki.fi/pages/viewpage.action?pageId=" + urlInfo.pageId + (urlInfo.anchor ? urlInfo.anchor + field : "");
  } else if (type === "sovellusohjerda") {
    return "https://www.kiwi.fi/pages/viewpage.action?pageId=" + urlInfo.rdaPageId + (urlInfo.anchor ? urlInfo.anchor + field : "");
  }
}

function getUrlData() {
  return [
	  {"formatField": "000", "firstCode": 0, "lastCode": 0, "pageId": "28195289", "rdaPageId": "51282124", "anchor": false},
      {"formatField": "001-006", "firstCode": 1, "lastCode": 6, "pageId": "28195301", "rdaPageId": "51282125", "anchor": false},
      {"formatField": "007", "firstCode": 7, "lastCode": 7, "pageId": "28195745", "rdaPageId": "51282132", "anchor": false},
      {"formatField": "008", "firstCode": 8, "lastCode": 8, "pageId": "28195750", "rdaPageId": "51282049", "anchor": false},
      {"formatField": "01X-04X", "firstCode": 10, "lastCode": 49, "pageId": "28195782", "rdaPageId": "51282032", "anchor": "#id-6.Numero-jakoodikentät(01X-04X)-"},
      {"formatField": "05X-08X", "firstCode": 50, "lastCode": 89, "pageId": "28201092", "rdaPageId": "51282131", "anchor": false},
      {"formatField": "1XX", "firstCode": 100, "lastCode": 199, "pageId": "28201245", "rdaPageId": "51282046", "anchor": "#id-8.Pääkirjauskentät(1XX)-"},
      {"formatField": "20X-24X", "firstCode": 200, "lastCode": 249, "pageId": "28201255", "rdaPageId": "51282044", "anchor": "#id-9.Nimeke-janimekkeeseenliittyvätkentät(20X-24X)-"},
      {"formatField": "250-270", "firstCode": 250, "lastCode": 270, "pageId": "28201803", "rdaPageId": "51282130", "anchor": "#id-10.Julkaisu-jajakelutietojenjne.kentät(250-270)-"},
      {"formatField": "3XX", "firstCode": 300, "lastCode": 399, "pageId": "28201880", "rdaPageId": "51282054", "anchor": "#id-11.Fyysisenkuvailunjne.kentät(3XX)-"},
      {"formatField": "4XX", "firstCode": 400, "lastCode": 499, "pageId": "28202275", "rdaPageId": "51282126", "anchor": false},
      {"formatField": "50X-53X", "firstCode": 500, "lastCode": 535, "pageId": "28202285", "rdaPageId": "51282051", "anchor": "#id-13.Huomautuskentät,osa1(50X-53X)-"},
      {"formatField": "53X-58X", "firstCode": 536, "lastCode": 599, "pageId": "28202292", "rdaPageId": "51282059", "anchor": "#id-14.Huomautuskentät,osa2(53X-59X)-"},
      {"formatField": "6XX", "firstCode": 600, "lastCode": 699, "pageId": "28202299", "rdaPageId": "51282133", "anchor": "#id-15.Asiasanakentät(6XX)-"},
      {"formatField": "70X-75X", "firstCode": 700, "lastCode": 759, "pageId": "28202301", "rdaPageId": "51282134", "anchor": "#id-16.Lisäkirjauskentät(70X-75X)-"},
      {"formatField": "76X-78X", "firstCode": 760, "lastCode": 799, "pageId": "28202303", "rdaPageId": "51282062", "anchor": "#id-17.Linkkikentät(76X-79X)-"},
      {"formatField": "80X-830", "firstCode": 800, "lastCode": 830, "pageId": "28202305", "rdaPageId": "51282135", "anchor": "#id-18.Sarjalisäkirjauskentät(80X-830)-"},
      {"formatField": "841-88X", "firstCode": 841, "lastCode": 899, "pageId": "28202307", "rdaPageId": "51282070", "anchor": "#id-19.Varasto-jasijainti-ym.tietojenkentät(841-88X)-"},
      {"formatField": "9XX", "firstCode": 900, "lastCode": 999, "pageId": "28203469", "rdaPageId": "51282136", "anchor": "#id-20.Suomalaisetkentät(9XX)-"}
  ];
}

function processInput(data) {
  if (containsNumbers(data.value) && !containsAlphabeticalCharacters(data.value)) {
    if (data.ohjeet) {
      const urlData = getUrlData();
      if (data.selection === "MARC 21") {
        splitInput(data.value)
          .map(field => parseMARC21Url(field, "marc21", urlData))
          .map(redirect);
      } else if (data.selection === "MARC 21 Full (LOC)") {
        splitInput(data.value)
          .map(field => parseLOCMARCUrl(field))
          .map(redirect);
      } else if (data.selection === "MARC 21 sovellusohje (RDA)") {
        splitInput(data.value)
          .map(field => parseMARC21Url(field, "sovellusohjerda", urlData))
          .map(redirect);
      } else if (data.selection === "MARC 21 sovellusohje (ISBD)") {
        splitInput(data.value)
          .map(field => parseMARC21Url(field, "sovellusohjeisbd", urlData))
          .map(redirect);
      }
    } else {
      if (data.selection === "Melinda") {
        parseMelindaURL(data.value).map(redirect);
      } else if (data.selection === "Fennica") {
        parseFennicaURL(data.value).map(redirect);
	  } else {
        parseFinnaURL(data.selection, data.value).map(redirect);
      }
    }
  } else {
    unrecognizedValue();
  }
}

function getFinnaData(database) {
  const data = {
    "Aalto-yliopisto": {"tag": "aalto", "db": "alli"},
    "Helka": {"tag": "helka", "db": "helka"},
    "HAMK": {"tag": "hamk", "db": "vanaicat"},
    "Itä-Suomen yliopisto": {"tag": "uef", "db": "josku"},
    "Jyväskylän yliopisto": {"tag": "jyu", "db": "jykdok"},
    "Jyväskylän ammattikorkeakoulu": {"tag": "janet", "db": "janet"},
    "Lapin korkeakoulukirjasto": {"tag": "luc", "db": "vaari"},
    "Lappeenrannan tiedekirjasto": {"tag": "wilma", "db": "wilma"},
    "Laurea-ammattikorkeakoulu": {"tag": "laurea", "db": "laurus"},
    "Kaakkois-Suomen amk": {"tag": "kaakkuri", "db": "kaakkuri"},
    "Kajaanin ammattikorkeakoulu": {"tag": "kamk", "db": "kajakki"},
    "Karelia-ammattikorkeakoulu": {"tag": "karelia", "db": "joel"},
    "Oulun yliopisto": {"tag": "oula", "db": "oula"},
    "Hanken": {"tag": "hanken", "db": "hanna"},
    "Taideyliopisto": {"tag": "uniarts", "db": "arsca"},
    "Tampereen yliopisto": {"tag": "tamcat", "db": "tamcat"},
    "Tritonia": {"tag": "tritonia", "db": "tria"},
    "Turun yliopisto": {"tag": "utu", "db": "volter"},
    "Åbo Akademi": {"tag": "abo", "db": "alma"},
    "Arcada": {"tag": "arcada", "db": "arken"},
    "Centria": {"tag": "centria", "db": "colibri"},
    "DIAK": {"tag": "diak", "db": "diana"},
    "Haaga-Helia": {"tag": "haagahelia", "db": "haltia"},
    "Humak": {"tag": "humak", "db": "hurma"},
    "Metropolia": {"tag": "metropolia", "db": "metcat"},
    "OAMK": {"tag": "oamk", "db": "leevi"},
    "LAMK": {"tag": "masto", "db": "masto"},
    "SAMK": {"tag": "samk", "db": "tyrni"},
    "Savonia": {"tag": "savonia", "db": "aapeli"},
    "SeAMK": {"tag": "seamk", "db": "plari"},
    "TAMK": {"tag": "tamk", "db": "oma"},
    "Turku AMK": {"tag": "tuamk", "db": "aura"},
    "Turun kaupunginkirjasto": {"tag": "vaski", "db": "vaski"}
    };
  return data[database];
}

const splitInput = (query) => query.indexOf(",") > -1 ? query.trim().split(",") : query.trim().split(" ");

const parseMelindaURL = (query) => splitInput(query).map(id => `http://melinda.kansalliskirjasto.fi/byid/${id.trim()}`);

const parseFennicaURL = (query) => splitInput(query).map(id => `http://fennica.linneanet.fi/vwebv/holdingsInfo?bibId=${id.trim()}`);

function parseFinnaURL(database, query) {
  const dbdata = getFinnaData(database);
  return splitInput(query).map(id => `https://${dbdata.tag}.finna.fi/Record/${dbdata.db}.${id.trim()}`);
}

const parseLOCMARCUrl = (field) => `http://www.loc.gov/marc/bibliographic/bd${parseMARCField(field)}.html`;

const unrecognizedValue = () => alert("Virheellinen syöte.");

const containsNumbers = (input) => /[0-9]/.test(input);

const containsAlphabeticalCharacters = (input) => /[a-zäöå]/i.test(input);

const parseMARCField = (field) => "0".repeat(3 - field.length) + field; // Parse MARC codes into three-digit format

const redirect = (parsedUrl) => { if (parsedUrl.indexOf("http") > -1) chrome.tabs.create({url: parsedUrl}) };

export default processInput
