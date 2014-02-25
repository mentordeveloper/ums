<?
if(!isset($js_files))
	$js_files = array();
?>
<?php foreach($js_files as $file): ?>
<script src="<?php echo $file; ?>" type="text/javascript"></script>
<?php endforeach; ?>