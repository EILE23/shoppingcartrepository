let saveData = JSON.parse(window.localStorage.getItem("data")) || [];
let shoppingcart = JSON.parse(window.localStorage.getItem("shopping")) || [];
const querydata = new URLSearchParams(window.location.search);
const ct = querydata.get("ct"); // 드롭다운 메뉴 쿼리값
let saveBox = [];
let pageNumber = 1;

const dropdownmenu = document.querySelector(".dropdownmenu");
const btnbox = document.querySelector(".boxbtnbox");
dropdownmenu.innerHTML = `<li onclick="clickcate('all')">전체</li>`;
btnbox.innerHTML = `<div onclick="clickcate2('all')" class = "btn bt${"all"}">all</div>`;
const categorys = ["생필품", "사무용품", "문구팬시", "주방용품"];

window.onload = function () {
  // if (ct) {
  //   clickcate2(ct);
  // }
  pagination(saveData);
};
categorys.map((item) => {
  btnbox.innerHTML += `<div onclick="clickcate2(${item})" class = "btn bt${item}">${item}</div>`;
  dropdownmenu.innerHTML += `<li onclick = "clickcate(${item})">${item}</li>`;
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

function createPage(num) {}

let dataBox = [];
const pagination = (data, value) => {
  dataBox = [];
  let number = 0;
  let total = Math.ceil(data.length / 10);
  let group = Math.ceil(total / 5);
  let current = Math.ceil(group / current);

  let page = 1;
  let start = (group - current) * 5 + 1;
  let end = Math.min(group * 5, total);

  if (data.length > 10) {
    for (let i = 1; i <= total; i++) {
      if (total !== i) {
        dataBox[i - 1] = data.slice(number, 10);
      } else {
        dataBox[i - 1] = data.slice(number);
      }
    }
  } else {
    document.querySelector(".pageBox").display = "none";
    createbox(data);
  }

  console.log(dataBox);
};
