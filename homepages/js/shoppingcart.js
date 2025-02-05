const saveData = JSON.parse(window.localStorage.getItem("data")) || [];
let shopping = JSON.parse(window.localStorage.getItem("shopping")) || [];

createbox(shopping);

// header 드롭다운 메뉴 생성되게
const dropdownmenu = document.querySelector(".dropdownmenu");
dropdownmenu.innerHTML = `<li onclick="clickcate('all')">전체</li>`;

let categorys = [...new Set(saveData.map((item) => item.category))];
categorys.map((item) => {
  dropdownmenu.innerHTML += `<li onclick="clickcate('${item}')">${item}</li>`;
});

// 드롭다운 메뉴 클릭 함수 쿼리 주는 곳
function clickcate(value) {
  window.location.href = `main.html?ct=${value}`;
}

let mnumber = shopping.length; //배열의 길이 담아둔 변수 (굳이 안써도 됨)

// 박스 만드는 함수
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
          <div class = "plusminus">
          <img onclick = "plus(${index})" class = "icon" src ="../daiso/addicon.png" alt = "..."/>
          <span class ="sp${item.id}">${item.cnt}</span>
          <img onclick = "minus(${index})" class = "icon" src ="../daiso/removeicon.png" alt = "..."/>
        </div><div class = "btnBox2">
      <button class = "info" onclick = "information(${item.id})">정보</button>
      <button class = "remove" onclick = "removeBtn(${index})">삭제</button>
      </div>
      </div>`;
    });
    mainwrap.innerHTML += `<div class = "btnBox"><div class = "removeCart" onclick = "removeCart()">장바구니 비우기</div><div class = "payment" onclick = "payment()">결제하기</div>`;
  } else mainwrap.innerHTML = `<div class = "tung">장바구니가 비었어요.</div>`;
}

function removeBtn(index) {
  shopping.splice(index, 1); //삭제버튼 클릭시 인덱스만큼 배열에서 제거

  window.localStorage.setItem("shopping", JSON.stringify(shopping));
  //document.querySelector(`.box${saveData[index].id}`).remove(); 필요없음

  const Data = JSON.parse(window.localStorage.getItem("shopping"));

  createbox(Data);
}

function removeCart() {
  //장바구니 비우기 버튼 클릭시 빈 배열로 만들고 로컬스트리지에 저장
  shopping = [];
  window.localStorage.setItem("shopping", JSON.stringify(shopping));
  createbox(shopping);
}
// 상세페이지 이동
function information(content) {
  window.location.href = `details.html?id=${content}`;
}

// 결제하기 버튼 클릭시
function payment() {
  let price = 0;
  shopping.forEach((item) => {
    for (let j = 0; j < item.cnt; j++) {
      price += Number(item.age);
    }
  });
  Swal.fire({
    title: `총합 ${price}원 결제할까요?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "취소",
    confirmButtonText: "결제",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "미구현 기능입니다.",
        icon: "error",
        draggable: true,
      });
    }
  });
}

// 장바구니 물품 카운트
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
  } else {
    //1개 미만으로 줄이지 못하도록
    alert("그만");
    return;
  }
}
