/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$("a#enrol_course").fancybox({'showNavArrows' :   false});
function enrol_course(co_id,ins_id,sec_id){
   
    
     $.ajax({
        url: $('#base_url').val() + 'instructor/section_selection',
        type: "POST",
        context: document.body,
        data: {
            'co_id': encodeURIComponent(co_id),
            'instructor_id': encodeURIComponent(ins_id),
            'section_id': encodeURIComponent(sec_id),
        },
        cache: false,
        success: function(data) {

            $('#school').html(data);
            $("#added_school").fancybox().trigger('click');

        }

    });
}
$(document).ready(function(){
    
});