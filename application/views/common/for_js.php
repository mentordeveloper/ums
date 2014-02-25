<script type='text/javascript'>
	function set_value_of(key,val){
		if(!window.page_data)
			window.page_data = {};
		window.page_data[key] = val;
	}
	
//exposing values to JS code
	function value_of(key){
		if(!window.page_data){
			window.page_data = {};
			<?php if(isset($for_js)): ?>
				window.page_data = JSON.parse("<?php echo addslashes(json_encode($for_js)) ?>");
			<?php endif; ?>
		}
	//some values those are needed on all pages
		set_value_of('base_url',"<?php echo base_url() ?>");
		
	//send the value
		return window.page_data[key]
	}
</script>