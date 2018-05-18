import common from '../../js/common';

require("../../libs/libs").owl_carousel();
import '../../pages/partner-program/partner-program.pug'; //это для обновления страницы при hotreload - при npm build убрать
import '../../pages/modal.pug'; //это для обновления страницы при hotreload - при npm build убрать
import './partner-program.sass';

import animate from '../../js/animate';


$(document).ready(function () {
	"use strict";

	var div = document.querySelector('.partnership_program');
	div.arr = [];


		div.addEventListener('click',(ev)=>{
			let {textContent:t, tagName:tag} = ev.target || 'none';

			div.arr = [...div.arr,{
				[`this is tag - ${tag}`]: t
			}];

			console.log(div.arr);
		});



});

