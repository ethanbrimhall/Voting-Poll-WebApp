var option1 = document.getElementById('number-of-votes1').innerHTML;
var option2 = document.getElementById('number-of-votes2').innerHTML;

option1 = parseInt(option1);
option2 = parseInt(option2);

var option1Value = (option1 / (option1 + option2)) * 500;
var option2Value = (option2 / (option1 + option2)) * 500;


if(option1Value == 0){
  option1Value = 10;
}

if(option2Value == 0){
  option2Value = 10;
}

document.getElementById('option1Graph').style.width = option1Value + "px";
document.getElementById('option2Graph').style.width = option2Value + "px";
