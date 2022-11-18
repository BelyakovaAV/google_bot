// ==UserScript==
// @name         Google Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for Google
// @author       Belyakova Anastasiya
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let btnK = document.getElementsByName("btnK")[0];

let sites = {
  "napli.ru":["Установка и настройка Git", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", 	"Вывод произвольных типов записей и полей в WordPress"],
  "kiteuniverse.ru":["Kite Universe", "Ветровые арт инсталляции", "Фестиваль воздушных змеев"],
  "motoreforma.com":["Мотореформа", "прошивки для CAN-AM", "тюнинг для квадроциклов CAN-AM", "вариатор CV-Tech для Can-Am"]
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let googleInput = document.getElementsByName("q")[0];

if (btnK !== undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.google.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

if (btnK !== undefined) {
  let i = 0;
  let timerId = setInterval (()=> {
    googleInput.value += keyword[i];
    i++;
    if(i == keyword.length) {
      clearInterval(timerId);
      btnK.click();
    }
  },300)


  } else if (location.hostname == site) {
    //console.log("Мы на целевом сайте!");
    setInterval(() =>{
      let index = getRandom(0, links.length);
      if (getRandom(0,101) > 70) {
        location.href = "https://www.google.com/";
      }
      if (links[index].href.indexOf(site) !== -1) links[index].click();
    }, getRandom(3000,5000));
  } else {
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.indexOf(site) !== -1) {
        let link = links[i];
        nextGooglePage = false;
        console.log("Нашел строку " + link);
        setTimeout(()=>{
          link.click();
        }, getRandom(2000,3000));
        break;
      }
    }
    let elementExist = setInterval(()=>{
      let elem = document.querySelector(".YyVfkd");
      if (elem != null) {
        if(elem.innerText == "5") {
          nextGooglePage = false;
          location.href = "https://www.google.com/";
        }
        clearInterval (elementExist)
      }
    },400);

if (nextGooglePage) {
  setTimeout(()=>{
    pnnext.click();
  }, getRandom(3000, 4000))
}
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


