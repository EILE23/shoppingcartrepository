let saveData = JSON.parse(window.localStorage.getItem("data")) || [];
let shoppingcart = JSON.parse(window.localStorage.getItem("shopping")) || [];
const querydata = new URLSearchParams(window.location.search);
const ct = querydata.get("ct"); // 드롭다운 메뉴 쿼리값
let toggle = true;

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

// 드롭다운 메뉴 클릭시
function clickcate(value) {
  window.location.href = `main.html?ct=${value}`;
}

// 버튼 클릭시
function clickcate2(value) {
  createbox(saveData, value);
}

shoppingnum(shoppingcart.length); //페이지 로딩시 장바구니에 로컬스트리지에 담긴 배열의 길이로 숫자 표기

// 데이터로 메뉴 만드는 함수 value는 table.js에서 카테고리 값을 의미
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
        <div onclick = "information(${item.id})">${numbering}원</div><img onclick = "favorite(${item.id})"class = "hearticon hearticon${item.id}" src = "../daiso/hearticon.png" alt = "heart"/>
      </div>
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
          mainwrap.innerHTML += `    <div class="test" >
        <div class = "imgbox"><img onclick = "information(${item.id})"  class = "itemimg" src="${item.img}" alt="..." /></div>
        <div onclick = "information(${item.id})">${item.name}</div>
        <div onclick = "information(${item.id})">${numbering}원</div>
        <img onclick = "favorite(${item.id})"class = "hearticon hearticon${item.id}" data-filled="false" src = "../daiso/hearticon.png" alt = "heart"/>
    </div>
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
      }, 0); // 드롭다운 메뉴에서 상세메뉴 누르면 버튼도 같이 활성화가 되도록 하는 장치
    }
  }
}
// 버튼 활성화
const btnarr = document.querySelectorAll(".btn");

btnarr.forEach((item) => {
  item.addEventListener("click", () => {
    // 버튼을 클릭하면
    function btnclickimg() {
      btnarr.forEach((btn) => {
        //위에 btnarr중에서 class btnclick을 모두 제거
        btn.classList.remove("btnclick");
      });
      item.classList.add("btnclick"); //클릭된 버튼만 class btnclick 추가
    }
    btnclickimg(); // 함수 호출
  });
});
// function clickcate(value) {
//   if (value == "all") {
//     createbox(saveData, "all");
//   } else createbox(saveData, value);
// }
function information(content) {
  window.location.href = `details.html?id=${content}`; //정보 클릭시
}

function shoppingbtn() {
  window.location.href = "shoppingcart.html"; // 장바구니 버튼 클릭시
}

function shoppingnum(number) {
  document.querySelector(".circlenum").innerText = `${number}`; //장바구니 넘버링
}

// heart 토글
function favorite(id) {
  const heartIcon = document.querySelector(`.hearticon${id}`);
  const isFilled = heartIcon.getAttribute("data-filled") === "true";

  if (isFilled) {
    heartIcon.src = "../daiso/hearticon.png";
    heartIcon.setAttribute("data-filled", "false");
  } else {
    heartIcon.src = "../daiso/hearticonfill.png";
    heartIcon.setAttribute("data-filled", "true");
  }
}

function reload() {
  window.location.href = `main.html?ct=${"all"}`;
}
