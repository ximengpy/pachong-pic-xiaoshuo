const  fs = require("fs")
const  request = require("request")
let index = 1
 for(let i = 1;i<=7;i++){
  if(i == 1) {
   url = "https://www.meitulu.com/item/20502.html"
  }
  else{
   url = "https://www.meitulu.com/item/20502_"+i+".html"
  }
 
  request.get(url,(err,res,body) =>{
   if(err) return ;
   let reg = /https:\/\/mtl.gzhuibei.com\/images\/img\/20502\/\d+?\.(jpg|png)/g;
   let arr = body.match(reg)
   console.log(arr)
   if(arr){
    arr.forEach((item) =>{
     request(item).pipe(fs.createWriteStream("./images/"+index+++".jpg"))
    })
   }
  })

 }
 