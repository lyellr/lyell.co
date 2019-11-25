$(document).ready(function() {
    // navigation click actions 
    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });
    // scroll to top action
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 1200);       
    });
    // mobile nav toggle
    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });
});

// scroll function
function scrollToID(id, speed){
    var offSet = 100;
    if($(window).width() <= 768){
     offSet = 60;
    }
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate({scrollTop:targetOffset}, speed);
}

// ie support
if (typeof console === "undefined") {
    console = {
        log: function() { }
    };
}

// offset fix
$(function () {
/*    $(".navbar-fixed-top").css({"top":$(".carousel").height()});

    $(window).resize(function (e) {
        $(".navbar-fixed-top").css({"top":$(".carousel").height()});
    });*/
    var lastfixed = undefined, 
        spacerEl = undefined,
        fixed = false,
        ghostElHeight = 0;
    
    $(document).on( 'scroll', function(){
        console.log('scroll top : ' + $(window).scrollTop());

        if($(window).scrollTop()>=$(".carousel").outerHeight())
        {
            fixed = true;
            if (fixed === lastfixed) return
             $(".navbar").addClass("navbar-fixed-top");
             ghostElHeight = $(".navbar").outerHeight()
             if (!!!spacerEl){
                 spacerEl = $(".navbar").after(
                        '<div class="navspacer" style="height:' + ghostElHeight + 'px">&nbsp;</div>').next();
             }
        }
        
        if($(window).scrollTop()<$(".carousel").height() + ghostElHeight)
        {
             fixed = false;
             if (fixed === lastfixed) return
             ghostElHeight = 0;
             $(".navbar").removeClass("navbar-fixed-top");
             !!spacerEl && spacerEl.remove();
             spacerEl = undefined;
        }
        
        lastfixed = fixed;
        
    });
});

$('.navbar-collapse a').click(function (e) {
    if($('.navbar-toggle').css('display') == 'block' && !$(this).siblings().length){
        $('.navbar-collapse').collapse('toggle');
    }
});