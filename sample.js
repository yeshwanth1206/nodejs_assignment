var fs=require("fs");

fs.readFile('sample.txt',function(err, data)
{
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("Async data is "+ data.toSting());
  }
});
var data=fs.readFileSync('sample.txt');
console.log("Sync data is " + data.toSting());
console.log("THis is the end");
