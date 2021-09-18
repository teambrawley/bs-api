function regex(string){
  if(string.length < 9)return false;
  var patt = new RegExp('^(#)'+'([/L|J|G|C|V|P|G|Q|Y|U|R|8|0|2|9/i])');
  var result = patt.test(string);
  return result;
}

module.exports = regex;
