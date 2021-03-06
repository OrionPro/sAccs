import ModalBehavior from "../pages/index";

require("../libs/libs").jqueryui();
require("../libs/libs").matchMedia();
require("../libs/libs").waypoint();
require("../libs/libs").Animate_css();
require("../libs/libs").animate_modal_js();
require("../libs/libs").magnific_popup();
require("../libs/libs").tooltipster_follower();
require("../libs/libs").tooltipster();
require("../libs/libs").jqueryValidation();
require("../libs/libs").select2();
require("../libs/libs").input_mask();
import Sticky from 'sticky-js'
import validation from '../js/validation';
import modal from '../js/modal';

import '../sass/main.sass';
import functions from '../js/_functions.js';

// табы tabs
function tabs(obj) {
	const buttons = document.querySelectorAll(obj.btn);

	let func = function(e){
		"use strict";
		e.preventDefault();
		const thisButtons = this.parentNode.parentNode.querySelectorAll(obj.btn);
		const thisBodyTabs = this.parentNode.parentNode.querySelectorAll(obj.tabsBody);
		for( let i = thisButtons.length; i--; ){
			thisButtons[i].classList.remove(obj.classBtn);
			thisBodyTabs[i].classList.remove(obj.classBody);
		}
		this.classList.add(obj.classBtn);
		let item = [].indexOf.call(thisButtons,this);
		thisBodyTabs[item].classList.add(obj.classBody)
	};

	[].forEach.call(buttons,item => item.addEventListener('click',func));
}

 export function showLinksContent(obj){
	"use strict";
	const btn = document.querySelectorAll(obj.btn);
	 // не забываем, что нужно делать прилипающим сам элемент, а не его обёртку, как тут есть обёртка .tabs_body , но мы создали .tabs_body_inner ,чтобы работал вообще sticky
// инициализация sticky
	var sticky = new Sticky('.sticky');

	let showBody = function () {
		let i = [...this.children].find(item => item.tagName === 'I');
		i.classList.toggle(obj.class);
		let {nextElementSibling:body} = this;
		sticky.destroy(); // разушаем его ибо потом надо будет создать новый с новой высотой
		$(body).slideToggle('slow', function () {
			sticky = new Sticky('.sticky');// после анимации создаём новый, на основе новой высоты
		});
	};
	[...btn].forEach(item =>item.addEventListener('click',showBody));

}

export class inputOnlyNumbers {
	constructor(inputs) {
		this.inputs = document.querySelectorAll(inputs);

	}

	listeners(){

		[...this.inputs].forEach( item => item.addEventListener('input',{value:{target}} = ev=>(
			/\D/g.test(value) ? value = '' :  null
		)));

	}

}

$(document).ready(function () {

	// объявление модалок
	if($('.buyakkaynt').length) {
		new ModalBehavior({
			btnOpen: '.buyakkaynt',
			btnClose: '.close-modal-buyakkaynt',
			target: '.modal_buyakkaynt',
			className: 'modal_open'
		});
	}
	if($('.buyakkaynt2').length){
		new ModalBehavior({
			btnOpen: '.buyakkaynt2',
			btnClose: '.close-modal-buyakkaynt2',
			target: '.modal_buyakkaynt2',
			className: 'modal_open'
		});
	}
	if($('.modal-lk-success').length){
		new ModalBehavior({
			btnOpen: '.lk-success',
			btnClose: '.close-modal-lk-success',
			target: '.modal-lk-success',
			className: 'modal_open'
		});
	}

	// есть промокод в модалках
	$('.modal-promo').on('click', function (e) {
		e.preventDefault();
		$(this).parent().find('.code').show('fade');
	});
	// вызов tabs
	tabs({
		btn:'.tabs-items-wrap > .tabs-item',
		tabsBody:'.tabs-wrap',
		classBody:'active',
		classBtn: 'active'
	});
	tabs({
		btn:'.tabs-items-wrap-inner > .tabs-item',
		tabsBody:'.tabs-wrap-inner',
		classBody: 'active',
		classBtn:'active'
	});

	// Определения браузера
	function get_name_browser() {
		// получаем данные userAgent
		const ua = navigator.userAgent;
		// с помощью регулярок проверяем наличие текста,
		// соответствующие тому или иному браузеру
		if (ua.search(/Edge/) > 0) return 'Edge';
		if (ua.search(/Chrome/) > 0) return 'Google Chrome';
		if (ua.search(/Firefox/) > 0) return 'Firefox';
		if (ua.search(/Opera/) > 0) return 'Opera';
		if (ua.search(/Safari/) > 0) return 'Safari';
		if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
		if (ua.search(/Trident/) > 0) return 'Trident';
		// условий может быть и больше.
		// сейчас сделаны проверки только
		// для популярных браузеров
		return 'Не определен';
	}

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Firefox") {
		// $(".from_what_is_seo .from_what_is_seo_bot_decor svg").css("bottom", "-217px");
		// $(".website_promotion .website_promotion_decor").css("bottom", "-177px");
		// $(".cost_of_online_store .cost_of_online_store_links_item").css("margin-right", "72px");
	}

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Edge") {
		$('.check i, .radio i').css("margin-top", "2px")
	}

	// для инициализации tooltips
	// $( document ).tooltip({
	//   track: true
	// });

	// скролл по ссылке с атрибутом href
	// $(".header_nav a[href*='#']").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $(anchor.attr('href')).offset().top
	//     }, 500);
	//     return false;
	// });

	// Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
	// $(".scroll_to").on("clcik", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $("#" + anchor.data('scroll')).offset().top
	//     }, 500);
	//     return false;
	// });

	//  Активация слайдера
	// $(".owl-carousel").owlCarousel({
	//     loop: true,
	//     items: 1,
	//     dots: true
	// });

	// Кастомные кнопки управления слайдером
	// var owl = $('.owl-carousel');
	// owl.owlCarousel();
	// // Go to the next item
	// $('.customNextBtn').click(function() {
	//     owl.trigger('next.owl.carousel', [700]);
	// });
	// // Go to the previous item
	// $('.customPrevBtn').click(function() {
	//     // With optional speed parameter
	//     // Parameters has to be in square bracket '[]'
	//     owl.trigger('prev.owl.carousel', [700]);
	// });

	// $(document).on('pjax:success', function () {
	//     $('.tba_item').click(function () {
	//         $(this).children('.tba_item_body').toggle('slow');
	//
	//         $('.fa-angle-down').each(function () {
	//             $('.fa-angle-down').removeClass('rotate_i');
	//         });
	//         var x = $(this).find('i').addClass('rotate_i');
	//         console.log(x);
	//     });
	// });
});

$(window).resize(function () {

});

$(window).scroll(function () {

});