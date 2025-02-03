const saveData = JSON.parse(window.localStorage.getItem("data")) || [];
let shoppingcart = JSON.parse(window.localStorage.getItem("shopping")) || [];
const querydata = new URLSearchParams(window.location.search);
// query 받아오기
const id = querydata.get("id");

let iddata = ""; // 받아온 값이 id와 같으면 데이터가 들어갈 함수
if (saveData) {
  saveData.map((item) => {
    if (item.id == id) {
      iddata = item;
    }
  });
  createmainwrap(iddata);
  shoppingnum(shoppingcart.length);
}

// 가져온 데이터로 아이템 만드는 함수
function createmainwrap(item) {
  const mainwrap = document.querySelector(".main-wrap");
  let numbering = Number(item.age).toLocaleString();
  mainwrap.innerHTML = `<div class ="box-wrap"><div class = "box">
  <img class = "img"src = "${item.img}" alt = "..."/>
  <div class = "name">${item.name}</div><div class = "history"><br>상품설명<br><br>${item.history}</div><div class = "age"><br>가격 :  ${numbering}원</div>
  </div><div class = "damgii" onclick = "damgiibtn(${item.id})">담기</div></div>`;
}

function damgiibtn(item) {
  Swal.fire({
    title: "장바구니에 담을까요?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "취소",
    confirmButtonText: "담기",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "담겼습니다!",
        icon: "success",
      });

      let exist = false;

      // 카트에 담겨 있을경우
      shoppingcart.map((x) => {
        if (x.id == item) {
          exist = true;
          x.cnt += 1;
        }
      });
      if (!exist) {
        //초기 생성 이면
        let dataid = "";

        saveData.map((search) => {
          if (item == search.id) {
            dataid = { ...search, cnt: 1 };
          }
        });

        shoppingcart.push(dataid);
      }
      window.localStorage.setItem("shopping", JSON.stringify(shoppingcart));
      let number = shoppingcart.length;
      shoppingnum(number);
    }
  });
}

function shoppingnum(number) {
  document.querySelector(".circlenum").innerText = `${number}`;
}
function shoppingbtn() {
  window.location.href = "shoppingcart.html";
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
