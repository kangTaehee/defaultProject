/*! isElementVisibleCheck - v1.0 - 2020-06-11
 * Copyright 2020 kth Licensed MIT
 */
function Utils() {}
Utils.prototype = {
	constructor: Utils,
	isElementInView: function (element, fullyInView) {
		if($(element).length==0) return;
		var pageTop = $(window).scrollTop();
		var pageBottom = pageTop + $(window).height();
		var elementTop = $(element).offset().top;
		var elementBottom = elementTop + $(element).height();

		if (fullyInView === true) {
			// console(pageTop < elementTop && pageBottom > elementBottom)
			// 가시화면 내에 대상이 있을때
			return pageTop < elementTop && pageBottom > elementBottom;
		} else if (typeof fullyInView == 'string' || typeof fullyInView == 'number') {
			// console.log(typeof fullyInView, fullyInView);
			// 화면으 중간 이상
			// console.log('harf')
			if (fullyInView > 0) {
				// console.log(elementTop, pageTop + ($(window).height() * fullyInView / 100));
				return elementTop <= pageTop + ($(window).height() * fullyInView) / 100;
			}
		} else {
			// 요소의 탑이 페이지 하단보다 작고
			// 요소의 바텀이 페이지 탑보다 크면
			// 즉 화면에 안보이는지 체크
			// Utils.isElementInView(target, false);
			return elementTop <= pageBottom && elementBottom >= pageTop;
		}
	},
	isElementHide: function (element, fullyInView, revise) {
		if ($(element).length==0) return;
		var pageTop = $(window).scrollTop();
		var pageBottom = pageTop + $(window).height();
		var elementTop = $(element).offset().top;
		var elementBottom = elementTop + $(element).height();

		// 대상의 top이 화면에서 위로 사라질때
		if (fullyInView == 'tophide' && false == pageTop < elementTop) {
			return true;
		}
		if (fullyInView == 'bottomhide' && false == elementBottom + revise >= pageTop) {
			// elementBottom + revise >= pageTop;
			// console.log(elementBottom, pageTop);
			return true;
		}
		if (fullyInView === true) {
			// console(pageTop < elementTop && pageBottom > elementBottom)
			// 가시화면 내에 대상이 있을때
			return pageTop < elementTop && pageBottom > elementBottom;
		} else if (typeof fullyInView == 'string' || typeof fullyInView == 'number') {
			// console.log(typeof fullyInView, fullyInView);
			// 화면으 중간 이상
			// console.log('harf')
			if (fullyInView > 0) {
				// console.log(elementTop, pageTop + ($(window).height() * fullyInView / 100));
				return elementTop <= pageTop + ($(window).height() * fullyInView) / 100;
			}
		} else {
			// 요소의 탑이 페이지 하단보다 작고
			// 요소의 바텀이 페이지 탑보다 크면
			// 즉 화면에 안보이는지 체크
			// Utils.isElementInView(target, false);
			return elementTop <= pageBottom && elementBottom >= pageTop;
		}
	},
};
var Utils = new Utils();
/*
  return(반환)되는 값은 true false 두가지

  대상의 top이 60% 이상 노출 될때
  Utils.isElementInView('.tab', 10);

  대상의 전체가 화면에 노출될때 
  Utils.isElementInView(target, true);
  
  대상의 top이 화면에서 위로 사라질때
  Utils.isElementHide('.depth4-tab', 'tophide')


  대상의 bottom이 화면에서 위로 사라질때
  Utils.isElementHide('.history', 'bottomhide', -163)
	.history : 셀렉터
	'bottomhide' : 스크롤 액션 조건
	-163 : 보정치
*/

