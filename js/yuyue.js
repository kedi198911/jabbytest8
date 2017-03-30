
$(function(){
    $("#submit1").on("click",function(event) {
        var sucFun = function(){
            var msg = "恭喜，您已报名成功！我们会尽快联系您！";
           	alert(msg);
        }
        validateLinsten('#yuyue3',"http://zyadmin.xhd.cn", true, sucFun, 637214);
        event.preventDefault();
    });  
});

function charToInt(unames) {
    if(unames==null||unames==""){
        return "";
    }
    var arr = {};
    var rtn = "";
    arr[0] = unames.charAt(0);
    rtn = arr[0].charCodeAt();
    for ( var i = 1; i < unames.length; i++) {
        arr[i] = unames.charAt(i);
        rtn = rtn + "," + arr[i].charCodeAt();
    }
    return rtn;
}; 
  
function submitLinsten(domain, hasContent, from, sucFun, name, phoneNo, contentId, email) {
    var url = domain + "/listen.jspx?callbak=?&";
    var param = "";
    if (hasContent) {
        param += "contentId=" + contentId + "&";
    } else {
        param += "contentId=557901&";
    }
    param += "name=" + charToInt(name) + "&";
    param += "phoneNo=" + phoneNo + "&";
    param += "email=" + email + "&";
    param += "siteId=3"

    /*  param += "email="+email+"&";*/
    url += param;
    $.getJSON(url, function(data) {
        if (data.success) {
            if (sucFun != null && typeof sucFun == 'function') {
                sucFun();
            } else {
                alert("您的预约已提交，我们会尽快与您取得联系！");
            }
        } else {
            if (data.status == 3) {
                alert("预约提交失败，此手机号已预约！");
            } else {
                alert("预约提交失败，请重试！");
            }
        }
    });
};

function validateLinsten(constiner , domain , hasContent , sucFun , contentId){
    var msg = "以下原因导致提交失败\n";
    var boo = true;                        
    var isp = "";
    var college = $(constiner).find("select[name='contentId']").children('option:selected').text();
    var name = $(constiner).find("input[name='name']").val();          
    var phoneNo = $(constiner).find("input[name='phoneNo']").val();             
    var email= $(constiner).find("input[name='email']").val();

    if(isEmpty(name) || eq(name , $(constiner).find("input[name='name']").attr("val"))){
        msg += "您的名字不能为空!\n";
        boo = false;
    }
    else if(!rightReg(name , /^[\u0391-\uFFE5]+$/)){
        msg += "您的名字只能是中文名!\n";
        boo = false;
    }
    if(isEmpty(phoneNo) || eq(phoneNo , $(constiner).find("input[name='phoneNo']").attr("val"))){
        msg += "您的电话不能为空!\n";
        boo = false;
    }else if(!rightReg(phoneNo , /^[0-9]{11}$/)){
        msg += "您的电话格式不正确!\n";
        boo = false;
    } 
    if(isEmpty(email) || eq(email , $(constiner).find("input[name='email']").attr("val"))){
        msg += "您的邮箱不能为空!\n";
        boo = false;
    }

    name = "姓名：" + name + "--" + "大学：" + college;

    if(!boo){
       alert(msg);
    }else{
        submitLinsten(domain , hasContent , null , sucFun , name , phoneNo , contentId, email);
    }
};
   
function rightReg(str , reg){
    var r = new RegExp(reg);
    return r.test(str);
}
function eq(str1 , str2){
    return str1==str2;
}
function isEmpty(str){
    return str == null || str == "";
}

