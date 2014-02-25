<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<script type="text/javascript">

    $('#add_course').click(function() {

        var myresult = $("#course_form").validate({
            rules: {
                course_name: {
                    required: true,
                    minlength: 2,
                },
                course_id: {
                    required: true,
                },
            },
            messages: {
                course_name: {
                    required: 'Please enter Course Type Name',
                    minlength: 'Should be atleast 2 characters long',
                },
                course_id: {
                    required: 'Please enter Course Type ID',
                },
            }
            ,
            highlight: function(element) { // hightlight error inputs
                $(element).closest('.control-group').addClass('error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.control-group').removeClass('error');
                label.remove();
            },
            errorPlacement: function(error, element) {
                error.addClass('help-inline').insertAfter(element.closest('.controls'));
            },
        }).form();

        if (myresult) {
            add_course_call();
        }

    });


    $('#save_another').click(function() {

        var myresult = $("#course_form").validate({
            rules: {
                course_name: {
                    required: true,
                    minlength: 2,
                },
                course_id: {
                    required: true,
                },
            },
            messages: {
                course_name: {
                    required: 'Please enter Course Type Name',
                    minlength: 'Should be atleast 2 characters long',
                },
                course_id: {
                    required: 'Please enter Course Type ID',
                },
            }
        }).form();

        if (myresult) {
            add_course_call_another();
        }

    });

    $('#update_course').click(function() {

        var myresult = $("#course_form").validate({
            rules: {
                course_id: {
                    required: true,
                },
            },
            messages: {
                course_id: {
                    required: 'Please enter Course Type ID',
                },
            }
        }).form();

        if (myresult) {
            update_course_call();
        }

    });2


</script>
<style type="text/css">
    #course_form .table th,#course_form .table td {
        border: none !important;
        vertical-align: top;
        color: red;
    }

    #course_form {
        margin: 0;
    }
</style>
<div id="msg_added"></div>
<form id="course_form" class="stdform">
    <?php 
        $txt_type = ' Type ';
        $flag = false;
        if($is_parent!='0' && $is_parent!=''){
            $txt_type = ' ';
            $flag = true;
        }
    
    ?>
            <!-- BEGIN EXAMPLE TABLE PORTLET-->
           <input type="hidden" name="c_id_parent" id="c_id_parent" value="<?php echo $ct_id;?>" />
           <input type="hidden" name="is_parent" id="is_parent" value="<?php echo $is_parent;?>" />
                    <table  class="stdtable" id="dyntable">
                        <tr>
                          <td colspan="2"><h1><i class="icon-globe"></i><font style="color: black">
                        <?php if (isset($courses['ct_name'])) { ?>
                            Update <?php echo ucwords(ci_urldecode($ct_name));?> 
                        <?php } else { ?>
                            Add New <?php echo ucwords(ci_urldecode($ct_name));?> 
                            </td>
                        <?php } ?>
                        </font> </h1></td>
                            </td>
                        </tr>
                        <tr>
                            <td><strong><font style="color: black">Course<?php echo $txt_type;?>Name</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls"><?php if (isset($courses['ct_name'])) { ?>
                                            <input type="text" class="m-wrap large"
                                                   disabled="disabled"
                                                   value="<?php if (isset($courses['ct_name'])) echo ucwords(ci_urldecode($courses['ct_name'])); ?>"
                                                   name="course_name" id="course_name" />
                                               <?php }else { ?>
                                            <input type="text" class="m-wrap large"
                                                   name="course_name" id="course_name" />
                                        <?php } ?>  </div>
                                </div> </td>
                        </tr>
                        <?php if($flag){?>
                        <tr>
                            <td><strong><font style="color: black">Parent Course<?php echo $txt_type;?>Id</font></strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" class="m-wrap large" name="parent_course_id" id="parent_course_id" value="<?php echo $ct_code;?>" readonly="" />
                                    </div>
                                </div>
                            </td>

                        </tr>
                        <?php }?>
                        <tr>
                            <td><strong><font style="color: black">Course<?php echo $txt_type;?>Id</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls"><?php if (isset($courses['ct_code'])) { ?>
                                            <input type="text" class="m-wrap large"
                                                   value="<?php if (isset($courses['ct_code'])) echo ucwords(ci_urldecode($courses['ct_code'])); ?>"
                                                   name="course_id" id="course_id" />
                                               <?php }else { ?>
                                            <input type="text" class="m-wrap large" name="course_id"
                                                   id="course_id" />
                                        <?php } ?> </div>
                                </div></td>

                        </tr>
                        <?php if(!$flag){?>
                        <tr>
                            <td><strong><font style="color: black">Status</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                            
                                    
                                    <input type="checkbox" class="m-wrap checkbox"
                                <?php if (isset($courses['ct_status']) && $courses['ct_status'] == 'true') { ?>
                                                       checked="checked" <?php } ?> id="status_course"
                                                   name="course_active" />
                                    </div>
                                </div></td>

                        </tr>
                        <?php }?>
                        
                        <tr>
                            <td colspan="2">
                                                   <?php if (isset($courses['ct_name'])) { ?>
                                    <input type="hidden" name="id_update" id="id_update"
                                           value="<?php echo $courses['ct_id'] ?>" />
                                    <button class="btn green" type="button" name="update_course"
                                            id="update_course">Update Course<?php echo $txt_type;?></button>
                                        <?php } else { ?>
                                    <button class="btn green" type="button"
                                            name="add_course" id="add_course">Save Course<?php echo $txt_type;?></button>
                                    <button class="btn green" type="button" name="save_another"
                                            id="save_another">Save & Add Another</button>
                                    <button class="btn green" type="reset">Reset</button></td>
                                        <?php } ?>
                                
                        </tr>
                    </table>
       
</form>



