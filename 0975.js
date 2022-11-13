// ==UserScript==
// @name         Google Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for Google
// @author       Belyakova Anastasiya
// @match        https://www.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let btnK = document.getElementsByName("btnK")[0];
let keywords = ["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"];
let keyworld = keywords[getRandom(0, keywords.lendth)];


if (btnK !== undefined) {
  document.getElementsByName("q")[0].value = keywords;
  btnK.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") !== -1) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}



