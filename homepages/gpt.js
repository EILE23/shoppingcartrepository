let saveData = JSON.parse(window.localStorage.getItem("data")) || [];

const mainwrap = document.querySelector(".main-wrap");
const idText = document.querySelector(".id-text");
const nameText = document.querySelector(".name-text");
const ageText = document.querySelector(".age-text");
const historyText = document.querySelector(".history-text");
const nicknameText = document.querySelector(".nickName-text");
const inputFields = {
  id: document.querySelector(".input-id"),
  name: document.querySelector(".input-name"),
  age: document.querySelector(".input-age"),
  history: document.querySelector(".input-history"),
  nickname: document.querySelector(".input-nickName"),
};
const textMessages = [idText, nameText, ageText, historyText, nicknameText];
const buttonCreate = document.querySelector(".buttonc");

mainwrap.innerHTML = `
  <table border="1" class="tablewrap">
    <tr>
      <th>아이디</th>
      <th>이름</th>
      <th>나이</th>
      <th>경력</th>
      <th>별명</th>
      <th>관리</th>
    </tr>
  </table>`;

if (saveData.length) {
  createTable(saveData);
}

function createTable(data) {
  const tableWrap = document.querySelector(".tablewrap");
  tableWrap.innerHTML = `
    <tr>
      <th>아이디</th>
      <th>이름</th>
      <th>나이</th>
      <th>경력</th>
      <th>별명</th>
      <th>관리</th>
    </tr>`;
  data.forEach((item) => {
    tableWrap.innerHTML += `
      <tr class="tr${item.id}">
        <td>${item.id}</td>
        <td class="name${item.id}">${item.name}</td>
        <td class="age${item.id}">${item.age}</td>
        <td class="his${item.id}">${item.history}</td>
        <td>${item.nickname}</td>
        <td>
          <button class="buttonb buttons${item.id}" onclick="editEntry(${item.id})">수정</button>
          <button class="buttonb buttonr${item.id} none" onclick="updateEntry(${item.id})">수정완료</button>
          <button class="buttonb removebtn${item.id}" onclick="removeEntry(${item.id})">삭제</button>
        </td>
      </tr>`;
  });
}

function removeEntry(id) {
  saveData = saveData.filter((item) => item.id !== id);
  window.localStorage.setItem("data", JSON.stringify(saveData));
  document.querySelector(`.tr${id}`).remove();
}

function editEntry(id) {
  const entry = saveData.find((item) => item.id === id);
  const row = document.querySelector(`.tr${id}`);

  row.querySelector(
    `.name${id}`
  ).innerHTML = `<input class="ininput inname${id}" value="${entry.name}">`;
  row.querySelector(
    `.age${id}`
  ).innerHTML = `<input type="number" class="ininput inage${id}" value="${entry.age}" oninput="validateAge(${id})">`;
  row.querySelector(
    `.his${id}`
  ).innerHTML = `<input class="ininput inhis${id}" value="${entry.history}">`;

  document.querySelector(`.buttons${id}`).classList.add("none");
  document.querySelector(`.buttonr${id}`).classList.remove("none");
}

function updateEntry(id) {
  const entryIndex = saveData.findIndex((item) => item.id === id);
  const nameInput = document.querySelector(`.inname${id}`).value;
  const ageInput = document.querySelector(`.inage${id}`).value;
  const historyInput = document.querySelector(`.inhis${id}`).value;

  if (validateInputs({ age: ageInput, history: historyInput })) {
    saveData[entryIndex] = {
      ...saveData[entryIndex],
      name: nameInput,
      age: ageInput,
      history: historyInput,
    };
    window.localStorage.setItem("data", JSON.stringify(saveData));
    createTable(saveData);
  }
}

function validateAge(id) {
  const ageInput = document.querySelector(`.inage${id}`).value;
  if (isNaN(ageInput) || ageInput > 150 || ageInput < 1) {
    alert("나이는 1~150 사이의 숫자여야 합니다.");
    document.querySelector(`.inage${id}`).value = saveData.find(
      (item) => item.id === id
    ).age;
  }
}

function validateInputs({ id, age, history, nickname }) {
  if (id && isNaN(id)) {
    alert("아이디는 숫자여야 합니다.");
    return false;
  }
  if (age && (isNaN(age) || age > 150 || age < 1)) {
    alert("나이는 1~150 사이의 숫자여야 합니다.");
    return false;
  }
  if (history && history.length < 15) {
    alert("경력은 최소 15글자 이상이어야 합니다.");
    return false;
  }
  if (nickname && saveData.some((item) => item.nickname === nickname)) {
    alert("중복된 닉네임입니다.");
    return false;
  }
  return true;
}

function saveNewEntry() {
  const newEntry = {
    id: Number(inputFields.id.value),
    name: inputFields.name.value,
    age: Number(inputFields.age.value),
    history: inputFields.history.value,
    nickname: inputFields.nickname.value,
  };

  if (
    validateInputs(newEntry) &&
    !saveData.some((item) => item.id === newEntry.id)
  ) {
    saveData.push(newEntry);
    window.localStorage.setItem("data", JSON.stringify(saveData));
    createTable(saveData);
    Object.values(inputFields).forEach((field) => (field.value = ""));
    buttonCreate.disabled = true;
  } else {
    alert("아이디가 중복되었거나 입력값이 잘못되었습니다.");
  }
}

function validateOnInput() {
  const { id, name, age, history, nickname } = inputFields;
  const valid =
    id.value &&
    name.value &&
    age.value &&
    history.value &&
    nickname.value &&
    validateInputs({
      id: id.value,
      age: age.value,
      history: history.value,
      nickname: nickname.value,
    });

  buttonCreate.disabled = !valid;
}

Object.values(inputFields).forEach((field) =>
  field.addEventListener("input", validateOnInput)
);
buttonCreate.addEventListener("click", saveNewEntry);
