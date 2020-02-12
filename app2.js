const request = require("request")
const cheerio =require("cheerio")
const fs =require("fs")

request.get({url:"http://huayu.zongheng.com/showchapter/898707.html"},(err,res,body) =>{
 if(err) reeturn 
  let $ = cheerio.load(body)
  $(".col-4 a").each(function(index){
   
   req($(this).prop("href"),index)
  })
 
})
function req(url,index){
  request.get(url,(err,res,body) =>{
    if(err) return
    let $ = cheerio.load(body)
    let txt = $(".content").text()
    txt = txt.replace(
      /(\s{2,})/g,
      $1=>"\r"+$1
  )

  fs.writeFileSync(
    "./xiaoshuo/"+(index+1)+".txt",
    txt
);
  })
}
