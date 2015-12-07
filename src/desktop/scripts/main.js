requirejs.config({
    paths: {
   	    jquery: 'vendors/jquery/dist/jquery.min',
        underscore: 'vendors/underscore/underscore-min',
        fastclick: 'vendors/fastclick/lib/fastclick',
        slick: 'vendors/slick-carousel/slick/slick.min',
   	    domready: 'modules/helpers/domready',
   	    text: 'modules/helpers/text',
    }
});

require([
	'!domready',
	'jquery',
    'fastclick',
    'slick'
	], function(domReady, $, FastClick) {
		$('html').removeClass('no-js').addClass('js');
        FastClick.attach(document.body);

        if($('.carrousel__list').slick){
            $('.carrousel').addClass('carrousel--slicked');
            $('.carrousel').removeClass('carrousel--default');

            $('.carrousel__list').slick({
                // autoplay: true,
                speed: 400,
                pauseOnHover: true,
                easing: 'swing'
            });

            $('.carrousel__list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                var infoText = $('*[data-slick-index="' + nextSlide + '"]').find('.carrousel__info').html();
                $('.carrousel__item-description').html(infoText);
            });

            var infoText = $('*[data-slick-index="0"]').find('.carrousel__info').html();
            $('.carrousel__item-description').html(infoText);
        }

	}
);