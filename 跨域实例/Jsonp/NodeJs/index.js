var http = require('http')
var fs = require('fs')
var url = require('url')
//console.log(Object.keys(http))
var port = process.env.PORT || 90;
var server = http.createServer(function(request, response){
  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/xll'){  // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./xll.html', 'utf8')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  
    response.end(string)   
  }else if(path === '/qq'){
    var string = fs.readFileSync('./qq.html', 'utf8')
    response.setHeader('Content-Type', 'text/html')
    response.end(string)
  }
  else if(path === '/js'){
      var data1=JSON.stringify({"name":"西施","age":18});
      var string = fs.readFileSync('./main.js', 'utf8')
       response.setHeader('Content-Type', 'application/javascript');
       var f=query.functionName;
       var s= string.replace("data",data1).replace("fun",f);
      console.log(s);
      response.end(s);
  }
  else if(path === '/qq_priv'){
      var string = fs.readFileSync('./qq.json', 'utf8');
      response.setHeader('Content-Type', 'application/json ');
      response.setHeader('Access-Control-Allow-Origin','*');
    /*  response.setHeader('Access-Control-Allow-Methods ','PUT,OPTIONS');*/
      response.end(string);
  }
  else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8') 
    response.end('找不到对应的路径，你需要自行修改 index.js')
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
