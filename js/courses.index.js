// JavaScript Document

$(document).ready(function() {

    $("a#add_course_new").fancybox({'showNavArrows' :   false});
    $("a.update_course").fancybox({'showNavArrows' :   false});

    $("#add_cal_form").validate({
        rules: {
            name: {
                required: true,
                maxlength: 25,
            },
            keywords: {
                required: true,
                maxlength: 25,
            },
            descriptions: {
                required: true,
                maxlength: 250,
            },
        },
        messages: {
            name: {
                required: "Please enter calendar name",
                maxlength: "Should not be more than 25 characters",
            },
            keywords: {
                required: "Please enter calendar keywords",
                maxlength: "Should not be more than 25 characters",
            },
            descriptions: {
                required: "Please enter description",
                maxlength: "Should not be more than 250 characters",
            },
        },
        highlight: function(element) {
            $(element)
                    .closest('.control-group')
                    .addClass('error');
        },
        success: function(label) {
            label.closest('.control-group')
                    .removeClass('error');
            label.remove();
        },
        errorPlacement: function(error,
                element) {
            error
                    .addClass('help-inline')
                    .insertAfter(
                    element
                    .closest('.controls'));
        },
    });


});

function update_course(id)
{
    $('#course').html('');
}

function check_name_duplication(name)
{

    $('.alert').remove();

    $('#course').html('');

    $.ajax({
        url: $('#base_url').val() + "permissions/check_course_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name').val()),
            'grade_id': encodeURIComponent($('#grade_name').val()),
            'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
            'section_id': encodeURIComponent($('#section_name').val()),
            'course_option': encodeURIComponent($('#course_option').val()),
        },
        cache: false,
        success: function(data) {

            if (data == '0')
            {
                $('#msg_added').html('<div class="alert alert-error">Course name already exists</div>').slideDown('slow', function() {
                    $('#msg_added').delay(1800).slideUp(2000);
                });
                return false;

            } else
            {

                $.ajax({
                    url: $('#base_url').val() + "permissions/save_coursename",
                    type: "POST",
                    context: document.body,
                    data: {
                        'name': encodeURIComponent($('#course_name').val()),
                        'status': encodeURIComponent($('#status_course').is(':checked')),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'grade_id': encodeURIComponent($('#grade_name').val()),
                        'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
                        'section_id': encodeURIComponent($('#section_name').val()),
                        'course_option': encodeURIComponent($('#course_option').val()),
                    },
                    cache: false,
                    success: function(data) {

                        if (data == 'settings')
                        {
                            $('#course').html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><strong>Error!</strong>Please Choose your term system, or check settings </span><a href="' + $('#base_url').val() + '/permissions/settings_red">Settings</a> <span class="error">to add courses! </span></div>');
                            $("#added_course").fancybox().trigger('click');
                            return false;
                        }
                        else
                        {
                            $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Record Saved!</strong></div>');


                            $("#added_course").fancybox().trigger('click');
                            $('#html_ajax').html(data);


                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);
                        }

                    }
                });

            }
        }

    });


}

function update_course_call(id)
{

    $.ajax({
        url: $('#base_url').val() + "permissions/update_course_go",
        type: "POST",
        context: document.body,
         data: {
            'id': encodeURIComponent($('#id_update').val()),
            'status': encodeURIComponent($('#status_course').is(':checked')),
            'course_id': encodeURIComponent($('#course_id').val()),
            'grade_id': encodeURIComponent($('#grade_name').val()),
            'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
            'section_id': encodeURIComponent($('#section_name :selected').val()),
            'section_name': encodeURIComponent($('#section_name :selected').text()),
            'course_option': encodeURIComponent($('#course_option').val()),
        },
        //data: "status=" + $('#status_course').is(':checked') + "&id=" + $('#id_update').val() + "&course_id=" + $('#course_id').val(),
        cache: false,
        success: function(data) {

            if (data == 'false')
            {
                $('#course').html('<span class="alert alert-error">Some problem saving record please try again!</span>');
                return false;
            }
            else
            {

                $('#course').html('');

                $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Record Updated!</strong></div>');

                $("#added_course").fancybox().trigger('click');

                $('#html_ajax').html(data);

                setTimeout(function() {
                    $.fancybox.close();
                }, 1300);
            }

        }

    });


}



function display_course_notif()
{
    $('#course').html('<div class="alert alert-error">Please goto </span><a href="' + $('#base_url').val() + 'permissions/settings_red">Settings</a> <span class="error"> and choose your term system before adding courses. </span></span></div>');

    $("#added_course").fancybox().trigger('click');
}

function add_course_call_another()
{

    $('#course').html('');
    if ($('#course_name').val() == '')
    {

        $('#error').html('<div class="alert alert-error">Please enter course name</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }
    if ($('#course_name').val().length < 2)
    {

        $('#error').html('<div class="alert alert-error">Course name should be atleast 2 characters</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }

    if ($('#course_id').val() == '')
    {

        $('#error').html('<div class="alert alert-error">Please enter course id</div>').slideDown('slow', function() {
            $('#error_type').delay(1800).slideUp(2000);
        });
        return false;

    }

    $.ajax({
        url: $('#base_url').val() + "permissions/check_course_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name').val()),
            'grade_id': encodeURIComponent($('#grade_name').val()),
            'grade_name': encodeURIComponent($('#grade_name_hidden').val()),
            'section_id': encodeURIComponent($('#section_name').val()),
            'course_option': encodeURIComponent($('#course_option').val()),
        },
        cache: false,
        success: function(data) {

            if (data == 0)
            {

                $('#msg_added').html('<div class="alert alert-error">Course name already exists</div>').slideDown('slow', function() {
                    $('#msg_added').delay(1800).slideUp(2000);
                });
                return false;
            } else
            {

                $.ajax({
                    url: $('#base_url').val() + "permissions/save_coursename",
                    type: "POST",
                    context: document.body,
//                    data: "name=" + $('#course_name').val() + "&status=" + $('#status_course').is(':checked') + "&course_id=" + $('#course_id').val(),
                    data: {
                        'name': encodeURIComponent($('#course_name').val()),
                        'status': $('#status_course').is(':checked'),
                        'course_id': encodeURIComponent($('#course_id').val()),
                    },
                    cache: false,
                    success: function(data) {


                        if (data == 'settings')
                        {
                            $('#course').html('<div class="alert alert-error">Please Choose your term system, or check settings</span><a href="' + $('#base_url').val() + '/permissions/settings_red">Settings</a> <span class="error">to add courses! </span></span>');
                            $("#added_course").fancybox().trigger('click');

                            return false;
                        }
                        else
                        {


                            $('#msg_added').html('<div class="alert alert-success">Successfully Added</div>').slideDown('slow', function() {
                                $('#msg_added').delay(1800).slideUp(2000);
                            });

                            $('#html_ajax').html(data);
                            $('#course_id').val('');
                            $('#course_name').val('');
                            // $("a#add_course_new").click();

                        }

                    }

                });


            }
        }

    });





}


function remove_course(id)
{


    $('<div></div>').appendTo('body')
            .html('<div><h6>Delete <b>' + $('#course_id_new' + id).val() + '?</b></h6></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    push_call_confirm(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });


}

function remove_course_calendar(id, name)
{
    $('<div></div>').appendTo('body')
            .html('<div><h6>Delete <b>' + name + '?</b></h6></div>')
            .dialog({
        modal: true, title: 'Remove Confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: [{
                text: 'Delete',
                click: function() {
                    push_call_confirm_calendar(id);
                    $(this).remove();
                }
            },
            {
                text: "Cancel",
                click: function() {
                    $(this).remove();
                }
            }
        ],
        close: function(event, ui) {
            $(this).remove();
        }
    });


}



function push_call_confirm(id)
{

    $.ajax({
        url: $('#base_url').val() + "permissions/remove_course",
        type: "POST",
        context: document.body,
        data: {
            'remove_course': encodeURIComponent(id),
            'grade_id': $('#grade_id').val(),
            'sec_id': $('#section_id').val(),
        },
//        data: "remove_course=" + id,
        cache: false,
        success: function(data) {

            $('.alert').hide();
            $('<div class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Removed Successfully!</div>').insertAfter('#error_show');
            $('#html_ajax').html(data);

        }

    });


}

function push_call_confirm_calendar(id)
{
    $.ajax({
        url: $('#base_url').val() + "permissions/remove_course",
        type: "POST",
        context: document.body,
        data: "remove_course=" + id,
        cache: false,
        success: function(data) {

            $('#row_' + id).html('<span class="alert alert-success">Record Removed!</error>');
            $('#row_' + id).hide();

        }

    });
}

function add_course_call()
{

    check_name_duplication($('#course_name').val());


}// JavaScript Document

function approve_calendar(id, name, cname)
{

    $('<div></div>').appendTo('body')
            .html('<div><h6>Approve <b>' + cname + '?</b></h6></div>')
            .dialog({
        modal: true, title: 'Approve confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Approve: function() {

                $(this).dialog("close");
                push_call_approve(id);

            },
            Cancel: function() {
                $(this).dialog("close");
            }
        },
        close: function(event, ui) {
            $(this).remove();
        }
    });




}

function push_call_approve(id)
{
    $.ajax({
        url: $('#base_url').val() + "permissions/approve_calendar",
        type: "POST",
        context: document.body,
        data: "status=" + true + "&id=" + id + "&course_id=" + $('#course_id').val(),
        cache: false,
        success: function(data) {

            if (data == 'false')
            {
                $('#course').html('<span class="alert alert-error">Some problem saving record please try again!</span>');
                return false;
            }
            else
            {

                $('.alert').hide();
                $('<div class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Approved Successfully!</div>').insertAfter('#error_show');

                $('#html_ajax').html(data);

            }

        }

    });


}

function remove_calendar(id, calid, name)
{

    $('<div></div>').appendTo('body')
            .html('<div><h6>Deny ' + name + '?</h6></div>')
            .dialog({
        modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                push_call_confirm_calendar(id, calid);

                $(this).dialog("close");

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
function push_call_confirm_calendar(id, calid)
{

    $.ajax({
        url: $('#base_url').val() + "instructor/remove_calendar",
        type: "GET",
        context: document.body,
        data: "remove_course=" + id + "&cal_id=" + calid,
        cache: false,
        success: function(data) {

            //	$('#row_'+id).html('<span class="alert alert-success">Record Removed!</error>');															
            //	$('#row_'+calid).html('');
            // window.location = $('#base_url').val()+"instructor/add_calendar"
            // window.location.reload();
            $('#html_ajax').html(data);
            $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Calendar denied!</div>');
            $("#added_course").fancybox().trigger('click');
            setTimeout(function() {
                $.fancybox.close();
            }, 1200);
        }

    });
    //	refresh_calender_on_call();	

}

function suspend_course(id, name, cname)
{

    $('<div></div>').appendTo('body')
            .html('<div><h6>Suspend <b>' + cname + '?</b></h6></div>')
            .dialog({
        modal: true, title: 'Suspend confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Suspend: function() {

                $(this).dialog("close");
                push_call_suspend(id);

            },
            Cancel: function() {
                $(this).dialog("close");
            }
        },
        close: function(event, ui) {
            $(this).remove();
        }
    });

}


function push_call_suspend(id)
{

    $.ajax({
        url: $('#base_url').val() + "permissions/suspend_calendar",
        type: "POST",
        context: document.body,
        data: "remove_course=" + id,
        cache: false,
        success: function(data) {

            $('#course').html('');

            /*$('#course').html('<span class="alert alert-success">Calendar suspended!</span>');
             $("#added_course").fancybox().trigger('click');*/
            $('.alert').hide();
            $('<div class="alert alert-success"><button class="close" data-dismiss="alert"></button><strong>Success!</strong> Suspended Successfully!</div>').insertAfter('#error_show');
            $('#html_ajax').html(data).show();

        }

    });


}

