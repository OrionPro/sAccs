import common from '../../js/common';


import '../../pages/personal-area-promotional-materials/personal-area-promotional-materials.pug';

import './personal-area-promotional-materials.sass';


import animate from '../../js/animate';



$(document).ready(function(){

	// страница personal-area-promotional-materials.html кнопка показать код
	$('.profile_body_balance .show-code').on('click', function (e) {
		e.preventDefault();
		if($(this).hasClass('hide-code')){
			$(this).parent().siblings('.affiliate-links').hide('fade').end().add(this).children().text('Показать код').removeClass('hide-code');
		} else {
			$(this).parent().siblings('.affiliate-links').show('fade').end().add(this).children().text('Скрыть код').addClass('hide-code');
		}
	});


});
