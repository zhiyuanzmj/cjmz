 localStorage.setItem('begin',`
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
window.onfocus=()=>{
	$('#suetel').focus()
}
function openHome(){
	var mainWindow=window.open('http://10.169.1.13/rrs/frame.html?st=framepage','zmj1');
	var zmj=setInterval(()=>{
      if(mainWindow.framemain&&mainWindow.framemain.document.title === '报修工单登录列表页') {
    	clearInterval(zmj);
		var speech=window.speech=function(){	
			mainWindow.document.title='RRS 驱动成功 ! ! !'
			if(mainWindow.framemain.document.readyState!=='complete'){return false}
			var test=arguments[0]||'分配中'
			var speech=new SpeechSynthesisUtterance()
			speech.rate=arguments[1]||0.5
			var fp_list=[].slice.apply($(mainWindow.framemain.document).find('font:contains("'+test+'")').parents('tr'));
			var fp_exclude=eval(localStorage.getItem('fp_exclude'))||[]
			for(var fp of fp_list){
				var id=fp.childNodes[3].getElementsByTagName('strong')[0].innerText
				var text=fp.childNodes[17].data.replace(/<.*?>/g,'')
				if(!fp_exclude.includes(id)){
					speech.text=text
					speechSynthesis.speak(speech)
					return function(){
						speechSynthesis.cancel()
						fp_exclude.push(id)
						localStorage.setItem('fp_exclude',JSON.stringify(fp_exclude))
					}
				}
			}
		}
		var speech2=window.speech2=function(){
			var fp_list=[].slice.apply($(mainWindow.framemain.document).find('font:contains("分配中")').parents('tr'));
			var fp_exclude=eval(localStorage.getItem('fp_exclude'))||[]
			for(var fp of fp_list){
				var id=fp.childNodes[3].getElementsByTagName('strong')[0].innerText
				var text=fp.childNodes[17].data.replace(/<.*?>/g,'')
				if(!fp_exclude.includes(id)){
					speechSynthesis.cancel()
					fp_exclude.push(id)
					localStorage.setItem('fp_exclude',JSON.stringify(fp_exclude))
					fp.childNodes[3].click()
				}
			}
		}
		var start=window.start=function(){
			mainWindow.framemain.updateOneRR=(rrid_rd)=>{
		  		var updateWindow=mainWindow.framemain.open("/rrs/receiptrecordLogin.html?st=rr_onebyrrid_update_page&gp=rr_onebyrrid_update_page&rrid_rd="+rrid_rd+"&rr_data_source=database&functionid=6387D46921F8E937","_blank")
		 		updateWindow.onkeydown=(event)=>{
		 			if(event.which===13){
		 				updateWindow.confirm=()=>true
		 				updateWindow.receiptrecordone_nextnode()
			 		}
			 	}
			}
			var fuhe_list=$(mainWindow.framemain.document).find('font:contains("复核中")').parents('td');
			fuhe_list.map(function(){
				this.click()
			});
		}
		var a=(event)=>{
			if(event.which===106){
				window.start()
			}else if(event.key=='0'){
				window.result()
			}else if(event.which===116){
				mainWindow.mainframeleft&&$(mainWindow.mainframeleft.document).find('a:contains("保障部处理页")')[0].click()
				return false
			}else if(event.key=='Enter'){
				window.speech2()
			}else if(event.key=='1'){
				ws.send('fun("1")')
			}else if(event.key=='2'){
				ws.send('fun("2")')
			}else if(event.key=='3'){
				ws.send('fun("3")')
			}else if(event.key=='4'){
				ws.send('fun("4")')
			}else if(event.key=='5'){
				ws.send('fun("5")')
			}else if(event.key=='6'){
				ws.send('fun("6")')
			}
		}
		window.result=window.speech()
		window.reload&&clearInterval(window.reload)
		window.fun_1=function(abc){
			mainWindow.mainframeleft&&$(mainWindow.mainframeleft.document).find('a:contains("保障部处理页")')[0].click()
			window.interval&&clearInterval(window.interval)
			window.interval=setInterval(()=>{
          		if(mainWindow.framemain.document.title === '报修工单登录列表页') {
					clearInterval(window.interval)
					window.result=window.speech()
					mainWindow.framemain.onkeydown=a
					if(abc){
						window.start()
					}
		    	}
			},1000)
		}
		window.reload=setInterval(window.fun_1,30*1000)
		mainWindow.framemain.onkeydown=a
		mainWindow.framemaintop.onkeydown=a
		mainWindow.mainframeleft.onkeydown=a
		mainWindow.onkeydown=a
		fun_1(1)
		//start()
	  }  
	},100);
}
document.onkeydown=function(event){
	if(event.keyCode===111){
		openHome()
		setTimeout(()=>{
			init()
		});
	}else if((!window.onkey?true:false)&&event.keyCode){
		$('#suetel').focus().attr('onkeypress','').attr('autocomplete','off');;
		window.onkey=true;
	}else if(event.keyCode===40){
		window.count=(--window.count==-1?9:window.count);
		$('#suetel').blur();
		$("#devicepositiondesc_show").blur();
		suetel();
	}else if(event.keyCode===38){
		window.count=(++window.count==10?0:window.count);
		$('#suetel').blur();
		$("#devicepositiondesc_show").blur();
		suetel();
	}
}
$('#devicepositiondesc_show').bind('change',(event)=>{
	setTimeout(()=>{if(/cuss/ig.test(event.target.value)){
		$('#rrstatus_show').val('CUSS|故障').change();
		}
	});
});
$('#rrstatus_show').bind('change',(event)=>{
	setTimeout(()=>{var system=[];
        if(/cuss/ig.test(event.target.value)){
            system=["804","离港|CUSS|自助值机"];
            rrstatus=['4970','CUSS故障'];
        }else if(/内部通讯/.test(event.target.value)||/neit/.test(event.target.value)){
            system=["86","ICOM|内部通讯"];
        }else if(/航显/.test(event.target.value)||/hangx/.test(event.target.value)){
            if(/T1/.test($('#deviceareaname').val())){
                system=["99","FIDS|航班信息显示|T1"];
            }else{
                system=['66','FIDS|航班信息显示|T2'];
            }
        }else if(/广播/.test(event.target.value)||/guangb/.test(event.target.value)){
        	if(/T1/.test($('#deviceareaname').val())){
        		system=['15','PAS|广播|T1'];
        	}else{
        		system=['65','PAS|广播|T2'];
        	}
        }
        $('#systemname').val(system[1]);
        $('#systemid').val(system[0]);	
	},100);
})
//跟新时间
window.updateTime=()=>{
		var date=new Date().toLocaleDateString().replace(/\\//g,'-');
		var time=new Date().toLocaleTimeString('zh-cmn',{hour12:false});
		$('#processtime').val(date+" "+time);
	}
window.init=()=>{
	document.querySelector('[value="20"]').selected=true;
	$('#suebranchname_show').val('');
	$('#suebranchname').val('');
	$('#suebranchnameid').val('');
	$("#deviceareaname").val('');
	$("#deviceareaid").val('');
	$('#devicepositiondesc_show').val('');
	$('#devicepositiondesc').val('');
	$('#devicepositiondescid').val(0);
	$('#rrstatus_show').val('');
	$('#rrstatusid').val('');
	$('#rrstatus').val('');
	$('#systemname').val('');
	$('#systemid').val('');
	$('#deptadminid_show').val('');
	$('#suetel').val('');
	window.count=0;
	window.onkey=false;
}
var suetel=()=>{
	window.count=(typeof window.count=="undefined"?0:window.count);
	var str=$('#suetel').val();
	if(str.length==0){
		init();
	}
	var num=str.match(/^(\\d)(\\d)(\\d{2})([\\d\\/\\-+]|\\b)$/)
	,devicearea=[],isin
	,t='',dao='',rrstatus=[]
	,system=[]
	,suebranch=['357','航空公司'];
	if(str.length<4){
		return;
	}else if(num[4]=='+'){
		//window.count=(++window.count==10?0:window.count);
		num[4]=(++window.count).toString();
	}else if(num[4]=='-'){
		//window.count=(--window.count==-1?9:window.count);
		num[4]=(--window.count).toString();
	}else{
		num[4]=num[4]==''?window.count.toString():num[4];
		window.count=parseInt(num[4]);
	}
	
	switch(num[1]){
		case '1':
			//安检begin
			if(num[2]==7){
				devicearea=['3','浦东机场|T1'];
				suebranch=['906','安检'];
				$(devicepositiondesc_show).focus();
				system=['1','ACS|门禁|T1'];
				num[3]='';
				break;
			}
			//安检end
			var a=parseInt(num[2]+num[3])
			,isin=true;
			if(1<=a&&a<=15){
				devicearea=['3','浦东机场|T1'];
				system=['57','离港|T1|NEWAPP'];
				num[3]='';
				t=a+'号登机口|T1';
			}else if(200<=a&&a<=206){
				devicearea=['3','浦东机场|T1'];	
				system=['57','离港|T1|NEWAPP'];
				num[3]='';
				t=a+'远机位|T1';
			}else if(251<=a&&a<=258){
				devicearea=['3','浦东机场|T1'];
				system=['57','离港|T1|NEWAPP'];
				num[3]='';
				t=a+'远机位|T1';
			}else if(num[2]==1&&16<=num[3]&&num[3]<=29){
				devicearea=['3','浦东机场|T1'];
				system=['12','离港|T1|CUTE'];
				t='号登机口|T1';
			}else if(208<=a&&a<=216){
				devicearea=['3','浦东机场|T1'];
				system=['12','离港|T1|CUTE'];
				t=a+'远机位|T1';
				num[3]='';
			}else{
				devicearea=['4','浦东机场|T2'];
				if(num[2]=='0'&&50<=a&&a<=98){
					system=['70','离港|T2|NEWAPP'];
					num[3]='C';
					t=a+'号登机口|T2';
				}else if(num[2]=='1'&&58<=num[3]&&num[3]<=90){
					system=['69','离港|T2|CUTEAPC'];
					dao='D';
					t='号登机口|T2';
				}else if(218<=a&&a<=224){
					system=['70','离港|T2|NEWAPP'];
					num[3]='C';
					t=a+'远机位|T2';
				}else if(228<=a&&a<=232){
					system=['69','离港|T2|CUTEAPC'];
					num[3]='D';
					t=a+'远机位|T2';
				}
			}
			
		break;
        case '4':
			system=['57','离港|T1|NEWAPP'];
			devicearea=['3','浦东机场|T1'];
			t='|T1';
			switch(num[2]){
                case '1':dao='A';break;
				case '2':dao='B';break;
				case '3':dao='C';break;
				case '4':dao='D';break;
				case '5':dao='E';break;
				case '6':dao='F';system=['12','离港|T1|CUTE'];break;
                case '7':dao='G';break;
                case '8':dao='H';system=['12','离港|T1|CUTE'];break;
                case '9':dao='J';break;
			} 
			break;
        case '5':
			devicearea=['3','浦东机场|T1'];
			system=['12','离港|T1|CUTE'];
			t='|T1';
			switch(num[2]){
                case '0':dao="K";if(num[3]==='01'&&num[4]==='0'){window.count=5;num[4]='5'}break;
                case '1':dao="L";break;
                case '2':
                	switch(num[3]){
                		case '82': num[3]="0米中转1号柜台";t='';system=['57','离港|T1|NEWAPP'];break;
                		case '83': num[3]="0米中转2号柜台";t='';system=['57','离港|T1|NEWAPP'];break;
                		case '84': num[3]="0米中转3号柜台";t='';system=['57','离港|T1|NEWAPP'];break;
                		case '85': num[3]="0米中转4号柜台";t='';system=['57','离港|T1|NEWAPP'];break;
                		case '86': num[3]="0米中转5号柜台";t='';system=['57','离港|T1|NEWAPP'];break;
                		case '87': num[3]="0米中转6号柜台";t='';system=['57','离港|T1|NEWAPP'];break;
                		case '88': num[3]="0米中转7号柜台";t='';system=['12','离港|T1|CUTE'];break;
                		case '89': num[3]="0米中转8号柜台";t='';system=['12','离港|T1|CUTE'];break;
                		case '90': num[3]="0米中转9号柜台";t='';system=['12','离港|T1|CUTE'];break;
                		case '91': num[3]="0米中转10号柜台";t='';system=['12','离港|T1|CUTE'];break;
						case '92': num[3]="0米中转11号柜台";t='';system=['12','离港|T1|CUTE'];break;
                		case '93': num[3]="0米中转12号柜台";t='';system=['12','离港|T1|CUTE'];break;
                		default:dao="M";
                	}
                break;
			}
			break;
        case '2':
			devicearea=['4','浦东机场|T2'];
			t='|T2';
			system=['69','离港|T2|CUTEAPC'];
			switch(num[2]){
				case '1':dao='A';break;
                case '2':dao='B';break;
                case '3':dao='C';break;
                case '4':dao='D';break;
                case '5':dao='E';break;
                case '6':dao='F';break;
                case '7':dao='G';break;
                case '8':dao='H';break;
			}
			break;
		case '3':
			devicearea=['4','浦东机场|T2'];
			t='|T2';
			system=['70','离港|T2|NEWAPP'];
            switch(num[2]){
				case '0':dao='J';break;
            	case '1':dao='K';break;
            	case '2':dao='L';break;
				case '3':dao='M';break;
			}
			break;
	};
	switch(num[4]){
		case '0':
			if(num[1]==1&&num[2]==7){
				rrstatus=['1992','门禁|强打'];
				break;
			}
			rrstatus=isin?['1700','BGR|登机牌扫描器|故障']:['3156','OCR|键盘无法刷护照'];
			break;
		case '1':
			if(num[1]==1&&num[2]==7){
				rrstatus=['3926','门禁|BG'];
				break;
			}
			rrstatus=['1083','ATB|登机牌打印机|无法打印'];
			break;
		case '2':
			if(num[1]==1&&num[2]==7){
				rrstatus=['64','读卡器故障'];
				break;
			}
			rrstatus=isin?['4243','DCP|文件打印机|无法打印']:['3847','BTP|行李条打印机|无法打印'];
			break;
		case '3':
			if(num[1]==1&&num[2]==7){
				rrstatus=['723','镜头黑屏'];
				system=['4','CCTV|视频监控|T1'];
				break;
			}
			rrstatus=['1469','航显故障'];
			$('#rrstatus_show').change();
			break;
		case '4':
			if(num[1]==1&&num[2]==7){
				rrstatus=['79','镜头模糊'];
				system=['4','CCTV|视频监控|T1'];
				break;
			}
			rrstatus=['40611','内部通讯'];
			$('#rrstatus_show').change();
			break;
		case '5':
			if(num[1]==1&&num[2]==7){
				rrstatus=['3789','破玻故障'];
				break;
			}
			rrstatus=isin?['15938','大广播故障']:['4970','CUSS|故障']
			if(isin){
				$('#rrstatus_show').change();
			}else{	
				num[3]='岛|CUSS';$('#rrstatus_show').change();
			}
			break;
		case '6':
			if(num[1]==1&&num[2]==7){
				rrstatus=['41330','读卡器刷不开'];
				break;
			}
			rrstatus=isin?['5459','小广播故障']:['3475','IWS|身份证阅读器故障'];
			if(isin){
				$('#rrstatus_show').change();
			}
			break;
		case '7':
			if(num[1]==1&&num[2]==7){
				rrstatus=['805','门关不上'];
				break;
			}
			rrstatus=['6433','鼠标|故障'];
			break;
		case '8':
			if(num[1]==1&&num[2]==7){
				rrstatus=['406','门打不开'];
				break;
			}
			rrstatus=['8227',',PC键盘|故障'];
			break;
		case '9':
			if(num[1]==1&&num[2]==7){
				rrstatus=['13057','刷卡未使用'];
				break;
			}
			rrstatus=['1091','电脑'];
			break;
		default:
			if(window.count>0){
				window.count=0
					if(num[1]==1&&num[2]==7){
					rrstatus=['1992','门禁|强打'];
					break;
				}
				rrstatus=isin?['1700','BGR|登机牌扫描器|故障']:['3156','OCR|键盘无法刷护照'];
			}else{
				window.count=9;
				if(num[1]==1&&num[2]==7){
					rrstatus=['13057','刷卡未使用'];
					break;
				}
				rrstatus=['1091','电脑'];
			}
	};
	if(num[4]){
		$('#suetel').val(str.substr(0,4));
	}
	$('#suebranchname_show').val(suebranch[1]);
	$('#suebranchid').val(suebranch[0]);
	$('#suebranchname').val(suebranch[1]);
	$("#deviceareaname").val(devicearea[1]);
	$("#deviceareaid").val(devicearea[0]);
	if(num[1]==1&&num[2]==7){
		//$('#devicepositiondesc_show').val($('#devicepositiondesc_show').val()?$('#devicepositiondesc_show').val():dao+num[3]+t);
		//$('#devicepositiondesc').val($('#devicepositiondesc_show').val()?$('#devicepositiondesc_show').val():dao+num[3]+t);
	}else{
		$('#devicepositiondesc_show').val(dao+num[3]+t);
		$('#devicepositiondesc').val(dao+num[3]+t);
	}
	$('#rrstatus_show').val(rrstatus[1]);
	$('#rrstatusid').val(rrstatus[0]);
	$('#rrstatus').val(rrstatus[1]).change();
	$('#systemname').val(system[1]);
	$('#systemid').val(system[0]);
	$('#deptadminid_show').val('浦东-机通-系统运行中心');
	$('#deptadminid').val('101071400000000');
	$('#deptonchargeid').val('101071400000000');
	updateTime();
	window.receiptrecordone_nextnode=function(){
			if(checkallinputlength()==false){
				return false;
			}
			if(checkalldeptid() ==false){
				return false;
			}
			if($('#suetel').val()<4){
				alert('不要发下去空的报修啊 老铁 你这不是坑我吗.....');
				return false;
			}
			var val=arguments[0]||confirm('您确认【提交】本记录吗？\\n提交后本记录将流向下一节点 【基层科室处理中】 \\n如果您是基层科室，想将报修转至系统管理员处理或进行遗留处理\\n请点击【取消】，在【报修状态栏】进行相应选择后再次提交')
	        if(val) {
	            setPeriodtime();
	            $("#rrscontent").mask("加载中...");
	            document.getElementById("st").value = "rr_onebyrrid_insert_save";
	            document.getElementById("gp").value = "receiptrecord_cred_success";
	            document.getElementById("resultid").value = "30";
				function state_Change(){
					if (request.readyState==4){
					  	if (request.status==200){
					  		init();//初始化
					    	if(num[4]==0){	//做了一点统计工作
								localStorage.setItem('1',eval(localStorage.getItem('0')||0)+1);
							}else if(num[4]==1){
								localStorage.setItem('1',eval(localStorage.getItem('1')||0)+1);
							}else if(num[4]==2){
								localStorage.setItem('2',eval(localStorage.getItem('2')||0)+1);
							}else if(num[4]==3){
								localStorage.setItem('3',eval(localStorage.getItem('3')||0)+1);
							}else if(num[4]==4){
								localStorage.setItem('4',eval(localStorage.getItem('4')||0)+1);
							}else if(num[4]==5){
								localStorage.setItem('5',eval(localStorage.getItem('5')||0)+1);
							}else if(num[4]==6){
								localStorage.setItem('6',eval(localStorage.getItem('6')||0)+1);
							}else if(num[4]==7){
								localStorage.setItem('7',eval(localStorage.getItem('7')||0)+1);
							}else if(num[4]==8){
								localStorage.setItem('8',eval(localStorage.getItem('8')||0)+1);
							}else if(num[4]==9){
								localStorage.setItem('9',eval(localStorage.getItem('9')||0)+1);
							}
					    	openHome()
					    	ws.send('rel()')
					    	$("#rrscontent").unmask();
					    }else{
					    	alert("恭喜你服务器大姨妈了 没提交上去 再来一遍吧");
					    	window.close();
					    }
					}
				}
	            var formElement = document.querySelector("form");
				var request = new XMLHttpRequest();
				request.onreadystatechange=state_Change;
				var data=new FormData(formElement);
				//request.open("POST", "http://zmj.ejdcloud.cn/admin/user/regist1",false); 只是我的一个调试代码
				request.open("POST", "/rrs/receiptrecordLogin.html",false);
				request.send(data);
	            return false;
	        }else{
	            return false;
	        }
    }
}
$('#suetel').bind('input',suetel).nextAll().remove();
$('#suetel').after('<span style="color:green" title="修改了几个漏洞 建议使用F5刷新 否则我的代码将被清空 \\n每隔30秒读第一个分配中报修 可以按0取消此条报修的播报 \\n并且这辈子都不会再报了 然后开始读第二个分配中报修\\n如果服务器出现500报错自动刷新">超级瞄准已部署(V.201801031)</span>');
setTimeout(()=>{
	window.name='zmj';
	document.title="超级瞄准 ING！！!";
})
openHome()
`);
eval(localStorage.getItem('begin')); 