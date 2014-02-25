//** plugin starts here
function ExtendedModal(options){
	var self = this;
	self.options = options;
	self.setOption = function(key,val){
		self.options[key] = val;
	}
	
	self.show = function(){
		if(!self.element){
			var html = [
			'<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
			'<div class="modal-header">',
				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>',
			'<h3 id="myModalLabel">',self.options.title,'</h3>',
			'</div>',
			'<div class="modal-body">',
			'<p>',self.options.body,'</p>',
			'</div>',
			'<div class="modal-footer">',
			self.options.footer,
			'</div>',
			'</div>'].join('');
			self.element = $(html);
			//$('body').append(self.element);
			self.element.modal({
				show:false
			});
		}
		self.element.modal('show');
	}
	
	self.hide = function(){
		self.element.modal('hide');
	};
		
}	