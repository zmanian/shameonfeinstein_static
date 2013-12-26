self.addEventListener('message', function(e) {
  
  importScripts('date.js');
  
  var sigDateCompare= function (a,b){

    if (Date.parse(a.date.split(".")[0]) < Date.parse(b.date.split(".")[0])){ return -1;} //Truncate the string after so that it can be parsed in both Chrome, FF and legacy browsers
    if (Date.parse(a.date.split(".")[0]) > Date.parse(b.date.split(".")[0])){ return 1;}
  return 0;
}
  
  var sorted_data= e.data.sort(sigDateCompare)
  
  self.postMessage(sorted_data);
}, false);


