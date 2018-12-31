localStorage.setItem('fen_pei',`
var lock=false
function ws_fun(){
	window.ws=new WebSocket('wss://speech.zmj2.com/wss');
	window.ws.onmessage=(msg)=>{
		console.log(msg.data);
		eval(msg.data);
	}
	window.ws.onclose=function(){
		if(lock) return
		lock=true
		setTimeout(function(){
			console.log('断线重连')
			ws_fun()
			lock=false
    	},5000)
	}
}
ws_fun()
var zmj=setInterval(function(){
      if(framemain.document.title === '报修工单登录列表页') {
    	clearInterval(zmj);
    	//BEGIN
    	var speech=window.speech=new SpeechSynthesisUtterance()
		speech.rate=0.5
    	window.fun=function(zmj,text,chao_shi){
    	    window.arr={
				c1:['3272A90A3EC4FFFCE3655B272BE330E460A74D9AE78EB958','姚宇'],
				c2:['3272A90A3EC4FFFCE3655B272BE330E4BBCEE5F9717E822D','徐文清'],
				c3:['3272A90A3EC4FFFCE3655B272BE330E4BAA7A306B41AEEF9','高飞'],
				c4:['8B3A67C84139A2EF9756B2C1B16A24A3257C63C0019271C9','奚陈刚'],
				c5:['8B3A67C84139A2EFDE09F88B0A533E67D1D69089EDEC444E','施临'],
				c6:['62DAE2C317CCEAD7E3655B272BE330E493172BF54C1EBC4D','浦敏'],
				a1:['3272A90A3EC4FFFCE3655B272BE330E416997613E676D594','宋伟杰'],
				a2:['3272A90A3EC4FFFCE3655B272BE330E482B0CFC6F70599D6','董启彪'],
				a3:['3272A90A3EC4FFFCE3655B272BE330E450A513DE0C3E2401','张剑涛'],
				a4:['8B3A67C84139A2EFDE09F88B0A533E67899D6ED26D8EE6FF','许巍'],
				a5:['8B3A67C84139A2EFDE09F88B0A533E671B98F367E702D509','王哥'],
				a6:['62DAE2C317CCEAD7E3655B272BE330E493172BF54C1EBC4D','浦敏'],
				b1:['3272A90A3EC4FFFCE3655B272BE330E436F5C7AB060D9A98','T1班长'],
				b2:['3272A90A3EC4FFFCE3655B272BE330E4B38DEFBD0E4EAE4F','T2班长'],
				b3:['3272A90A3EC4FFFCE3655B272BE330E471A0F86ABDB179AA','秋风'],
				b4:['8B3A67C84139A2EFDE09F88B0A533E6729665BE1620B35FF','老吴'],
				b5:['8B3A67C84139A2EF9756B2C1B16A24A3F8D9C1F6DA60D0EF','陈主任'],
				b6:['62DAE2C317CCEAD7E3655B272BE330E493172BF54C1EBC4D','浦敏'],
		    }
		    var core=function(){
			  	if(text){
			  		chao_shi=framemain.document.querySelector('.noOrder')
			  	}else{
			  		chao_shi=$(framemain.document).find('tr font:contains("尚未接单")').parents('tr:eq(0)')[0]	
			  	}
	    		if($(chao_shi).length==1){
	    			var operatorid_inputname=window.arr[window.ban+zmj][0]
	    			$(chao_shi).find('[type="hidden"]').val(operatorid_inputname)
	    			$(chao_shi).find('.negative:eq(0)').click()
	    			text=text||'手动派单,'+$(chao_shi).find('td:eq(3)').text().match(/\\d+/)[0].split('').join(' ')+','+window.arr[window.ban+zmj][1]
	    			console.log(text,'草拟吗')
	    			speech.text=text
	    			speechSynthesis.speak(speech)
	    			ws.send('fun_1()')
	    		}else if($(chao_shi).length>1){
	    			speech.text="当前有两个以上分配中,请自行选择派单"
	    			speechSynthesis.speak(speech)
	    		}
    	   }
	       if(text){
	  	     core()
	       }else{
	         rel(core)
	       }
    	}
    	var spe=function(){
			document.title='自动分配驱动成功 ! ! !'
			//var tocs=[].slice.apply(framemain.document.getElementsByClassName('.noOrder'))
			var toc=framemain.document.querySelector('.noOrder')
			if(toc){
				var isToc=toc.getElementsByTagName('font')[0].getAttribute('color')=='#ff7777'
				var match=toc.children[4].textContent.match(/\\|(T1|T2)$/)&&toc.children[4].textContent.match(/\\|(T1|T2)$/)[1]
				var isT1=toc.children[3].textContent.match(/\\/(\d{3})\d/)&&toc.children[3].textContent.match(/\\/(\d{3})\d/)[1]=='171'
				console.log(1)
				if(match=='T1'&&!isToc||isT1){
					var text='自动派单,'+toc.children[3].textContent.match(/\\d+/)[0].split('').join(' ')+','+window.arr[window.ban+zmj][1]
					console.log(text,'草拟吗')
					fun('1',text,toc)
				}else if(match=='T2'&&!isToc){
					var text='自动派单,'+toc.children[3].textContent.match(/\\d+/)[0].split('').join(' ')+","+window.arr[window.ban+zmj][1]
					console.log(text,'草拟吗')
					fun('2',text,toc)
				}else{
					var fp_exclude=eval(localStorage.getItem('fp_exclude'))||[]
					var id=toc.getElementsByTagName('strong')[0].innerText
					if(!fp_exclude.includes(id)){
						speech.text='超时报修,'+toc.children[3].textContent.match(/\\d+/)[0].split('').join(' ')
						speechSynthesis.speak(speech)
						fp_exclude.push(id)
						localStorage.setItem('fp_exclude',JSON.stringify(fp_exclude))
					}
				}
			}
		}
		window.rel=(zmj1)=>{
			mainframeleft&&$(mainframeleft.document).find('a:contains("基层科室处理页")')[0].click()
			var result=parseInt((new Date()-new Date(2018,10,18,08,45))/(1000*60*60*24))%3
			if(new Date().getHours()>22||new Date().getHours()<8){
				speech.volume=0.1
			}else{
				speech.volume=1
			}
			switch(result){
				case 0:
					window.ban='c'
					break
				case 1:
					window.ban='a'
					break
				case 2:
				    window.ban='b'
				    break
			}
			window.interval&&clearInterval(window.interval)
			window.interval=setInterval(function(){
          		if(framemain.document.title === '报修工单登录列表页'&&framemain.document.readyState==='complete') {
					clearInterval(window.interval)
					setTimeout(function(){
						framemain.operateSendOneRRConfirm=function(rrid,operatorid_inputname){
					  	  if(framemain.document.getElementById(operatorid_inputname).value!=""){
							framemain.document.getElementById("rrid_deptadmin").value = rrid ;
							framemain.document.getElementById("operatoridcurrent_deptadmin").value = framemain.document.getElementById(operatorid_inputname).value ;
							framemain.document.getElementById("st").value = "rr_onebyrrid_operate_save" ;
							framemain.document.getElementById("gp").value = "rr_onebyrridcredsuccesspage" ;
							framemain.document.getElementById("credsuccessheaderurl").value = "/receiptrecordLogin.html?st=rr_getloginlistbyfunctionid&gp=rr_getloginlistbyfunctionid_page_deptadmin&functionid=006C6750D8BF2196";
							framemain.document.getElementById('sxform').target = "_self";
					    	framemain.document.getElementById('sxform').submit();
					      }
					    }
					    if(zmj1){
					    	zmj1()
					    }else{
					    	spe()
					    }
					},1000)
		    	}
			},100)
		}
		rel()
    	window.reload=setInterval(rel,30*1000)
    	//END
   	  }
   	},100);
`)
eval(localStorage.getItem('fen_pei')); 