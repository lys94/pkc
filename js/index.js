//导航栏添加选中样式
$(document).ready(function(){
 $('.right li a').each(function(){ 
 if($($(this))[0].href==String(window.location)) 
 $(this).parent().addClass('active'); 
 }); 
})