// JavaScript Document

$(document).ready(function() {

    $("a#add_course_new").fancybox();
    $("a.update_course").fancybox();

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
        url: $('#base_url').val() + "sadmin/check_course_type_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name').val()),
            'c_id_parent': encodeURIComponent($("#c_id_parent").val())
        },
        cache: false,
        success: function(data) {

            if (data == '0')
            {
                $('#msg_added').html('<div class="error">Course Type name already exists</div>').slideDown('slow', function() {
                    $('#msg_added').delay(1800).slideUp(2000);
                });
                return false;

            } else
            {

                $.ajax({
                    url: $('#base_url').val() + "sadmin/save_course_type",
                    type: "POST",
                    context: document.body,
                    data: {
                        'name': encodeURIComponent($('#course_name').val()),
                        'status': encodeURIComponent($('#status_course').is(':checked')),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'c_id_parent': encodeURIComponent($("#c_id_parent").val()),
                        'is_parent': encodeURIComponent($("#is_parent").val()),
                        'is_course': encodeURIComponent($("#is_course").val()),
                    },
                    cache: false,
                    success: function(data) {

                        if (data == 'settings')
                        {
                            $('#course').html('<span class="error" style="padding:0 20px;">Please Choose your term system, or check settings </span>');
                            $("#added_course").fancybox().trigger('click');
                            return false;
                        }
                        else
                        {
                            $('#course').html('<div class="notification msgsuccess"><p><strong>Success!</strong> Record Saved!</strong></p></div>');


                            $("#added_course").fancybox().trigger('click');
                            $('#html_ajax').html(data);


                            setTimeout(function() {
                                $.fancybox.close();
                            }, 1300);
                            jQuery('#dyntable').dataTable( {"bDestroy": true,"sPaginationType": "full_numbers"} );
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
        url: $('#base_url').val() + "sadmin/update_course_type_go",
        type: "POST",
        context: document.body,
        data: "status=" + $('#status_course').is(':checked') + "&id=" + $('#id_update').val() + "&course_id=" + $('#course_id').val()+"&c_id_parent="+$("#c_id_parent").val()+"&is_parent="+$("#is_parent").val()+"&is_course="+$("#is_course").val(),
        cache: false,
        success: function(data) {

            if (data == 'false')
            {
                $('#course').html('<span class="error" style="padding:0 20px;">Some problem saving record please try again!</span>');
                return false;
            }
            else
            {

                $('#course').html('');

                $('#course').html('<div class="notification msgsuccess"><p>Record Update Successfully!</p></div>');

                $("#added_course").fancybox().trigger('click');

                $('#html_ajax').html(data);

                setTimeout(function() {
                    $.fancybox.close();
                }, 1500);
                jQuery('#dyntable').dataTable( {"bDestroy": true,"sPaginationType": "full_numbers"} );
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
        url: $('#base_url').val() + "sadmin/check_course_type_name",
        type: "POST",
        context: document.body,
        data: {
            'name': encodeURIComponent($('#course_name').val()),
            'c_id_parent': encodeURIComponent($("#c_id_parent").val())
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
                    url: $('#base_url').val() + "sadmin/save_course_type",
                    type: "POST",
                    context: document.body,
//                    data: "name=" + $('#course_name').val() + "&status=" + $('#status_course').is(':checked') + "&course_id=" + $('#course_id').val(),
                    data: {
                        'name': encodeURIComponent($('#course_name').val()),
                        'status': $('#status_course').is(':checked'),
                        'course_id': encodeURIComponent($('#course_id').val()),
                        'c_id_parent': encodeURIComponent($("#c_id_parent").val()),
                        'is_parent': encodeURIComponent($("#is_parent").val()),
                        'is_course': encodeURIComponent($("#is_course").val()),
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

function push_call_confirm(id)
{

    $.ajax({
        url: $('#base_url').val() + "sadmin/remove_course_type",
        type: "POST",
        context: document.body,
        data: "remove_course=" + id+"&c_id_parent="+$("#c_id_parent").val()+"&is_parent="+$("#is_parent").val()+"&is_course="+$("#is_course").val(),
        cache: false,
        success: function(data) {
            if (data == '1') {
                $('#course').html('<span class="error" style="padding:0 20px;">Some problem removing record please try again!</span>'); 
                $("#added_course").fancybox().trigger('click');

            } else {
                $('#course').html('<div class="notification msgsuccess"><p>Removed Successfully!</p></div>'); 
                $("#added_course").fancybox().trigger('click');
                $('#html_ajax').html(data);
                setTimeout(function() {
                    $.fancybox.close();
                }, 1500);
                jQuery('#dyntable').dataTable( {"bDestroy": true,"sPaginationType": "full_numbers"} );
            }
            
        }

    });


}


function add_course_call()
{

    check_name_duplication($('#course_name').val());


}
function update_course_type(id)
{

    $.ajax({
        url: $('#base_url').val() + "sadmin/update_course_type",
        type: "GET",
        context: document.body,
        data: "id=" + id+"&is_parent="+$("#is_parent").val()+"&is_course="+$("#is_course").val(),
        cache: false,
        success: function(data) {

            $('#course').html(data);
            $("#added_course").fancybox().trigger('click');
           
        }

    });

}

// JavaScript Document


