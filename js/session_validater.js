
idleTime = 0;

$(document).ready(function() {

    var trigger = $('#demo').val();

    if (trigger == 'yes')
    {
        $('#demo').val('no');
        window.location = $('#base_url').val() + 'settings/?go=demo';

    }

    /*
     * 
     * @type @exp;@call;$@call;val
     * if you want to block session goes close, like on login page use this
     */

    var page_value = $('#pagetimeoff').val();

    if (page_value != '0') {
        var idleInterval = setInterval("timerIncrement()", 60000); // 1 minute //60000
    }



    //Zero the idle timer on mouse movement.
    $(this).mousemove(function(e) {
        idleTime = 0;
    });
    $(this).keypress(function(e) {
        idleTime = 0;
    });

});

///timmer to logout the user
function timerIncrement() {

    idleTime = idleTime + 1;
    console.log(idleTime);

    if (idleTime > 18) {

        $.fancybox({
            'width': 400,
            'height': 100,
            'scrolling': 'no',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'showCloseButton': false,
            'transitionIn': 'fade',
            'transitionOut': 'fade',
            'href': $('#base_url').val() + "login/notification_view_idle",
        });

    }

    if (idleTime > 20)
    {
        window.location = $('#base_url').val() + 'permissions/logout';
    }

}

///logout the user from session

function logout_user()
{
    $.fancybox.close();
}

$(document).ready(function() {

    var page_value = $('#pagetimeoff').val();

    if (page_value != '0') {
        setTimeout(function() {
            event_mine_session();
        }, 30000);
    }

});

function event_mine_session() {

    setTimeout(function() {
        $.ajax({
            url: $('#base_url').val() + "instructor/session_validate/",
            type: "GET",
            context: document.body,
            cache: false,
            success: function(data) {

                var obj = jQuery.parseJSON(data);

                /*
                 * 1 means its logout from system
                 */

                if (obj['status'] == '1') {

                    var global_session = $('#global_session').val();

                    if (global_session == 'no') {

                        $.fancybox({
                            'width': 418,
                            'height': 500,
                            'scrolling': 'auto',
                            'hideOnOverlayClick': false,
                            'enableEscapeButton': false,
                            'showCloseButton': false,
                            'transitionIn': 'fade',
                            'transitionOut': 'fade',
                            'type': 'iframe',
                            'href': $('#base_url').val() + "instructor/load_login/?url=" + document.URL + "&side=" + $('#side').val() + "&side_popup=" + $('#user_side_popup').val(),
                        });

                        $('#global_session').val('yes');

                    }

                }else {

                    /*
                     * FOR TIMMER
                     */
                    var obj = JSON.parse(data);

                    if (obj['response'] == 2) {
                        if (obj['announcement_html'] != '') {
                            $( obj['announcement_html'] ).insertAfter( $( ".portlet-config" ).find(".container-fluid").find(".row-fluid") );
//                            $("#notification_div_hide").html();
//                            $("#notification_div_hide").fadeIn("Fast");
                        }
                        $('#reminder_popup').empty();

                        /*
                         * 2 MEANS THAT THERE IS SOME REMINDER TRIGGER
                         */

                        for (var i = 0; i < obj['data'].length; i++)
                        {
                            var string = '#gritterid_' + obj['data'][i]['r_id'];

                            if ($(string).val() != 1) {

                                $.extend($.gritter.options, {
                                    position: 'top-right'
                                });

                                var unique_id = $.gritter.add({
                                    // (string | mandatory) the heading of the notification
                                    title: obj['data'][i]['title'],
                                    // (string | mandatory) the text inside the notification
                                    text: obj['data'][i]['html_data'],
                                    // (string | optional) the image to display on the left
                                    image: $('#base_url').val() + '/files/icons/1361733025_Alarm.png" class="gritter-image',
                                    // (bool | optional) if you want it to fade out on its own or just sit there
                                    sticky: true,
                                    // (int | optional) the time you want it to be alive for before fading out
                                    time: '',
                                    // (string | optional) the class name you want to apply to that specific message
                                    class_name: 'my-sticky-class'
                                });

                                var string = '#vgritterid_' + obj['data'][i]['r_id'];
                                $(string).val(unique_id);
                            }

                        }
                    }
                    if (obj['response'] == 5) {
                        if (obj['announcement_html'] != '') {
                            $( "div" ).remove( "#notification_div_hide" );
                            $( '<div id="notification_div_hide" style="display: none;"></div>' ).prependTo($(".row-fluid").parents().find( ".page-content" ));//console.log(obj['announcement_html']);
                            $("#notification_div_hide").html(obj['announcement_html']);
                            $("#notification_div_hide").fadeIn("Fast");
                        }
                    }
                }
            }
        });


        start_Session();



    }, 10000);
}

/*
 * SET SESSION CODE 
 */

function start_Session() {
    event_mine_session();
}

/*
 * REMINDER SET CODE
 */

function set_snooze(id) {

    $.ajax({
        url: $('#base_url').val() + "reminder/snooze_reminder/",
        type: "GET",
        context: document.body,
        cache: false,
        data: "id=" + id,
        success: function(data) {

            if (data) {
                $.gritter.remove($('#vgritterid_' + id).val(), {
                    fade: true,
                    speed: 'slow'
                });

//				$('#reminder_check').val('no');
            }

        }
    });
}

/*
 * REMINDER DISMISS CODE
 */

function set_dismiss(id, name) {

    $.ajax({
        url: $('#base_url').val() + "reminder/dismiss_notice/",
        type: "GET",
        context: document.body,
        cache: false,
        data: "id=" + id + "&name=" + name,
        success: function(data) {

            if (data) {

                $.gritter.remove($('#vgritterid_' + id).val(), {
                    fade: true,
                    speed: 'slow'
                });

            }

        }
    });

}

function announcement_close_handle(id){
    setCookie("announcement-"+id,id,300);
}
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}