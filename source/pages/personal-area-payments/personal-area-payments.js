import common from '../../js/common';


import '../../pages/personal-area-payments/personal-area-payments.pug';

import turnOnInput from '../personal-area/personal-area';
import ModalBehavior from '../index/index'


import './personal-area-payments.sass';


import animate from '../../js/animate';

class PaymentsModal extends ModalBehavior{
	constructor(obj,nObj){
		super(obj);

		this.strict = document.querySelector(nObj.strict);
		this.input = document.querySelector(nObj.input);
		this.moneyCash = document.querySelector(nObj.moneyCash);
		this.form = document.querySelector(nObj.form);

		let { textContent: mon} = this.strict;
		this.moneyCash.textContent = mon;
		
		this.Submit = this.handleSubmit.bind(this);
		this.inputV = this.inputValidate.bind(this);

		this.inputV();
		this.Submit();
	}
	inputValidate(){
		this.input.addEventListener('input',(ev)=>{
			this.input.style.borderColor = '';
			$(this.input).tooltipster('hide');
			/\D/g.test(ev.target.value) ? ev.target.value = '' :  null;
		});
	}
	handleSubmit(){

		this.form.addEventListener('click',(ev)=>{
			ev.preventDefault();
			
			let { value } = this.input, { textContent} = this.moneyCash;

			if(+value > parseFloat(textContent)){

				this.input.style.borderColor = 'red';
				$(this.input).tooltipster('show');
			}
		});
	}


}


$(document).ready(function(){

	new PaymentsModal({
		btnOpen:'.order_payment > .main_btn',
		btnClose:'.modal_payments >.modal_window > .fa-times-circle-o',
		className:'modal_open',
		target:'.modal_payments'
	},{
		strict:'.money_quanty',
		input:'.payments_modal_input',
		moneyCash:'.curr_payment',
		form: '.extended_submit'
	});

	"use strict";
	
	//turn On tooltipsters
	$('.switch').tooltipster({
		trigger: 'none',
		position: 'top',
		animation: 'grow',
		theme: 'tooltipster-shadow'
	});

	$('.payments_modal_input').tooltipster({
		trigger: 'none',
		position: 'top',
		animation: 'grow',
		theme: 'tooltipster-shadow'
	});
	
	turnOnInput({
		input:'.switch',
		btn: '.btn-switch'
	});


	let test = {
		name: 'sasha',
		test: (i = 'привет ') => console.log( `${i}${this.name}`)
		};
	class testCons{
		constructor(name){
			this.name = name
		}
		test( i = 'привет'){
			console.log(`${i}${this.name}`)
		}
	}

	let sasha = new testCons('sasha');
	sasha.test('пока ');


});
