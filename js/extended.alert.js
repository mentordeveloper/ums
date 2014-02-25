//** plugin starts here

function ExtendedAlert(type, content, container){
	var self = this;
	self.options = {
		type			:type,
		content		:content,
		container	:container
	};
	
	self.setOption = function(key,val){
		self.options[key] = val;
	}
	
	self.show = function(){
		if(!self.element){
			var _class = 'alert alert-'+self.options.type;
			var html = [
			'<div class="',_class,'" >',
				'<button type="button" class="close" data-dismiss="alert">×</button>',
				self.options.content,
			'</div>'].join('');
			self.element = $(html);
			self.options.container.html('').append(self.element);
		}
	}
	
//show automatically
	self.show();
	
}	