function Get_update_season()
{

    var value = $('#course_archive_selecter :selected').val();

    $.ajax({
        url: $('#base_url').val() + "/permissions/get_course_seasons_all/",
        type: "GET",
        context: document.body,
        cache: false,
        data: 'data=' + value,
        success: function(data) {

            $('#reports').html(data);
            $("#reports_generate").fancybox().trigger('click');

        }
    });
}

////////working with export things like page export/pdf/doc
function export_option()
{

    var go_redirect = false;

    var value = $("#field_export option:selected").val();
    var course = $("#field_courses option:selected").val();

    //if export type is not selected make notice
    if (value == 'none')
    {
        $('#notification_export').html('Please select export!');
        $('#notification_export').slideDown('slow', function() {
            $('#notification_export').delay(1800).slideUp(2000);
        });
        go_redirect = true;
    }

    //if All is selected show error
    if (course == 0)
    {
        $('#notification_export').html('Please select course!');
        $('#notification_export').slideDown('slow', function() {
            $('#notification_export').delay(1800).slideUp(2000);
        });

        go_redirect = true;
    } else
    {
        $('#notification_export').hide();
    }

    if (go_redirect == false)
    {

        if (value == 'page')
        {
            window.open($('#base_url').val() + 'instructor/view_course_events/' + course, 'Popup', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');
        }

        if (value == 'doc')
        {
            $("#secretIFrame").attr("src", $('#base_url').val() + 'instructor/view_course_events_in_doc/' + course);
        }
        if (value == 'pdf')
        {
            $("#secretIFrame").attr("src", $('#base_url').val() + 'instructor/view_course_events_in_pdf/' + course);
        }
        if (value == 'email')
        {
            $('.ui_remove').remove();

            /////generic component call code
            ///reponse url to send back ui response
            var respone_url = 'instructor/send_email';
            ////paremeter if you want to send to the controller
            var paramteres = 'course_id=' + course;
            ///success msg after actions
            var success_msg = 'Thankyou! your email has been sent';

            $.ajax({
                url: $('#base_url').val() + "components/load_email_send_ui",
                type: "GET",
                context: document.body,
                data: "response_path=" + respone_url + "&paramteres=" + paramteres + "&success_msg=" + success_msg,
                cache: false,
                success: function(data) {
                    $('body').append(data);
                }
            });

        }

    }


}

function export_option_attendence()
{

    var go_redirect = false;

    var value = $("#field_export_attendence option:selected").val();
    var course = $("#field_courses option:selected").val();

    //if export type is not selected make notice
    if (value == 'none')
    {
        $('#notification_export_attendence').html('Please select export!').show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    //if All is selected show error
    if (course == 0)
    {
        $('#notification_export_attendence').html('Please select course!').show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    $('#notification_export_attendence').hide();

    if (go_redirect == false)
    {
        if (value == 'page')
        {

            window.open($('#base_url').val() + 'attendence/view_attendence_summary_in_page/' + course, 'Popup', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');

        }

        if (value == 'doc')
        {
            $("#secretIFrame").attr("src", $('#base_url').val() + 'attendence/view_course_events_in_doc/' + course);
        }

        if (value == 'pdf')
        {
            $("#secretIFrame").attr("src", $('#base_url').val() + 'attendence/view_course_events_in_pdf/' + course);
        }

        if (value == 'email')
        {
            $('.ui_remove').remove();
            /////generic component call code
            ///reponse url to send back ui response
            var respone_url = 'attendence/send_email';
            ////paremeter if you want to send to the controller
            var paramteres = 'course_id=' + course;
            ///success msg after actions
            var success_msg = 'Thankyou! your email has been sent';

            $.ajax({
                url: $('#base_url').val() + "components/load_email_send_ui",
                type: "GET",
                context: document.body,
                data: "response_path=" + respone_url + "&paramteres=" + paramteres + "&success_msg=" + success_msg,
                cache: false,
                success: function(data) {
                    $('body').append(data);
                }
            });

        }

    }

}


////////working with export things like page export/pdf/doc

function export_option_grading()
{

    var go_redirect = false;

    var value = $("#field_export_grading option:selected").val();
    var course = $("#field_courses option:selected").val();

    //if export type is not selected make notice
    if (value == 'none')
    {
        $('#notification_export_grading').html('Please select export!').show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    //if All is selected show error
    if (course == 0)
    {
        $('#notification_export_grading').html('Please select course!').show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    $('#notification_export_grading').hide();

    if (go_redirect == false)
    {
        if (value == 'page')
        {

            window.open($('#base_url').val() + 'grade_book/view_course_events/' + course, 'Popup', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');

        }

        if (value == 'doc')
        {
            $("#secretIFrame").attr("src", $('#base_url').val() + 'grade_book/view_course_events_in_doc/' + course);
        }

        if (value == 'pdf')
        {
            $("#secretIFrame").attr("src", $('#base_url').val() + 'grade_book/view_course_events_in_pdf/' + course);
        }

        if (value == 'email')
        {
            $('.ui_remove').remove();
            /////generic component call code
            ///reponse url to send back ui response
            var respone_url = 'grade_book/send_email';
            ////paremeter if you want to send to the controller
            var paramteres = 'course_id=' + course;
            ///success msg after actions
            var success_msg = 'Thankyou! your email has been sent';

            $.ajax({
                url: $('#base_url').val() + "components/load_email_send_ui",
                type: "GET",
                context: document.body,
                data: "response_path=" + respone_url + "&paramteres=" + paramteres + "&success_msg=" + success_msg,
                cache: false,
                success: function(data) {
                    $('body').append(data);
                }
            });
        }

    }

}