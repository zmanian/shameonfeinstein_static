
window.viz ={};
window.viz.SampleSingatureData =[{obfuscated: true, firstLen:4, lastLen:6, zip: 94065},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated: true, firstLen:4, lastLen:6, zip: 94065},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated: true, firstLen:4, lastLen:6, zip: 94065},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated:false, firstName: "Zaki", lastName:"Manian", zip :94022},{obfuscated: true, firstLen:4, lastLen:6, zip: 94065}  ];


window.viz.updateSignatureCount = function(){
  $('#sig_number').text(viz.SampleSingatureData.length).fadeIn("slow"); 
};

window.viz.displaySignature = function(sigdata){
  if (sigdata.obfuscated === undefined){
      return;
  }
  else if (sigdata.obfuscated === true){
    var obfuscationString = "REDACTED"
    while (obfuscationString.length <= sigdata.firstLen || obfuscationString <= sigdata.lastLen ){obfuscationString +=obfuscationString;}
    var sigcontainer = $('<div>',{id:"sigcontainer",class:"sigcontainer"});
    var firstname = $('<div>',{id:"firstname",class:"redacted"}).text(obfuscationString.substring(0,sigdata.firstLen));
    var br = $('<br>',{id:"break",class:""});
    var lastname = $('<div>',{id:"lastname",class:"redacted"}).text(obfuscationString.substring(0,sigdata.lastLen));
    var zip = $('<div>',{id:"zip"}).text(sigdata.zip);
    var sigcontents = sigcontainer.append(firstname).append(br).append(lastname).append(zip);
    return $('#signhead').append(sigcontents).fadeIn("slow");
  }
  else if (sigdata.obfuscated === false){
    var sigcontainer = $('<div>',{id:"sigcontainer",class:"sigcontainer"});
    var firstname = $('<div>',{id:"firstname",class:""}).text(sigdata.firstName);
    var lastname = $('<div>',{id:"lastname",class:""}).text(sigdata.lastName);
    var zip = $('<div>',{id:"zip"}).text(sigdata.zip);
    var sigcontents =sigcontainer.append(firstname).append(lastname).append(zip);
    return $('#signhead').append(sigcontents).fadeIn("slow");
  }
};

window.viz.orderSignatures = function(){
    var column = $('<div>',{id:"subcol",class:"col-md-2"});
    for (var i = 0;i<viz.SampleSingatureData.length;i++){
      viz.displaySignature(viz.SampleSingatureData[i]);
      if(i%4 ===0 && i > 3){
        $("#signhead >.sigcontainer").wrapAll(column)
      }
    }
         $("#signhead >.sigcontainer").wrapAll(column)
}

$( document ).ready( function(){
  viz.updateSignatureCount();
  viz.orderSignatures();
  // $('.alert').hide();
} );