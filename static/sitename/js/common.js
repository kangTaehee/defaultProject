var ismobile = false;
if (window.innerWidth < 1024) {
	ismobile = true;
}
$(window).resize(function () {
	if (window.innerWidth < 1024) {
		ismobile = true;
	} else {
		ismobile = false;
	}
});

function gridAutoFlow(target) {
  // var items = $('.depth2');
  var items;
  if (typeof target == 'string'){
    items = $(target);
  }else{
    items = target;
  }
	items.each(function (index, element) {
    // console.log($(this).attr('id'))
    if($(this).attr('id') == 'nav200017' || $(this).attr('id') == 'nav200317'){
      
    }
    if($(this).attr('id') == 'nav200353'){
      // return false;
    }
    // return false;
    // console.log('z')
    _this = $(this);
    var item;
    item = _this.find('.set>ul>li');
		var sl = item.innerWidth();
		var h = 0;
		var x = 0;
		var y = 0;
		for (var index = 0; index < item.length; index++) {
			item.eq(index).innerHeight();
			h += item.eq(index).innerHeight();
			if (h <= (_this.find('.set>ul').innerHeight() || _this.innerHeight())) {
        y = h - item.eq(index).innerHeight();
        if(index == 0){
          console.log(index)
          y = 0;
        }
			} else {
				h = item.eq(index).innerHeight();
				// x += 1;
        x += item.eq(index-1).innerWidth();
        // console.log(item.eq(index-1),x)
				y = 0;
			}
			item.eq(index).css({
				top: y,
				left: x
				// left: sl * x
			});
		}
	});
}
$(function () {
  
  // 키보드 마우스 오버 대응 포커스
  $('.js-hover').bind('focus', function (e) {
    $(this).addClass('hover').siblings().removeClass('hover')
  })
  $('.js-hover')
    .hover(function () {
      // over
      $(this).addClass('hover').siblings().removeClass('hover')
    }, function () {
      // out
      $(this).removeClass('hover')
    }
  );
  // 라디오 버튼 스타일
  $('input:radio.d')
  // .not('.sm')
  // .not('.c')
  .each(function (index, element) {
      // element == this
      $(this).addClass('d')
      // console.log($(this).next()[0].tagName)
      $(this).after('<i>')
      if($(this).next()[0].tagName != 'I'){
      }        
  });

  $('.js-active').click(function (e) { 
      $(this).addClass('active').attr('title','선택됨').parent().siblings().find('.js-active').removeClass('active').removeAttr('title')
  });
});
var LayoutGo2Top = function() {
  var handle = function() {
  // console.log("currentWindowPosition")
  var currentWindowPosition = $(window).scrollTop(); // current vertical position
    
    if (currentWindowPosition > 300) {
      $(".gotoTop").show();
    } else {
      $(".gotoTop").hide();
    }
  };
  return {
    init: function() {
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        $(window).bind("touchend touchcancel touchleave", function(e) {
          handle();
        });
      } else {
        $(window).scroll(function() {
          handle();
        });
      }
      $(".gotoTop").on('click', function(e) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        }, 600);
      });
    }
  };
}();


$(function(){
  $(window).on('load', function () {
    gridAutoFlow('.depth2'); // 초기 메뉴 활성화 요청시 세팅함.    
  });
  // gnb pc 마우스 이벤트
  $('#gnb .set>ul>li')
  .mouseover(function () { 
    $(this).addClass('active').siblings().removeClass('active');
    gridAutoFlow($(this).find('.depth2'));
  });
  $('#gnb .depth2').mouseleave(function () {
		$(this).parent().removeClass('active');
  });

  $('#gnb .set>ul>li>a')
  .focus(function (e) { 
    $(this).parent().addClass('active').siblings().removeClass('active');
    gridAutoFlow($(this).parent().find('.depth2'));
  });

  var mobileNav = $('#mobile-gnb')
  $(mobileNav)
		.find('.depth1 a')
		.click(function (e) {
      if($(this).parent().find('>div,>ul').length > 0){
        e.preventDefault();
        $(this).parent().toggleClass('on')
      }
    });
    
  $('.mobile-gnb-close').click(function (e) {
    e.preventDefault();
    mobileNav.removeClass('active');
  });

  $('.all-nav-toggle').click(function (e) { 
    e.preventDefault();
    if(ismobile==false){
      $('#all-gnb').toggleClass('active')
      // console.log('all-nav-toggle', ismobile);
    }else{
      mobileNav.toggleClass('active');
      // console.log('all-nav-toggle', ismobile);
    }
  });

  
  LayoutGo2Top.init();
  $('.menuNavOpener').on('click', function(){
    $(this).parent().toggleClass('menuNavOpen');
    if($(this).parent().hasClass('menuNavOpen')){
        $(this).find(".hidden").text('메뉴 닫기');    
    } else {
        $(this).find(".hidden").text('메뉴 열기');
    }
    
  });
  
  var sTop;
  function goToScroll() {
    sTop = $(window).scrollTop();
    //console.log(sTop);
    /*if(sTop > 85){
      $("#header").addClass("onFixed");
    }else{
      $("#header").removeClass("onFixed");
    }*/
  }

  $("#gotoTop").bind("click", function(){
    $(window).animate({scrollTop: 0}, 500);
  })

  $(window).on("scroll", function() {
      goToScroll();
  });
  goToScroll();

  function throttle(method, scope) {
    clearTimeout(method.tId);
    method.tId= setTimeout(function(){
        method.call(scope);
    }, 50);
  }
  function resizeDiv(event){
    //모바일 경우
    if(window.innerWidth < 768){

    } else if(window.innerWidth < 1000){

    }
  }

  throttle(resizeDiv);  //초기실행
    window.onresize = function(){
    throttle(resizeDiv);
  }

})

// 테이블 모바일 스타일 - 해딩 th td안에 타이틀 추가]
$('.bd-list').each(function(){ 
    _this = $(this)	
    $(this).find('tbody tr').not('._noData').each(function(){
      for (var index = 0; index < $(this).find('td').length; index++) {
        // console.log(_this.find('thead th').eq(index).text())

        var _temptxt = '<span class=mobile>' + _this.find('thead th').eq(index).text() + '</span>'
        td = $(this).find('td').eq(index)
        if(!td.hasClass('_nocustom')){
          td.html(_temptxt + '<div class=cell>' + td.html() + '</div>');
        }
      }
    })
})


$(document).ready(function () {
  $('.content-ctrl button.print').on('click', function () {
    window.print()
  });
  $(window).scroll(function () { 

    // 연혁 아이콘
    if($('.history').length>0){
      if(Utils.isElementHide('.depth4-tab', 'tophide')){
        var top = 
          $(window).scrollTop() - 
          $('.history').offset().top
            + 103
        $('.history>i').css('top', top)
      }else{
        $('.history>i').removeAttr('style')
      }
      if(Utils.isElementHide('.history', 'bottomhide', -163)){
        $('.history>i').addClass('bottom-fix')
      }else{
        $('.history>i').removeClass('bottom-fix')
      }
    }

    // gnb stiky
    var h = 80
    if($('.ad-pop:visible').height() != null){
      h += $('.ad-pop:visible').height()
    }
    if($(window).width() < 1024){
      h = $('.ad-pop:visible').height()
    }
    if($(window).scrollTop() > h){
      $('body').addClass('gnb-stiky');
    }else{
      $('body').removeClass('gnb-stiky');
    }

    // top버튼 이동 제어
    if (Utils.isElementHide('.footer-sitemap',100)) {
      var _top = $('.footer-sitemap').offset().top - 20 - 51;
      $('.wrap-top a').addClass('fix').css('top',_top);
    } else {
      $('.wrap-top a').removeClass('fix').removeAttr('style')
    }
  });
  $('#content a')
  .each(function (index, element) {
    // element == this
    if( $(this).attr('target') == '_blank' && $(this).attr('title') != ''){
      $(this).attr('title','새창열림')
    }
  });
});

/*
 * Function Name : popupW
 * Description   : 팝업창 띄운다
 * Parameters    : u - 주소, n - 이름, w - 넓이, h - 높이, s - 스크롤여부(yes, no), r - 창크기조절여부(yes, no), m - (1:일반, 2:위쪽모서리, 3:정중앙)
 */
function popupW(u, n, w, h, s, r, m) {
	var o;
	var lP = screen.availWidth;
	var tP = screen.availHeight;
	var p  = "";

	if(s==undefined) s = "no";
	if(m==undefined) m = 1;

	if(m==2) //- 위쪽모서리
		p = ",left=0,top=0";
	else if(m==3) //- 정중앙
		p = ",left=" + ((lP - w) / 2) + ",top=" + ((tP - h) / 2);

	o = window.open(u,n,"status=yes,toolbar=no,location=no,scrollbars=" + s + ",resizable="+r+",width="+w+",height="+h + p);
	o.focus();

}