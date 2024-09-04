const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
toggle.addEventListener('click', function () {
  this.classList.toggle('bi-moon');
  if (this.classList.toggle('bi-brightness-high-fill')){
    body.style.background = 'white';
    body.style.color = 'black';
    body.style.transition = '2s';
  }else{
    body.style.background = 'black';
    body.style.color = 'white';
    body.style.transition = '2s';
    
  }
  
});

 $(document).ready(function () {
  $("#icon").click(function () {
    $("ul").toggleClass("show")
   
    $("ul").css({
      'font-size': '30px',
        'font-weight': '700'

    } );
    

    
  });
  
});


// image slider
/* script.js */
$(document).ready(function() {
  
  var currentSlide = 0;
  var slides = $('.slide');
  var dots = $('.dot');

  function showSlide(index) {
      slides.hide();
      dots.removeClass('active');
      $(slides[index]).show();
      $(dots[index]).addClass('active');
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  dots.click(function() {
      currentSlide = $(this).data('slide');
      showSlide(currentSlide);
  });

  showSlide(currentSlide);
  setInterval(nextSlide, 3000); // Change slide every 3 seconds
  
});