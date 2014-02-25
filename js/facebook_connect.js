// JavaScript Document

$(document).ready(function() {

    FB.init({
        appId: '439619702760948',
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });

});

function events_map_facebook()
{

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {

            FB.api("/fql?q=SELECT eid,name,start_time,description,location,end_time FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = me()", function(response) {
                send_ajax_events(response);
            });

        } else if (response.status === 'not_authorized') {

            FB.login(function(response) {

                FB.api("/fql?q=SELECT eid,name,start_time,description,location,end_time FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = me()", function(response) {
                    alert(response.first_name + "0");
                });
            }, {perms: ''});

        } else {

            FB.login(function(response) {
                FB.api("/fql?q=SELECT eid,name,start_time,description,location,end_time FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid = me()", function(response) {
                    send_ajax_events(response);
                });

            }, {perms: ''});

        }
    });


}

function send_ajax_events(object)
{

    var json = JSON.stringify(object);
    console.log(json);

}

function facebook_login(value)
{

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', function(response) {
                send_ajax(response);
            });
        } else if (response.status == 'not_authorized') {

            FB.login(function(response) {
            }, {scope: 'email,user_birthday,user_location,user_photos,user_about_me'});

        } else {
            FB.login(function(response) {

                FB.api('/me', function(response) {

                    send_ajax(response);

                });

            }, {scope: 'email,user_birthday,user_location,user_photos,user_about_me'});

        }
    });
}

function send_ajax(obj)
{
    var json = JSON.stringify(obj);

    $.ajax({
        url: $('#base_url').val() + "instructor/import_information_facebook/",
        type: "GET",
        context: document.body,
        cache: false,
        data: "obj=" + json,
        success: function(data) {

            window.location = $('#base_url').val() + "instructor/profile?go=true&msg=Added successfully";

        }
    });

}