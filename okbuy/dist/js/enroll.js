window.onload=function(){
    // var ouser = document.getElementById("user");
    // var opwd = document.getElementById("password");
    // var oBtn = document.getElementById("btn");
    // var ph_ts= document.querySelectorAll(".user_hint span")

    // var sPass = opwd.value;
    $("#user").blur(function(){
        if($("#user").val() == ""){                           //为空时i为空;
            $(".user_hint span").html("不能为空")
            $(".user_hint span").css({color:"red"})
            $("#sj_vcode").css({display:"none",})
            return 0;
            }
        var pho =/^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/
        if(pho.test($("#user").val())){
                $("#user").css({
                    border:"",
                })
                $("#sj_vcode").css({
                    display:"inline",
                })
                $(".user_hint span").html("")
                return 0;
            }else{
                $("#user").css({
                    border:"1px solid #D60456",
                })
                $("#userlogin .user_hint i").css({
                   display:"inline",
                })
                $(".user_hint span").html("请正确输入手机号！")
                $("#sj_vcode").css({
                    display:"none",
                })
            }
        } );



        $("#password").blur(function(){
            if($("#password").val() == ""){                           //为空时i为空;
                $(".pwd_hint span").html("请输入密码")
                $(".pwd_hint span").css({color:"red"})
                $("#pwd_vcode").css({display:"none",})
                return 0;
                }
                var regpwd = /^[a-z0-9\!\@\#\$\%\^\&\*\(\)\_\.]{6,20}$/;      //建议使用字母、数字、符号的两种以上组合，6-20个字符规则;
            if($("#password").val().length >= 6 && $("#password").val().length <= 20){
                console.log($("#password").val());
                    if(regpwd.test($("#password").val())){                 //凭密码安全等级
                        
                        // var spwd = $("#password").val();
                        if(regpwd.test($("#password").val())){
                            //=================================
                            $(".pwd_hint span").html(" ");
                            var rate = 0;
                            var regNum = /\d/;
                            var regWord = /[a-z]/;
                            var regSymbol = /[\!\@\#\$\%\^\&\*\(\)\_\.]/;
                            
                            if(regNum.test($("#password").val())){
                                rate++;
                            }
                            if(regWord.test($("#password").val())){
                                rate++;
                            }
                            if(regSymbol.test($("#password").val())){
                                rate++;
                            }
                            
                            switch(rate){
                                case 1:{$(".pwd_hint span").html("账号存在被盗风险,请更改安全度较高的代码");
                                        $(".pwd_hint span").css({color:"red"})
                                         $("#pwd_vcode").css({display:"inline",})
                                    break;}
                                case 2:{$(".pwd_hint span").html("安全强度适中，可以使用三种以上的组合来提高安全强度");
                                         $("#pwd_vcode").css({display:"inline",})
                                         $(".pwd_hint span").css({color:"orange"})
                                    break;}
                                case 3:{$(".pwd_hint span").html("你的密码很安全");
                                        $("#pwd_vcode").css({display:"inline",}) 
                                        $(".pwd_hint span").css({color:"green"}) 
                                    break;}
                            }   
                        }
                        //========================================                        //评级结束
                            }else{
                                $(".pwd_hint span").html("格式错误，仅支持字母、数字、符号的组合");
                                $(".pwd_hint span").css({color:"red"})
                                $("#pwd_vcode").css({display:"none",})
                            }	
            }else{
                $(".pwd_hint span").html("长度只能在4-20个字符之间");
                $("#pwd_vcode").css({display:"none",})
                $(".pwd_hint span").css({color:"red"})
            }	
        })
        

        $("#txyz").blur(function(){
            if($("#txyz").val() == ""){                           //为空时i为空;
                $(".auco_hint span").html("请输入验证码")
                $(".auco_hint span").css({color:"red"})
                $("#tupian_vcode").css({display:"none",})
                return 0;
                }
            var rules = /^[0-9]{4}$/;
            if(rules.test($("#txyz").val())){
                $("#tupian_vcode").css({display:"inline",})
                $(".auco_hint span").html(" ")
            }else{
                $(".auco_hint span").html("验证码输入错误")
                $(".auco_hint span").css({color:"red"})
                $("#tupian_vcode").css({display:"none",})
            }




        })

        $("#btn").on("click",function(){
            setCookie("username",$("#user").val(),{
                path:"/",
                expires:15
            })
            setCookie("password",$("#password").val(),{
                path:"/",
                expires:15
            })
            console.log(1)
            alert("注册成功！")
            location.href="Login.html";
        })

       


}