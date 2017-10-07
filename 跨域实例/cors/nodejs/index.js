var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

    if(path === '/qq_priv'){
        var string = fs.readFileSync('./qq.json', 'utf8');
        response.setHeader('Content-Type', 'application/json ');
        response.setHeader('Access-Control-Allow-Origin','*');
      /*  response.setHeader('Access-Control-Allow-Methods ','PUT,OPTIONS');*/
        response.end(string);
    }


else if(path === '/xll'){
    var string = fs.readFileSync('./xll.html', 'utf8');
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.end(string);
}
console.log(method + ' ' + request.url);

})
server.listen(port);
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port);
