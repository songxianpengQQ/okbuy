function Ajax(url,callback){  //传入形参 地址和成功反馈的回调函数
//==================4步============================================
	var xhl = new XMLHttpRequest();   //发送请求        JS操纵的一个可以发送http请求的对象;
	xhl.open("GET",url);              //HTTP 请求方式; get post;
	xhl.send(null);                   //发送请求  0 1  一般不会被访问到   2 发送 3接受  4完成
	xhl.onload = function(){          //当readyState（工具状态）变成4时才触发
		if(xhl.status == 200){        //status(http状态码    200=ok 304 303 400 403 404 5以上为服务器问题 500 504)
			callback(xhl.response);    //respon(后台echo返回给前台的信息)
		}
	}
	
}
function ajaxGet(url){
    return new Promise(function(succ){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send(null);
        xhr.onload = function(){
            succ(xhr.response)
        }
    })
}
function ajaxPost(url,data){
    return new Promise(function(succ){
        var xhr = new XMLHttpRequest();
        xhr.open("POST",url);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8;");
        xhr.send(data);
        xhr.onload = function(){
            succ(xhr.response)
        }
    })
}
function jsonp(url,cb){
    return new Promise(function(succ){
        // 提取出了前端的全局函数; 可以任性随便写;
        var cb_name = "callback" + new Date().getTime();
        window[cb_name] = function(res){
            succ(res);
        }
        var script = document.createElement("script");
        var opt = /\?/.test(url) ? "&" : "?";
        script.src = url + opt + cb +"="+cb_name;
        document.body.appendChild(script);
        script.onload = function(){
            this.remove();
        }
    })
}