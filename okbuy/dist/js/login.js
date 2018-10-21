window.onload=function(){
// =======================选项卡面向对象=====================================
function Tab(){}
Tab.prototype.init = function(btn_selector,item_selector){
    this.btn = document.querySelectorAll(btn_selector);
    this.item = document.querySelectorAll(item_selector);
    this.handleEvent();
}
Tab.prototype.handleEvent = function(){
    for (var i =0;i<this.btn.length; i++) {
        this.btn[i].index =i;
        this.btn[i].onclick = this.changIndex.bind(this);
    }
}
Tab.prototype.changIndex = function(event){
    var e =event || window.event;
    var target = e.target || e.srcElement;

        this.nowIndex = target.index;
        this.show();
        
}
Tab.prototype.show = function(){
    for(var i =0 ; i<this.item.length; i++){
        this.item[i].style.display = "none";
    }
    this.item[this.nowIndex].style.display ="block";
}
var tab = new Tab();
tab.init("#splist span","#login_form section")

// ================显示隐藏===========================
$(".qr_code").on("mouseover",function(){
    $("#tishi").show('slow');
  })
  $(".qr_code").on("mouseleave",function(){
    console.log(1)
    $("#tishi").hide('slow');
  })
// =================获取cookie值并验证=======================
  $("#btn").on("click",function(){
    if(getCookie("username") == $("#user").val() && getCookie("password") == $("#password").val()){
        document.cookie="yonghu="+ $("#user").val();
        location.href = "index.html";
        //console.log(11)
    }else{
        alert("请重新输入")
    }
})

}