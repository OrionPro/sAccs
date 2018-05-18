import common from '../../js/common';


import '../../pages/personal-area-balance/personal-area-balance.pug';

import turnOnInput from '../personal-area/personal-area';

import './personal-area-balance.sass';


import animate from '../../js/animate';



$(document).ready(function(){
	"use strict";
	$('.switch').tooltipster({
		trigger: 'none',
		position: 'top',
		animation: 'grow',
		theme: 'tooltipster-shadow'
	});

	turnOnInput({
		input:'.switch',
		btn: '.btn-switch'
	});



});
