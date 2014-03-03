function CalendarSubscriptions(){
	var self = this;
	
	self.subscriptions = ko.observableArray(value_of('eventSubscriptions'));
	
	self.show = function(){
		if(!self.modalObj)
			self.invokeModal();
		else
			self.modalObj.show();
	};
	
	self.hide = function(){
		if(self.modalObj)
			self.modalObj.hide();
	};
	
	self.selectAll = function(){
		self.modalObj.element.find('input[type=checkbox]').prop('checked', true);
	};
	
	self.unSelectAll = function(){
		self.modalObj.element.find('input[type=checkbox]').prop('checked', false);
	};

	
//creates the modal Window	
	self.invokeModal = function(){
		self.modalObj = new ExtendedModalJQ({
			title:'My Calendar Subscriptions',
			body: [	'<div class="messages"></div>',
					'<form method="post" >',
						'<div class="row-fluid" data-bind="foreach: subscriptions">',
							'<div class="span6">',
								'<label>',
									'<input type="checkbox" name="course_id[]" data-bind="checked: subscribed,value: co_id" />',
									'<span data-bind="text:co_name"></span>',
								'</label>',
							'</div>',
						'</div>',
					'</form>'].join(''),
					
			footer: ['<div class="btn-group pull-left">',
						'<button class="btn btn-success " rel="tooltip" data-bind="click: selectAll" title="Select All">',
							'<i class="icon-ok icon-white"></i>',
						'</button>',
						'<button class="btn " rel="tooltip" data-bind="click: unSelectAll" title="Unselect All">',
							'<i class="icon-remove"></i>',
						'</button>',
					'</div>',
					'<button class="pull-right btn save-btn">',
						'Save',
					'</button>'].join('')
		});
		
		self.modalObj.show();
		ko.applyBindings(self,self.modalObj.element[0]);
	//hook Server 
		self.jaxHandler = new jaxHandler({
			button : self.modalObj.element.find('.save-btn'),
			form : self.modalObj.element.find('form'),
			url : value_of('jaxSaveSubscriptions'),
			message_box : self.modalObj.element.find('.messages'),
			debug : true
		});
	}
}

$(function(){
	var sub = new CalendarSubscriptions();	
	$('#btn-subscriptions').click(function(e){
		e.preventDefault();
		sub.show();
	});
});