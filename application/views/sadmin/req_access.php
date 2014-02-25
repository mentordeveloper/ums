<?php
if (isset($display) && $display != 'ajax') {
    ?>

    <div class="maincontent noright">
        <div class="maincontentinner">
            <ul class="maintabmenu">
                <li class="current"><a href="<?php echo base_url(); ?>sadmin/req_access">Manage Developer API request</a></li>
            </ul>
            <div class="content">

                <?php
                $msg = $this->input->get('msg');
                $go = $this->input->get('go');

                if ($go == 'true') {
                    echo '<div class="notification msgsuccess">
                        <a class="close"></a><p>';
                }
                if ($go == 'false') {
                    echo '<div class="notification msgerror">
<a class="close"></a><p>';
                }

                if (!empty($msg)) {
                    echo $this->input->get('msg') . '</p></div><br/>';
                }
                ?>

                <form action="<?php echo base_url() . '/sadmin/req_access_page'; ?>" method="post" class="stdform">
                    <button class="radius2" type="button" onClick="acpt_req_all()" style="float:right">Allow access to all users</button>
                    <div class="error" id="interface_update"></div>
                    <br/>
                    <br/>
                </form>
                <div class="contenttitle radiusbottom0">
                    <h2 class="table"><span>Managment</span></h2>
                </div>
<?php } ?>
            <table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
                <colgroup>
                    <col class="con0" />
                    <col class="con1" />
                    <col class="con0" />
                    <col class="con0" />
                    <col class="con0" />
                </colgroup>
                <thead>
                    <tr>
                        <th class="head0">No.</th>
                        <th class="head1">Name </th>
                        <th class="head0">Email Address</th>
                        <th class="head1">Access</th>
                        <th class="head0">Actions</th>
                    </tr>
                </thead>
<?php $count = 1;
foreach ($request as $myresult) {
    ?>
                    <tr id="row_<?php if (!empty($myresult['id'])) echo $myresult['id']; ?>">
                        <td><strong>
                    <?php if (!empty($myresult['id'])) echo $count; ?>
                            </strong></td>
                        <td><strong>
                                <?php if (!empty($myresult['fname'])) echo $myresult['fname']; ?>
                            </strong></td>
                        <td><strong>
                                <?php if (!empty($myresult['email_id'])) echo $myresult['email_id'] ?>
                            </strong></td>
                                <?php if ($myresult['status'] == '1') { ?>
                            <td><img width="20" src="<?php echo base_url() ?>files/icons/1355052051_onebit_34.png" /></td>
                        <?php } else { ?>
                            <td><img width="20" src="<?php echo base_url() ?>files/icons/1355052074_mail-delete.png" /></td>
                        <?php } ?>
                        <td align="right">&nbsp;&nbsp;
                        <?php if ($myresult['status'] == '0') { ?>
                                <form action="<?php echo base_url() . '/sadmin/req_access_page'; ?>" method="post" class="stdform">
                                    <button class="radius2" type="button" onClick="acpt_rem(<?php echo $myresult['id']; ?>)">Remove</button>
                                    <button class="radius2" type="button" onClick="acpt_req(<?php echo $myresult['id']; ?>)">Accept Request</button>
                                    <button class="radius2" type="button" onClick="deny_req(<?php echo $myresult['id']; ?>)">Deny Request</button>
                                </form></td>
    <?php } else { ?>
                        <form action="<?php echo base_url() . '/sadmin/req_access_page'; ?>" method="post" class="stdform">
                            <button class="radius2" type="button" onClick="acpt_rem(<?php echo $myresult['id']; ?>)">Remove</button>
                            <button class="radius2" type="button" onClick="deny_req(<?php echo $myresult['id']; ?>)">Deny Access</button>
                        </form>
                        </td>
                        </tr>
    <?php } $count++;
} ?>
            </table>
            </td>
            </tr>
            <tr></tr>
            </table>
            </table>
            </form>
        </div>
<?php
if (isset($display) && $display != 'ajax') {
    $this->load->view('sadmin/footer');
}
?>
    </div>
