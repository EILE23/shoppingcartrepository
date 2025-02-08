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

function createbox(data, value) {
  const mainwrap = document.querySelector(".boxboxbox");
  mainwrap.innerHTML = ``;
  if (data) {
    if (value === "all") {
      data.map((item) => {
        let numbering = Number(item.age).toLocaleString();
        mainwrap.innerHTML += `    <div class="test">
            <div class = "imgbox"><img onclick = "information(${item.id})" class = "itemimg"src="${item.img}" alt="..." /></div>
        <div onclick = "information(${item.id})">${item.name}</div>
        <div onclick = "information(${item.id})">${numbering}원</div>
        <img onclick = "favorite(${item.id})"class = "hearticon hearticon${item.id}" src = "../daiso/hearticon.png" alt = "heart"/>
      </div>
     `;
      });
      mainwrap.innerHTML += `<div class = "pageBox"></div>`;
    } else if (value !== "all") {
      const mainwrap = document.querySelector(".boxboxbox");
      data.map((item) => {
        if (item.category == value) {
          let numbering = Number(item.age).toLocaleString();
          mainwrap.innerHTML += `    <div class="test" >
        <div class = "imgbox"><img onclick = "information(${item.id})"  class = "itemimg" src="${item.img}" alt="..." /></div>
        <div onclick = "information(${item.id})">${item.name}</div>
        <div onclick = "information(${item.id})">${numbering}원</div>
        <img onclick = "favorite(${item.id})"class = "hearticon hearticon${item.id}" data-filled="false" src = "../daiso/hearticon.png" alt = "heart"/>
    </div>
     `;
        }
      });
    }
  }
}
