
  //---==>>> Menu Slider
  $('#menu-open').click(function(){
    $('.header__menu').addClass('active');
    $('body').addClass('overflow-hidden');
  });
  $('#menu-close').click(function(){
    $('.header__menu').removeClass('active');
    $('body').removeClass('overflow-hidden');
  });
  
$(document).ready(function(){  
  //---==>>> Swiper setup 
  if ($(window).width() < 960 ) {
    var sliderDirection = 'vertical';
  } else {
    var sliderDirection = 'horizontal';
  }
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    freeMode: true, 
    direction: sliderDirection,
  });


 //---==>>> video on hover setup
  var allVideos= document.querySelectorAll(".video-slider__item");
  for(let i= 0; i< allVideos.length; i++ ){
     $('video',allVideos[i]).hover(
        // on hover add dark mode class to other videos
        ()=>{ 
          $('.video-slider__item').addClass('dark-screen');
          $(allVideos[i]).addClass('active-screen').removeClass('dark-screen');
          $('video', allVideos[i]).get(0).play(); 
        },
        // else remove dark mode class
        ()=>{ 
          $('.video-slider__item').removeClass('dark-screen');
          $(allVideos[i]).removeClass('active-screen');
          $('video', allVideos[i]).get(0).load();
        }
      );
  } 


  //---==>>> video-slider and scrollbar setup
  var slide = $("#slide");
  var range = $('.swiper-wrapper');
  var ratio= ($('.swiper-wrapper').width())/450;
  var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

  // detect slider change and change the scrollbar range
  if ($(window).width() > 960 ) {
    slide.on('change',function () {
      var value = $(this).val();
      range.css('transform','translate3d(-'+ value*ratio+'px, 0px, 0px)');
    });
  }

  // active mouse scroll when mouse is over the scrollbar
  range.on('mouseover', function(){
    range.bind(mousewheelevt, moveSlider);
    centerSlider(range);
  });

  // move the slider based on scrolling
  function moveSlider(e){
    var zoomLevel = parseInt(slide.val()); 
    // detect positive or negative scrolling
    if ( e.originalEvent.wheelDelta < 0 ) {
      //scroll down
      slide.val(zoomLevel - 1);
    } else {
      //scroll up
      slide.val(zoomLevel + 1);
    }
    // trigger the change event
    slide.trigger('change');
    //prevent page fom scrolling
    return false;
  }


  // resets slider when middle click over elem
  function centerSlider(elem) {
    $(elem).on('click', function(e) { 
      if( e.which == 2 ) {
        var evt = e || window.event;
        e.preventDefault();
        console.log("middle button");
        // set slide val to default
        slide.val(slide[0].defaultValue);
        // trigger the change event
        slide.trigger('change');
      }
    });
  }
  

});      


