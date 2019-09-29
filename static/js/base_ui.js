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
    fontChoices = document.querySelectorAll('#font-selection ul li')
    selectedFont = fontChoices[1],
    selectedFontData = {}
    fontType = document.querySelector('#font-type');

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setSelectedFontData(fontName){
  return fontData[fontName.innerHTML]
}

function createElementWithAttributes(elementType, idName, classNames){
  element = document.createElement(elementType)
  if(idName){element.setAttribute('id', idName)}
  for(name in classNames){
    element.classList.add(classNames[name]);
  }
  return element;
}

function buildStaticSelectForm(options){
  form = document.createElement("form")
  form.append(createElementWithAttributes('div', '', ['field']))
  form.childNodes[0].append(createElementWithAttributes('div', '', ['control','is-extended']))
  form.childNodes[0].childNodes[0].append(createElementWithAttributes('div', '', ['select', 'is-fullwidth-mobile']))
  form.childNodes[0].childNodes[0].childNodes[0].append(createElementWithAttributes('select', 'select-style', ['select-field']))
  for (style in selectedFontData['staticStyles']['styles']){
    option = document.createElement('option');
    option.setAttribute('value', selectedFontData['staticStyles']['styles'][style]['styleValue'])
    option.innerHTML = capitalize(selectedFontData['staticStyles']['styles'][style]['styleName'])
    form.childNodes[0].childNodes[0].childNodes[0].childNodes[0].append(option)
  }
  return form;
}

window.addEventListener("load", function(e){
  textArea.style.height = (docHeight-fontControls.offsetHeight)+'px';

  rangeSliderSize.value= 30;
  rangeSliderSize.oninput = function(){
    editableText.style.fontSize = (this.value * 0.1) +"rem";
  }

  selectedFontData = setSelectedFontData(selectedFont);

  fontType.innerHTML = '';
  if(selectedFontData['staticStyles']['hasStaticStyles']){
    fontType.append(buildStaticSelectForm(selectedFontData['staticStyles']['styles']));
    selectFontStyle = document.querySelector('#select-style');
    selectFontStyle.onchange = function(){
      editableText.style.fontFamily = this.value;
    }
  }
})
