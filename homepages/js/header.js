function gohome() {
  window.location.href = `main.html?ct=${"all"}`;
}
function login() {
  Swal.fire({
    title: "미구현 기능입니다.",
    icon: "error",
    draggable: true,
  });
}
// scroll 헤더 고정

let header = document.querySelector(".header");
let headerTop = header.offsetTop;

window.addEventListener("scroll", function () {
  let sp = window.scrollY;

  if (sp >= headerTop) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});
