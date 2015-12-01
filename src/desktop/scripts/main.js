requirejs.config({
   paths: {
   	 jquery: 'vendors/jquery/jquery.min',
   	 domReady: 'modules/helpers/domready',
   	 text: 'modules/helpers/text',
     underscore: 'vendors/underscore/underscore-min'
  }
});

require([
	'!domReady',
	'jquery'
	], function(domReady, $) {
		$('html').removeClass('no-js').addClass('js');
	}
);