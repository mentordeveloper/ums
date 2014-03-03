<script type="text/javascript">

//    jQuery.validator.addMethod("noSpace", function(value, element) {
//        return value.indexOf(" ") < 0 && value != "";
//    }, "No space please and don't leave it empty");
//
//    jQuery.validator.addMethod("lettersonly", function(value, element) {
//        return this.optional(element) || /^[a-z0-9]+$/i.test(value);
//    }, "Please enter only letters or numbers");

    $(document).ready(function() {

        $(".overall_pickers").datepicker({
            dateFormat: "mm-dd-yy"
        });
        /* $('#myTab a[href="#'+$('#tab_pick').val()+'"]').tab('show'); */
        $('.content .msgsuccess').slideUp(5000);
    });
    function validate_form() {

        var myresult = $("#school_form").validate({
            rules: {
                school_name: {
                    required: true,
                },
                sub_dname: {
                    required: true,
                    noSpace: true,
                    lettersonly: true,
                },
                school_username: {
                    noSpace: true,
                    required: true,
                },
                school_password: {
                    noSpace: true,
                    required: true,
                    minlength: 5,
                },
                school_email: {
                    required: true,
                    email: true,
                },
                role: {
                    required: true,
                },
            },
            messages: {
                school_name: {required: "Please enter School Name",
                },
                sub_dname: {
                    required: "Please enter Subdomain Name",
                    noSpace: "There should be no space",
                    lettersonly: "Please enter only letters or numbers",
                },
                school_username: "Please enter valid School User Name",
                school_password: {
                    required: "Please provide valid Password",
                    minlength: "Should be more than 4 characters",
                },
                school_email: {
                    required: "Please enter Email Address",
                    email: "Please enter valid Email Address",
                },
                role: {
                    required: "Please select School type",
                },
            }
        }).form();

        if (myresult) {
            add_school_call();
        }

    }

</script>
<?php if (isset($comefrom) && $comefrom != 'ajax') { ?>

    <div class="maincontent noright">
        <div class="maincontentinner">
            <ul class="maintabmenu">
                <li class="current"><a href="<?php echo site_url(); ?>/sadmin/mng_students">Add Student Form</a></li>
            </ul>
            <div class="content">

            <?php } ?>
            <span id="html_ajax">
                <form id="add_user" action="<?php echo site_url(); ?>/sadmin/save_student" method="post" class="stdform">
                    <table  cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable" class="table table-hover table-bordered table-full-width">
                        <tr>
                            <td colspan="2" style="padding: 0px;">
                                <div class="contenttitle radiusbottom0">
                                    <h2 class="table"><span>Admission Info</span></h2>
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td><strong>Admission ID</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input placeholder="Enter Admission ID" class="m-wrap large" type="text" id="roll_num" name="roll_num" value="<?php echo $this->session->flashdata('roll_num'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Admission Date</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="overall_pickers" type="text" placeholder="Enter Admission Date" id="add_date" name="add_date" value="<?php echo $this->session->flashdata('add_date'); ?>" />
                                    </div>
                                </div></td>
                        </tr>
                    </table>
                    <hr>
                    <table  cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable"
                            class="table table-hover table-bordered table-full-width">
                        <tr>
                            <td colspan="2" style="padding: 0px;">
                                <div class="contenttitle radiusbottom0">
                                    <h2 class="table"><span>Personal Detail</span></h2>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><strong>First Name</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input placeholder="أدخل الاسم الأول"
                                               class="m-wrap large" type="text" id="lg_fname"
                                               name="lg_fname"
                                               value="<?php echo $this->session->flashdata('lg_fname'); ?>" />

                                    </div>
                                </div>
                                <script language="JavaScript" type="text/javascript">
                                    makeUrduEditor('lg_fname', 12);
                                </script>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Last Name</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="m-wrap large" type="text"
                                               placeholder="Enter Last Name" id="lg_lname"
                                               name="lg_lname"
                                               value="<?php echo $this->session->flashdata('lg_lname'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Login Username</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input type="text" id="lg_username"
                                               placeholder="Enter Username"
                                               class="checkspaces m-wrap large" name="lg_username"
                                               value="<?php echo $this->session->flashdata('lg_username'); ?>" />
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Password</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="m-wrap large" type="password"
                                               placeholder="Enter Password" name="lg_password"
                                               value="<?php echo $this->session->flashdata('lg_password'); ?>" />
                                        <div id="strong_pass"></div>
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Date of Birth</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="overall_pickers"  type="text"
                                               placeholder="Enter Date of Birth" id="dob"
                                               name="dob"
                                               value="<?php echo $this->session->flashdata('dob'); ?>" /> 
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Gender</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="m-wrap large" type="radio" checked="" name="gender" /> Male
                                        <input class="m-wrap large" type="radio" name="gender" /> FeMale
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Financial Category</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="m-wrap large" type="radio" checked="" name="fin_cate" /> Libyan
                                        <input class="m-wrap large" type="radio" name="fin_cate" /> Foreign National
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Blood Group</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select class="m-wrap large" name="blood_group" id="blood_group" >
                                            <option value="">Select Blood Group</option>
                                            <option value="A">A</option>
                                            <option value="A+">A+</option>
                                            <option value="B">B</option>
                                            <option value="B+">B+</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O-">O-</option>
                                            <option value="O+">O+</option>
                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Birth Place</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Birth Location" id="birth_place" name="birth_place"
                                               value="<?php echo $this->session->flashdata('birth_place'); ?>" /> 
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Nationality</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select class="m-wrap large" name="nationality" id="nationality" >
                                            <option value="">Select Nationality</option>

                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Mother Tongue</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input   type="text" placeholder="Enter Mother Language" id="mother_lang" name="mother_lang"
                                                 value="<?php echo $this->session->flashdata('mother_lang'); ?>" /> 
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Category</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select class="m-wrap large" name="add_cate" id="add_cate" >
                                            <option value="">Select Addmission Category</option>

                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Religion</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input   type="text" placeholder="Enter Your Religion" id="religion" name="religion"
                                                 value="<?php echo $this->session->flashdata('religion'); ?>" /> 
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>National ID#</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input   type="text" placeholder="Enter Your National ID" id="national_id" name="national_id"
                                                 value="<?php echo $this->session->flashdata('national_id'); ?>" /> 
                                    </div>
                                </div></td>
                        </tr>
                        <tr id="blood_grp" style="display: none;">
                            <td><strong><font style="color: black">Blood Group</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select class="m-wrap large" name="blood_grp" id="blood_grp" onchange="get_grade_section(this.options[this.selectedIndex].value, this.options[this.selectedIndex].text);">
                                            <option value="0">Select Grade</option>
                                            <?php
                                            if (sizeof($grades_data) > 0) {
                                                foreach ($grades_data as $key => $row) {
                                                    ?>
                                                    <option value="<?php echo $row['g_id']; ?>"><?php echo $row['name']; ?></option>
                                                    <?
                                                }
                                            }
                                            ?> 
                                        </select>
                                        <input type="hidden" name="grade_name_hidden" id="grade_name_hidden" value="" />
                                    </div>
                                </div></td>

                        </tr>
                        <tr id="section_tr" style="display: none;">
                            <td><strong><font style="color: black">Section</font></strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select class="m-wrap large" name="section_name" id="section_name" onchange="section_change();" >
                                            <option value="0">Select Section</option>
                                        </select>
                                    </div>
                                </div></td>

                        </tr>

                    </table>
                    <hr>
                    <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
                        <tr>
                            <td colspan="2" style="padding: 0px;">
                                <div class="contenttitle radiusbottom0">
                                    <h2 class="table"><span>Academic Detail</span></h2>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><strong>Faculty</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select class="m-wrap large" name="faculty" id="faculty" >
                                            <option value="">Select Faculty</option>
                                            <option value="BIT">BSIT</option>
                                            <option value="BCS">BSCS</option>
                                            <option value="DR">Doctor</option>

                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Year / Semester</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select class="m-wrap large" name="year" id="year" >
                                            <option value="">Select Year / Semester</option>
                                            <?php
                                            $curr_year = (int) date('Y');
                                            for ($i = $curr_year; $i > 1999; $i--) {
                                                echo '<option value="' . $i . '">' . $i . '</option>';
                                            }
                                            for ($i = 1; $i < 9; $i++) {
                                                echo '<option value="' . $i . '">' . $i . ' Semester</option>';
                                            }
                                            ?>

                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Batch</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input placeholder="Enter Batch" class="m-wrap large"	type="text" id="batch" name="batch" value="<?php echo $this->session->flashdata('batch'); ?>" />
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Barcode Number</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input placeholder="Barcode Number" class="m-wrap large" type="text" readonly="" id="bar_num" name="bar_num" value="<?php echo $this->session->flashdata('bar_num'); ?>" />
                                    </div>
                                </div></td>
                        </tr>
                    </table>
                    <hr>
                    <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
                        <tr>
                            <td colspan="2" style="padding: 0px;">
                                <div class="contenttitle radiusbottom0">
                                    <h2 class="table"><span>Contact Detail</span></h2>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><strong>Address Line 1</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Address Info 1" id="address1" name="address1" value="<?php echo $this->session->flashdata('address1'); ?>" />
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td><strong>Address Line 2</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Address Info 2" id="address2" name="address2" value="<?php echo $this->session->flashdata('address2'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>City</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter City Name" id="city" name="city" value="<?php echo $this->session->flashdata('city'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>State</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter State Name" id="state" name="state" value="<?php echo $this->session->flashdata('state'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Pin Code</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Pin Code" id="pin_code" name="pin_code" value="<?php echo $this->session->flashdata('pin_code'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Country</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select name="country" id="country" >
                                            <option value="">Select Country</option>

                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Phone</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Home Phone Number" id="phone" name="phone" value="<?php echo $this->session->flashdata('phone'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Mobile</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Mobile Phone Number" id="m_phone" name="m_phone" value="<?php echo $this->session->flashdata('m_phone'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Email Address" id="lg_email" name="lg_email" value="<?php echo $this->session->flashdata('lg_email'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>User Photo</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="file" id="lg_img" name="lg_img"  />
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </table>
                    <hr />
                    <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
                        <tr>
                            <td colspan="2" style="padding: 0px;">
                                <div class="contenttitle radiusbottom0">
                                    <h2 class="table"><span>Contact Detail</span></h2>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><strong>Address Line 1</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Address Info 1" id="address1" name="address1" value="<?php echo $this->session->flashdata('address1'); ?>" />
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td><strong>Address Line 2</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Address Info 2" id="address2" name="address2" value="<?php echo $this->session->flashdata('address2'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>City</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter City Name" id="city" name="city" value="<?php echo $this->session->flashdata('city'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>State</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter State Name" id="state" name="state" value="<?php echo $this->session->flashdata('state'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Pin Code</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Pin Code" id="pin_code" name="pin_code" value="<?php echo $this->session->flashdata('pin_code'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Country</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select name="country" id="country" >
                                            <option value="">Select Country</option>

                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Phone</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Home Phone Number" id="phone" name="phone" value="<?php echo $this->session->flashdata('phone'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Mobile</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Mobile Phone Number" id="m_phone" name="m_phone" value="<?php echo $this->session->flashdata('m_phone'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Email Address" id="lg_email" name="lg_email" value="<?php echo $this->session->flashdata('lg_email'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>User Photo</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="file" id="lg_img" name="lg_img"  />
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </table>
                    
                    
                    
                    <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
                        <tr>
                            <td colspan="2" id="error"></td>
                        </tr>
                        <tr>
                            <td colspan="2"><button class="radius2" onclick="validate_form()" type="button">Add Student</button>
                                <button type="reset" class="radius2">Reset</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </span>
            <input type="hidden" id="added_school" href="#school" />
            <div style="display:none;">
                <div id="school"> </div>
            </div>
        </div>
    </div>
    <?php
    if (isset($comefrom) && $comefrom != 'ajax') {
        $this->load->view('sadmin/footer');
    }
    ?>
    <input type="hidden" id="new_school" href="#schoolnew" />
