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
                    required: 'Please enter Course Name',
                    minlength: 'Should be atleast 2 characters long',
                },
                course_id: {
                    required: 'Please enter Course ID',
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
                    required: 'Please enter Course Name',
                    minlength: 'Should be atleast 2 characters long',
                },
                course_id: {
                    required: 'Please enter Course ID',
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
                    required: 'Please enter Course ID',
                },
            }
        }).form();

        if (myresult) {
            update_course_call();
        }

    });


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
<form id="course_form">
    <div class="row-fluid">
        <div class="span12">
            <!-- BEGIN EXAMPLE TABLE PORTLET-->
            <div class="portlet box green"
                 style="margin-top: 2px; margin-bottom: 0px;">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="icon-globe"></i><font style="color: black">
                        <?php if (isset($courses['co_name'])) { ?>
                            Update Course
                        <?php } else { ?>
                            Add New Course
                            </td>
                        <?php } ?>
                        </font>
                    </div>
                </div>
                <div class="portlet-body">
                    <table class="table table-hover table-full-width" id="sample_1">
                        <tr>
                            <td><strong><font style="color: black">Course Name</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls"><?php if (isset($courses['co_name'])) { ?>
                                            <input type="text" class="m-wrap large"
                                                   disabled="disabled"
                                                   value="<?php if (isset($courses['co_name'])) echo ucwords(ci_urldecode($courses['co_name'])); ?>"
                                                   name="course_name" id="course_name" />
                                               <?php }else { ?>
                                            <input type="text" class="m-wrap large"
                                                   name="course_name" id="course_name" />
                                        <?php } ?>  </div>
                                </div> </td>
                        </tr>
                        <tr>
                            <td><strong><font style="color: black">Course Id</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls"><?php if (isset($courses['course_id'])) { ?>
                                            <input type="text" class="m-wrap large"
                                                   value="<?php if (isset($courses['course_id'])) echo ucwords(ci_urldecode($courses['course_id'])); ?>"
                                                   name="course_id" id="course_id" />
                                               <?php }else { ?>
                                            <input type="text" class="m-wrap large" name="course_id"
                                                   id="course_id" />
                                        <?php } ?> </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong><font style="color: black">Grade</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls"><?php if (isset($courses['course_id'])) { ?>
                                            <input type="text" class="m-wrap large"
                                                   value="<?php if (isset($courses['course_id'])) echo ucwords(ci_urldecode($courses['course_id'])); ?>"
                                                   name="course_id" id="course_id" />
                                               <?php }else { ?>
                                            <input type="text" class="m-wrap large" name="course_id"
                                                   id="course_id" />
                                        <?php } ?> </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td colspan="2"><input type="hidden"
                                <?php if (isset($courses['status']) && $courses['status'] == 'true') { ?>
                                                       checked="checked" <?php } ?> id="status_course"
                                                   name="course_active" />
                                                   <?php if (isset($courses['co_name'])) { ?>
                                    <input type="hidden" name="id_update" id="id_update"
                                           value="<?php echo $courses['co_id'] ?>" />
                                    <button class="btn green" type="button" name="update_course"
                                            id="update_course">Update Course</button>
                                        <?php } else { ?>
                                    <button class="btn green" type="button"
                                            name="add_course" id="add_course">Save Course</button>
                                    <button class="btn green" type="button" name="save_another"
                                            id="save_another">Save & Add Another</button>
                                        <?php } ?>
                                <button class="btn green" type="reset">Reset</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</form>
