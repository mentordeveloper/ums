<script type="text/javascript" src="<?php echo base_url('files/jwplayer/jwplayer.js'); ?>"></script>

<input type="hidden" id="videoid" value="<?php echo $video['v_id'];?>">
<input type="hidden" id="videotitle" value="<?php echo $video['v_title'];?>">
<input type="hidden" id="videoname" value="<?php echo $video['v_path'];?>">

<div class="maincontent noright">
<div class="maincontentinner">
<div class="content">
<div class="contenttitle radiusbottom0">
  <h2 class="table"><span><b>Video Title: </b> <?php echo $video['v_title']; ?>
    </td>
    </span></h2>
</div>
<table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
  <tr>
    <td align="center"><div id="myElement" align="center">Loading the player...</div></td>
  </tr>
  <tr>
    <td align="center"><b>Video Description: </b><?php echo $video['v_description']; ?></td>
  </tr>
  <tr>
    <td align="center"><b>Video Rating: </b><?php echo $finalrank.'/'.'20'; ?></td>
  </tr>
</table>
<br>
<br>
<table cellpadding="0" cellspacing="0" border="0" class="stdtable" id="dyntable">
  <input type="hidden" id="testrate" value="">
  <tr>
    <td>Rank</td>
    <td><div class="exemple">
        <div class="rating" data-average="10" data-id="7"></div>
      </div></td>
  </tr>
  <tr>
    <td >Post Coment:</td>
    <td><textarea name="textbox" id="valtext" rows="2" style="width:450px;height:150px"></textarea></td>
  <tr>
    <td></td>
    <td style="color:red;" id="add_comment"></td>
  </tr>
  <tr>
    <td></td>
    <td><form action="#" class="stdform">  <button class="radius2" type="button" onClick="save_coment_API()">Post</button>  </form> </td>
  </tr>
</table>
<br>
<h2 class="table"><span><b>Comments </b></span></h2>
</td>
<div style="height: 300px; overflow: auto;">
  <table id="cm_tbl" cellpadding="0" cellspacing="0" border="0" class="stdtable">
    <?php 
	 foreach($video_com as $get_com){
		if(!empty($get_com['v_comment'])){	?>
    <tr style="border:1px solid #eeeeee; width:800%; height:60px;padding:2px;left-padding:2px;">
      <td style="width:2%"><img src="<?php echo  base_url() ?>/files/groupchat/images/icon-user.gif" />
      <td style="width:700%"><?php echo  ' '.$get_com['v_comment']; ?></td>
    </tr>
    <?php } } ?>
    <tr id="coment"> </tr>
  </table>
</div>
<input type="hidden" value="<?php echo base_url(); ?><?php echo index_page(); ?>" id="base_url" />
<script type="text/javascript">
	
	jwplayer("myElement").setup({
                file:  $('#videoname').val(),
                image: $('#base_url').val()+"files/jwplayer/poster.jpg",
                title:"play ",
                width:692,
                height:389,
    });		
	
</script>