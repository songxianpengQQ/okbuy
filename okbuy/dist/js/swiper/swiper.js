$(document).ready(function(){
    // 轮播图插件
    var mySwiper = new Swiper('.swiper-container',{
        autoplay:true,
        loop:true,
    
    
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    
        // effect : 'coverflow',
        // slidesPerView: 3,
        // centeredSlides: true,
    
    
        pagination: {
        el: '.swiper-pagination',
        bulletElement : 'li',
        clickable :true,
      },
      });
      //轮播插件结束


})
