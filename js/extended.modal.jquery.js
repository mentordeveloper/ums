//** plugin starts here
function ExtendedModalJQ(options){
	var self = this;
	self.options = options;
	self.setOption = function(key,val){
		self.options[key] = val;
	}
	
	self.show = function(){
		if(!self.element){
			var html = [
			'<div id="dialog" title="',self.options.title,'">',
				'<div>',
					self.options.body,
				'</div>',
				'<div>',
					self.options.footer,
				'</div>',
			'</div>'].join('');
			self.element = $(html);
			//$('body').append(self.element);
			self.element.dialog({
				autoOpen: false
			});
		}
		self.element.dialog('open');
	}
	
	self.hide = function(){
		self.element.dialog('close');
	};
		
}	