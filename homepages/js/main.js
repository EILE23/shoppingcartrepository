let saveData = JSON.parse(window.localStorage.getItem("data")) || [];
let shoppingcart = JSON.parse(window.localStorage.getItem("shopping")) || [];
const querydata = new URLSearchParams(window.location.search);
const ct = querydata.get("ct");
if (saveData.length > 0) createbox(saveData, ct);
else {
  const mainwrap = document.querySelector(".boxbox");
  mainwrap.innerHTML = `데이터가 없어요`;
}

const dropdownmenu = document.querySelector(".dropdownmenu");
dropdownmenu.innerHTML = `<li onclick="clickcate('all')">전체</li>`;

let categorys = [...new Set(saveData.map((item) => item.category))];
categorys.map((item) => {
  dropdownmenu.innerHTML += `<li onclick="clickcate('${item}')">${item}</li>`;
});

function clickcate(value) {
  window.location.href = `main.html?ct=${value}`;
}

shoppingnum(shoppingcart.length);

function createbox(data, value) {
  const mainwrap = document.querySelector(".boxbox");
  mainwrap.innerHTML = "";
  if (data) {
    if (value === "all") {
      data.map((item) => {
        let numbering = Number(item.age).toLocaleString();
        mainwrap.innerHTML += `    <div class="test" onclick = "information(${item.id})">
        <img src="${item.img}" alt="..." />
        <div>${item.name}</div>
        <div>${numbering}원</div>
     `;
      });
    } else if (value !== "all") {
      const mainwrap = document.querySelector(".boxbox");
      data.map((item) => {
        if (item.category == value) {
          let numbering = Number(item.age).toLocaleString();
          mainwrap.innerHTML += `    <div class="test" onclick = "information(${item.id})">
        <img src="${item.img}" alt="..." />
        <div>${item.name}</div>
        <div>${numbering}원</div>
     `;
        }
      });
    }
  }
}
// function clickcate(value) {
//   if (value == "all") {
//     createbox(saveData, "all");
//   } else createbox(saveData, value);
// }
function information(content) {
  window.location.href = `details.html?id=${content}`;
}

function shoppingbtn() {
  window.location.href = "shoppingcart.html";
}

function shoppingnum(number) {
  document.querySelector(".circlenum").innerText = `${number}`;
}

// scroll 헤더 고정

let header = document.querySelector(".header");
let headerTop = header.offsetTop;
if (saveData.length >= 8) {
  window.addEventListener("scroll", function () {
    let sp = window.scrollY;

    if (sp >= headerTop) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}
