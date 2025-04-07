function pushCount(pshparams,pshpub,pshfingerprint){
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
		if (xhr.status === 200) {
			var res = JSON.parse(xhr.responseText);
			if (res.data === true) {
				console.log('push fired');
			}else{
				console.log('params not found');
			}
		}
	};
	var pshparams = pshparams;
	var pshpub = pshpub;
	var data = '_type=ajax&_action=master-pushCount&s1=' + pshparams + '&s2=' + pshpub + '&fp=' + pshfingerprint;
	xhr.send(data);
}



var MYCALL = MYCALL || (function(){
    var pshparams = {}; // private
    return {
        init : function(Args) {
    	    //console.log(Args[2]);
            pshparams = Args[0];
            pshpub = Args[1];
            pshdomain = Args[2];
            pshfingerprint = Args[3];
            // some other initialising
        },
        send : function() {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://trk-essursta.com/scripts/push/v9e118mez8";
          script.onload = function () {
            push_init();
            var utmObj = {
              "utm_source": pshpub,
              "source_two": pshparams,
              "source_one": btoa(location.hostname)
            }
            setUtm(utmObj);
            //alert('sending: '+pshparams);
            pushCount(pshparams,pshpub,pshfingerprint);
            push_subscribe();
          };
          document.getElementsByTagName("head")[0].appendChild(script);
        }
    };
}());
