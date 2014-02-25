$('#myTab a').click(function(e) {

    $(this).tab('show');

});

function gen_reports(co_id, lg_id) {

    $.ajax({
        url: $('#base_url').val() + "permissions/reports_ui",
        type: "GET",
        context: document.body,
        data: "course_id=" + co_id + "&user_id=" + lg_id + "&type=" + $('#report_type').val(),
        cache: false,
        success: function(data) {
            $('#reports').html(data);
            $("#reports_generate").fancybox().trigger('click');
        }
    });

}

function reset_all_fields() {

    $('#errors_space_grade').html('');
    $('#to_email_grade').val();
    $("#field_courses").prop('selected', 0);

}

// //////working with export things like page export/pdf/doc
function export_button_attendence_school() {

    var go_redirect = false;

    var value = $("#export_options_attendence_school option:selected").val();

    // if export type is not selected make notice
    if (value == 'none') {
        $('#notification_export_attendence_school').html(
                'Please select export!').show().delay(1800).slideUp(2000);
        go_redirect = true;
        return false;
    }

    $('#notification_export_attendence_school').hide();

    if (go_redirect == false) {
        if (value == 'page') {

            window
                    .open(
                    $('#base_url').val()
                    + 'permissions/view_school_attendance_summary_in_page/'
                    + value,
                    'Popup',
                    'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');

        }

        if (value == 'doc') {

            $("#secretIFrame")
                    .attr(
                    "src",
                    $('#base_url').val()
                    + 'permissions/view_school_attendence_summary_in_doc/');
            // window.open($('#base_url').val()+'/permissions/view_school_attendence_summary_in_doc/'+value,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,
            // width=800,height=500,left=430,top=23');
        }

        if (value == 'pdf') {

            $("#secretIFrame")
                    .attr(
                    "src",
                    $('#base_url').val()
                    + 'permissions/view_school_attendence_summary_in_pdf/');
            // window.open($('#base_url').val()+'/permissions/view_school_attendence_summary_in_pdf/'+value,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,
            // width=800,height=500,left=430,top=23');
        }

        if (value == 'email') {
            $('.ui_remove').remove();
            // ///generic component call code
            // /reponse url to send back ui response
            var respone_url = 'permissions/send_email_instant_reports';
            // //paremeter if you want to send to the controller
            var paramteres = 'name=school_report';
            // /success msg after actions
            var success_msg = ' Thankyou! your email has been sent';

            $.ajax({
                url: $('#base_url').val() + "components/load_email_send_ui",
                type: "GET",
                context: document.body,
                data: "response_path=" + respone_url + "&paramteres="
                        + paramteres + "&success_msg=" + success_msg,
                cache: false,
                success: function(data) {
                    $('body').append(data);
                }
            });
        }

        if (value == 'archive') {

            $("#secretIFrame")
                    .attr(
                    "src",
                    $('#base_url').val()
                    + 'permissions/view_school_attendence_summary_in_archive/');

        }

    }

}
