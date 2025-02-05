let saveData = JSON.parse(window.localStorage.getItem("data")) || [];
// 넣으면 망함 문법 저장용
const localdata = JSON.parse(window.localStorage.getItem("data"));
console.log(saveData);
const mainwrap = document.querySelector(".main-wrap");
const imagearr = [
  "../daiso/img.jpg",
  "../daiso/img1.jpg",
  "../daiso/img2.jpg",
  "../daiso/img3.jpg",
  "../daiso/img4.jpg",
  "../daiso/img5.jpg",
  "../daiso/img6.jpg",
  "../daiso/img7.jpg",
  "../daiso/img8.jpg",
  "../daiso/img9.jpg",
  "../daiso/img10.jpg",
  "../daiso/img11.jpg",
  "../daiso/img12.jpg",
  "../daiso/img13.jpg",
  "../daiso/img14.jpg",
  "../daiso/img15.jpg",
];
let randomnum = 0;
mainwrap.innerHTML = `<table border = "1" class="tablewrap">
      <tr>
      <th>아이디</th>
        <th>이름</th>
        <th>가격</th>
        <th>설명</th>
        <th>관리</th>
      </tr>
    </table>`;

if (localdata) {
  createtable(localdata);
}
//<img class = "img" src = "${imagearr[randomnum]}" alt = "..."/>
function createtable(content) {
  const mainwrap = document.querySelector(".main-wrap");

  mainwrap.innerHTML = `<table border = "1" class="tablewrap">
        <tr>
        <th>아이디</th>
          <th>이름</th>
          <th>가격</th>
          <th>설명</th>
          <th>관리</th>
        </tr>
      </table>`;
  const tablewrap = document.querySelector(".tablewrap");
  if (content) {
    content.map((item) => {
      const numbering = Number(item.age).toLocaleString();
      tablewrap.innerHTML += `
    <tr class = "tr${item.id}">
    <td class = "id${item.id}"><img class = "img" src = "${item.img}" alt = "..."/></td>
      <td class = "name${item.id}">${item.name}</td><td class = "age${item.id}">${numbering}</td><td class = "his${item.id}">${item.history}</td>
  <td class = "btnbox"><button class = "buttonb buttons${item.id}" onclick = "cor(${item.id})">수정</button><button class = "buttonb buttonr${item.id} none" onclick = "cord(${item.id})">수정완료</button><button class = "buttonb removebtn${item.id}"onclick = "remove(${item.id})">삭제</button></td>
    </tr>`;
      document.querySelector(`.id${item.id}`).src;
    });
  } else content.innerHTML = "";
}
// id를 가진 history를 찾은 뒤에
// 그 history 박스 안에 input 생성후 input안에 기존 history값 넣은 뒤 keydown enter 하면 값이 들어가도록..??

// // // // // // // 삭제

function remove(content) {
  saveData.map((item, i) => {
    if (item.id == content) {
      console.log(saveData.splice(i, 1));
    }
  });
  window.localStorage.setItem("data", JSON.stringify(saveData));
  document.querySelector(`.tr${content}`).remove();
}
// // // // // // //  수정 값에서 input 생성시 input 속성에 넣을거
function cord(item) {
  const tdname = document.querySelector(`.name${item}`);
  const tdage = document.querySelector(`.age${item}`);
  const tdhis = document.querySelector(`.his${item}`);
  const inname = document.querySelector(`.inname${item}`);
  const inage = document.querySelector(`.inage${item}`);
  const inhis = document.querySelector(`.inhis${item}`);
  const btnid1 = document.querySelector(`.buttons${item}`);
  const btnid2 = document.querySelector(`.buttonr${item}`);

  const localdata = JSON.parse(window.localStorage.getItem("data"));
  let dataid = "";
  localdata.map((cem) => {
    if (cem.id == item) {
      dataid = cem;
    }
  });
  if (inhis.value.length > 3 && inage.value > 10) {
    localdata.map((iten, i) => {
      if (iten.id == dataid.id) {
        localdata[i].name = inname.value;
        localdata[i].age = inage.value;
        localdata[i].history = inhis.value;
        window.localStorage.setItem("data", JSON.stringify(localdata));
      }
    });
    btnid1.classList.remove("none");
    btnid2.classList.add("none");
    console.log(dataid);
    tdname.innerHTML = `${inname.value}`;
    tdage.innerHTML = `${inage.value}`;
    tdhis.innerHTML = `${inhis.value}`;
  } else if (inage.value < 10) {
    alert("가격이 너무 낮습니다");
    return;
  } else if (inhis.value.length <= 3) {
    alert("설명이 너무 짧습니다");
    return;
  }
}
// // // // // // // onclick 수정
let buttonnumber = 0;
function onlynumber(item, ptag) {
  const inage = document.querySelector(`.inage${item}`);
  const inhis = document.querySelector(`.inhis${item}`);
  if (ptag == "his") {
    const phis = document.querySelector(`.phis${item}`);
    if (inhis.value.length <= 3 && inhis.value.length >= 1) {
      console.log(inhis.value);

      phis.textContent = "설명이 너무 짧습니다";
    } else if (inhis.value == "") phis.textContent = "";
    else phis.textContent = "";
  }
  if (ptag == "age") {
    const page = document.querySelector(`.page${item}`);
    if (Number(inage.value) < 10) {
      page.textContent = "가격가 너무 낮습니다";
    } else if (inage.value.trim() == "") page.textContent = "";
    else page.textContent = "";
  }
}
function cor(item) {
  const tdname = document.querySelector(`.name${item}`);
  const tdage = document.querySelector(`.age${item}`);
  const tdhis = document.querySelector(`.his${item}`);
  const btnid1 = document.querySelector(`.buttons${item}`);
  const btnid2 = document.querySelector(`.buttonr${item}`);
  btnid1.classList.add("none");
  btnid2.classList.remove("none");
  const localdata = JSON.parse(window.localStorage.getItem("data"));
  let dataid = "";
  localdata.map((cem) => {
    if (cem.id == item) {
      dataid = cem;
    }
  });

  tdname.innerHTML = `<input class = "ininput inname${item}"value = "${dataid.name}" )"><p></p>`;
  tdage.innerHTML = `<input type = "number" oninput = "onlynumber(${item},'age')" class = "ininput inage${item}" value = "${dataid.age}"><p class = "page${item}"></p>`;
  tdhis.innerHTML = `<input class = "ininput inhis${item}" oninput = "onlynumber(${item}, 'his')" value = "${dataid.history}"><p class = "phis${item}"></p>`;
}
// onblur = "inputout(${item}
let num = 0;
// function notext(content, index) {
//   index.map((item, i) => {
//     if (item == "") [i].innerHTML = "값을 입력해주세요";
//   });
// }
const idtext = document.querySelector(".id-text");
const agetext = document.querySelector(".age-text");
const nametext = document.querySelector(".name-text");
const historytext = document.querySelector(".history-text");
function nonetext() {
  idtext.classList.add("none");
  agetext.classList.add("none");
  nametext.classList.add("none");
  historytext.classList.add("none");
}
const textarr = [idtext, nametext, agetext, historytext];

// // // // // // // //

function nonebutton() {
  document.querySelector(".buttonc").disabled = true;
}
const IID = document.querySelector(".input-id");
const NName = document.querySelector(".input-name");
const AAge = document.querySelector(".input-age");
const HHistory = document.querySelector(".input-history");
const inputarr2 = [IID, NName, AAge, HHistory];

// inputarr2.forEach((item) => {
//   item.addEventListener("keyup", () => {
//     if (!item.value) {
//       document.querySelector(".buttonc").disabled = true;
//     }
//   });
// });

// // // // // // // //

function textprint1() {
  const IID = document.querySelector(".input-id").value;
  const NName = document.querySelector(".input-name").value;
  const AAge = document.querySelector(".input-age").value;
  const HHistory = document.querySelector(".input-history").value;
  const LLocaldata = JSON.parse(window.localStorage.getItem("data"));
  let checkid = 1;
  let opener = false;
  let opener1 = false;
  let opener2 = false;
  let opener3 = false;
  let opener4 = false;
  if (LLocaldata) {
    const idcheck = LLocaldata.some((item) => item.id === IID);
    if (idcheck) {
      checkid = 0;
    } else {
      checkid = 1;
    }
  }
  let checkhis = HHistory.length;
  if (Number(IID)) opener = true;
  else opener = false;
  if (Number(AAge) > 10 && Number(AAge) >= 1) opener1 = true;
  else opener1 = false;
  if (checkhis > 3) opener2 = true;
  else opener2 = false;
  if (checkid >= 1) opener3 = true;
  else opener3 = false;
  // checknickname >= 1 &&
  if (NName.length >= 1) opener4 = true;
  else opener4 = false;
  if (opener && opener1 && opener2 && opener3 && opener4) {
    document.querySelector(".buttonc").disabled = false;
  }
  if (!opener || !opener1 || !opener2 || !opener3 || !opener4) {
    document.querySelector(".buttonc").disabled = true;
  }
  console.log(opener, opener1, opener2, opener3, opener4);
}

// // // // // // // //
let number = 0;
function textprint(item) {
  const IID = document.querySelector(".input-id").value;
  const NName = document.querySelector(".input-name").value;
  const AAge = document.querySelector(".input-age").value;
  const HHistory = document.querySelector(".input-history").value;
  let idcheck = true;
  // const inputarr2 = [IID, NName, AAge, HHistory, NNickname];
  const LLocaldata = JSON.parse(window.localStorage.getItem("data"));
  if (LLocaldata && item == "id") {
    const idcheck = LLocaldata.some((item) => item.id === IID);
    if (idcheck) {
      idtext.classList.remove("none");
      idtext.textContent = "중복 아이디입니다";
      console.log(idcheck);
    } else {
      idtext.classList.add("none");
      idtext.textContent = "";
    }
  } else if ((!isNaN(IID) && item == "id") || IID.length == 0) {
    idtext.classList.add("none");
    idtext.textContent = "";
    idcheck = true;
  } else if (isNaN(IID) && item == "id" && IID.length >= 1) {
    idtext.classList.remove("none");
    idtext.textContent = "아이디는 숫자만 가능합니다.";
    idcheck = false;
  }
  // let number = 0;
  // HHistory.split("").map((item, i) => {
  //   number = i;
  // });
  if (Number(AAge) < 10 && item == "age") {
    agetext.classList.remove("none");
    agetext.textContent = "가격이 너무 낮습니다";
  }
  if (Number(AAge) >= 10 && item == "age") {
    agetext.classList.add("none");
    agetext.textContent = "";
  }
  if (HHistory.length <= 3 && item == "history") {
    historytext.classList.remove("none");
    historytext.textContent = "길이가 짧습니다.";
  }
  if ((HHistory.length > 3 && item == "history") || HHistory.length == 0) {
    historytext.classList.add("none");
    historytext.textContent = "";
  }
}
//includes(값) -> 값이 있는지 확인 가능 있으면 true 없으면 false => boolean 반환
// // // // // // // //

// 데이터 넘겨주는 함수
function saveddata(inputID, inputName, inputAge, inputHistory, inputcategory) {
  // const saveData = window.localStorage.getItem("savedata");
  randomnum = Math.floor(Math.random() * 16); //

  const Datasave = {
    id: inputID,
    name: inputName,
    age: inputAge,
    history: inputHistory,
    img: imagearr[randomnum],
    category: inputcategory,
  };

  saveData.push(Datasave);
  // const localdata = JSON.parse(window.localStorage.getItem("data"));
  window.localStorage.setItem("data", JSON.stringify(saveData));

  const localdata = JSON.parse(window.localStorage.getItem("data"));
  const tablewrap = document.querySelector(".tablewrap");
  tablewrap.innerHTML = "";
  createtable(localdata);
}

// 데이터 버튼 클릭시
function savedata() {
  let open = false;
  const inputID = document.querySelector(".input-id").value;
  const inputName = document.querySelector(".input-name").value;
  const inputAge = document.querySelector(".input-age").value;
  const inputHistory = document.querySelector(".input-history").value;

  const inputarr = [inputID, inputName, inputAge, inputHistory];
  inputarr.forEach((item, i) => {
    if (item === "") {
      textarr[i].classList.remove("none");
      textarr[i].textContent = "값을 입력해주세요.";
      setTimeout(nonetext, 3000);
      open = true;
    }
  });
  let number = 0;
  inputHistory.split("").map((item, i) => {
    number = i;
  });
  if (number < 3 && number >= 1) {
    historytext.classList.remove("none");
    historytext.textContent = "설명이 너무 짧습니다.";
    setTimeout(nonetext, 3000);
    open = true;
  }
  if (!Number(inputID)) {
    idtext.classList.remove("none");
    idtext.textContent = "아이디는 숫자만 가능합니다.";
    setTimeout(nonetext, 3000);
    open = true;
  }
  // console.log(localdata.id);
  const LLocaldata = JSON.parse(window.localStorage.getItem("data"));
  if (LLocaldata) {
    LLocaldata.map((item) => {
      if (item.id === Number(inputID)) {
        idtext.classList.remove("none");
        idtext.textContent = "중복 아이디입니다.";
        setTimeout(nonetext, 3000); //3초간만 나타나게
        open = true;
      }
    });
  }

  if (open) return console.log("오류");

  if (open === false) {
    const inputcategory = document.querySelector(
      'input[name="A"]:checked'
    ).value;
    console.log(inputcategory);
    saveddata(inputID, inputName, inputAge, inputHistory, inputcategory); //데이터 담아서 다른 함수로 넘겨줌
    document.querySelector(".input-id").value = "";
    document.querySelector(".input-name").value = "";
    document.querySelector(".input-age").value = "";
    document.querySelector(".input-history").value = "";
    document.querySelector(".buttonc").disabled = true;
  }
}
// 등록 버튼 클릭시
function loocation() {
  window.location.href = `main.html?ct=${"all"}`;
}

function downloadCSV() {
  // var array = [];
  // array.push({name:"name1", age: 20, test: "test1"});
  // array.push({name:"name2", age: 22, test: "test2"});
  // array.push({name:"name3", age: 24, test: "test3"});

  var a = "";
  // $.each(array, function(i, item){
  //   a += item.name + "," + item.age + "," + item.test + "\r\n";
  // });

  // jquery 사용하지 않는 경우
  a +=
    "ID" +
    "," +
    "name" +
    "," +
    "price" +
    "," +
    "상세설명" +
    "," +
    "이미지 경로" +
    "," +
    "카테고리" +
    "\r\n";
  if (saveData.length > 0) {
    for (var i = 0; i < saveData.length; i++) {
      a +=
        saveData[i].id +
        "," +
        saveData[i].name +
        "," +
        saveData[i].age +
        "," +
        saveData[i].history +
        "," +
        saveData[i].img +
        "," +
        saveData[i].category +
        "\r\n";
    }
  } else {
    a += "데이터가 없습니다" + ",";
  }
  var downloadLink = document.createElement("a");
  var blob = new Blob([a], { type: "text/csv;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "메뉴 데이터.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
