window.onload = function () {



    // =============================跨页引数据=======================================
    let detail = {
        init() {
            // 获取商品id
            this.getId();
            this.addData();
        },
        // 获取id及页码
        getId() {
            let data = location.href.split("?")[1];
            this.id = data.split("&")[0].split("=")[1];
        },
        addData() {
            // 获取所有商品数据
            new Promise((resolve, reject) => {
                $.ajax({
                    type: "get",
                    url: "http://localhost:8888/js/datalist.json",
                    data: "",
                    dataType: "json",
                    success: function (response) {
                        resolve(response);
                    }
                });
            }).then((response) => {
                var list = response.body.goodsList;
                // console.log(list);//获取的全部数据
                // console.log(this.id);//获取的id
                // console.log(this.id);
                for (var i = 0; i < list.length; i++) {

                    if (list[i].goodsId == this.id) {
                        var html = "";
                        var title_h3 = "";
                        var quotation = "";
                        var html1 = "";

                        html += `
                            <div id="mo"></div>
                            <img src="${list[i].goods.imageUrl}" id="sa">
                            <div id="filter" style="background:url(${list[i].goods.imageUrl}) 0 0 no-repeat;background-size:400px 400px"></div>
                    `;
                        html1 += `
                    <img src="${list[i].goods.imageUrl}" id="xa" />
                    `;
                        title_h3 = `
                                <h3>${list[i].goods.title}</h3>
                                `
                        quotation += `
                    <span class="xqjiage">￥${list[i].goods.actualCurrentPrice}</span>
                                ` ;
                        $(".xqh3").html(title_h3);
                        $("#small").html(html);
                        $(".price").html(quotation);
                        $("#maximgbox").html(html1);
                    }
                }

                loupe();
            })
        },

    }
    detail.init();




    // ============================放大镜========================================
    function loupe() {
        var oSmall = document.getElementById("small");
        var oFrame = document.getElementById("filter");
        var oBig = document.getElementById("maximgbox");
        var oBig_img = document.getElementById("xa");
        var oSmall_img = document.getElementById("sa");
        // console.log(oBig_img);
        oSmall.onmouseenter = function () {


            oBig.style.display = "inline-block";
            oFrame.style.display = "inline-block";
            oSmall_img.style.opacity = "0.3";
        }
        oSmall.onmouseleave = function () {
            oFrame.style.display = "none";
            oBig.style.display = "none";
            oSmall_img.style.opacity = "1"
        }
        oSmall.onmousemove = function (event) {
            var e = event || window.event;
            var offsetX = e.offsetX;
            var offsetY = e.offsetY;
            //边界
            var nleft = offsetX - 50;
            var ntop = offsetY - 50;

            if (nleft <= 0) {
                nleft = 0;
            }
            var maxleft = oSmall.offsetWidth - oFrame.offsetWidth;
            if (nleft >= maxleft) {
                nleft = maxleft;
            }


            if (ntop <= 0) {
                ntop = 0;
            }
            var maxtop = oSmall.offsetHeight - oFrame.offsetHeight;
            if (ntop >= maxtop) {
                ntop = maxtop;
            }
            oFrame.style.left = nleft + "px";
            oFrame.style.top = ntop + "px";
            //边界问题设置完成

            //=====================================================================================

            var propX = oBig.offsetWidth / oFrame.offsetWidth;
            //console.log(nleft)
            //根据比例算出位移
            oBig_img.style.left = -nleft * propX + "px";
            var propY = oBig.offsetHeight / oFrame.offsetHeight;
            //console.log(oBig_img.style.top)
            oBig_img.style.top = - ntop * propY + "px";
            //======================================================================================	
            oFrame.style.backgroundPosition = `${-nleft}px ${-ntop}px`
            // //滚轮
            var size = 100;
            // 鼠标滚轮事件;
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', handleEvent, false);
            }
            window.onmousewheel = document.onmousewheel = handleEvent;
            function handleEvent(event) {
                var e = event || window.event;
                var flag = true
                if (e.detail != 0) {
                    if (e.detail > 0) {
                        flag = false// 向下;
                    } else {
                        flag = true; // 向上;
                    }
                } else {
                    if (e.deltaY > 0) {
                        flag = false// 向下;
                    } else {
                        flag = true; // 向上;
                    }
                }
                if (flag) {
                    // 放大;
                    size++;
                } else {
                    // 缩小;
                    size--;
                }
                oFrame.style.width = size + "px";
                oFrame.style.height = size + "px";
                // 为什么要加上mousemove; ****;
                oSmall.onmousemove(e);
                // 大图和小图的比例计算;
                // 400 => big 的 宽高;
                var prop = 400 / size;
                // 根据比例缩放图片 ;
                oBig_img.style.width = 400 * prop + "px";
                oBig_img.style.height = 400 * prop + "px";
            };

        };

    }


    //================================== 购物车===========================================
    function ShopCar() { }
    $.extend(ShopCar.prototype, {
        init: function (opts) {
            // 参数合并;
            // opts 假定  会传入一个对象;
            //      假定  什么都没有;
            // 列表结构;
            this.main = $(".number");
            // 购物车图标;
            this.shopCarIcon = $("#Cart");
            // 购物车商品展示容器;
            this.goodsList = $(".tb_shopping");
            // 商品数量容器;
            this.showNumEle = $("#Cart").find(".nub_biao");
            this.loadJson()
                .then(function (res) {
                    // console.log(res,this);
                    // 数据加载成功
                    this.json = res.body.goodsList;
                })
            this.getId();
            this.bindEvent();
            this.showNum();
        },
        getId() {
            let data = location.href.split("?")[1];
            this.id = data.split("&")[0].split("=")[1];
        },
        loadJson: function () {
            var opt = {
                url: "http://localhost:8888/js/datalist.json",
                data: { start: 0, count: 48 },
                context: this
            };
            return $.ajax(opt);
        },
        bindEvent: function () {
            this.main.on("click", $(".addcart"), this.addCar.bind(this));
            // 查看;
            // 隐藏;
            // 清空购物车;
            this.shopCarIcon.on("mouseenter", this.showCar.bind(this))
            this.shopCarIcon.on("mouseleave", this.hideCar.bind(this))
        },
        addCar: function (event) {
            //console.log(151)
            var target = event.target;
            // 当前商品的id;
            var goodsId = this.id;
            // console.log(goodsId)
            // 把商品存入cookie之中;
            // $.cookie("shopCar",goodsId);
            // 以数组的规则去创建字符串;
            //  逻辑 ; 创建数组结构; => 购物车内容为空的时候;
            //       操作结构的增删改查 => 购物车内容不为空的时候;
            // var cookie;
            // if(!(cookie = $.cookie("shopCar")) || cookie == "[]"){
            //     // 建立结构;
            //     $.cookie("shopCar",`[{"id":${goodsId},"num":1}]`);
            //     // console.log()
            //     this.showNum();
            //     return 0;
            // }
            // // 数据添加;
            // var cookieArray = JSON.parse(cookie);
            //     // console.log(cookieArray);
            // // 当前商品是否存在;
            // var flag = false;
            // // 判定是否存在当前商品;
            // for(var i = 0 ; i < cookieArray.length ; i ++){
            //     if(cookieArray[i].id == goodsId){
            //         // 当前商品存在;
            //         flag = true;
            //         cookieArray[i].num ++;
            //     }
            // }
            // if(flag == false){
            //     // 创建商品cookie
            //     cookieArray.push({
            //         id : goodsId,
            //         num : 1
            //     });
            // }
            // // 操作之后的数组转换成字符串放入cookie之中;
            // $.cookie("shopCar",JSON.stringify(cookieArray));



            var goods = {};
            // 1.点击加入购物车的时候获取到当前商品的ID值
            // var goodsId = target.parentNode.parentNode.getAttribute("data-id");
            // 2.获取cookie值查看当前cookie中是否有数据
            if (getCookie("shopCar")) {
                // 如果有数据
                arr = JSON.parse(getCookie("shopCar"));
            } else {
                //当cookie中没有数据的时候
                var arr = [];
            }
            // 3.判断当前cookie中是否存在值
            if (arr.length > 0) {
                // 分为2种情况
                // 1、数组里面的数据正好有我刚才点击过的商品
                for (var i = 0; i < arr.length; i++) {
                    var bStop = false;
                    if (arr[i].id == goodsId) {
                        bStop = true;
                        arr[i].num++;
                        break;
                    }
                }
                if (!bStop) {
                    goods.id = goodsId;
                    goods.num = 1;
                    arr.push(goods);
                }
            } else {
                //如果数组中没有数据的情况下 声明一个对象，把商品的信息存入当前对象中然后插入到数组中
                goods.id = goodsId;
                goods.num = 1;
                arr.push(goods);
            }
            // 存入cookie
            setCookie("shopCar", JSON.stringify(arr), 7);
            this.showNum();
        },
        showCar: function () {
            // 如果为空不渲染;
            var cookie;
            // console.log(cookie)
            if (!(cookie = $.cookie("shopCar"))) {
                return 0;
            }
            var cookieArray = JSON.parse(cookie);
            console.log(cookieArray)
            // console.log(cookieArray[0].id)
            var arr = this.json;
            // console.log($(".tb_shopping").html(1111111))

            var html = "";
            var num = 0;


            for(var i = 0;i<arr.length;i++){
                // console.log(11)
                for(var j = 0;j<cookieArray.length;j++){
                    // console.log(222)
                    if(arr[i].goodsId==cookieArray[j].id){
                        console.log(3333)
                        html+=`<li>
                        <img src="${arr[i].goods.imageUrl}" alt="">
                        <h3>${arr[i].goods.title}</h3>
                        <strong>${cookieArray[j].num}</strong>
                    </li>`;
                    }
                }
            }
            $(".tb_shopping").html(html);
        },
        hideCar: function () {
            this.goodsList.children().remove();
        },
        showNum: function () {
            // 如果为空不计算;
            var cookie;
            if (!(cookie = $.cookie("shopCar"))) {
                this.showNumEle.html(0)
                return 0;
            }
            var cookieArray = JSON.parse($.cookie("shopCar"));
            // console.log(cookieArray)
            var sum = 0;
            for (var i = 0; i < cookieArray.length; i++) {
                sum += Number(cookieArray[i].num);
            }

            // console.log(sum);
            this.showNumEle.html(sum);
        }
    })

    var shopCar = new ShopCar();
    shopCar.init();

    //=================================================================================================
}