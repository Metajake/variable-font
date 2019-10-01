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
    selectedFontData = {}
    fontType = document.querySelector('#font-type');
    fontSets = document.querySelector('#font-sets');

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setSelectedFontData(fontName){
  return fontData[fontName]
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

function buildStylisticSetsForm(options){
  form = document.createElement("form")
  form.className = 'is-flex';
  formLabel = document.createElement('p')
  formLabel.className = 'has-margin-right'
  formLabel.innerHTML = 'Stylistic&nbsp;Sets';
  form.append(formLabel)
  form.append(createElementWithAttributes('div','',['field', 'is-grouped']))
  for(set in options){
    control = createElementWithAttributes('div','',['control','is-flex','has-align-center'])
    anchor = document.createElement('a')
    anchor.className = 'is-disabled';
    anchor.innerHTML = options[set];
    control.append(anchor)
    form.childNodes[1].append(control)
  }
  return form;
}

function buildVariableSliderForm(variableProperty, initValue, startValue, endValue){
  console.log(variableProperty)
}

function initStaticSelectionForms(fontDataToInitFrom){
  fontType.innerHTML = '';
  if(fontDataToInitFrom['staticStyles']['hasStaticStyles']){
    fontType.append(buildStaticSelectForm(fontDataToInitFrom['staticStyles']['styles']));
    selectFontStyle = document.querySelector('#select-style');
    selectFontStyle.onchange = function(){
      editableText.style.fontFamily = this.value;
    }
  }
}

function initStylisticSetsForm(fontDataToInitFrom){
  fontSets.innerHTML = '';
  if(fontDataToInitFrom['styleSets']['hasSets']){
    fontSets.append(buildStylisticSetsForm(fontDataToInitFrom['styleSets']['sets']));
    // ToDo Handle What to do with Style Set Anchors
  }
}

function initVariablePropertiesForm(fontDataToInitFrom){
  if(!fontDataToInitFrom['staticStyles']['hasStaticStyles'] && fontDataToInitFrom['variable']['hasVariable']){
    for ( property in fontDataToInitFrom['variable']['variableProperties'] ){
      propertyData = fontDataToInitFrom['variable']['variableProperties'][property]
      editableText.style.setProperty('--'+property, propertyData['init'])
      buildVariableSliderForm(property, propertyData['init'], propertyData['start'], propertyData['end'])
    }
  }
}

function initFontSelection(fontSelection){
  selectedFontData = setSelectedFontData(fontSelection);
  initStaticSelectionForms(selectedFontData)
  initStylisticSetsForm(selectedFontData)
  initVariablePropertiesForm(selectedFontData)
  editableText.style.fontFamily = fontSelection
}

function initEvents(){
  editableText.addEventListener('input', function(){
    if(editableText.innerHTML == ''){
      editableText.innerHTML = '(Type Here)';
    }
  })

  fontChoices.forEach(function(choice){
    choice.addEventListener('click',function(event){
      initFontSelection(event.target.innerHTML.trim())
    })
  })
}

window.addEventListener("load", function(e){
  textArea.style.height = (docHeight-fontControls.offsetHeight)+'px';
  rangeSliderSize.value= 30;
  rangeSliderSize.oninput = function(){
    editableText.style.fontSize = (this.value * 0.1) +"rem";
  }

  initFontSelection(fontChoices[0].innerHTML.trim())

  initEvents()
})
