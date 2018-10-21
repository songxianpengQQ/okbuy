function sp_car(){}
$.extend(sp_car.prototype,{
    init:function(){
        this.loadJson()
        .then(function(res){
            // console.log(res,this)
            this.json = res.body.goodsList;
            // console.log(json)
            this.get_cookie(this.json);

        });
    },
    loadJson:function(){
        var opt = {
                url: "http://localhost:8888/js/datalist.json",
                data: { start: 0, count: 48 },
                context: this,
            };
            return $.ajax(opt);
    },
    get_cookie:function(json){
        if(getCookie("shopCar")){
            var arr = JSON.parse(getCookie("shopCar"));
            // console.log(arr)
            var html="";
            for(var i = 0;i<this.json.length;i++){
                for(var j=0;j<arr.length;j++){
                    if(arr[j].id == this.json[i].goodsId){
                        // console.log(json[i])
                        html+=`
                                <tr>
                                    <td class="w110">
                                        <span class="check"></span>
                                    </td>
                                    <td class="w470">
                                        <a href="">
                                            <img src="${this.json[i].goods.imageUrl}"
                                                title="${this.json[i].goods.title}">
                                            <span>${this.json[i].goods.title}</span>
                                        </a>
                                    </td>
                                    <td class="w110">￥${this.json[i].goods.actualCurrentPrice}</td>
                                    <td class="w240">
                                        <div>
                                            <span class="rm">-</span>
                                            <input type="text" value="${arr[j].num}">
                                            <span class="am">+</span>
                                        </div>
                                    </td>
                                    <td class="w110">¥${arr[j].num*this.json[i].goods.actualCurrentPrice}</td>
                                    <td class="act">
                                        <span></span>
                                    </td>
                            </tr>
                                `;

                    }
                }
            }
           $("#listContent").html(html);
             this.bindEvent();


        }
    },
    bindEvent:function(){
        
        $("#listContent .act").on("click",$.proxy(this.remove_ck));
        $(".am").on("click",$.proxy(this.addnum));
        // $(.rm).on("click",this.rmnum.bind(this));
    },
    remove_ck:function(event){
        $(this).parent().remove()
    },
    addnum:function(){
         var arr = JSON.parse(getCookie("shopCar"));
 
     },


});
var sp_Car =new sp_car();
sp_Car.init();

