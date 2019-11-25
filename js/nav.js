function hash_switch(hash) {
	switch (hash) {
		case "#splash":
			$("#splash_logo").slideDown();
    		$(".splash_init").slideDown();
    		$(".splash_production").slideUp();
    		$(".splash_solo").slideUp();
    		$(".splash_software").slideUp();
    		$(".splash_teaching").slideUp();
        	$(".splash_scores").slideUp();
        	$(".menu_line").slideUp();
        	window.scrollTo(0,0);
        	break;

		case "#scores":
			$("#splash_logo").slideUp();
			if($('#audio-player').css("visibility") == "hidden") {
				$('#audio-player').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0})
			}
    		$(".splash_init").slideUp();
    		$(".splash_production").slideUp();
    		$(".splash_solo").slideUp();
    		$(".splash_software").slideUp();
    		$(".splash_teaching").slideUp();
        	$(".splash_scores").slideToggle(600);
        	$(".menu_line").slideDown(600);
        	window.scrollTo(0,0);
        	break;
        case "#production":
	        $("#splash_logo").slideUp();
			if($('#audio-player').css("visibility") == "hidden") {
				$('#audio-player').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0})
			}
	    	$(".splash_init").slideUp();
	    	$(".splash_scores").slideUp();
	    	$(".splash_solo").slideUp();
	    	$(".splash_software").slideUp();
	    	$(".splash_teaching").slideUp();
	        $(".splash_production").slideToggle(600);
        	$(".menu_line").slideDown(600);
        	window.scrollTo(0,0);
	        break;
	    case "#solo":
		    $("#splash_logo").slideUp();
			if($('#audio-player').css("visibility") == "hidden") {
				$('#audio-player').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0})
			}
	    	$(".splash_init").slideUp();
	    	$(".splash_scores").slideUp();
	    	$(".splash_production").slideUp();
	    	$(".splash_software").slideUp();
	    	$(".splash_teaching").slideUp();
	        $(".splash_solo").slideToggle(600);
        	$(".menu_line").slideDown(600);
        	window.scrollTo(0,0);
	        break;
	    case "#development":
	    	$("#splash_logo").slideUp();
			if($('#audio-player').css("visibility") == "hidden") {
				$('#audio-player').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0})
			}
    		$(".splash_init").slideUp();
    		$(".splash_scores").slideUp();
    		$(".splash_solo").slideUp();
    		$(".splash_teaching").slideUp();
    		$(".splash_production").slideUp();
        	$(".splash_software").slideToggle(600);
        	$(".menu_line").slideDown(600);
        	window.scrollTo(0,0);
        	break;
        case "#instruction":
	    	$("#splash_logo").slideUp();
			if($('#audio-player').css("visibility") == "hidden") {
				$('#audio-player').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0})
			}
	    	$(".splash_init").slideUp();
	    	$(".splash_scores").slideUp();
	    	$(".splash_solo").slideUp();
	    	$(".splash_software").slideUp();
	    	$(".splash_production").slideUp();
	        $(".splash_teaching").slideToggle(600);
        	$(".menu_line").slideDown(600);
        	window.scrollTo(0,0);
	        break;
	}
}

function open_menu_mobile() {
	$("#splash_nav_mobile_menu").slideDown(300);
	//document.getElementById(active).style.fontWeight = "bold";
	$('body').bind('touchmove', function(e){e.preventDefault()});
	$('body').addClass('stop-scrolling');
	document.getElementById('splash_nav_mobile_menu_container').addEventListener('click', close_menu_mobile);
	document.onkeydown = function(evt) {
	    evt = evt || window.event;
	    var isEscape = false;
	    if ("key" in evt) {
	        isEscape = (evt.key == "Escape" || evt.key == "Esc");
	    } else {
	        isEscape = (evt.keyCode == 27);
	    }
	    if (isEscape) {
	        close_menu_mobile();
	    }
	};
}

function close_menu_mobile() {
	$("#splash_nav_mobile_menu").slideUp(300);
	$('body').unbind('touchmove');
	$('body').removeClass('stop-scrolling');
}

$(window).bind('hashchange', function() {
	hash_switch (location.hash);
});

$(document).ready(function(){
	hash_switch (location.hash);
});