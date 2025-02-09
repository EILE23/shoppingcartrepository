let saveData = JSON.parse(window.localStorage.getItem("data")) || [];
let shoppingcart = JSON.parse(window.localStorage.getItem("shopping")) || [];
const querydata = new URLSearchParams(window.location.search);
const ct = querydata.get("ct"); // 드롭다운 메뉴 쿼리값
let pageNumber = 1;
let pageGroup = 5;
let dataBox = [];
let BTN = "";

const dropdownmenu = document.querySelector(".dropdownmenu");
const btnbox = document.querySelector(".boxbtnbox");
dropdownmenu.innerHTML = `<li onclick="clickcate2('all')">전체</li>`;
btnbox.innerHTML = `<div onclick="clickcate2('all')" class = "btn bt${"all"}">all</div>`;
const categorys = ["생필품", "사무용품", "문구팬시", "주방용품"];

window.onload = function () {
  if (ct) {
    clickcate2(ct);
  } else {
    clickcate2("all");
  }
  shoppingnum();
};

categorys.map((item) => {
  btnbox.innerHTML += `<div onclick="clickcate2('${item}')" class = "btn bt${item}">${item}</div>`;
  dropdownmenu.innerHTML += `<li onclick = "clickcate2('${item}')">${item}</li>`;
});

function createbox(data) {
  const mainwrap = document.querySelector(".boxboxbox");
  mainwrap.innerHTML = ``;
  if (data) {
    data.map((item) => {
      let numbering = Number(item.age).toLocaleString();
      mainwrap.innerHTML += `<div class="test">
            <div class = "imgbox"><img onclick = "information(${item.id})" class = "itemimg"src="${item.img}" alt="..." /></div>
        <div onclick = "information(${item.id})">${item.name}</div>
        <div onclick = "information(${item.id})">${numbering}원</div>
        <img onclick = "favorite(${item.id})"class = "hearticon hearticon${item.id}" src = "../daiso/hearticon.png" alt = "heart"/>
      </div>
     `;
    });
  }
}

const pagination = (data, pageNumber) => {
  let number = (pageNumber - 1) * 10;
  let total = Math.ceil(data.length / 10);
  let group = Math.ceil(total / pageGroup);
  let current = Math.ceil(pageNumber / pageGroup);

  let start = (current - 1) * 5 + 1;
  let end = current * 5 < total ? current * 5 : total;

  if (data.length > 10) {
    document.querySelector(".pageBox").style.display = "flex";
    const pageData = data.slice(number, number + 10);
    createbox(pageData);
  } else {
    document.querySelector(".pageBox").style.display = "none";
    createbox(data);
  }

  const pageBox = document.querySelector(".pageBtninbox");

  pageBox.innerHTML = "";

  for (let i = start; i <= end; i++) {
    pageBox.innerHTML += `<span onclick = "numberclick(${i})" class = "pageBtnn">${i}</span>`;
  }

  if (current === 1) {
    document.querySelector(".pageLeft").disabled = true;
  } else {
    document.querySelector(".pageLeft").disabled = false;
  }
  if (current === group) {
    document.querySelector(".pageRight").disabled = true;
  } else {
    document.querySelector(".pageRight").disabled = false;
  }
};

function pageLeft() {
  pageNumber -= 1;
  numberclick(pageNumber);
}

function pageRight() {
  pageNumber += 1;
  numberclick(pageNumber);
}

function clickcate2(category) {
  pageNumber = 1;
  if (category === "all") {
    dataBox = saveData;
  } else {
    dataBox = saveData.filter((item) => item.category === category);
  }
  BTN = category;
  pagination(dataBox, pageNumber);
  const btnBox = document.querySelectorAll(".btn");
  btnBox.forEach((item) => item.classList.remove("btnclick"));
  document.querySelector(`.bt${category}`).classList.add("btnclick");
}

function numberclick(num) {
  pageNumber = num;
  if (BTN === "all") {
    pagination(saveData, pageNumber);
  } else {
    dataBox = saveData.filter((item) => item.category === BTN);
    pagination(dataBox, pageNumber);
  }
}

function shoppingnum() {
  document.querySelector(".circlenum").innerText =
    `${shoppingcart.length}` || 0;
}

function information(item) {
  window.location.href = `details.html?id=${item}`;
}

function shoppingbtn() {
  window.location.href = "shoppingcart.html";
}
function reload() {
  window.scrollTo(0, 0);
}
