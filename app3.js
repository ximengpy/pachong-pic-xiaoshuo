const request = require("request");

const fs = require("fs");
const path = require("path");


getImg("易烊千玺",100);


function getImg(word,num){
    /*真正开发插件的时候，要写很多的类型判断*/
    if (typeof word !== "string" || typeof num !== "number" || num <= 0)return;
    /*
    * 先创建word队友的目录
    * */
    fs.readdir(
        path.join(__dirname,"./img"),
        (err,data)=>{
            if (err)return;
            if (data.indexOf(word) === -1) {
                fs.mkdir("./img/"+word,()=>{
                    init();
                });
            }else{
                init();
            }
        }
    );

    /*初始化开始运行*/
    function init(){
        /*要调用几次req*/
        let ci = Math.ceil(num / 60);


        for (let i=0;i<ci;i++){
            req(
                word,
                i*60,
                Math.min(60,num-i*60)
            );
        }
    }

    /*请求的封装*/
    function req(word,pn,rn){
        request.get(
            "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&word="+encodeURI(word)+"&pn="+pn+"&rn="+rn,
            (err,res,body)=>{
                if (err){
                    console.log(err);
                    return;
                }
                // console.log(body);
                //百度搞人心态。。格式有时候不对
                // let {data} = JSON.parse(body);
                let data = body.match(/https.+?\.jpg/g);
                data = data || [];
                data = [...new Set(data)];

                /*遍历访问*/
                data.forEach(url=>{
                    /*创建随机数名字*/
                    let str = (new Date().getTime() + Math.floor(Math.random()*999999999999)).toString(16);
                    request(url)
                        .pipe(fs.createWriteStream("./img/"+word+"/"+str+".jpg"));
                });
            }
        );
    }
}




/*
* headers : {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36"
}
* */