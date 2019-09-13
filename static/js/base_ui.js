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
    pageWrapper = document.querySelector("#wrapper"),
    textArea = document.querySelector("#text-area"),
    formContainer = document.querySelector("#form-container");

window.addEventListener("load", function(e){
  rangeSize = document.querySelector('#range-size');
  selectStyle = document.querySelector('#select-style');
  editableText = document.querySelector('#text-area p');

  pageWrapper.style.height = docHeight+'px';
  formContainer.style.height = docHeight+'px';

  rangeSize.value= 30;
  selectStyle.value = 'Animal-reg'
  editableText.style.fontFamily = selectStyle.value;

  rangeSize.oninput = function(){
    editableText.style.fontSize = (this.value * 0.1) +"rem";
  }
  
  selectStyle.onchange = function(){
    editableText.style.fontFamily = this.value;
  }
})
