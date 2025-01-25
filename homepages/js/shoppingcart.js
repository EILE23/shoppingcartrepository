const saveData = JSON.parse(window.localStorage.getItem("data")) || [];
const shopping = JSON.parse(window.localStorage.getItem("shopping")) || [];

createbox(shopping);

// header
const dropdownmenu = document.querySelector(".dropdownmenu");
dropdownmenu.innerHTML = `<li onclick="clickcate('all')">전체</li>`;

let categorys = [...new Set(saveData.map((item) => item.category))];
categorys.map((item) => {
  dropdownmenu.innerHTML += `<li onclick="clickcate('${item}')">${item}</li>`;
});

function clickcate(value) {
  window.location.href = `main.html?ct=${value}`;
}

let mnumber = shopping.length;
console.log(mnumber);

function createbox(data) {
  const mainwrap = document.querySelector(".main-container");
  mainwrap.innerHTML = "";
  if (data.length >= 1) {
    data.map((item, index) => {
      mainwrap.innerHTML += `    <div class="test box box${item.id}">
        <div><img class = "imgshop"src="${item.img}" alt="..." /></div>
        <div class="subbox">
          <div>${item.name}</div>
          <div class = "price${item.id}">${item.age * item.cnt}원</div>
          <div class = "plusminus"><img onclick = "plus(${index})" class = "icon" src ="../daiso/addicon.png" alt = "..."/><span class ="sp${
        item.id
      }">${
        item.cnt
      }</span><img onclick = "minus(${index})"class = "icon" src ="../daiso/removeicon.png" alt = "..."/>
        </div>
      <button class = "info" onclick = "information(${
        item.id
      })">정보</button><button class = "remove" onclick = "removeBtn(${index})">삭제</button></div>`;
    });
  } else mainwrap.innerHTML = `<div class = "tung">장바구니가 비었어요.</div>`;
}

function removeBtn(index) {
  shopping.splice(index, 1);

  window.localStorage.setItem("shopping", JSON.stringify(shopping));
  //document.querySelector(`.box${saveData[index].id}`).remove();

  const Data = JSON.parse(window.localStorage.getItem("shopping"));

  createbox(Data);
}

// 상세페이지 이동
function information(content) {
  window.location.href = `details.html?id=${content}`;
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
function plus(i) {
  const spanText = document.querySelector(`.sp${shopping[i].id}`);
  const divText = document.querySelector(`.price${shopping[i].id}`);
  shopping[i].cnt++;
  window.localStorage.setItem("shopping", JSON.stringify(shopping));
  spanText.innerHTML = `${shopping[i].cnt}`;
  divText.innerHTML = `${shopping[i].age * shopping[i].cnt}원`;
}
function minus(i) {
  if (shopping[i].cnt > 1) {
    const spanText = document.querySelector(`.sp${shopping[i].id}`);
    const divText = document.querySelector(`.price${shopping[i].id}`);
    shopping[i].cnt--;
    window.localStorage.setItem("shopping", JSON.stringify(shopping));
    spanText.innerHTML = `${shopping[i].cnt}`;
    divText.innerHTML = `${shopping[i].age * shopping[i].cnt}원`;
  } else return;
}
