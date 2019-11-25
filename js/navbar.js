$(document).ready(function() {
    // scroll to top action
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 1200);       
    });
});

    // navigation click actions 
    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });

   // scroll function
function scrollToID(id, speed){
    var offSet = 0;
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate({scrollTop:targetOffset}, speed);
}


$('.navbar-collapse a').click(function (e) {
    if($('.navbar-toggle').css('display') == 'block' && !$(this).siblings().length){
        $('.navbar-collapse').collapse('toggle');
    }
});