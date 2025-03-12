const { add, sub, multi, div } = require('./calculator');
const http = require('http');  // for http request
const url = require('url');    // for url path ex. http//localhost:5000/add
const querystring = require('querystring') // for num1 & num2

http.createServer(function (req, res) {
  // console.log(req.url);  -->return path
  const reqURL = req.url
 
  const parseURL = url.parse(reqURL)  // pass value to url
  const querystringParse = querystring.parse(parseURL.query)
  // console.log(querystringParse);

  const num1 = querystringParse.num1;
  const num2 = querystringParse.num2;
 if( reqURL.includes('/add')){  // if add call in url
res.write(add(num1,num2) + '\n');    
  }
  else if(reqURL.includes('/sub')){
    res.write(sub(num1,num2) + '\n');
  }
  else if(reqURL.includes('/multi')){
    res.write(multi(num1,num2) + '\n');
  }
  else if(reqURL.includes('/div')){
    res.write(div(num1,num2) + '\n');
  }
  else{
    res.write('invalid path: ' + reqURL);
  }
 
  res.end();
}).listen(5000);



