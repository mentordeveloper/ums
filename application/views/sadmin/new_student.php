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
    

</script>
<!-- Bootstrap styles -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
<!-- Generic page styles -->
<link rel="stylesheet" href="<?php echo base_url(); ?>files/jquery_image_upload/css/style.css">
<!-- blueimp Gallery styles -->
<link rel="stylesheet" href="http://blueimp.github.io/Gallery/css/blueimp-gallery.min.css">
<!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
<link rel="stylesheet" href="<?php echo base_url(); ?>files/jquery_image_upload/css/jquery.fileupload.css">
<link rel="stylesheet" href="<?php echo base_url(); ?>files/jquery_image_upload/css/jquery.fileupload-ui.css">
<!-- CSS adjustments for browsers with JavaScript disabled -->
<noscript><link rel="stylesheet" href="<?php echo base_url(); ?>files/jquery_image_upload/css/jquery.fileupload-noscript.css"></noscript>
<noscript><link rel="stylesheet" href="<?php echo base_url(); ?>files/jquery_image_upload/css/jquery.fileupload-ui-noscript.css"></noscript>
<?php if (isset($comefrom) && $comefrom != 'ajax') { ?>

    <div class="maincontent noright">
        <div class="maincontentinner">
            <ul class="maintabmenu">
                <li class="current"><a href="<?php echo site_url(); ?>/sadmin/mng_students">Add Student Form</a></li>
            </ul>
            <div class="content">

            <?php } ?>
            <span id="html_ajax">
                <form id="add_user" action="<?php echo site_url(); ?>/sadmin/save_student" method="post" class="stdform" enctype="multipart/form-data">
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
                                        <input placeholder="Enter Admission ID" readonly="" class="m-wrap large" type="text" id="addmission_id" name="addmission_id" value="<?php echo $addmission_id; ?>" />
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
                                        <script language="JavaScript" type="text/javascript"> 
                                            makeUrduEditor('lg_fname', 12);                      
                                        </script>

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
                        <tr style="display: none;">
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
                        <tr style="display: none;">
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
                                        <input class="m-wrap large" value="male" type="radio" checked="" name="gender" /> Male
                                        <input class="m-wrap large" value="female" type="radio" name="gender" /> FeMale
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Financial Category</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="m-wrap large" value="libyan" type="radio" checked="" name="fin_cate" /> Libyan
                                        <input class="m-wrap large" value="foreigner" type="radio" name="fin_cate" /> Foreign National
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
                                            <option value="" >Select Nationality</option>
                                            <?php 
                                                if(is_array($countries)){
                                                    foreach ($countries as $key=>$country){
                                                        $sel = '';
                                                        if($country['country_id']==121)
                                                            $sel = 'selected="selected"';
                                                        echo '<option value="'.str_replace(" ", "_", $country['country_name']).'" '.$sel.'>'.ucwords($country['country_name']).'</option>';
                                                    }
                                                }
                                            ?>

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
                                            <option value="1">Select Addmission Category</option>
                                            

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
                        <tr>
                            <td><strong>Transportation</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="m-wrap large" value="yes" type="radio" name="transportation" /> Yes
                                        <input class="m-wrap large" value="no" type="radio" checked=""  name="transportation" /> No
                                    </div>
                                </div></td>
                        </tr>
                        <tr>
                            <td><strong>Accommodation</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input class="m-wrap large" value="yes" type="radio" name="accommodation" /> Yes
                                        <input class="m-wrap large" value="no" type="radio" checked=""  name="accommodation" /> No
                                    </div>
                                </div></td>
                        </tr>
                         <tr>
                            <td><strong>English Name</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <input   type="text" placeholder="Enter English Name" id="eng_name" name="eng_name"
                                                 value="<?php echo $this->session->flashdata('eng_name'); ?>" /> 
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
                            <td><strong>Bar code Number</strong></td>
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
                                            <?php 
                                                if(is_array($countries)){
                                                    foreach ($countries as $key=>$country){
                                                        $sel = '';
                                                        if($country['country_id']=='121')
                                                            $sel = 'selected="selected"';
                                                        echo '<option value="'.str_replace(" ", "_", $country['country_name']).'"   '.$sel.'>'.ucwords($country['country_name']).'</option>';
                                                    }
                                                }
                                            ?>

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
                                <!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
                                <div class="row fileupload-buttonbar">
                                    <div class="col-lg-7">
                                        <!-- The fileinput-button span is used to style the file input field as button -->
                                        <span class="btn btn-success fileinput-button">
                                            <i class="glyphicon glyphicon-plus"></i>
                                            <span>Add files...</span>
                                            <input type="file"  name="files[]" multiple>
                                        </span>
                                        <!-- The global file processing state -->
                                        <span class="fileupload-process"></span>
                                    </div>
                                    <!-- The global progress state -->
                                    <div class="col-lg-5 fileupload-progress fade">
                                        <!-- The global progress bar -->
                                        <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                            <div class="progress-bar progress-bar-success" style="width:0%;"></div>
                                        </div>
                                        <!-- The extended global progress state -->
                                        <div class="progress-extended">&nbsp;</div>
                                    </div>
                                </div>
                                <!-- The table listing the files available for upload/download -->
                                <table role="presentation" class="table table-striped"><tbody class="files"></tbody></table>
                                <div class="control-group">
                                    <div class="controls">
                                        <!--<input type="file" id="lg_img" name="lg_img"  />-->
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
                                    <h2 class="table"><span>Parent: Personal Detail</span></h2>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><strong>First Name</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent First Name" id="par_fname" name="par_fname" value="<?php echo $this->session->flashdata('par_fname'); ?>" />
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td><strong>Last Name</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent Last Name" id="par_lname" name="par_lname" value="<?php echo $this->session->flashdata('par_lname'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Relation</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Your Relation" id="par_relation" name="par_relation" value="<?php echo $this->session->flashdata('par_relation'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Date of Birth</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent DOB" id="par_dob" name="par_dob" value="<?php echo $this->session->flashdata('par_dob'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Education</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Education" id="par_education" name="par_education" value="<?php echo $this->session->flashdata('par_education'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Occupation</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent Occupation" id="par_occupation" name="par_occupation" value="<?php echo $this->session->flashdata('par_occupation'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <hr>                    
                    <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
                        <tr>
                            <td colspan="2" style="padding: 0px;">
                                <div class="contenttitle radiusbottom0">
                                    <h2 class="table"><span>Parent: Contact Detail</span></h2>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent Email" id="par_email" name="par_email" value="<?php echo $this->session->flashdata('par_email'); ?>" />
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td><strong>Address Line 1</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent Address 1" id="par_address1" name="par_address1" value="<?php echo $this->session->flashdata('par_address1'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Address line 2</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Address 2" id="par_address2" name="par_address2" value="<?php echo $this->session->flashdata('par_address2'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>City</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent City" id="par_city" name="par_city" value="<?php echo $this->session->flashdata('par_city'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>State</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter State" id="par_state" name="par_state" value="<?php echo $this->session->flashdata('par_state'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Country</strong></td>
                            <td><div class="control-group">
                                    <div class="controls">
                                        <select name="par_country" id="par_country" >
                                            <option value="">Select Country</option>
                                            <?php 
                                                if(is_array($countries)){
                                                    foreach ($countries as $key=>$country){
                                                        $sel = '';
                                                        if($country['country_id']=='121')
                                                            $sel = 'selected="selected"';
                                                        echo '<option value="'.str_replace(" ", "_", $country['country_name']).'"   '.$sel.'>'.ucwords($country['country_name']).'</option>';
                                                    }
                                                }
                                            ?>

                                        </select>
                                    </div>
                                </div></td>

                        </tr>
                        <tr>
                            <td><strong>Phone 1</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Home Phone" id="par_phone1" name="par_phone1" value="<?php echo $this->session->flashdata('par_phone1'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Phone 2</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Phone 2" id="par_phone2" name="par_phone2" value="<?php echo $this->session->flashdata('par_phone2'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Mobile</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Parent Mobile" id="par_mobile" name="par_mobile" value="<?php echo $this->session->flashdata('par_mobile'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <hr>                    
                    <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
                        <tr>
                            <td colspan="2" style="padding: 0px;">
                                <div class="contenttitle radiusbottom0">
                                    <h2 class="table"><span>Previous Educational Details</span></h2>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td><strong>Institution Name</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Institutaion Name" id="ed_ins_name" name="ins_name" value="<?php echo $this->session->flashdata('ins_name'); ?>" />
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td><strong>Course</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Course Name" id="ed_course" name="ed_course" value="<?php echo $this->session->flashdata('ed_course'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Year</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Completion Year" id="ed_year" name="ed_year" value="<?php echo $this->session->flashdata('ed_year'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Total Marks</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Total Marks" id="ed_total_marks" name="ed_total_marks" value="<?php echo $this->session->flashdata('ed_total_marks'); ?>" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Total Grade</strong></td>
                            <td>
                                <div class="control-group">
                                    <div class="controls">
                                        <input type="text" placeholder="Enter Total Grade Yield" id="ed_total_grade" name="ed_total_grade" value="<?php echo $this->session->flashdata('ed_total_grade'); ?>" />
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
            <input type="hidden" id="site_url" value="<?php echo site_url();?>/"/>
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

    <!-- The template to display files available for upload -->
<script id="template-upload" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-upload fade">
        <td>
            <span class="preview"></span>
        </td>
        <td>
            <p class="name">{%=file.name%}</p>
            <strong class="error text-danger"></strong>
        </td>
        <td>
            <p class="size">Processing...</p>
            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
        </td>
        <td>
            {% if (!i && !o.options.autoUpload) { %}
                <button class="btn btn-primary start" disabled>
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>Start</span>
                </button>
            {% } %}
            {% if (!i) { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script>
<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-download fade">
        <td>
            <span class="preview">
                {% if (file.thumbnailUrl) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>
                {% } %}
            </span>
        </td>
        <td>
            <p class="name">
                {% if (file.url) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
                {% } else { %}
                    <span>{%=file.name%}</span>
                {% } %}
            </p>
            {% if (file.error) { %}
                <div><span class="label label-danger">Error</span> {%=file.error%}</div>
            {% } %}
        </td>
        <td>
            <span class="size">{%=o.formatFileSize(file.size)%}</span>
        </td>
        <td>
            {% if (file.deleteUrl) { %}
                <button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='{"withCredentials":true}'{% } %}>
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>Delete</span>
                </button>
                <input type="checkbox" name="delete" value="1" class="toggle">
            {% } else { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancel</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script>
