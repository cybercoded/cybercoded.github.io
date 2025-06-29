(function ($) {
  "use strict";

  const $documentOn = $(document);
  const $windowOn = $(window);

  $documentOn.ready( function() {
    //>> Mobile Menu Js Start <<//
    $("#mobile-menu").meanmenu({
      meanMenuContainer: ".mobile-menu",
      meanScreenWidth: "1199",
      meanExpand: ['<i class="far fa-plus"></i>'],
    });

    //>> Sidebar Toggle Js Start <<//
    $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
      $(".offcanvas__info").removeClass("info-open");
      $(".offcanvas__overlay").removeClass("overlay-open");
    });
    $(".sidebar__toggle").on("click", function () {
      $(".offcanvas__info").addClass("info-open");
      $(".offcanvas__overlay").addClass("overlay-open");
    });

    //>> Body Overlay Js Start <<//
    $(".body-overlay").on("click", function () {
      $(".offcanvas__area").removeClass("offcanvas-opened");
      $(".df-search-area").removeClass("opened");
      $(".body-overlay").removeClass("opened");
    });

    //>> Sticky Header Js Start <<//
    $windowOn.on("scroll", function () {
      if ($(this).scrollTop() > 250) {
        $("#header-sticky").addClass("sticky");
      } else {
        $("#header-sticky").removeClass("sticky");
      }
    });      

    //>> Video Popup Start <<//
    $(".img-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    $(".video-popup").magnificPopup({
      type: "iframe",
      callbacks: {},
    });

    //>> Counterup Start <<//
    $(".count").counterUp({
      delay: 15,
      time: 4000,
    });

    //>> Wow Animation Start <<//
    new WOW().init();

    //>> Nice Select Start <<//
    $("select").niceSelect();

    //>> Testimonial Contact Slider Start <<//
    if ($(".testi-content-slider").length > 0) {
      const testiContentSlider = new Swiper(".testi-content-slider", {
        spaceBetween: 30,
        speed: 2000,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".array-prev",
          prevEl: ".array-next",
        },
        pagination: {
          el: ".dot-2",
          clickable: true,
        },
        breakpoints: {
          1199: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          575: {
            slidesPerView: 1,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    }

    //>> Testimonial-slider Slider Start <<//
    if ($(".testimonial-slider").length > 0) {
      const testimonialSliders = new Swiper(".testimonial-slider", {
        spaceBetween: 30,
        speed: 2000,
        loop: true,
        effect: "cards",
        cardsEffect: {
          perSlideOffset: 8,
          perSlideRotate: 2,
          slideShadows: false,
        },
        grabCursor: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".dot",
          clickable: true,
        },
      });
    }

    //>> Testimonials Slider Start <<//
    if ($(".testimonial-slider-2").length > 0) {
      const testimonialSlider2 = new Swiper(".testimonial-slider-2", {
        spaceBetween: 30,
        speed: 2500,
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".array-prev",
          prevEl: ".array-next",
        },
        breakpoints: {
          575: {
            slidesPerView: 1,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    }

    //>> Client Slider Start <<//
    if ($(".brand-slider").length > 0) {
      const brandSlider = new Swiper(".brand-slider", {
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },

        breakpoints: {
          1199: {
            slidesPerView: 5,
          },
          991: {
            slidesPerView: 4,
          },
          767: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 2,
          },
        },
      });
    }

    //>> Project Hover Js Start <<//
    const getSlide = $('.main-box, .box').length - 1;
    const slideCal = 100 / getSlide + '%';
    
    $('.box').css({
        "width": slideCal
    });
    
    $(document).on('mouseenter', '.box', function() {
        $('.box').removeClass('active');
        $(this).addClass('active');
    });     

    //>> Search Popup Start <<//
    const $searchWrap = $(".search-wrap");
    const $navSearch = $(".nav-search");
    const $searchClose = $("#search-close");

    $(".search-trigger").on("click", function (e) {
      e.preventDefault();
      $searchWrap.animate({ opacity: "toggle" }, 500);
      $navSearch.add($searchClose).addClass("open");
    });

    $(".search-close").on("click", function (e) {
      e.preventDefault();
      $searchWrap.animate({ opacity: "toggle" }, 500);
      $navSearch.add($searchClose).removeClass("open");
    });

    function closeSearch() {
      $searchWrap.fadeOut(200);
      $navSearch.add($searchClose).removeClass("open");
    }

    $(document.body).on("click", function (e) {
      closeSearch();
    });

    $(".search-trigger, .main-search-input").on("click", function (e) {
      e.stopPropagation();
    });

    //>> Mouse Cursor Start <<//
    function mousecursor() {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "a, .cursor-pointer", function () {
            ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
              t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
    $(function () {
      mousecursor();
    });

    //>> Back To Top Slider Start <<//
    $windowOn.on("scroll", function () {
      if ($(this).scrollTop() > 20) {
        $("#back-top").addClass("show");
      } else {
        $("#back-top").removeClass("show");
      }
    });

    $documentOn.on("click", "#back-top", function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
      return false;
    });
  }); // End Document Ready Function

   //>> Typed Text Start <<//
  document.addEventListener("DOMContentLoaded", function () {
    const typedEl = document.querySelector(".type-text");
  
    if (typedEl) {
      new Typed(typedEl, {
        strings: [
          '<span class="highlight">UI/UX</span> Designer',
          '<span class="highlight">Web</span> Designer',
          '<span class="highlight">App</span> Developer',
          '<span class="highlight">Web</span> Developer',
        ],
        typeSpeed: 120,
        backSpeed: 60,
        startDelay: 0,
        backDelay: 200,
        loop: true,
        showCursor: false,
        smartBackspace: true,
      });
    }
  });

   //>> Thumb Hover Start <<//
   document.addEventListener("DOMContentLoaded", function () {
    const newsThumbs = document.querySelectorAll(".news-item-2");
  
    newsThumbs.forEach((item) => {
      const thumbHover = item.querySelector(".thumb-hover");
  
      // Skip if .thumb-hover not found
      if (!thumbHover) return;
  
      let animationFrame;
  
      item.addEventListener("mousemove", (event) => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
  
        animationFrame = requestAnimationFrame(() => {
          const rect = item.getBoundingClientRect();
          const dx = event.clientX - rect.left;
          const dy = event.clientY - rect.top;
  
          thumbHover.style.transform = `translate(${dx}px, ${dy}px) rotate(24.15deg)`;
        });
      });
  
      item.addEventListener("mouseleave", () => {
        thumbHover.style.transform = "translate(-50%, -50%) rotate(0deg)"; // Reset position
      });
    });
  });

  function loader() {
    $(window).on("load", function () {
      // Animate loader off screen
      $(".preloader").addClass("loaded");
      $(".preloader").delay(600).fadeOut();
    });
  }

  loader();
})(jQuery); // End jQuery
