document.addEventListener(
    "DOMContentLoaded", () => {
        // Fire the plugin
        const menu = new Mmenu( "#my-menu", {
            "extensions": [
               "fx-menu-zoom",
               "pagedim-black",
               "theme-black",
               "position-right",
               "border-none"
            ],
            "onClick": {
                preventDefault: true,
                close: true
            },
            "navbar": {
                title: '<a href="#"><img src="./images/logo-1.svg" alt="" class="logo"></a>'
            }
         });

        const api = menu.API;

        api.bind( "open:finish",
            () => {
                document.querySelector('.hamburger').classList.add('is-active')
            }
        );
        api.bind( "close:finish",
            () => {
                document.querySelector('.hamburger').classList.remove('is-active')
            }
        );
    }
);
$(document).ready(function(){
    $(".services-carousel").on('initialized.owl.carousel', function(){
        setTimeout(function() {
            carouselWidth()
        }, 100);
    });
    $(".services-carousel").owlCarousel({
        loop: true,
        nav: true,
        navText: [
            '<i class="icon-angle-double-left"></i>', '<i class="icon-angle-double-right"></i>'
        ],
        dots: false,
        smartSpeed: 700,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1100: {
                items: 3
            }
        }
    });

    function carouselWidth() {
        $('.services-carousel__item').each(function() {
            let ths = $(this),
                thsheight = ths.find('.services-carousel__item-content').innerHeight();
                ths.find('.services-carousel__item-image').css('height', thsheight);
        });
    };

    //resize window
    function onResize(){
        $('.services-carousel__item-content').equalHeights();
    }onResize();

    window.addEventListener("resize", function() {
        onResize();
    }, false);

    // FORORAMA
    $('.fotorama').fotorama({
        width: 1000,
        maxwidth: '100%',
        arrows: true,
        nav: 'thumbs',
        thumbwidth: 85,
        thumbheight: 65, 
        thumbmargin: 10,
        thumbborderwidth: 5,
        keyboard: true,
        click: true
      });
      // FORORAMA

    //E-mail Ajax Send
	$(".form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "GET",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find(".form__success").classList.add(".active").css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
                // Done Functions
                $(th).find(".form__success").classList.remove(".active").fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
    });
    //E-mail Ajax Send
});

