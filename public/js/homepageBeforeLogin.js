window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

const btnToScrollTop = document.getElementById("btnToScrollTop")

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnToScrollTop.style.display = "block";
    } else {
        btnToScrollTop.style.display = "none";
    }
  }

btnToScrollTop.addEventListener("click", function topFunction() {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
} )