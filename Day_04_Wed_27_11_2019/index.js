Web3 = require('web3');
web3 = new Web3();
let i = 0;
let find = "fac7a";
let findlength_plus2 = find.length + 2;
var prefix;
let isNotFound = true;

while (isNotFound) {
    newAddress = web3.eth.accounts.create();
    prefix = newAddress.address.slice(2, findlength_plus2).toLowerCase();
    console.log(prefix);
    if (prefix.length === 5 && 
        new String(prefix).valueOf() == new String(find).valueOf()) {
        console.log(`The address is found: ${prefix}`)
        isNotFound = false ;
    }
}