

//检验手机号码和验证码
function settime(val) { 
	//检测手机号码是否正确
	var phone = document.getElementById('phone').value;
	var countdown=60; 
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
       }
	    if (countdown == 0) {  
	        val.removeAttribute("disabled");  
	        val.value="获取验证码";  
	        countdown = 60;  
	        return false;  
	    } else {  
	        val.setAttribute("disabled", true);  
	        val.value="重新发送(" + countdown + ")";  
	        countdown--;  
	    }  
	    setTimeout(function() {  
	        settime(val);  
	    },1000);  
	}

/**
 * 选择图片并预览
 */
function setImagePreview(){
	//第二file对象
	var photoInput=document.getElementById("photo");
	//调用点击事件
	photoInput.click();
	//监听事件
	photoInput.addEventListener('change',function(){
		//打印信息，方便查看
		console.log(photoInput);
		console.log($(photoInput).val());
		//打印这个是选择图片的对象
		console.log(photoInput.files[0]);
		//第二个预览的div对象
		var imgOprieview=document.getElementById("preview");
		
		imgOprieview.src = window.URL.createObjectURL(photoInput.files[0]);
	},false);
	
}  

/**
 * 选择图片并预览
 */
function setImagePreview2(){
	//第二file对象
	var photo2Input=document.getElementById("photo2");
	//调用点击事件
//	photo2Input.click();
document.getElementById('photo2').click();
	
	//监听事件
	 photo2Input.addEventListener('change', function(){ 
		 	//打印信息 方便查看
	    	console.log(photo2Input);
	    	console.log($(photo2Input).val());
	    	
	    	//打印这个是选择图片的对象
	    	console.log(photo2Input.files[0]);
	    	
	    	//第二个预览div对象
	    	var imgObjPreview=document.getElementById("preview2");
	    	
	    	//window.URL.createObjectURL 这个是浏览器自带的方法
	    	imgObjPreview.src = window.URL.createObjectURL(photo2Input.files[0]);
	    	
	    }, false);
	 
	 
}


/*
 数量添加上下按钮
 * */
var predictPut=document.getElementById('number2');
var diningTableMember=document.getElementById('number');

 function img1(){
 	//文本框值加一
    diningTableMember.value++;
    //点击后文本框变颜色
    diningTableMember.style.borderColor='lightskyblue';
 }

function img2(){
   if(diningTableMember.value==1){
        return false;
    }
    if(diningTableMember.value==''){
        return false;
    }
    diningTableMember.value--; 
    
 }

function up(){
	if(predictPut.value==2){
        return false;
    }
    predictPut.value++;
    predictPut.style.borderColor='lightskyblue';
}

function down(){
	if(predictPut.value==1){
        return false;
    }
    if(predictPut.value==''){
        return false;
    }
    predictPut.value--;
}

//限制输入数量大小
predictPut.onkeyup=function(){
    var value=this.value;
    var min=1;
    var max=2;
    if(parseInt(value)<min||parseInt(value)>max){
        this.value='';
    }
}



//提交添加
function clickbutton(){
	var name=document.getElementById("name");
	var phone = document.getElementById('phone').value;
	var shopname= document.getElementById("shopname");
	var site=document.getElementById("site");
	var photo=document.getElementById("photo");
	var photo2=document.getElementById('photo2');
	var preview=document.getElementById('preview');
	//检测用户名是否为空
	if(name.value==""||name.value==null){
		
		alert("带*号为必填， 姓名不能为空。");
		return false;
	}
	//检测手机号码是否为空
	if(!(/^1[34578]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填。");  
        return false; 
    } 
	//检测店名是否为空
	if(shopname.value==""||shopname.value==null){
		alert("带*号为必填， 店名不能为空。");
		return false;
	}
	//检测地址是否为空
	if(site.value==""||site.value==null){
		alert("带*号为必填，地址不能为空。");
		return false;
	}

	//检测门店资质图片是否为空
	if($("#photo2").val()==""||$("#photo").val()==""){
		alert("门店资质和门店图片不能为空");
	}

}