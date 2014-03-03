function CalendarExport(){
	
	var self = this;
	self.sync = ko.observable(value_of('google_sync_enabled'));
	
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


	self.enableGoogleSync = function(){
		var cls = self.sync()?'.disable-google-sync':'.enable-google-sync';
		var $this_btn = self.modalObj.element.find(cls);
		var btn_text = $this_btn.text();
		var sync_command = self.sync()?'No':'Yes';
		
		$this_btn.prop('disabled',true).text('Working ...');
		__fetch(
			value_of('jaxCalendarSync')
			, {'sync':sync_command}
			, function(res){
				var res = JSON.parse(res);
				if(res.result != 'success'){
					new ExtendedAlert('error',
					'Redirecting ...',
					self.modalObj.element.find('.messages'));
					location.href = value_of('connectGoogleAccount');
					
					$this_btn.prop('disabled',false).text(btn_text);
					
				}else{
					new ExtendedAlert('success',
					'Settings Saved.',
					self.modalObj.element.find('.messages'));
					$this_btn.prop('disabled',false).text(btn_text);
					self.sync(!self.sync());
				}
			}
			, function(err){
				new ExtendedAlert('success',
				'Server Not Responding.',
				self.modalObj.element.find('.messages'));
				$this_btn.prop('disabled',false).text(btn_text);
			});
	}
	
	
	
//creates the modal Window	
	self.invokeModal = function(){
		var sync_button = ['<button data-bind="click:enableGoogleSync.bind(this),visible:!sync()" class="btn btn-large btn-block btn-success enable-google-sync">' ,
								'Enable Google Sync' ,
						'</button>',
						'<button data-bind="click:enableGoogleSync.bind(this),visible:sync()" class="btn btn-large btn-block btn-danger disable-google-sync">' ,
								'Disable Google Sync' ,
						'</button>'].join('');
		
	
		self.modalObj = new ExtendedModalJQ({
			title:'Calendar Export Options',
			body: [	'<div class="messages"></div>',
					'<form method="post" >',
						'<div>',
							sync_button,
							'<button type="button" class="btn btn-large btn-block ">' ,
								'Export Calendar File' ,
							'</button>' ,
						'</div>',
					'</form>'].join(''),
			footer: ''
		});
		
		self.modalObj.show();
		ko.applyBindings(self,self.modalObj.element[0]);
	}
}

$(function(){
	var sub = new CalendarExport();	
	$('#btn-export').click(function(e){
		e.preventDefault();
		sub.show();
	});
});