 window.onload=function(){
 //=========================1==================
//    var prli = document.getElementById("proList")
//  Ajax("http://localhost:8888/js/datalist.json",function(res){
//      var json = JSON.parse(res);
//      var html = "";
//      var res_box = json.body.goodsList;
//      console.log(res_box);

//      for(var i = 0; i<res_box.length;i++){
        
//          html += `
//              <li class="gl-item">
                    
//                  <div class="gl-wrap">
//                        <div class="gl-img ">
//                           <a href="#" target="_blank">
//                              <img class="pdImgB" name="lazyload" alt="" src="${res_box[i].goods.imageUrl}">
//                          </a>
//                         </div>
//                         <p class="gl-name">
//                              <a href="/outlets/detail/70680-17455590.html" target="_blank">${res_box[i].goods.title}</a> 
//                         </p>
//                         <p class="gl-price">
//                              ￥<span class="okprice" name="price" id="17455590">${res_box[i].goods.actualCurrentPrice}</span>
//                                     <span class="oksale">(<em>1.7</em>折)</span>
//                              <span class="market-price">${res_box[i].goods.marketPrice}</span>
//                          </p>
//                          <p class="gl-sale-info" style="visibility: visible;"><span class="sale-tag">立减</span>【下单立减100】星期六集团鞋靴大特卖</p>
//                  </div>
//                  <div class="prolistover"></div>
//                  <div class="proliststart"></div>
//              </li>
                 
//                  `

//      }  
//      prli.innerHTML = html;

//   })
// ===============瀑布流=====================
function WaterFull (){};
WaterFull.prototype.init = function(){
    this.ul = document.querySelector("#proList");
    this.page_num = 0;
    this.rendering = false;
    this.loadJson()
    .then(function(data){
        // console.log(this.json)
        // console.log(data)
        this.renderPage();
    }.bind(this));
    this.handleEvent();
}
WaterFull.prototype.handleEvent = function(){
    onscroll = this.ifRender.bind(this);
}
WaterFull.prototype.ifRender = function(){
    // 如果 自己元素没有创建那么就终止判定功能执行;
    var children = this.ul.children;
    // 如果正在渲染 ,那我终止判定功能;
    if(this.rendering) return 0;        
    if(children.length == 0) return 0;
    // 卷动高度;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 屏幕高度;
    var clientHeight = document.documentElement.clientHeight;
    // 最后一个内容
    var lastChildren = children[children.length - 1];
    var lastTop = lastChildren.offsetTop;
    if(clientHeight + scrollTop > lastTop){
        // console.log("加载数据");
        this.rendering = true;
        this.page_num ++;
        this.renderPage();
    }

}
WaterFull.prototype.loadJson = function(){
    return new Promise(function(success){
        var xhr = new XMLHttpRequest();
        xhr.open("GET","http://localhost:8888/js/datalist.json");
        xhr.send(null);
        xhr.onload = function(){
            if(xhr.status){
                this.json = JSON.parse(xhr.response);
                success(xhr.response);
            }
        }.bind(this);
    }.bind(this));
}
WaterFull.prototype.renderPage = function(){
    var html = "";
    var list = this.json.body.goodsList;
    for(var i = this.page_num * 4 ; i <= this.page_num * 4 + 3; i++){

        // console.log(list)
        html += `<li class="gl-item">
                    
                    <div class="gl-wrap">
                        <div class="gl-img ">
                            <a href="http://localhost:8888/detail.html?id=${list[i].goodsId}" target="_blank">
                                <img class="pdImgB" name="lazyload" alt="" src="${list[i].goods.imageUrl}" />
                            </a>
                        </div>
                        <p class="gl-name">
                                <a href="http://localhost:8888/detail.html?id=${list[i].goodsId}" target="_blank">${list[i].goods.title}</a> 
                        </p>
                        <p class="gl-price">
                                ￥<span class="okprice" name="price" id="17455590">${list[i].goods.actualCurrentPrice}</span>
                                    <span class="oksale">(<em>1.7</em>折)</span>
                                <span class="market-price">${list[i].goods.marketPrice}</span>
                            </p>
                            <p class="gl-sale-info" style="visibility: visible;"><span class="sale-tag">立减</span>【下单立减100】星期六集团鞋靴大特卖</p>
                    </div>
                    <div class="prolistover"></div>
                    <div class="proliststart"></div>
                </li>`;
    }
    this.ul.innerHTML += html;
    this.rendering = false;
}
var waterFull = new WaterFull();
waterFull.init();

// ====================================================================================
}