
<colgroup>
<col class="con0" />
<col class="con1" />
<col class="con0" />
<col class="con1" />
<col class="con0" />
</colgroup>
<thead>
  <tr>
    <th class="head0">No.</th>
    <th class="head1">User Role</th>
    <th class="head0">School Level</th>
    <th class="head1">School Zip Code</th>
    <th class="head1">Does have a smartphone?</th>
    <th class="head1">Smartphones</th>
    <th class="head1">Actions</th>
  </tr>
</thead>
<tbody>
  <?php $i=1;   foreach($data_survey_all as $persuvey){ ?>
  <tr>
    <td align="center"><?php echo $i; ?></td>
    <td align="center"><?php echo $persuvey['role_in_school']; ?></td>
    <td align="center"><?php echo $persuvey['level_of_school']; ?></td>
    <td align="center"><?php echo $persuvey['school_zip_code']; ?></td>
    <td align="center"><?php echo $persuvey['own_smartphone']; ?></td>
    <td align="center"><b><?php echo str_replace('"','',$persuvey['own_smartphone_option']); ?></b></td>
    <td align="right">

    <span class="mylink">
     <a  id="ajax_call_information"  href="<?php echo base_url().'sadmin/get_user_detatils/'.$persuvey['id']; ?>"> Info </a> 
    </span>
    
      </td>
  </tr>
<input type="hidden" value="<?php echo base_url(); ?>" id="base_url" />
<?php $i++; } ?>
