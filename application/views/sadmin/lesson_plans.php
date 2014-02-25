<?php if(isset($comefrom) && $comefrom!='ajax')	{?>

<div class="maincontent noright">
<div class="maincontentinner">
  <ul class="maintabmenu">
    <li class="current"><a href="<?php echo base_url(); ?>sadmin/lesson_plans">Lesson Plans Management</a></li>
  </ul>
  <div class="content">
    <div class="contenttitle radiusbottom0">
      <h2 class="table"><span>Managment</span></h2>
    </div>
    <?php } ?>
    <?php if(isset($comefrom) && $comefrom!='ajax'){ ?>
    <?php } ?>
    <span id="html_ajax">
    <form id="role_form" class="stdform">
      <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
        <colgroup>
        <col class="con0" />
        <col class="con1" />
        <col class="con0" />
        <col class="con1" />
        <col class="con0" />
        </colgroup>
        <tr>
          <td>Search By Age:</td>
          <td><select id="opt1">
              <option value="Ages 5-10&t=Ages 5 to 10">Ages 5 to 10</option>
              <option value="Ages 11-13&t=Ages 11 to 13">Ages 11 to 13</option>
              <option value="Ages 14-18&t=Ages 14 to 18">Ages 14 to 18</option>
            </select></td>
          <td align="right"><button class="radius2" type="button" onclick="updatebydata()" />
            Update
            </button></td>
        </tr>
        <tr>
          <td>Search By Subject:</td>
          <td><select id="opt3">
              <option value="Geography&t=Geography">Geography</option>
              <option value="History&t=History">History</option>
              <option value="Language Arts&t=Language Arts">Language Arts</option>
              <option value="Math-Product&t=Math">Math</option>
              <option value="Science&t=Science">Science</option>
            </select></td>
          <td align="right"><button class="radius2" type="button"  onclick="updatebysubject()" />
            Update
            </button></td>
        </tr>
        <tr>
          <td>Search By Scenario:</td>
          <td><select id="opt4">
              <option value="Creativity&t=Creativity">Creativity</option>
              <option value="Collaboration&t=Collaboration">Collaboration</option>
              <option value="Critical Thinking&t=Critical Thinking">Critical Thinking</option>
              <option value="Organization&t=Organization">Organization</option>
            </select></td>
          <td align="right"><button class="radius2" type="button"  onclick="updatebyScenario()" />
            Update
            </button></td>
        </tr>
      </table>
    </form>
    </span>
    <div id="wait"> </div>
    <div id="viewresult"> </div>
    <input type="hidden" id="added_faqs" href="#faqs" />
    <div style="display:none;">
      <div id="faqs"> </div>
    </div>
  </div>
</div>
<?php if(isset($comefrom) && $comefrom!='ajax')
{
 $this->load->view('sadmin/footer'); ?>
<?php } ?>
