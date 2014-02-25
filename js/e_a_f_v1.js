/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function chekclick() {


    var value = $('#all_day').is(':checked');

    var value_selected1 = '';
    var value_selected2 = '';

    if ($("#datepicker4").val() != '' && $("#datepicker6").val() != '') {

        value_selected1 = $("#datepicker4").val();
        value_selected2 = $("#datepicker6").val();
        
        value_selected1_v1 = $("#datepicker4_v1").val();
        value_selected2_v2 = $("#datepicker6_v1").val();

    }

    if (value) {
        $("#datepicker4").attr("disabled", true);
        $("#datepicker6").attr("disabled", true);

        $("#val_temp1").val($("#datepicker4").val());
        $("#val_temp2").val($("#datepicker6").val());

        $("#datepicker4").val('');
        $("#datepicker6").val('');
        
        $("#datepicker4_v1").attr("disabled", true);
        $("#datepicker6_v1").attr("disabled", true);

        $("#val_temp1_v1").val($("#datepicker4_v1").val());
        $("#val_temp2_v2").val($("#datepicker6_v1").val());

        $("#datepicker4_v1").val('');
        $("#datepicker6_v1").val('');
        

    } else {

        $("#datepicker4").attr("disabled", false);
        $("#datepicker6").attr("disabled", false);
        $("#datepicker4").timepicker();
        $("#datepicker6").timepicker();
        $("#datepicker4").val($("#val_temp1").val());
        $("#datepicker6").val($("#val_temp2").val());
        
        
        $("#datepicker4_v1").attr("disabled", false);
        $("#datepicker6_v1").attr("disabled", false);
        $("#datepicker4_v1").timepicker();
        $("#datepicker6_v1").timepicker();
        $("#datepicker4_v1").val($("#val_temp1_v1").val());
        $("#datepicker6_v1").val($("#val_temp2_v2").val());

    }

//    repond_admin_all();

}

//
//var value_selected1 = '';
//var value_selected2 = '';
//

//function repond_admin_all() {
//
//
//    var value = $('#all_day').is(':checked');
//
//
//    if ($("#d_s_a_v1").val() != '' && $("#d_e_a_v2").val() != '') {
//
//        value_selected1 = $("#datepicker4").val();
//        value_selected2 = $("#datepicker6").val();
//
//    }
//
//    if (value) {
//
//        $("#d_s_a_v1").attr("disabled", true);
//        $("#d_e_a_v2").attr("disabled", true);
//
//        value_selected1 = $("#d_s_a_v1").val();
//        value_selected2 = $("#d_e_a_v2").val();
//
//        $("#d_s_a_v1").val('');
//        $("#d_e_a_v2").val('');
//
//    } else {
//
//        $("#d_s_a_v1").attr("disabled", false);
//        $("#d_e_a_v2").attr("disabled", false);
//        $("#d_s_a_v1").timepicker();
//        $("#d_e_a_v2").timepicker();
//        $("#d_s_a_v1").val(value_selected1);
//        $("#d_e_a_v2").val(value_selected2);
//
//    }
//
//}
//


$(function() {

    $('#all_day').click(function() {

        var value = $('#all_day').is(':checked');

        var value_selected1 = '';
        var value_selected2 = '';

        if ($("#datepicker4").val() != '' && $("#datepicker6").val() != '') {

            value_selected1 = $("#datepicker4").val();
            value_selected2 = $("#datepicker6").val();

        }

        if (value == true) {
            $("#datepicker4").attr("disabled", true);
            $("#datepicker6").attr("disabled", true);

            $("#val_temp1").val($("#datepicker4").val());
            $("#val_temp2").val($("#datepicker6").val());

            $("#datepicker4").val('');
            $("#datepicker6").val('');

        } else {

            $("#datepicker4").attr("disabled", false);
            $("#datepicker6").attr("disabled", false);
            $("#datepicker4").timepicker();
            $("#datepicker6").timepicker();

            $("#datepicker4").val($("#val_temp1").val());
            $("#datepicker6").val($("#val_temp2").val());

        }

//        repond_admin_all();

    });
});