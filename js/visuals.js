
window.viz ={};
window.viz.signature_count = 0;
window.viz.signature_count_redacted = 0;


window.viz.getSignatures = function(){
  return $.ajax({
    url:"/signatures",
    dataType:'json',
  }).success(function(data){
    console.log(data);
    window.viz.signature_count = data.length;
    window.viz.signature_data = data;
    // viz.updateSignatureCount(window.viz.signature_count + window.viz.signature_count_redacted);
  });
}

window.viz.getSingaturesRedacted = function(){
  return $.ajax({
    url:"/signatures_redacted",
    dataType:'json',
  }).success(function(data){
    console.log(data);
    window.viz.signature_count_redacted = data.length;
    window.viz.signature_redacted_data = data;
    // viz.updateSignatureCount(window.viz.signature_count + window.viz.signature_count_redacted);
  });

}


window.viz.updateSignatureCount = function(total_count){
  $('#sig_number').text(total_count).fadeIn("slow"); 
  $('#sig_number_2').text(total_count).fadeIn("slow"); 
};

window.viz.isObfuscatedSig = function(sigdata){
  if (sigdata.firstLen === undefined){
    return false;
  }
  if (sigdata.first === undefined){
    return true;
  }
};

viz.sigDateCompare = function (a,b){

  if (Date.parse(a.date) < Date.parse(b.date)){ return -1;}
  if (Date.parse(a.date) > Date.parse(b.date)){ return 1;}
  return 0;
}


window.viz.displayData = function(){
      viz.updateSignatureCount(window.viz.signature_count + window.viz.signature_count_redacted);
      viz.orderSignatures();
}



window.viz.displaySignature = function(sigdata){
  if (viz.isObfuscatedSig(sigdata)){
    var obfuscationString = "REDACTED"
    while (obfuscationString.length <= sigdata.firstLen || obfuscationString <= sigdata.lastLen ){obfuscationString +=obfuscationString;}
    var sigcontainer = $('<div>',{id:"sigcontainer",class:"sigcontainer"});
    var firstname = $('<div>',{id:"firstname",class:"redacted"}).text(obfuscationString.substring(0,sigdata.firstLen));
    var br = $('<br>',{id:"break",class:""});
    var lastname = $('<div>',{id:"lastname",class:"redacted"}).text(obfuscationString.substring(0,sigdata.lastLen));
    var zip = $('<div>',{id:"zip"}).text(sigdata.zip_code);
    var sigcontents = sigcontainer.append(firstname).append(br).append(lastname).append(zip);
    return $('#signhead').append(sigcontents).fadeIn("slow");
  }
  else {
    var sigcontainer = $('<div>',{id:"sigcontainer",class:"sigcontainer"});
    var firstname = $('<div>',{id:"firstname",class:""}).text(sigdata.first);
    var lastname = $('<div>',{id:"lastname",class:""}).text(sigdata.last);
    var zip = $('<div>',{id:"zip"}).text(sigdata.zip_code);
    var sigcontents =sigcontainer.append(firstname).append(lastname).append(zip);
    return $('#signhead').append(sigcontents).fadeIn("slow");
  }
};




window.viz.orderSignatures = function(){
    var column = $('<div>',{id:"subcol",class:"col-md-2"});
    var sig_data = viz.signature_data.concat(viz.signature_redacted_data);
    var sig_data_sorted = sig_data.sort(viz.sigDateCompare)
    for (var i = 0;i < 24;i++){
    
      viz.displaySignature(sig_data_sorted.pop());
      if(i%3 ===0 && i > 3){
        $("#signhead >.sigcontainer").wrapAll(column)
      }
    }
         $("#signhead >.sigcontainer").wrapAll(column)
}

$( document ).ready( function(){
  $.when(viz.getSignatures(), viz.getSingaturesRedacted() ).then(function(x){viz.displayData();});
  // viz.orderSignatures();
  // $('.alert').hide();
} );

