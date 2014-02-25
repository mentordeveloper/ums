/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * working with export things like page export/pdf/doc
 */

function export_option_ins_page() {

    var go_redirect = false;

    var value = $("#field_export option:selected").val();
    var course = $("#field_courses option:selected").val();

    // if export type is not selected make notice
    if (value == 'none') {

        $('#gur_exports').html(
                '<span class="alert alert-error">Please select export!</span>')
                .show().delay(1800).slideUp(2000);
        go_redirect = true;

    }

    // if All is selected show error
    if (course == 0) {

        $('#gur_exports').html(
                '<span class="alert alert-error">Please select course!</span>')
                .show().delay(1800).slideUp(2000);

        go_redirect = true;

    } else {
        $('#notification_exports').hide();
    }

    if (go_redirect == false) {

        if (value == 'page') {
            // var url =
            // $('#base_url').val()+"/instructor/view_course_events/"+course;
            // window.open(url,'_blank');

            window
                    .open(
                    $('#base_url').val()
                    + 'instructor/view_course_events/' + course,
                    'Popup',
                    'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=500,left=430,top=23');

        }

        if (value == 'doc') {

            // window.open($('#base_url').val()+"/instructor/view_course_events_in_doc/"+course,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,
            // width=500,height=500,left=430,top=23');

            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'instructor/view_course_events_in_doc/' + course);

            // var url =
            // $('#base_url').val()+"/instructor/view_course_events_in_doc/"+course;
            // window.open(url,'_blank');
        }

        if (value == 'pdf') {
            // window.open($('#base_url').val()+"/instructor/view_course_events_in_pdf/"+course,'Popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,
            // width=500,height=500,left=430,top=23');

            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'instructor/view_course_events_in_pdf/' + course);

            // var url =
            // $('#base_url').val()+"/instructor/view_course_events_in_pdf/"+course;
            // window.open(url,'_blank');
        }

        // //if value selected is email we need to trigger an popup to send
        // export type
        if (value == 'email') {

            $("#email_chooser").fancybox().trigger('click');

        }
        if (value == 'archive') {

            $("#secretIFrame").attr(
                    "src",
                    $('#base_url').val()
                    + 'instructor/view_course_summary_in_archive/'
                    + course);

        }

    }

}



