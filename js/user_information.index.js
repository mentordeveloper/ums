// JavaScript Document


$(function() {

    $("#phn_sch").mask("(999) 999-9999");

});


jQuery.validator.addMethod("digitsOnly", function(value, element) {
    return this.optional(element) || /^\d+$/i.test(value);
}, "Please enter only numbers");

jQuery.validator.addMethod("alphabetsOnly", function(value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Please enter only letters");


$('#save_info').click(function() {

    var myresult = $("#form_event").validate({
        rules: {
            add_1: {
                required: true,
            },
            city_sch: {
                required: true,
                //alphabetsOnly: true,
            },
            state_sch: {
                required: true,
                alphabetsOnly: true,
            },
            zip_sch: {
                required: true,
                digitsOnly: true,
            },
            email_sch: {
                required: true,
                email: true,
            },
            phn_sch: {
                required: true,
                //digitsOnly: true,
            },
        },
        messages: {
            add_1: "Please enter address ",
            city_sch: {
                required: "Please enter city",
                //alphabetsOnly: "Please enter letters only"
            },
            state_sch: {
                required: "Please enter state",
                alphabetsOnly: "Please entere letters only"
            },
            zip_sch: {
                required: "Please enter zip",
                digitsOnly: "Please enter digits only",
            },
            email_sch: {
                required: "Please enter email address",
                email: "Please enter valid email",
            },
            phn_sch: {
                required: "Please enter phone no.",
                //digitsOnly: "Please enter digits only",

            },
        }
        ,
        highlight: function(element) { // hightlight error inputs
            $(element).closest('.control-group').addClass('error'); // set error class to the control group
        },
        success: function(label) {
            label.closest('.control-group').removeClass('error');
            label.remove();
        },
        errorPlacement: function(error, element) {
            error.addClass('help-inline').insertAfter(element.closest('.controls'));
        },
    }).form();

    if (myresult) {

        $('#Filedatanew1').uploadify('upload', '*');

        var value_validate = $('#master_method').val();
        if (value_validate == 'no') {
            $('#form_event').submit();
        }

    }

});


$(document).ready(function() {

    $('#s_i_s_v1').click(function() {

        $('#msg_user').html('<div style="margin-bottom:0px; !important;width:300px" class="alert alert-info"><button class="close" data-dismiss="alert"></button>Please wait saving information...!</strong></div>');
        $("#global_use_msg").fancybox().trigger('click');

        $('#Filedatanew1').uploadify('upload', '*');

        var value_validate = $('#master_method').val();
        if (value_validate == 'no') {
            $('#form_event').submit();
        }

    });

    $("#Filedatanew1").uploadify({
        'formData': {
            'userid': $('#userid').val(),
            'hash': $('#hash').val(),
            'title': "Profile Picture",
            'page': "profile"
        },
        height: 30,
        swf: $('#base_url').val() + 'files/uploadify/uploadify.swf',
        uploader: $('#base_url').val() + 'filesharing/fileuploading/',
        width: 200,
        'queueSizeLimit': 1,
        messages: {
            'maxNumberUploadError': 'Exceded number of upload.',
            'nothingInTheQueueError': 'Nothing in the Queue'
        },
        'auto': false,
        'onQueueComplete': function(queueData) {
            $('#form_event').submit();
        },
        'onSelect': function(file) {
            $('#master_method').val('yes');
        }


    });
});

function mng_locations_now() {
    $.ajax({
        url: $('#base_url').val() + "permissions/mng_locations/",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

        }
    });

}


function remove_picture_this_user(what) {

    $.ajax({
        url: $('#base_url').val() + "instructor/remove_profile_pic/",
        type: "GET",
        context: document.body,
        data: "what=" + what,
        cache: false,
        success: function(data) {
            if (data) {
                $('#ins_image').hide();
                $('#ins_remove').hide();
            }
        }
    });

}


function save_location_new() {

    if ($('#location_name').val() == '') {
        $('#error_addition').html('Please provide Name!');
        return;
    }

    if ($('#location_address1').val() == '') {
        $('#error_addition').html('Please provide address1!');
        return;
    }

    $.ajax({
        url: $('#base_url').val() + "permissions/add_location_new/",
        type: "GET",
        data: "name=" + $('#location_name').val() + "&address1="
                + $('#location_address1').val() + "&address2="
                + $('#location_address2').val() + "&",
        context: document.body,
        cache: false,
        success: function(data) {

            mng_locations_now();

        }
    });

}

function remove_location_this(id, name) {

    $('<div></div>').appendTo('body').html(
            '<div><h6>Delete <b>' + name + '</b></h6></div>').dialog({
        modal: true,
        title: 'Removing confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: {
            Delete: function() {

                remove_selected_address(id);

                $(this).dialog("close");

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

function remove_selected_address(id) {
    $.ajax({
        url: $('#base_url').val() + "permissions/remove_new_location/",
        type: "GET",
        data: "remove_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            if (data) {
                mng_locations_now();
            }

        }
    });
}

function update_location_this(id) {

    $.ajax({
        url: $('#base_url').val() + "permissions/update_new_location/",
        type: "GET",
        data: "update_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            $('#list_pop_types').html(data);
            $("#events_type_list").fancybox().trigger('click');

        }
    });

}

function update_location_this_confirm(id) {

    if ($('#location_name').val() == '') {
        $('#error_addition').html('Please provide Name!');
        return;
    }

    if ($('#location_address1').val() == '') {
        $('#error_addition').html('Please provide address1!');
        return;
    }

    $.ajax({
        url: $('#base_url').val() + "permissions/update_location_new/",
        type: "GET",
        data: "name=" + $('#location_name').val() + "&address1="
                + $('#location_address1').val() + "&address2="
                + $('#location_address2').val() + "&id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            mng_locations_now('added');

        }
    });

}







	