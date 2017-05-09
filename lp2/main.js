$(document).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
    
    $('#gotop').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 1653);
        return false;
    });
});
