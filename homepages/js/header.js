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

const height = window.outerHeight;
console.log(height);
if (height >= 816) {
  let header = document.querySelector(".header");
  window.onscroll = function () {
    let headerTop = header.offsetTop;
    let sp = window.scrollY;

    if (sp > headerTop) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  };
}
