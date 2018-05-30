import common from '../../js/common';


import '../../pages/personal-area/personal-area.pug';



import './personal-area.sass';

import animate from '../../js/animate';



 export default function turnOnInput(obj){
	"use strict";
	const input = document.querySelector(obj.input);
	const switcher = document.querySelector(obj.btn);
	const imValue  = 'https://stockaccs.com/?parther=';

	switcher.addEventListener('click',()=>{
		let {readOnly,value} = input, {textContent} = switcher;

		if(value === imValue ) {
			input.style.borderColor = 'red';
			$('.switch').tooltipster('show');
			return;
		}

		textContent === 'ИЗМЕНИТЬ' ? switcher.textContent = 'СОХРАНИТЬ': switcher.textContent = 'ИЗМЕНИТЬ';
		input.readOnly = !readOnly;
	});
	//immutable validate
	input.addEventListener('keyup',()=>{
		// $('.switch').tooltipster('hide');
		// input.style.borderColor = '';
		let check = input.value.slice(0,imValue.length);
		if(check !== imValue){
			input.value = imValue;
		}
	});
	input.addEventListener('click',()=>{
		$('.switch').tooltipster('hide');
		input.style.borderColor = '';
	});
}

function buttonPlus(obj){
	"use strict";
	const btn = document.querySelector(obj.btn);
	const inputFather = document.querySelector(obj.input);
	const attr = document.querySelector(obj.attr),
	currInput = inputFather.querySelector('.form-group > .form_group_wrap > input');

	btn.addEventListener('click',()=>{
		let {textContent} = attr;
		inputFather.classList.add(obj.class);
		currInput.setAttribute('data-name',textContent);
	});

}

function emptyValidate(obj){
	"use strict";
	const btn = document.querySelector(obj.btn);
	const valInput = document.querySelector(obj.input);

	btn.addEventListener('click',()=>{
		if(!valInput.value.length){
			$('.add_new_wal').tooltipster('show');
			valInput.style.borderColor = 'red';
		}
	});
	valInput.addEventListener('click',()=>{
		$('.add_new_wal').tooltipster('hide');
		valInput.style.borderColor = '';
	});
}


$(document).ready(function () {
	"use strict";

	$('.switch').tooltipster({
		trigger: 'none',
		position: 'top',
		animation: 'grow',
		theme: 'tooltipster-shadow'
	});

	$('.add_new_wal').tooltipster({
		trigger: 'none',
		position: 'top',
		animation: 'grow',
		theme: 'tooltipster-shadow'
	});
	if($('.wal_check').length) {
		emptyValidate({
			btn: '.wal_check',
			input: '.add_new_wal'
		});
	}
	if($('.btn_plus').length) {
		buttonPlus({
			btn: '.btn_plus',
			input: '.form_user_add_new_el_wallet',
			class: 'show_new_wallet',
			attr: '.select > .slct'
		});
	}

	turnOnInput({
		input: '.switch',
		btn: '.btn-switch',
	});
	//
	// dl.c = e =>  Math.random() * e.length | 0;
	// dl.d = d => document.querySelectorAll(d);
	// function dl(times,d){	setInterval(()=>{dl.d(d)[dl.c(dl.d)].remove()},times)}



	// dl(2000);

});
