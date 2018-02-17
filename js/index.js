function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/))
    );
}


$(document).ready(function() {
			if (isMobile()) {
				$("#banner1").css("width", "100");
				$("#banner2").css("width", "100");
				$("#banner3").css("width", "100");
				$("#banner4").css("width", "100");
				$("#banner5").css("width", "100");
				$("#banner6").css("width", "100");
			}
		});