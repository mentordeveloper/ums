
function reset_pass_instant(userid, emailaddress, role)
{

    $.fancybox({
        'width': 400,
        'height': 100,
        'scrolling': 'no',
        'hideOnOverlayClick': true,
        'enableEscapeButton': true,
        'showCloseButton': true,
        'transitionIn': 'fade',
        'transitionOut': 'fade',
        'href': $('#base_url').val() + "permissions/reset_password_by_id?update=" + userid + "&check=" + role + '&email=' + emailaddress,
    });

}


function send_notification()
{

    var value = $("#field_courses option:selected").val();

    var value_text = $("#field_courses option:selected").text();

    if (value == 0 || value_text == 'Personal' || value_text == 'School Calendar')
    {

        $('#msg_user').html('<div class="alert alert-error" style="margin-bottom:0px;"><button data-dismiss="alert" class="close"></button><strong>Error !</strong>Please select course!</div>');

        $("#global_use_msg").fancybox().trigger('click');

        setTimeout(function() {
            $.fancybox.close();
        }, 2000);

        return false;

    }

    var notification_text = $('#notification_text').val();

    if (notification_text == '')
    {
        $('#msg_user').html('<div class="alert alert-error" style="margin-bottom:0px;"><button data-dismiss="alert" class="close"></button><strong>Error !</strong>Please provide text!</div>');

        $("#global_use_msg").fancybox().trigger('click');

        setTimeout(function() {
            $.fancybox.close();
        }, 2000);

        return false;

    }

    generate_html_notification_sep();

}

///send notifcation call start
function generate_html_notification_sep()
{

    var path = '';

    if ($('#uiview').val() == 1) {
        path = $('#base_url').val() + "messaging/g_s_n_h_r_v1/";
    } else {
        path = $('#base_url').val() + "messaging/s_s_n_h_v1/";
    }

//    $modal.load($('#base_url').val() + 'permissions/search_released_students');

    
    $.ajax({
        url: path,
        type: "POST",
       
        context: document.body,
        cache: false,
        success: function(data) {

            $('#msg_user').html(data);
            $("#global_use_msg").fancybox().trigger('click');

        }

    });
}



function trigger_notification_by_role()
{

    var return_data = ui_access_trigger();

    if (return_data == 'all')
    {
        //////////////if its 0 then 1 thing is confirm it should display notification

        $('<div></div>').appendTo('body')
                .html('<div><h6>Send message to all Roles?</h6></div>')
                .dialog({
            modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
            width: 'auto', resizable: false,
            buttons: {
                Yes: function() {

                    push_call_confirm_roles();

                    $('#notification_sended').show();
                    $(this).dialog("close");
                    $('#inline1_email_confirm').html('<div class="portlet box green" style="margin-top:2px;margin-bottom:0px;"><div class="portlet-title"><div class="caption"><i class="icon-cogs"></i>Notification</div></div><div class="portlet-body"><div class="alert alert-success"><strong>Success!</strong> Notifications Sent </div> </div></div>');

                    $("#email_confirm_chooser").fancybox().trigger('click');

                    setTimeout(function() {
                        $.fancybox.close();
                    }, 1300);

                },
                No: function() {
                    $(this).dialog("close");
                }
            },
            close: function(event, ui) {
                $(this).remove();
            }
        });

        ///////////////////aler code end

    } else
    {

        var res = '';
        var success = 0;
        // if not any option is selected
        if (return_data.length == 0)
        {

            $('#notifications_send').html('<span style="color:red">please select any role<span>');
            return false;

        }
        // if not any option is selected
        for (var k = 0; k < return_data.length; k++)
        {
            push_call_by_role(return_data[k]);

        }

        $('#notification_sended').show();

        $('#inline1_email_confirm').html('<div class="portlet box green" style="margin-top:2px;margin-bottom:0px;"><div class="portlet-title"><div class="caption"><i class="icon-cogs"></i>Notification</div></div><div class="portlet-body"><div class="alert alert-success"><strong>Success!</strong> Notification Sent </div> </div></div>');

        $("#email_confirm_chooser").fancybox().trigger('click');

        setTimeout(function() {
            $.fancybox.close();
        }, 1300);

    }


}

function ui_access_trigger()
{

    var master = '';
    var selectors_ids = new Array();
    var counter = 0;

    $("input[name='options[]']:checked").each(function()
    {

        if ($(this).val() == 'all')
        {
            master = 'all';
        } else
        {
            selectors_ids[counter] = $(this).val();
        }

        counter++;

    });

    if (master == 'all')
    {
        return 'all';

    } else
    {
        return selectors_ids;
    }

}


function push_call_confirm_roles()
{

    $.ajax({
        url: $('#base_url').val() + "instructor/send_notification_all_roles/",
        type: "GET",
        data: 'text=' + $('#notification_text').val(),
        context: document.body,
        cache: false,
        success: function(data) {

            var obj = JSON.parse(data);

            if (obj['Sended'] != '')
            {
                var html = 'Sended to ' + obj['Sended'] + ' users </br>';
                $('#notifications_send').append(html);



            }
            if (obj['Failed'] != '')
            {
                var html = 'Sending Failed ' + obj['Failed'] + ' users </br>';
                $('#notifications_send').append(html);
            }

        }

    });


}


function push_call_by_role(id)
{

    $.ajax({
        url: $('#base_url').val() + "instructor/send_notification_by_role/",
        type: "GET",
        data: "id=" + id + "&text=" + $('#notification_text').val(),
        context: document.body,
        cache: false,
        success: function(data) {

            var obj = JSON.parse(data);

            if (obj['Sended'] != '')
            {
                var html = 'Sended to ' + obj['Sended'] + ' users </br>';
                $('#notifications_send').append(html);

            }
            if (obj['Failed'] != '')
            {
                var html = 'Sending Failed ' + obj['Failed'] + ' users </br>';
                $('#notifications_send').append(html);

            }

        }
    });

}

	