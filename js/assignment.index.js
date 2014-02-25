// JavaScript Document
$(document).ready(function() {

    $('#myTab a').click(function(e) {
        $(this).tab('show');
    });

});

function initiate_upload(id)
{
	 $('#Filedata'+id).uploadify('upload', '*');
}

////if student make some excuse from the assignment

function confirm_excuse_student(ev_id)
{

    var reason = $('#excuse_maker').val();

    $.ajax({
        url: $('#base_url').val() + "assignment/confirm_excuse_go/",
        type: "GET",
        context: document.body,
        data: "ev_id=" + ev_id + "&reason=" + reason,
        cache: false,
        success: function(data) {

            $('#inline_pop').html(data);

            $("#import_facebook_alert").fancybox().trigger('click');

            setTimeout(function() {
                $.fancybox.close();
            }, 1300);
        }
    });


}

function student_make_excuse(ev_id)
{

    $.ajax({
        url: $('#base_url').val() + "assignment/excuse_from_assignment/",
        type: "GET",
        context: document.body,
        data: "ev_id=" + ev_id,
        cache: false,
        success: function(data) {

            $('#inline_pop').html(data);
            $("#import_facebook_alert").fancybox().trigger('click');
        }
    });

}


function Change_status_new(id)
{
    $.ajax({
        url: $('#base_url').val() + "assignment/assign_grade_status_end/",
        type: "GET",
        context: document.body,
        data: "id=" + id,
        cache: false,
        success: function(data) {

            if (data == 'bad')
            {

            } else
            {
                ///grading end at last
                $('#status_enabled').html('Graded');
            }

        }
    });

}



function Graded_end(id)
{

    $('<div></div>').appendTo('body')
            .html('<div><h6>Confirm End Grading?</h6></div>')
            .dialog({
        modal: true, title: 'Sending confirmation', zIndex: 10000, autoOpen: true,
        width: 'auto', resizable: false,
        buttons: {
            Yes: function() {

                Change_status_new(id);

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

function assign_grade_instant(id, user_id)
{
    var value = $('#' + id + user_id + 'graded').val();

    if (value == '')
    {
        $('#' + id + 'graded_status').html('<span class="error">Please Assign Grade</error>');
        return false;
    }



    $.ajax({
        url: $('#base_url').val() + "assignment/assign_grade/",
        type: "GET",
        context: document.body,
        data: "id=" + id + "&graded_marks=" + value + "&user_id=" + user_id,
        cache: false,
        success: function(data) {

            if (data == 'bad')
            {
                $('#' + id + user_id + 'graded_status').html('<span class="error">Some error while update try again!</span>');
            } else
            {
                $('#' + id + user_id + 'graded_status').html('<div style="margin-bottom:0px;" class="alert alert-success"><button data-dismiss="alert" class="close"></button><strong>Grade Assigned!</strong> </div>');
            }

        }
    });

}

function upload_instructor_attachment(id,event_id,hash)
{

    $.ajax({
        url: $('#base_url').val() + "assignment/save_return_assignement_final/",
        type: "GET",
        context: document.body,
        data: "id=" + id+"&hash="+hash,
        cache: false,
        success: function(data) {

            if (data == 'bad')
            {
                $('#' + id + 'upload_final').html('<span class="error">Some error while upload try again!</span>');
            } else
            {
                $('#' + id + 'upload_final').html(data);
            }

        }
    });
}

function Remove_this_file(id) {

    $
            .ajax({
        url: $('#base_url').val() + "filesharing/remove_file_by_id/",
        type: "GET",
        data: "file_id=" + id,
        context: document.body,
        cache: false,
        success: function(data) {

            if (data == 'bad') {
                
                return false;
            } else {
                
				$('button #'+id).remove();
            }

        }

    });

}

function upload_student_attachment()
{
	
	if ($("#Filedata-queue > div").size() == 0) {
        
		$('#msg_user').html('<div class="alert alert-error" style="margin-bottom:0px;"><button data-dismiss="alert" class="close"></button><strong>Error :</strong> Please select file!</div>');
		
        $("#global_use_msg").fancybox().trigger('click');		
		
		setTimeout(function() {
                $.fancybox.close();
            }, 1300);
		
    } else {
        $('#Filedata').uploadify('upload', '*');
    }
		
}

function upload_student_attachment_final(event_id,hash)
{
	
    $.ajax({
        url: $('#base_url').val() + "assignment/save_assignment_for_event_submit/",
        type: "GET",
        context: document.body,
        data: "event_id=" + event_id+"&hash=" + hash,
        cache: false,
        success: function(data) {
			
            if (data == 'bad'){

                $('#upload_final' + event_id).html('<span class="error">Some error while upload try again!</span>');

            } else{
				
                $('#upload_final' + event_id).html(data);
                $('#status_enabled').html('Turned in');
				$('#' + event_id + "_notify").html('<br/><span class="success">Completed!</span>');
				
            }

        }
    });

}

function view_events_details(event_id)
{

    $.ajax({
        url: $('#base_url').val() + "assignment/get_assignment_details_ajax/",
        type: "GET",
        context: document.body,
        data: "event_id=" + event_id,
        cache: false,
        success: function(data) {

            $('#div_ref_event_uploads').html(data);
            $("#event_uploads_ass").fancybox().trigger('click');

        }
    });

}

function Download_by_event(id)
{
    var value = $('#download_return').val();
    $('#secretIFrame').attr('src', $('#base_url').val() + "assignment/json_download_big?id=" + id);

}

function download_attachment_return(id)
{

    var value = $('#download_return').val();
    $('#secretIFrame').attr('src', $('#base_url').val() + "assignment/hard_download?id=" + id);

}
