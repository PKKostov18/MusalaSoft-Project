var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
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


var modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}