/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click", "#create_new_grade_link", function() {
    $.ajax({
        url: $('#base_url').val() + "grades/grades_form",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            $('#inline1_email_confirm').html(data);
            $("#email_confirm_chooser").fancybox().trigger('click');
        }

    });
});
$(document).on("click", "#create_new_section_link", function() {
    $.ajax({
        url: $('#base_url').val() + "grades/section_form",
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            $('#inline1_email_confirm').html(data);
            $("#email_confirm_chooser").fancybox().trigger('click');
        }

    });
});
/*
 * $("#create_new_grade_link").fancybox({
        onClosed: function() {
            window.location.reload();
        }
    });
    */
   
function update_grade($id){
    $.ajax({
        url: $('#base_url').val() + "grades/update_grades_form?gid="+$id,
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            $('#inline1_email_confirm').html(data);
            $("#email_confirm_chooser").fancybox().trigger('click');
        }

    });
}
function update_section(gid,pid){
    $.ajax({
        url: $('#base_url').val() + "grades/update_section_form?gid="+gid+"&pid="+pid,
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            $('#inline1_email_confirm').html(data);
            $("#email_confirm_chooser").fancybox().trigger('click');
        }

    });
}
function remove_grade($id){
    
    $.ajax({
        url: $('#base_url').val() + "grades/remove_grades?gid="+$id,
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            
            if(data=='1'){
                $('#inline1_email_confirm').html('<div class="alert alert-success" style="margin-bottom: 0px;"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Remove Grades Successfully! </div>');
            }else{
                $('#inline1_email_confirm').html('<div class="alert alert-error" style="margin-bottom: 0px;"><button data-dismiss="alert" class="close"></button><strong>Error!</strong> Error Occur Try some other time! </div>');
            }
            $("#email_confirm_chooser").fancybox().trigger('click');
            setTimeout(function() {
                $.fancybox.close();
                window.location.reload();
            }, 1500);
        }

    });
}

function remove_section($id){
    
    $.ajax({
        url: $('#base_url').val() + "grades/remove_grades?gid="+$id,
        type: "GET",
        context: document.body,
        cache: false,
        success: function(data) {
            
            if(data=='1'){
                $('#inline1_email_confirm').html('<div class="alert alert-success" style="margin-bottom: 0px;"><button data-dismiss="alert" class="close"></button><strong>Success!</strong> Remove Section Successfully! </div>');
            }else{
                $('#inline1_email_confirm').html('<div class="alert alert-error" style="margin-bottom: 0px;"><button data-dismiss="alert" class="close"></button><strong>Error!</strong> Error Occur Try some other time! </div>');
            }
            $("#email_confirm_chooser").fancybox().trigger('click');
            setTimeout(function() {
                $.fancybox.close();
                window.location.reload();
            }, 1500);
        }

    });
}
