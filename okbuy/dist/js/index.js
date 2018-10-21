window.onload= function(){



//=================== 商品渲染=======================================================


    //=========================1==================
   
    var obox = document.getElementById("box");

    Ajax("http://localhost:8888/proxy/www.okbuy.com/ajax/homepage/index?cid=3",function(res){
        var json = JSON.parse(res);
        var html = "";
        var res_box = json.res;
        // console.log(res_box.endtime);

        for(var i = 0; i<res_box.length;i++){
           
            html += `
                    <li>
                        <img src="${res_box[i].img}" alt="">
                        <span class="tit1">${res_box[i].slogan}</span>
                        <span class="tit2">${res_box[i].title}</span>
                        <span class="tit3">${res_box[i].discount}</span>
                        <div class="daotime">
                            <p id="daojishi"  data-time="${res_box[i].endtime}">
                            
                            </p>
                        </div>
                    </li>
                    
                    `;

        }  
        obox.innerHTML = html;

     })
     //========================2渲染====================
    //  var xszk = document.getElementById("xszk");
     Ajax("http://localhost:8888/proxy/www.okbuy.com/ajax/homepage/index?cid=4",function(res){
        var json = JSON.parse(res);
        var html = "";
        var res_box = json.res;
           // console.log(res_box[i].endtime);
        for(var i = 0; i<res_box.length;i++){
            // console.log(res_box[i].endtime);
            var data = res_box[i].endtime;
            // var data_time = res_box[i].endtime;
            // console.log(data);
            html += `
                        <li>
                        <img src="${res_box[i].img}" alt="">
                        <p class="tit">
                            ${res_box[i].title}
                            <span class="tstitle">${res_box[i].slogan}</span>
                        </p>
                        <div class="daotime2">
                            <p id="daojishi"  data-time="${res_box[i].endtime}">
                                
                            </p>
                        </div>
                    </li>
                    
                    `

        }  
        $("#xszk").html(html);

     });

// ======================倒计时封装===================================================


setTimeout((function(){
        var $li = $("#box>li .daotime p");
        console.log($li)
    for(var i = 0 ; i < $li.length ; i++){
        console.log(1)
        CountDown($li.eq(i).attr("data-time"),$li.eq(i));
    };
        var $li2 = $("#xszk>li .daotime2 p")
    for(var i = 0 ; i < $li.length ; i++){
        console.log(1)
        CountDown($li2.eq(i).attr("data-time"),$li2.eq(i));
    }
}),1000)




     function CountDown( time , ele ){
        
        var endTime = new Date(time);
        // console.log(ele)
        var timer = setInterval(function(){
            var start = new Date();
            var count = endTime.getTime() - start.getTime();
            if(count <= 0){
                // 倒计时结束语句;
                clearInterval(timer);
            }
            
            // 获取时分秒;
            var day =  parseInt(count /1000 / 3600/24);
            var hours = parseInt((count-day*1000*24*3600)/3600/1000);
            var minutes = parseInt((count - day*1000*24*3600 - hours * 3600 * 1000)/1000/60);
            var seconds = parseInt((count - day*1000*24*3600 - hours * 3600 * 1000 - minutes *60000)/1000);
            var msec = parseInt((count - day*1000*24*3600 - hours * 3600 * 1000 - minutes *60000- seconds*1000)/100);
            // 放入倒计时;
            ele.html(`
                             <span id="day" style="color:#d70057; font-weight: bold;">${day}</span>
                            <span>天</span>
                             <span id="hour" style="color:#d70057; font-weight: bold;">${hours}</span>
                             <span>时</span>
                             <span id="minute" style="color:#d70057; font-weight: bold;">${minutes}</span>
                            <span>分</span>
                            <span id="second" style="color:#d70057; font-weight: bold;">${seconds}</span>
                             <span>秒</span>
                             <span id="lyi" style="color:#d70057; font-weight: bold;">${msec}</span>
            `);
        },1)
    }


// ==============      返回顶部      =========

var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
// console.log(clientHeight)
onscroll = function(){
   
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop ;
    if(scrollTop >= 600){
        goTop.className = "active";
    }else{
        goTop.className = "";
    }

    if(scrollTop >= 6190 - clientHeight +50 ){
        goTop.className = "";
    }
goTop.onclick = function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

    // ============吸顶===============
        if(scrollTop >= 224){
            $(".end_nav").addClass("active")
            
        }else{
            $(".end_nav").removeClass("active");
        }
}
// ===============用户========================
if(getCookie("username") == getCookie("yonghu")){
    $(".name").html("欢迎"+getCookie("username"))
    $(".logined").css({
        display:"inline",
    })
}

$(".logout").on("click",function(){
    removeCookie("yonghu",{
        path:"/",
    })
    window.location.reload(true)
    $(".logined").css({
        display:"none",
    })
})
// ===================================================
}