$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});
// const fitness = document.querySelector('.fitness'),                     табы на нативный js
//       run = document.querySelector('.run'),
//       trial = document.querySelector('.trial'),
//       catalog_fitness = document.querySelector('.catalog_fitness'),
//       catalog_run = document.querySelector('.catalog_run'),
//       catalog_trial = document.querySelector('.catalog_trial');

// fitness.addEventListener('click', ()=>{
//     if(catalog_run.classList.contains('catalog__content_active')){
//         catalog_run.classList.remove('catalog__content_active');
//         run.classList.remove('catalog__tab_active');
//     }
//     if(catalog_trial.classList.contains('catalog__content_active')){
//         catalog_trial.classList.remove('catalog__content_active');
//         trial.classList.remove('catalog__tab_active');
//     }
//     catalog_fitness.classList.add('catalog__content_active');
//     fitness.classList.add('catalog__tab_active');
// })

// run.addEventListener('click', ()=>{
//     if(catalog_fitness.classList.contains('catalog__content_active')){
//         catalog_fitness.classList.remove('catalog__content_active');
//         fitness.classList.remove('catalog__tab_active');
//     }
//     if(catalog_trial.classList.contains('catalog__content_active')){
//         catalog_trial.classList.remove('catalog__content_active');
//         trial.classList.remove('catalog__tab_active');
//     }
//     catalog_run.classList.add('catalog__content_active');
//     run.classList.add('catalog__tab_active');
// })

// trial.addEventListener('click', ()=>{
//     if(catalog_run.classList.contains('catalog__content_active')){
//         catalog_run.classList.remove('catalog__content_active');
//         run.classList.remove('catalog__tab_active');
//     }
//     if(catalog_fitness.classList.contains('catalog__content_active')){
//         catalog_fitness.classList.remove('catalog__content_active');
//         fitness.classList.remove('catalog__tab_active');
//     }
//     catalog_trial.classList.add('catalog__content_active');
//     trial.classList.add('catalog__tab_active');
// })