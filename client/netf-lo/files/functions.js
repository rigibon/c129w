if(refresh_page==1){
	var time = new Date().getTime();
	$(document.body).bind('mousemove keypress', function(e){
		time = new Date().getTime();
	});
	function refresh(){
		if(new Date().getTime() - time >= 30000) 
			window.location.reload(true);
		else 
			setTimeout(refresh, 1000);
	}
	setTimeout(refresh, 1000);
}

function popunder(url, load_await=false){
	var sid_popunder=5239;
	var arr_popunders=JSON.parse(popUrl);
	var pop_t=arr_popunders['dynamic'];
	var pop_d=arr_popunders['popunder_mode'][0]['device'];
	if(typeof arr_popunders['popunder_refresh_id']!='undefined'){
		var p_sel=arr_popunders['popunder_refresh_id'];
		if(p_sel==11){
		  sid_popunder=6155;
			arr_popunders['urls']="";
		}else if(p_sel==12){
		  sid_popunder=6380;
		}
	}
	mfq_tags('product-click');
	if(typeof arr_popunders['urls'] !== 'undefined' && arr_popunders['urls']!==''){
		if(pop_d==1 && $(window).width()<576){
			if(load_await){
				setInterval(function() {
					window.open(url, '_blank');
				},5000)
			}else{
				window.open(url, '_blank');
			}
		}else if(pop_d==2 && $(window).width()> 576){
			if(load_await){
				setInterval(function() {
					window.open(url, '_blank');
				},5000)
			}else{
				window.open(url, '_blank');
			}
		}else if(pop_d==0){
			if(load_await){
				setInterval(function() {
					window.open(url, '_blank');
				},5000)
			}else{
				window.open(url, '_blank');
			}
		}else{
			window.location.replace(url);	
		}
	}else{
		window.location.replace(url);
	}
	var arr_popunders=JSON.parse(popUrl);
	var pop_t=arr_popunders['dynamic'];
	var pop_d=arr_popunders['popunder_mode'][0]['device'];
	if(typeof arr_popunders['urls'] !== 'undefined' && arr_popunders['urls']!==''){
		if(pop_t==1 && pop_d==1 && $(window).width()<576 || pop_t==1 && pop_d==2 && $(window).width()> 576 || pop_t==1 && pop_d==0){
			$.ajax({
				url: "",
				data:'_type=ajax&_action=master-pixel_popunder&s2='+s2+'&s3='+s3+'&s1='+s1+'&sid='+sid_popunder,
				dataType:'json',
				type: 'POST',
				success: function(res) {
					  Object.entries(arr_popunders['urls']).forEach(([key, value]) => {
						if (pop_d == 1 && $(window).width() < 576 || pop_d == 2 && $(window).width() > 576 || pop_d == 0) {
						  if (key == arr_popunders['popunder_mode'][0]['popunder_refresh_id'] && arr_popunders['popunder_mode'][0]['type'] == 2 || arr_popunders['popunder_mode'][0]['type'] == 0) {
							value = value.replace('xxagentidxx', res.data.pub);
							value = value.replace('jjhitjj', res.data.hid);
							window.location.replace(value);
						  } else {
							window.open(value, '_blank');
							$('.mcrules').show();
						  }
						}
					  });
				}
			});	
		}else{
		  Object.entries(arr_popunders['urls']).forEach(([key, value]) => {
			if (pop_d == 1 && $(window).width() < 576 || pop_d == 2 && $(window).width() > 576 || pop_d == 0) {
			  if (key == arr_popunders['popunder_mode'][0]['popunder_refresh_id'] && arr_popunders['popunder_mode'][0]['type'] == 2 || arr_popunders['popunder_mode'][0]['type'] == 0) {
				window.location.replace(value);
			  } else {
				window.open(value, '_blank');
				$('.mcrules').show();
			  }
			}
		  });
		}
	}
}

function mfq_tags(data){
	if(window._mfq){
		window._mfq.push(["newPageView",data]); 
	}
}
if(typeof(prepop)!='undefined'){
	var data=prepop.split(';');
	var email_prepop='';
	for(var i=0; i<data.length; i++){
		if(data[i].includes('email')){
			email_prepop=data[i].split(':')[1];
		}
	}  
}