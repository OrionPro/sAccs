import common from '../../js/common';

require("../../libs/libs").owl_carousel();
//import '../../pages/index/index.pug'; //это для обновления страницы при hotreload - при npm build убрать
//import '../../pages/modal.pug'; //это для обновления страницы при hotreload - при npm build убрать
import './index.sass';

import animate from '../../js/animate';

import {showLinksContent} from '../../js/common'


export default class ModalBehavior {
	constructor(obj) {
		this.btnOpen = document.querySelectorAll(obj.btnOpen);
		this.btnClose = document.querySelector(obj.btnClose);
		this.targets = document.querySelector(obj.target);
		this.typeOfDisplay = obj.typeOfDisplay || 'flex';
		this.className = obj.className;
		this.overlay = this.findOverlay();
		this.addListeners = this.addListeners.bind(this);
		this.findOverlay = this.findOverlay.bind(this);
		this.addListeners();
	}

	addListeners() {
		[...this.btnOpen].forEach(item => {
				item.addEventListener('click', () => {
					this.openModal();

				})
			}
		);
		this.btnClose.addEventListener('click', () => {
			this.closeModal();
		});
		this.overlay.addEventListener('click', () => {
				this.closeModal()
			}
		);
	}

	openModal() {
		if (this.className) {
			setTimeout(() => {
				this.targets.classList.add(this.className);
			}, 100);
		}
		this.targets.style.display = this.typeOfDisplay;
		document.body.style.overflow = 'hidden';
	}

	closeModal() {
		if (this.className) {
			this.targets.classList.remove(this.className);
		}
		$('input:not("[type=submit], [type=hidden]")').removeClass('tooltipster-show').tooltipster('close');
		setTimeout(() => {
			this.targets.style.display = '';
			document.body.style.overflow = '';
		}, 200);
	}

	findOverlay() {
		return [...this.targets.children].find(item => item.className === 'overlay');
	}
}

export class NewModalBehavior extends ModalBehavior {
	constructor(obj, extend, changeStr, newVal) {
		super(obj);
		this.extend = document.querySelectorAll(extend);
		this.string = document.querySelector(changeStr);
		this.newVal = document.querySelector(newVal);
		this.names = this.findElement('ti_body_name');
		this.values = this.findElement('ti_body_quanty');
		this.inputValue = this.findInput('ti_body_form');
//listeners ...methods
		this.findElement = this.findElement.bind(this);
		this.findInput = this.findInput.bind(this);
		this.inputListeners = this.inputListeners.bind(this);
		this.inputListeners();
	}

	addListeners() {
		super.addListeners();
		[...this.btnOpen].forEach(item => {
			item.addEventListener('click', ({target} = e) => {
				let num = [...this.btnOpen].indexOf(target);
				let {value} = this.inputValue[num], {textContent} = this.values[num];
				if (+textContent < +value && +value > 0) {
					let {textContent} = this.names[num];
					this.openModal(true);
					this.string.textContent = textContent;
					this.inputValue[num].value = '';
					this.newVal.value = value;
				}
			})
		});
	}

	static validation(el) {
		const elem = typeof el === 'string' ? document.querySelectorAll(el) : el;
		[...elem].forEach(item => item.addEventListener('input', ({target} = e) => (
			/\D/g.test(target.value) ? target.value = '' : null
		)))
	}

	inputListeners() {
		[...this.inputValue].forEach(item => item.addEventListener('input', ({target} = e) => {
			/\D/g.test(target.value) ? target.value = '' : null;
		}));
		this.newVal.addEventListener('input', ({target} = e) => {
			/\D/g.test(target.value) ? target.value = '' : null;
		})
		// this.validation(this.inputValue);
		// this.validation(this.newVal);
	}

	openModal(bool) {
		bool ? super.openModal() : null;
	}

	findElement(classEl) {
		return [...this.extend].map(item => ([...item.children].find(item => item.className === classEl)
		));
	}

	findInput(classEl) {
		let curElems = this.findElement(classEl);
		return [...curElems].map(item => item.querySelector('form > input'));
	}
}


$(document).ready(function () {
	if($('.wrap_input_button > input[type="text"]').length) {
		new NewModalBehavior({
			btnOpen: '.buy_btn',
			btnClose: '.fa-times-circle-o',
			target: '.modal_index',
			className: 'modal_open'
		}, '.ti_body_row', '.good_absent', '.wrap_input_button > input[type="text"]');
	}

	showLinksContent({
		btn: '.tba_item_button',
		class: 'rotate_i'
	});
	// Инициализация datepicker
	$( "#datepicker" ).datepicker();
	// в input в талице делаем подсказку
	$('.ti_body .ti_body_title .ti_body_row .ti_body_form form input').focus( function () {
		$(this).parent().find('.main_table_tooltip_input').addClass('active');
	});
	$('.ti_body .ti_body_title .ti_body_row .ti_body_form form input').blur( function () {
		$(this).parent().find('.main_table_tooltip_input').removeClass('active');
	});
	// пример анимации через библиотечку animat (но лучше анимировать через GSAP)
	$('.our_advantages h2').animated("fadeInUp");
	// инициализация tooltipster
	if (window.matchMedia("(min-width: 992px)").matches) {
		$(".header__modal a").tooltipster({
			plugins: ['follower'],
			theme: 'tooltipster-shadow'
		});
		$(".header__logo a").tooltipster({
			theme: 'tooltipster-light'
		});
	}
	//  Активация слайдера
	$(".owl-carousel").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		nav: true
	});
	// инициализация select2
	$(".select2").select2({
		//minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		width: null
	});
	$(".select2-tags").select2({
		tags: true,
		placeholder: "Выберите один или несколько тегов",
		width: null // если null то будет шириной родителя
	});
	// Инициализация маски в input
	$(".mask").mask("+38(999) 999-99-99");


});

$(window).resize(function () {

});

$(window).scroll(function () {

});

setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);