// utils.js

function toKanji(num){
  const ones=["","一","二","三","四","五","六","七","八","九"];
  const tens=["","十","二十","三十","四十","五十","六十","七十","八十","九十"];
  if(num===100) return "百";
  const ten=Math.floor(num/10);
  const one=num%10;
  return tens[ten]+ones[one];
}

function getRokuyo(year,month,day){
  const rokuyo=["大安","赤口","先勝","友引","先負","仏滅"];
  const base=new Date(1900,0,1);
  const target=new Date(year,month-1,day);
  const diff=Math.floor((target-base)/86400000);
  return rokuyo[diff%6];
}