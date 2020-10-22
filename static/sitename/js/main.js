// if (!console) 
// console = {log: function() {}};
// console = {warn: function() {}};
var currentMainSection = 0;
var mainSection = $('body, #reservation, #publicHealth, #nationalMedical ,#footer')
var mainSectionMoveing = function(direction){
	mainSection
	.each(function (index, element) {
		// element == this
		if($(this).offset().top > $(window).scrollTop() && Utils.isElementInView($(this), 50))
		{
			currentMainSection = index;
		}
	});
	if(direction == 'down' && currentMainSection < 4){
		currentMainSection++
		
	}else if(direction == 'up' && currentMainSection > 0){
		currentMainSection--
	}
	$("html, body")
	.stop()
	.animate({scrollTop: mainSection.eq(currentMainSection).offset().top }, 650);
}

// 휠 컨트롤
var whellTimer
$('#wrap').on('wheel', function (event) {
	console.log(event.target)
	if($(event.target).parents('.fsite').length)
	return;

	if(!ismobile){
		event.preventDefault();
		if (whellTimer)
		clearTimeout(whellTimer);
		whellTimer = setTimeout(function() {
			// console.log(event.originalEvent.deltaY);
			mainSectionMoveing(event.originalEvent.deltaY > 0 ? 'down' : 'up')
		}, 99);
	}else{

	}
	
});

$(function() {
	var photoSetList = $("#section-main--list").slick({
		autoplay: true,
		autoplaySpeed:4000,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		dotsClass : 'slick-dots-white',
		appendDots:$(".section-main--nav .dot"),
		pauseOnFocus: false
	});
	$('.section-main--nav--Pause').on('click',function(){
		photoSetList.slick('slickPause')
	});
	$('.section-main--nav--Play').on('click',function(){
		photoSetList.slick('slickPlay')
	});
});
$(function() {
	var photoSetList = $(".ad-pop--list").slick({
		autoplay: true,
		autoplaySpeed:2000,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		pauseOnFocus: false,
		prevArrow : false,
		nextArrow : false,
		dotsClass : 'slick-dots-white',
		appendDots:$(".ad-pop--nav .dot")
	});
	$('.ad-pop--nav--Pause').on('click',function(){
		photoSetList.slick('slickPause')
	});
	$('.ad-pop--nav--Play').on('click',function(){
		photoSetList.slick('slickPlay')
	});
});
$(function() {
	var photoSetList = $(".reservation--popupzone--list").slick({
		autoplaySpeed:1000,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		pauseOnFocus: false,
		prevArrow : false,
		nextArrow : false,
		dotsClass : 'slick-dots-white',
		appendDots:$(".reservation--popupzone--nav .dot")
	});
	$('.reservation--popupzone--nav--Pause').on('click',function(){
		photoSetList.slick('slickPause')
	});
	$('.reservation--popupzone--nav--Play').on('click',function(){
		photoSetList.slick('slickPlay')
	});
});
$(function() {
	var photoSetList = $(".nationalMedical--popupzone--list").slick({
		// autoplay: true,
		autoplaySpeed:1000,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		pauseOnFocus: false,
		prevArrow : false,
		nextArrow : false,
		dotsClass : 'slick-dots-white',
		appendDots:$(".nationalMedical--popupzone--nav .dot")
	});
	$('.nationalMedical--popupzone--nav--Pause').on('click',function(){
		photoSetList.slick('slickPause')
	});
	$('.nationalMedical--popupzone--nav--Play').on('click',function(){
		photoSetList.slick('slickPlay')
	});
});
$(function() {
	// 무료건강교실
	var photoSetList = $(".freehealthclass--list")
	$('.freehealthclass--ctrl .page').text('1/'+photoSetList.find('.item').length)
	photoSetList.slick({
		autoplaySpeed:1000,
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: true,
		pauseOnFocus: false
	});
	$('.freehealthclass--ctrl--stop').on('click',function(){
		photoSetList.slick('slickPause')
	});
	$('.freehealthclass--ctrl--play').on('click',function(){
		photoSetList.slick('slickPlay')
	});
	photoSetList
		.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			// console.log(`${nextSlide}/${slick.slideCount+1}`)
			$('.freehealthclass--ctrl .page').text( (nextSlide+1) + '/' + slick.slideCount)
		})
		.on('afterChange', function(event, slick, currentSlide, nextSlide){
			photoSetList.find('.slick-active').addClass('active')
			console.log('afterChange',event, slick, currentSlide, nextSlide);
		});
	
});



$(document).ready(function () {
	$(window).scroll(function () { 
		// top버튼 이동 제어
		if (Utils.isElementHide('#footer',95)) {
			$('.footer-quick-service-link').addClass('stiky')
		} else {
			$('.footer-quick-service-link').removeClass('stiky')
		}
	});
});

var s1 = gsap.timeline()
var s2 = gsap.timeline()
var s3 = gsap.timeline()
var s4 = gsap.timeline()
var s5 = gsap.timeline()

var s2 = gsap.timeline();
s2.pause();
s2.from('.reservation--internet',   { y: '200', opacity: 0, duration: 1, delay : 0},'0');
s2.from('.reservation--quick',      { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s2.from('.reservation--tel',        { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s2.from('.reservation--link1',      { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s2.from('.reservation--link2',      { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s2.from('.reservation--popupzone',  { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');

var s3 = gsap.timeline();
s3.pause();
s3.from('.findPublicMedicalInstitution', { x: '-200', opacity: 0, duration: 1, delay : 0},'0');
s3.from('.freehealthclass',              { x: '-200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s3.from('.findEmergencyRoom',            { x: '-200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s3.from('.MoonlightChildrenHospital',    { x: '-200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s3.from('.findAed',                      { x: '-200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s3.from('.carendar',                     { x: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s3.from('.publicHealth--quick',          { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');

var s4 = gsap.timeline();
s4.pause();
s4.from('#nationalMedical > div > div.notice > div.set.active > ul > li:nth-child(1)', { y: '200', opacity: 0, duration: 1, delay : 0},'0');
s4.from('#nationalMedical > div > div.notice > div.set.active > ul > li:nth-child(2)', { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s4.from('#nationalMedical > div > div.notice > div.set.active > ul > li:nth-child(3)', { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s4.from('#nationalMedical > div > div.notice > div.set.active > ul > li:nth-child(4)', { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s4.from('.nationalMedical--popupzone',                                                 { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s4.from('.nationalMedical--quick',                                                     { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');
s4.from('.magazine',                                                                   { y: '200', opacity: 0, duration: 1, delay : 0},'-=0.75');

var timer;
var lastScrollTop = 0;
var scrollDiection;
$(window).on('scroll', function(event) {
	scrollDiectionCheck(event);
	

	mainSection
	.each(function (index, element) {
		if(Utils.isElementInView($(this), 50))
		{
			$('.section-nav a').removeClass('active').removeAttr('title').eq(index).addClass('active').attr('title','선택 됨')
		}
	});
});

// 섹션 메뉴
$('.section-nav a').each(function (index) {
	$(this).on('click', function (event) {
		event.preventDefault();
		$("html, body")
		.stop()
		.animate({scrollTop: mainSection.eq(index).offset().top }, 650);
	});
});

function scrollDiectionCheck(e){
	var st = window.pageYOffset || document.documentElement.scrollTop;
	// if(Math.abs(lastScrollTop - st) <= 5)
	// return;

	if (st >= lastScrollTop){
		// downscroll code
		scrollDiection = 'down';
	} else {
		// upscroll code
		scrollDiection = 'up';
	}
	lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling


	

	var delta = 150;
	clearTimeout( timer ); 
	timer = setTimeout( resizeDone, delta );
}

$(function () {
	// $(window).trigger('scroll')
	$(window).on('load',function(){
		$(window).trigger('scroll');
	})
});

var resizeDone = function() {
	
	if(ismobile){
		
	}else{
	}
	for (var index = 1; index <= mainSection.length; index++) {
		var element = mainSection[index-1];
		target = element;
	
		if(scrollDiection == 'down'){
			isElementInView = Utils.isElementInView(target, 80);
			// console.log(Utils.isElementInView(target, 80),target)
		}else{
			// scoll up
			isElementInView = Utils.isElementInView(target, 20);
			console.log(isElementInView,' 엘스 타입 ')
		}
		
		// 섹션이 변경됨.
		// if(index==14){index == 14;}else if(index==)
		// console.log(isElementInView)
		// console.log('windowscroll',scrollDiection,isElementInView,  typeof isElementInView,mainSection.length)
		if (isElementInView) {
			console.log(index,' => 섹션')
			currentMainSection = index-1
			window['s' + index].play();
		} else {
			// window['s'+(index)].reverse()
		}
	}
}
// 
var noticestyle = function(){
	$('.notice .title')
	.each(function (index, element) {
		$(this).height() > 30 ? $(this).addClass('l') : null
	});
}
var noticeInit = function(){
	$('.notice span.text *').removeAttr('style')
}
$(window).on('load', function () {
	noticeInit()
	noticestyle()
});
$('.notice button').each(function (index, element) {
	$(this).on('click', function () {
		$(this).parent().parent().addClass('active').attr('title','선택됨')
			.siblings().removeClass('active').find('button').removeAttr('title')
		noticestyle()
	});
});