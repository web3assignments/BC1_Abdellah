

function hi() {
    var test = "Abdellah";
    var result = "";
    for (var i = test.length; i>=0; i--) {
  
        result+= test.charAt(i);
        
    }
    return result;
}


console.log(hi());