let saveData = JSON.parse(window.localStorage.getItem("data")) || [];
let shoppingcart = JSON.parse(window.localStorage.getItem("shopping")) || [];
const querydata = new URLSearchParams(window.location.search);
const ct = querydata.get("ct");

const dropdownmenu = document.querySelector(".dropdownmenu");
const btnbox = document.querySelector(".boxbtnbox");
dropdownmenu.innerHTML = `<li onclick="clickcate('all')">전체</li>`;
btnbox.innerHTML = `<div onclick="clickcate2('all')" class = "btn bt${"all"}">all</div>`;

if (saveData.length > 0) createbox(saveData, ct || "all");
else {
  const mainwrap = document.querySelector(".boxbox");
  mainwrap.innerHTML = `데이터가 없어요`;
}
// new Set 배열에서 이미 포함이 되어있는 아이템이면 그 다음부터 담지 않는 기능
let categorys = [...new Set(saveData.map((item) => item.category))];
categorys.map((item) => {
  dropdownmenu.innerHTML += `<li onclick="clickcate('${item}')">${item}</li>`;
  btnbox.innerHTML += `<div onclick="clickcate2('${item}')" class = "btn bt${item.replace(
    "/",
    "b"
  )}">${item}</div>`;
});

function clickcate(value) {
  window.location.href = `main.html?ct=${value}`;
}
function clickcate2(value) {
  createbox(saveData, value);
}

shoppingnum(shoppingcart.length);

function createbox(data, value) {
  const mainwrap = document.querySelector(".boxboxbox");
  mainwrap.innerHTML = ``;
  if (data) {
    if (value === "all") {
      data.map((item) => {
        let numbering = Number(item.age).toLocaleString();
        mainwrap.innerHTML += `    <div class="test" onclick = "information(${item.id})">
            <div class = "imgbox"><img src="${item.img}" alt="..." /></div>
        <div>${item.name}</div>
        <div>${numbering}원</div>
     `;
      });
      setTimeout(() => {
        if (
          document.querySelector(`.bt${"all"}`) &&
          !document.querySelector(`.bt${"all"}`).classList.contains("btnclick")
        ) {
          document.querySelector(`.bt${"all"}`).click();
        }
      }, 0);
    } else if (value !== "all") {
      const mainwrap = document.querySelector(".boxboxbox");
      data.map((item) => {
        if (item.category == value) {
          let numbering = Number(item.age).toLocaleString();
          mainwrap.innerHTML += `    <div class="test" onclick = "information(${item.id})">
        <div class = "imgbox"><img src="${item.img}" alt="..." /></div>
        <div>${item.name}</div>
        <div>${numbering}원</div>
     `;
        }
      });
      setTimeout(() => {
        const btn =
          document.querySelector(`.bt${value.replace("/", "b")}`) ||
          document.querySelector(`.bt${value}`);
        if (btn && !btn.classList.contains("btnclick")) {
          btn.click();
        }
      }, 0);
    }
  }
}
const btnarr = document.querySelectorAll(".btn");

btnarr.forEach((item) => {
  item.addEventListener("click", () => {
    function btnclickimg() {
      btnarr.forEach((btn) => {
        btn.classList.remove("btnclick");
      });
      item.classList.add("btnclick");
    }
    btnclickimg();
  });
});
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
