function jaxHandler(options){
	var self = this;
	/** All options
		button- the button that submits the form
		form -  will trigger on its submission
		url - post to this url
		message_box - send errors and messages to this box
	**/
	self.options = options;
	
//utility
	self.log = function(s){
		if(self.options.debug)
			console.log(s);
	}
//init triggers
	self.log('Options')
	self.log(self.options)
	
	self.trigger = function(e){
		self.log('triggered jaxHandler');
		
		e.preventDefault();
		self.options.button.prop('disabled',true).text('Saving...');
		
		__fetch(
			self.options.url
			,self.options.form.serialize()
			,function(res){
				var res = JSON.parse(res);
				if(res.result != 'success'){
					new ExtendedAlert('error',
					res.errors.join(''),
					self.options.message_box);
				}else{
					new ExtendedAlert('success',
					'Saved Successfully.',
					self.options.message_box);
				}
				
				self.options.button.prop('disabled',false).text('Save');
			}
			,function(err){
				new ExtendedAlert('error',
				'Server Not Responding.',
				self.options.message_box);
				self.options.button.prop('disabled',false).text('Save');
			}
		);
	};
	
//hook triggers
	self.options.button.click(self.trigger);
	self.options.form.submit(self.trigger);
}