/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Save_timezone() {
    $('#show_msg')
            .html('');
    $
            .ajax({
        url: $('#base_url').val() + "permissions/save_time_zone/",
        type: "GET",
        data: "id=" + $('#timezine').val(),
        context: document.body,
        cache: false,
        success: function(data) {


            $('#show_msg').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Successfully Updated.</div>');
            $('#show_msg').slideDown('slow', function() {
                $('#show_msg').delay(1800).slideUp(2000);
            });

        }
    });
}

function save_language() {

    $('#show_error')
            .html('');

    $
            .ajax({
        url: $('#base_url').val() + "permissions/save_language/",
        type: "GET",
        data: "lang=" + $('#languagesetting').val(),
        context: document.body,
        cache: false,
        success: function(data) {

            $('#show_error').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Successfully Updated.</div>');
            $('#show_error').slideDown('slow', function() {
                $('#show_error').delay(1800).slideUp(2000);
            });

        }
    });

}

function save_color_settings() {

    $('#show_msg1')
            .html('');
    $.ajax({
        url: $('#base_url').val() + "permissions/save_settings_color/",
        type: "POST",
        context: document.body,
        data: {c_color_id: $('#c_color_id').val()},
        cache: false,
        success: function(data) {
            if (data == 1)
            {
                $('#show_msg1').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>success!</strong> Successfully Updated.</div>');
                $('#show_msg1').slideDown('slow', function() {
                    $('#show_msg1').delay(1800).slideUp(2000);
                });

            }
            else
            {
                $('#show_msg1').html('<div class="alert alert-error"><button data-dismiss="alert" class="close"></button><strong>Error!</strong> Not Updated.</div>');
                $('#show_msg1').slideDown('slow', function() {
                    $('#show_msg1').delay(1800).slideUp(2000);
                });


            }
        }
    });
}

function Save_schoolsettings()
{


    $('#show_setting').html('');

    var id = $('#value_settings_school ').is(':checked') ? 1 : 0;
    var eoa = $('#value_e_tips').is(':checked') ? 1 : 0;

    $.ajax({
        url: $('#base_url').val()
                + "permissions/update_settings_school",
        type: "GET",
        context: document.body,
        data: "id=" + id + "&eoa=" + eoa,
        cache: false,
        success: function(data) {

            $('#show_setting').html('<div class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>success!</strong> Successfully Updated.</div>');
            $(show_setting).slideDown('slow', function() {
                $('#show_setting').delay(1800).slideUp(2000);
            });

            if (id == 1)
            {
                $('#update_status').val('true');
            }
            if (id == 0)
            {
                $('#update_status').val('false');
            }

        }

    });
}

