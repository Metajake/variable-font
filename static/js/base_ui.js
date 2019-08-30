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
  pageWrapper.style.height = docHeight+'px';
  formContainer.style.height = docHeight+'px';

  textArea.value = "Hello"
  textArea.style.fontFamily = 'Aretha Variable';
  textArea.style.fontSize = "3rem";
})
