/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$('.danger-toggle-button').toggleButtons({
    style: {
        enabled: "danger",
    }
});

$('.danger-toggle-button1').toggleButtons({
    style: {
        enabled: "green",
    }
});

jQuery(document).ready(function() {

    $('#my_multi_select1').multiSelect({
            selectableOptgroup: true
        });

});
