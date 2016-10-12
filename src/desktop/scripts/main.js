requirejs.config({
    paths: {
   	    jquery: 'vendors/jquery/dist/jquery.min',
        underscore: 'vendors/underscore/underscore-min',
        fastclick: 'vendors/fastclick/lib/fastclick',
        slick: 'vendors/slick-carousel/slick/slick.min',
        slideout: 'vendors/slideout.js/dist/slideout.min',
   	    domready: 'modules/helpers/domready',
   	    text: 'modules/helpers/text',
    }
});

require([
	'!domready',
	'jquery',
    'fastclick',
    'slideout',
    'slick'
	], function(domReady, $, FastClick, Slideout) {
		$('html').removeClass('no-js').addClass('js');
        
        FastClick.attach(document.body);

        if($('.carrousel__list').slick){
            $('.carrousel').addClass('carrousel--slicked');
            $('.carrousel').removeClass('carrousel--default');

            $('.carrousel__list').each(function(){
                var $list = $(this);
                var autoplay =  $list.is('.carrousel__list--auto-play');
                var random =  $list.is('.carrousel__list--random');
                var dots =   $list.is('.carrousel__list--dots');
                var initialSlide = 0;

                if(random){
                    initialSlide = Math.floor(Math.random() * $list.find('.carrousel__item').length);
                }

                $list.slick({
                    dots: dots,
                    speed: 500,
                    autoplaySpeed: 4000,
                    pauseOnHover: true,
                    easing: 'swing',
                    autoplay: autoplay,
                    initialSlide: initialSlide
                });

            });

            $('.carrousel__list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
                var infoText = $('*[data-slick-index="' + nextSlide + '"]').find('.carrousel__info').html();
                $('.carrousel__item-description').html(infoText);
            });

            var infoText = $('*[data-slick-index="0"]').find('.carrousel__info').html();
            $('.carrousel__item-description').html(infoText);
        }

        // Will place this in an seperate main.js for mobile use only later on
        var slideout = new Slideout({
            'panel': document.getElementById('content'),
            'menu': document.getElementById('mobile'),
            'padding': 256,
            'tolerance': 70,
            'touch': false
        });


        $('#mobile-toggle').on('click', function(){
            slideout.toggle();
            $('#mobile-open').toggle();
            $('#mobile-close').toggle();
        })



        //  Responsive videos
        var $allVideos = $("iframe");
        $allVideos.each(function() {
            $(this)
                .data('aspectRatio', this.height / this.width)
                .removeAttr('height')
                .removeAttr('width');
        });

        $(window).resize(function() {
            $allVideos.each(function() {
                var $el = $(this);
                var $parent = $el.parent();
                var newWidth = $parent.width();
                $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

            });
        }).resize();

	}
);