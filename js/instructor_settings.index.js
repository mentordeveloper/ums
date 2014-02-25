// JavaScript Document

$(document).ready(function(){


    $('#my_multi_select1').multiSelect();


});
function update_course_status(id)
{

    $.ajax({
        url: $('#base_url').val() + "ins_settings/update_course",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            $('#course').html(data);
            $("#added_course").fancybox().trigger('click');

        }

    });


}
function update_course_call_update(id)
{

    $.ajax({
        url: $('#base_url').val() + "instructor/update_course_status",
        type: "GET",
        context: document.body,
        data: "status=" + $('#status_course').is(':checked') + "&id=" + id + "&course_id=" + $('#course_id').val(),
        cache: false,
        success: function(data) {

            if (data == 'false')
            {
                $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-error">Some problem saving record please try again!</div>');
                return false;
            }
            else
            {

                $('#course').html('');

                $('#course').html('<div style="margin-bottom:0px; !important;width:200px" class="alert alert-success">Record Updated!</div>');
                $("#added_course").fancybox().trigger('click');
                setTimeout(function() {
                    $.fancybox.close();
                }, 1800);
                $('#ajax_data_' + id).html(data);

            }

        }

    });


}

