(function ($) {
  "use strict";
  /*---------------------------------------------------------------------------
# Animated Cursor
---------------------------------------------------------------------------*/
  /* ===== Cursor 01 ===== */
  var $cursor = $(".cursor-1");
  var $cursor2 = $(".cursor-2");

  $(document).on("mousemove", function (e) {
    $cursor.css({ left: e.clientX + "px", top: e.clientY + "px" });
    $cursor2.css({ left: e.clientX + "px", top: e.clientY + "px" });
  });

  /* ===== Cursor 02 ===== */
  if ($(".custom-cursor").length) {
    var cursor = document.querySelector(".custom-cursor__cursor");
    var cursorinner = document.querySelector(".custom-cursor__cursor-two");
    var a = document.querySelectorAll("a");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + "px";
      cursorinner.style.top = y + "px";
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorinner.classList.add("custom-cursor__innerhover");
    });

    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorinner.classList.remove("custom-cursor__innerhover");
    });

    a.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("custom-cursor__hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("custom-cursor__hover");
      });
    });
  }

  /*---------------------------------------------------------------------------
# Preloader
---------------------------------------------------------------------------*/
  $(window).on("load", function () {
    $(".prealoader").addClass("disppear");
  });

  /*---------------------------------------------------------------------------
# Sticky Header
---------------------------------------------------------------------------*/
  var windows = $(window);
  var sticky = $(".header-sticky");
  windows.on("scroll", function () {
    var scroll = windows.scrollTop();
    if (scroll < 250) {
      sticky.removeClass("active");
    } else {
      sticky.addClass("active");
    }
  });

  /*---------------------------------------------------------------------------
# Search Form
---------------------------------------------------------------------------*/
  /* ====== Search Toggle ====== */
  $(".toggle-search").on("click", function () {
    $(".drop-down-search").toggleClass("open");
  });

  /* ====== Search Popup ====== */
  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $("body").toggleClass("locked");
    });
  }

  /*---------------------------------------------------------------------------
# Tabs
---------------------------------------------------------------------------*/
  /* ======== Tab 01 ======== */
  $(".tab-wrap .tab-btn-group")
    .addClass("active")
    .find("> .tab-btn-group__btn:eq(0)")
    .addClass("current");
  $(".tab-wrap .tab-btn-group .tab-btn-group__btn").click(function (g) {
    var tab = $(this).closest(".tab-wrap"),
      index = $(this).closest(".tab-btn-group__btn").index();
    tab.find(".tab-btn-group > .tab-btn-group__btn").removeClass("current");
    $(this).closest(".tab-btn-group__btn").addClass("current");
    tab
      .find(".tab-content")
      .find(".tab-content__item")
      .not(".tab-content__item:eq(" + index + ")")
      .slideUp();
    tab
      .find(".tab-content")
      .find(".tab-content__item:eq(" + index + ")")
      .slideDown();
    g.preventDefault();
  });

  /* ======== Tab 02 ======== */
  $(".tab-content-wrap__item:first-child").addClass("active");
  $(".tab-button__tablinks:first-child").addClass("active");

  $(".tab-button__tablinks").on("click", function () {
    const index = $(this).index();
    $(".tab-content-wrap__item").removeClass("active");
    $(".tab-button__tablinks").removeClass("active");

    $(this).addClass("active");
    $(".tab-content-wrap__item").eq(index).addClass("active");
  });

  /*---------------------------------------------------------------------------
# Accordion
---------------------------------------------------------------------------*/
  $(".accordion-item__btn").on("click", function () {
    const itemToggle = $(this).attr("aria-expanded");
    $(".accordion-item__btn").attr("aria-expanded", "false");
    if (itemToggle == "false") {
      $(this).attr("aria-expanded", "true");
    }
  });

  /*---------------------------------------------------------------------------
# Mobile Menu
---------------------------------------------------------------------------*/
  /* ======== canvas Menu Activation  ======== */
  $(".offcanvas-menu-open").on("click", function () {
    $(".offcanvas-menu__wrapper,.off-canvars-overlay").addClass("active");
  });

  $(".offcanvas-menu-close,.off-canvars-overlay").on("click", function () {
    $(".offcanvas-menu__wrapper,.off-canvars-overlay").removeClass("active");
  });

  /* ======== Off Canvas Menu  ======== */
  var $offcanvasNav = $(".offcanvas-main-menu"),
    $offcanvasNavSubMenu = $offcanvasNav.find(".sub-menu");
  $offcanvasNavSubMenu
    .parent()
    .prepend(
      '<span class="menu-expand"><svg fill="#ffffff" width="17" height="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></span>'
    );

  $offcanvasNavSubMenu.slideUp();

  $offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
    var $this = $(this);
    if (
      $this
        .parent()
        .attr("class")
        .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
      ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
    ) {
      e.preventDefault();
      if ($this.siblings("ul:visible").length) {
        $this.siblings("ul").slideUp("slow");
      } else {
        $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
        $this.siblings("ul").slideDown("slow");
      }
    }
    if (
      $this.is("a") ||
      $this.is("span") ||
      $this.attr("clas").match(/\b(menu-expand)\b/)
    ) {
      $this.parent().toggleClass("menu-open");
    } else if (
      $this.is("li") &&
      $this.attr("class").match(/\b('menu-item-has-children')\b/)
    ) {
      $this.toggleClass("menu-open");
    }
  });

  /*---------------------------------------------------------------------------
# Back To Top Button
---------------------------------------------------------------------------*/
  var mybutton = $("#scroll-btn");

  $(window).on("scroll", function () {
    scrollFunction();
  });

  function scrollFunction() {
    if ($(document).scrollTop() > 50) {
      mybutton.css("opacity", "1");
    } else {
      mybutton.css("opacity", "0");
    }
  }

  mybutton.on("click", function () {
    topFunction();
  });

  function topFunction() {
    $("body, html").animate({ scrollTop: 0 }, 800);
  }

  /*---------------------------------------------------------------------------
# Modal
---------------------------------------------------------------------------*/
  var modalPopup = $(".modal-popup");
  var trigger = $(".moadl-trigger");
  var closeButton = $(".modal-popup__close");
  function toggleModal() {
    modalPopup.toggleClass("active");
    $("body").toggleClass("locked");
  }
  function windowOnClick(event) {
    if (event.target === modalPopup[0]) {
      toggleModal();
    }
  }
  trigger.on("click", toggleModal);
  closeButton.on("click", toggleModal);
  $(window).on("click", windowOnClick);
})(jQuery);
