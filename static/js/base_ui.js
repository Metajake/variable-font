// console.log('hello world');
var body = document.body,
    html = document.documentElement,
    docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    ),
    textArea = document.querySelector("#text-area"),
    fontControls = document.querySelector(".section#font-controls"),
    rangeSliderSize = document.querySelector('#range-size'),
    editableText = document.querySelector('#text-area p'),
    selectFontStyle = document.querySelector('#select-style');

window.addEventListener("load", function(e){
  textArea.style.height = (docHeight-fontControls.offsetHeight)+'px';

  rangeSliderSize.value= 30;
  rangeSliderSize.oninput = function(){
    editableText.style.fontSize = (this.value * 0.1) +"rem";
  }

  selectFontStyle.onchange = function(){
    editableText.style.fontFamily = this.value;
  }
})
