import common from '../../js/common';


import '../../pages/akkaunty-mail/akkaunty-mail.pug';

import './akkaunty-mail.sass';

//import {showLinksContent} from '../../js/common'

import {NewModalBehavior} from '../index/index'

import animate from '../../js/animate';
$(document).ready(function(){
	"use strict";

	new NewModalBehavior.validation('.ti_body_form > form > input');

	// showLinksContent({
	// 	btn: '.tba_item_button',
	// 	class: 'rotate_i'
	// });


});