$(function () {
  if ($(window).width() > 1024) {
    skrollr.init({forceHeight: false,smoothScrolling: true, smoothScrollingDuration: 1500});
  }
});