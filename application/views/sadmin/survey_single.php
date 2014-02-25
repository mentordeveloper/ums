<div class="contenttitle radiusbottom0">
  <h2 class="table"><span>Survey Inforamtion</span></h2>
</div>
<table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
  <tr >
    <td style="width:60% !important"><b>Role in the school</b></td>
    <td><?php echo $data['role_in_school']; ?></td>
  </tr>
  <tr>
    <td style="width:60% !important"><b>Level of School that you are affiliated with:</b></td>
    <td><?php echo $data['level_of_school']; ?></td>
  </tr>
  <tr>
    <td style="width:60% !important"><b>Zipcode of School</b></td>
    <td><?php echo $data['school_zip_code']; ?></td>
  </tr>
  <tr>
    <td style="width:60% !important"><b>Do you own a smartphone?</b></td>
    <td><?php echo $data['own_smartphone']; ?></td>
  </tr>
  <tr id="yes_smartphone">
    <td valign="top" style="width:60% !important"><b> Which devices do you own?</b></td>
    <td><?php echo str_replace('"','',$data['own_smartphone_option']); ?></td>
  </tr>
  <tr id="no_smartphone">
    <td><b>When do you plan on purchasing a smart phone?</b></td>
    <td><?php echo $data['own_smartphone_no_option']; ?></td>
  </tr>
  <tr>
    <td><b>Does your school currently have a website?</b></td>
    <td><?php echo $data['school_website']; ?></td>
  </tr>
  <tr class="yes_website">
    <td><b>How often do you use your school's website?</b></td>
    <td><?php echo $data['using_school_website']; ?></td>
  </tr>
  <tr class="yes_website">
    <td valign="top"><b> What is 1 function of your current website that you find the most helpful?</b></td>
    <td><?php echo $data['school_1_feature']; ?></td>
  </tr>
  <tr class="yes_website">
    <td valign="top"><b>What is 1 function of your current website that you find the least helpful?</b></td>
    <td><?php echo $data['school_1_feature_least']; ?></td>
  </tr>
  <tr class="yes_website">
    <td valign="top"><b>What is 1 thing you wish your website had that it does not?</b></td>
    <td><?php echo $data['school_1_feature_wish']; ?></td>
  </tr>
  <tr>
    <td><b>Does your school currently have a mobile app? (Yes or No)</b></td>
    <td><?php echo $data['have_mobile_app']; ?></td>
  </tr>
  <tr class="yes_app">
    <td ><b>Which platforms is it available for?</b></td>
    <td><?php echo $data['plateform_data']; ?></td>
  </tr>
  <tr class="yes_app">
    <td><b>What is 1 function of your current mobile app that you find the most helpful?</b></td>
    <td><?php echo $data['helpfull_one_feature']; ?></td>
  </tr>
  <tr class="yes_app">
    <td><b>What is 1 function of your current mobile app that you find the least helpful?</b></td>
    <td><?php echo $data['helpfull_one_feature_least']; ?></td>
  </tr>
  <tr class="yes_app">
    <td><b>What is 1 thing you wish your mobile app had that it does not?</b></td>
    <td><?php echo $data['helpfull_one_feature_least_not']; ?></td>
  </tr>
</table>
