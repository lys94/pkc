var host = "";

Zepto(function(){
    // 参数
    var  id, bigClientId, name, address, longitude, latitude, diningTableMember, dutyPerson, marketId, auditState, auditTime, auditId, dutyPersonPhone, predictPut, businessLicenseUrl, licenseUrl, shopPhotoUrl, shopInsidePhotoUrl, enteringTime, grossIncome, cashWithdrawalAmount;

    //发送验证码
    var Token;
    function ajaxauth(){
        if( !(/^1(3|4|5|7|8)\d{9}$/.test($("#dutyPersonPhone").val())) ) return alert('请输入正确的手机号码');
       $("#get").off("click");
       $("#get").css("color", "gray");
       $("#get").html("发送中");
        $.ajax({
            type: "POST",
            url: host + "/pkc_coordination/api/shop/getRegisterCode",
            data: $.param({ dutyPersonPhone: $("#dutyPersonPhone").val() }),
            contentType: 'application/x-www-form-urlencoded',
            
            success: function(data){
                // console.log(data);
                if(data == "" || JSON.parse(data).success == false){
                    $("#get").css("color","#FF8000");
                    $("#get").on("click",ajaxauth);
                    $("#get").html("获取验证码");
                    return;
                }
                var i = 60;
                var tId = setInterval(function(){
                    $("#get").css("color","gray");
                    $("#get").html(i+"s可重发");
                    i--;
                    if(i === -1){
                        clearInterval(tId);
                        $("#get").html("获取验证码");
                        $("#get").css("color","#FF8000");
                        $("#get").on("click",ajaxauth);
                    }
                }, 1000);

            }
            ,error:function(){
                    $("#get").css("color","#FF8000");
                    $("#get").on("click",ajaxauth);
                     $("#get").html("获取验证码");
                }
        }); 
    }
    $("#get").on("click", ajaxauth);
// .............................

    //验证验证码
    var tmp = $("#inform").text();
    $("#ipt3").on("input",function(){
        if($("#ipt3").val().length == 4){
            $.ajax({
                type: "POST",
                url: host + "/pkc_coordination/api/shop/checkRegisterCode",
                data: $.param({
                    dutyPersonPhone: $("#dutyPersonPhone").val(),
                    code: $("#ipt3").val(),
                }),
                contentType: 'application/x-www-form-urlencoded',
                success: function(data){
                    data = JSON.parse(data);
                    if(!data.success && data.code === "1"){
                        $("#inform").text("验证码不正确");
                        $("#inform").css("color","red");
                        Token = null;
                    }else{
                        $("#inform").text(tmp);
                        // $("#check-circle").css("color","#1aad19");
                        $("#inform").text("验证码正确");
                        $("#inform").css("color","green");
                        Token = data.registerToken;
                    }
                }
            });
        }else{
            $("#inform").text("验证码不正确");
            Token = null;
        }
    });

    var formatDate = function (date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + m + d;  
    }; 
        // oss参数
    var OSSAccesskeyId = 'ManED1U7BRr5YRIo',
          policy = 'eyJleHBpcmF0aW9uIjoiMjExNS0wMS0yN1QxMDo1NjoxOVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDEwNDg1NzZdXX0=',
          Signature = 'HBmfIEPxDTHY+zpOom5pcseEG/U=',
          success_action_status = 201,
          url = 'http://pkc-oss.oss-cn-shenzhen.aliyuncs.com',
          key,
          MAXSIZE = 2400000;
    var shopPhoto = document.getElementById('shopPhotoUrl');
    var license = document.getElementById('licenseUrl');
    var shopInsidePhotoUrl, shopPhotoUrl, licenseUrl, businessLicenseUrl;
    
   
    //图片上传
    function addListener(upload, url){     
        upload.addEventListener('change', function(){
            if(upload.files[0].size > MAXSIZE) return alert("图片大小过大,请上传其他图片");
            // console.log(upload.files[0])
            var date = new Date();
            key = formatDate(date) + '/' + Date.parse(date) + '_' + upload.files[0].name;
            if(upload.files[0]){
                var formdata=new FormData();
                formdata.append('key' , key);
                formdata.append('OSSAccesskeyId' , OSSAccesskeyId); 
                formdata.append('policy' , policy);
                formdata.append('Signature' , Signature);
                formdata.append('name' , upload.files[0].name);
                formdata.append('success_action_status' , success_action_status);
                formdata.append('file' , upload.files[0]);
                upload.parentNode.style.backgroundImage='url('+URL.createObjectURL(upload.files[0])+')';
                upload.parentNode.className='ifo-img';

                // 
                $(upload).next().css("opacity",0);
                // $(upload).next().css("display","none");
                // console.log($(upload).next());

                $.ajax({
                    type: 'POST',
                    url: "http://pkc-oss.oss-cn-shenzhen.aliyuncs.com",
                    data: formdata,
                    headers:{
                        'Upgrade-Insecure-Requests':1
                    },
                    contentType: false,
                    processData: false,
                    dataType: 'xml',
                    complete:function(xhr,status){
                        // console.log(xhr);
                        // console.log(status);
                        if(xhr.status == '201'){
                            var parser=new DOMParser();
                            var xmlDoc=parser.parseFromString(xhr.response , "text/xml");
                            upload.url = xmlDoc.getElementsByTagName('Location')[0].textContent;
                        }
                    }
                });
            }else {
                upload.parentNode.className='fa ifo-img qualifications';
            }

        }, false);
    }
    addListener(shopPhoto, shopPhotoUrl);
    addListener(license, licenseUrl);      
   
    
    
    // $("#diningTableMember").on('input', function(e){
    //     $("#ipt4-2").val($("#diningTableMember").val());
    // });
        
// 增加减少
// 获取元素
var diningTableMember=document.getElementById('ipt4-1');
var predictPut=document.getElementById('ipt4-2');
var up1=document.getElementById('up1');
var down1=document.getElementById('down1');
var up2=document.getElementById('up2');
var down2=document.getElementById('down2');
up1.onclick=function(){
    diningTableMember.value++;
    diningTableMember.style.borderColor='green';
}
var reg=/[^\d]/g;
diningTableMember.oninput=function(){
    var value=this.value;

    var air=value.replace(reg,"");

    this.value=air;
}
predictPut.oninput=function(){
    var value=this.value;

    var air=value.replace(reg,"");

    this.value=air;
}
down1.onclick=function(){
    if(diningTableMember.value==1){
        return false;
    }
    if(diningTableMember.value==''){
        return false;
    }
    diningTableMember.value--;   
}
up2.onclick=function(){
    if(predictPut.value==2){
        return false;
    }
    predictPut.value++;
    predictPut.style.borderColor='green';
}
down2.onclick=function(){
    if(predictPut.value==1){
        return false;
    }
    if(predictPut.value==''){
        return false;
    }
    predictPut.value--;   
}
diningTableMember.onkeyup=function(){
    var value1=this.value;
    var min=1;
    if(parseInt(value1)<min){
        this.value='';
    }
}
predictPut.onkeyup=function(){
    var value=this.value;
    var min=1;
    var max=2;
    if(parseInt(value)<min||parseInt(value)>max){
        this.value='';
    }
}
// input失去焦点判断有没有内容
function blur(ele){
    $(ele).blur(function () {
        this.style.borderColor = this.value == '' ? 'red' : 'green';
    })
}

blur('#real-name');
blur('#shop-address');
blur('#ipt3');
blur('#shop-name');
blur('#dutyPersonPhone');
blur('#ipt4-1');
blur('#ipt4-2');
// 

    
    
    

//提交添加
    submit.addEventListener('click', function(e){
        var submit = document.getElementById('sbumit'),
              name = document.getElementById('real-name').value,
              address = document.getElementById('shop-address').value,
              diningTableMember = document.getElementById('ipt4-1').value,
              predictPut = document.getElementById('ipt4-2').value,
              identifying_code = document.getElementById('ipt3').value,
              store_name = document.getElementById('shop-name').value,
              dutyPersonPhone = document.getElementById('dutyPersonPhone').value;
              // console.log(diningTableMember);
              latitude = document.getElementById('latitude').innerText;
              longitude = document.getElementById('longitude').innerText;
      
        if( !(/^1(3|4|5|7|8)\d{9}$/.test(dutyPersonPhone)) ) return alert('请输入正确的手机号码');
        if(isNaN(parseInt(diningTableMember)) || isNaN(parseInt(predictPut))) return alert('餐桌数量和设备申请数量必须是数字');
        if(parseInt(diningTableMember)<=0 || parseInt(predictPut)<=0) return alert('餐桌数量和设备申请数量必须大于0');
        if(!license.url ||!shopPhoto.url) return alert("门店资质和门店照片都不能为空");
        if(parseInt($("#ipt4-2").val()) > 2) return alert("申请数量暂时不能超过两台");
        if(address=='') return alert("请输入地址");
        // if(latitude == '' || longitude == '')
            // return alert("无法解析门店地址");
        if('' == name || '' == address || '' == store_name) return alert('请填完整数据');
        if(name.length > 8) return alert('负责人姓名最大长度为8个字符');
        // 修改
        if(false){
        }else{
            //防止正确token缓存在内存中
            if($("#ipt3").val().length == 4){
                $.ajax({
                    type: "POST",
                    url: host + "/pkc_coordination/api/shop/checkRegisterCode",
                    data: $.param({
                        dutyPersonPhone: $("#dutyPersonPhone").val(),
                        code: $("#ipt3").val(),
                    }),
                    contentType: 'application/x-www-form-urlencoded',
                    success: function(data){
                        data = JSON.parse(data);
                        if(!data.success && data.code === "1"){
                            alert("验证码不正确");
                            Token = null;
                        }else{
                            $("#inform").html(tmp);
                            Token = data.registerToken;
                            //验证手机号是否可用
                            $.get("/pkc_coordination/api/shop/checkPhoneAvailable",
                                    {phone : dutyPersonPhone},
                                    function(data){
                                        data = JSON.parse(data);
                                        if(data.success == 0){//手机号有问题|被注册过了
                                            $("#iosDialog2").fadeIn();
                                        }else{
                                            //新增
                                            $.ajax({
                                                type: 'POST',
                                                url: host + "/pkc_coordination/api/shop/shopApply",
                                                data: $.param({
                                                    name: store_name,
                                                    dutyPerson: name,
                                                    address: address,
                                                    diningTableMember: diningTableMember,
                                                    dutyPersonPhone: dutyPersonPhone,
                                                    predictPut: predictPut,
                                                    businessLicenseUrl: license.url,
                                                    shopPhotoUrl: shopPhoto.url,
                                                    registerToken: Token,
                                                    longitude: longitude,
                                                    latitude: latitude
                                                }),
                                                contentType: 'application/x-www-form-urlencoded',
                                                success:function(data){
                                                    // console.log(data);
                                                    data = JSON.parse(data)
                                                    if("0" === data.code  && data.success === true){
                                                        alert("提交成功");
                                                        // console.log(data);
                                                        location.href = "./connect.html"
                                                    }                
                                                }
                                            });
                                        }
                                    });
                        }
                    }
                });
            }else{
                Token = null;
                alert("验证码不正确");
            }            
        }
    }, false);

    // 已经注册的手机号码
    $(function(){
        $(".dialog-bottom a").click(function(){
            $("#iosDialog2").fadeOut();
            return false;
        });
    });
 });






