var modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
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