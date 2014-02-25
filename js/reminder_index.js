// JavaScript Document
$(document).ready(function() {

    $('#date_picker_inline').datepicker({
        dateFormat: "dd-mm-yy",
    });

});

$('#reminder_time').click(function(e) {

    $('#rem_mins').html('');
});
$('#reminder_date').click(function(e) {

    $('#rem_date').html('');
});
$('#reminder_name').click(function(e) {

    $('#rem_name').html('');
});
$('#reminder_name_2').click(function(e) {

    $('#rem_name').html('');
});

function open_reminder_ui(ev_id, name_by)
{

    $.ajax({
        url: $('#base_url').val() + "reminder/generate_new_ui/",
        type: "GET",
        data: "ev_id=" + ev_id + '&name_by=' + name_by,
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

        }
    });

}

function selector_timer_minutes()
{

    var selected_value = $('#selector_automatic :selected').val();

    if (selected_value != 'none')
    {
        $('#manual_select').prop('checked', false);
        $('.manual_timer_log').hide();
    }

    if ($('#manual_select').is(':checked'))
    {
        $('.manual_timer_log').show();
    }


}

function enabled_areas()
{

    if ($('#manual_select').is(':checked'))
    {
        $('.manual_timer_log').show();
        $("#selector_automatic option[value='none']").prop('selected', true);
    } else
    {
        $('.manual_timer_log').hide();
    }

}

function dismiss_reminder_by_id(id)
{

    $('<div></div>').appendTo('body')
            .html('<div><h6>Delete Reminder?</h6></div>')
            .dialog({
        modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {
                confirm_remove(id);
                $(this).dialog("close");

                //$('#inline1_email_confirm').html('Notifications Sended!');

                //$("#email_confirm_chooser").fancybox().trigger('click');

                //$('#notification_text').val('');

            },
            No: function() {
                $(this).dialog("close");
            }
        },
        close: function(event, ui) {
            $(this).remove();
        }
    });

}

function confirm_remove(id)
{
    
    $.ajax({
        url: $('#base_url').val() + "reminder/dismiss_reminder_by_id/",
        type: "GET",
        data: 'id=' + id,
        context: document.body,
        cache: false,
        success: function(data) {

             
            $('#' + id + '_remove').remove();
            $('#img_remove_' + id).remove();

            $('#list_pop_types').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! Reminder removed</strong></div>');
            $("#events_type_list").fancybox().trigger('click');
            setTimeout(function() {
                $.fancybox.close();
            }, 1800);
            //window.location.reload();		
        }

    });

}

function Dismiss_remider(r_id)
{
    $.ajax({
        url: $('#base_url').val() + "reminder/dismiss_reminder/",
        type: "GET",
        data: 'r_id=' + r_id,
        context: document.body,
        cache: false,
        success: function(data) {

            ////trigget the event again
//            show_event(ev_id);
            $('#' + r_id + '_remove').remove();
            $('#img_remove_' + r_id).remove();
            $('#list_pop_types').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong></div>');
            $("#events_type_list").fancybox().trigger('click');
            setTimeout(function() {
                $.fancybox.close();
            }, 1100);
            //window.location.reload();	
        }

    });


}

function update_reminder(ev_id)
{
//alert($('#reminder_name_2').val());
    var html = '';
    var minutes = '';
    var name = '';
    var hours = '';
    var description = '';
    flag = 0;
    $('#reminder_error').remove();

    if ($('#manual_select').is(':checked'))
    {

        if ($('#reminder_name_2').val() == '')
        {
            flag = 1;
            $('#rem_name').html('Please enter reminder name ');
        }

        if (flag == 1)
        {
            return false;
        }

        name = $('#reminder_name_2').val();
        minutes = $('#reminder_minutes').val();
        hours = $('#reminder_hours').val();

    } else
    {
        if ($('#reminder_date').val() == '')
        {
            flag = 1;
            $('#rem_date').html('Please enter reminder date ');

        }

        if ($('#reminder_time').val() == '')
        {
            flag = 1;
            $('#rem_mins').html('Please provide a time');
        }
        if ($('#reminder_name_2').val() == '')
        {
            flag = 1;
            $('#rem_name').html('Please enter reminder name ');
        }

        var selected_value = $('#selector_automatic :selected').val();

        if (selected_value == 'none')
        {
            flag = 1;
            $('#rem_time_interval').html('Please select time interval');
        }

        if (flag == 1)
        {

            return false;
        }

        name = $('#reminder_name_2').val();
        minutes = $('#selector_automatic :selected').val();

    }

    description = $('#r_description').val();

    $.ajax({
        url: $('#base_url').val() + "reminder/update_reminder_old/",
        type: "GET",
        data: "rem_id=" + ev_id + "&reminder_name=" + $('#reminder_name_2').val() + "&description=" + description + "&reminder_minutes=" + minutes + "&reminder_hours=" + hours + "&ev_id=" + ev_id + "&r_manual_date=" + $('#reminder_date').val() + "&r_manual_time=" + $('#reminder_time').val(),
        context: document.body,
        cache: false,
        success: function(data) {

            show_event(ev_id);

            $('#list_pop_types').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> </div>');
            $("#events_type_list").fancybox().trigger('click');
            $('#msg_rem').hide();

            setTimeout(function() {
                $.fancybox.close();
            }, 1800);
            //window.location.reload();		

            $('#' + ev_id + '_remove').html(data);

        }

    });


}

function Save_reminder(ev_id)
{

    var html = '';
    var minutes = '';
    var name = '';
    var hours = '';
    var description = '';

    $('#reminder_error').remove();
    var flag = 0;
    if ($('#manual_select').is(':checked'))
    {

        if ($('#reminder_date').val() == '')
        {
            flag = 1;
            $('#rem_date').html('Please enter reminder date ');
        }

        if ($('#reminder_name_2').val() == '')
        {
            flag = 1;
            $('#rem_name').html('Please enter reminder name ');
        }

        if ($('#reminder_time').val() == '')
        {
            flag = 1;
            $('#rem_mins').html('Please provide a time');
        }

        if (flag == 1)
        {
            return false;
        }

        name = $('#reminder_name_2').val();
        minutes = $('#reminder_minutes').val()
        hours = $('#reminder_hours').val();

    } else
    {
        if ($('#reminder_date').val() == '')
        {
            flag = 1;
            $('#rem_date').html('Please enter reminder date ');
        }

        if ($('#reminder_time').val() == '')
        {
            flag = 1;
            $('#rem_mins').html('Please provide a time');
        }
        if ($('#reminder_name_2').val() == '')
        {
            flag = 1;
            $('#rem_name').html('Please enter reminder name ');
        }

        var selected_value = $('#selector_automatic :selected').val();
        // alert(selected_value);
        if (selected_value == 'none')
        {
            flag = 1;
            $('#rem_time_interval').html('Please select time interval');
        } else {
            $('#rem_time_interval').html('');
        }

        if (flag == 1)
        {
            return false;
        }

        name = $('#reminder_name_2').val();
        minutes = $('#selector_automatic :selected').val();

    }

    description = $('#r_description').val();

    $.ajax({
        url: $('#base_url').val() + "reminder/save_reminder_new/",
        type: "GET",
        data: 'reminder_name=' + $('#reminder_name_2').val() + "&reminder_hours=" + hours + "&reminder_minutes=" + minutes + "&description=" + description + "&ev_id=" + ev_id + "&r_manual_date=" + $('#reminder_date').val() + "&r_manual_time=" + $('#reminder_time').val(),
        context: document.body,
        cache: false,
        success: function(data) {

            var obj = JSON.parse(data);

            /*
             * error 1 means date prevoius selected
             */

            if (obj['error'] == 1)
            {
                $('.alert-error').remove();
                $('#reminder_container .portlet-body').prepend('<div style="margin-bottom:0px; !important;" class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong> ' + obj['html'] + '</div>');
            }


            if (obj['error'] == 0) {

                $('#list_pop_types').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success! Reminder saved</strong></div>');

                $("#events_type_list").fancybox().trigger('click');
                $('#msg_rem').hide();

                if (obj['count'] == 1) {
                    $('#menu1').append(obj['html']);
                } else {
                    $('#menu').append(obj['html']);
                }

                setTimeout(function() {
                    $.fancybox.close();
                }, 1800);

            }

        }
    });


}
