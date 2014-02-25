function __fetch(url,data,func,errorCallback){
	if(!window.jax_obj)
		window.jax_obj = new jax();
		
	window.jax_obj.addJob({
		url:url,
		data:data,
		func:func,
		errorCallback:errorCallback
	});
	window.jax_obj.start();
}

function jax(){
	var self = this;
	this.flag_debug = true;
//keeps track of calls
	this.stack = [];
	
//counting hits
	this.counter = 0;
	
//if the process is runing
	this.is_running = false;
	
//debug fucntion
	this.debug = function(str){
		if(self.flag_debug)
			console.log(str);
	};
		
	
//starts the process
	this.start = function(){
		if(self.is_running) return;
		self.is_running = true;
		self.do_();
	};
	
//start fetching from top most item and stops when all finished
	this.do_ = function(){
		if(self.is_running === false) return;
		
		var item = self.stack.shift();
		if(typeof item === 'undefined'){
			self.stop();
			self.debug('No more items to fetch - Exiting')
			return;
		}
		
		self.debug('Doing item')
		self.debug(item)
		if(self.flag_debug)
			self.counter++;
		
		$.ajax({
			url: item.url,
			data: item.data,
			type: 'post',
			success: function(data, textStatus, jqXHR){
					self.debug('Got Response')
					if(item.func)
						item.func(data, textStatus, jqXHR);
					self.debug("Pending items :" + self.stack.length)
					self.debug("Total items processed:" + self.counter)
					self.debug("Moving to next item")
					self.do_();
				},
			error: function (jqXHR, textStatus, errorThrown){
					self.debug('Got Response');
					self.debug('Error');
					self.debug(errorThrown);
					self.debug('textStatus');
					self.debug(textStatus);
					
					if(item.errorCallback)
						item.errorCallback(jqXHR, textStatus, errorThrown);
					
					self.debug("Pending items :" + self.stack.length)
					self.debug("Total items processed:" + self.counter)
					self.debug("Moving to next item")
					self.do_();
				}
		});
	
	};
//stops the process
	this.stop = function(){
		self.is_running = false;
	};
	
//fetches the response from server
	this.addJob = function(req){
		self.stack.push(req);
		
		self.debug('Job added');
		self.debug(req);
		
		self.debug('Total Jobs');
		self.debug(self.stack.length);
	};
	
	
}