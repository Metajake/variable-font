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

function setInputEvent(inputToSet, property){
  inputToSet.oninput = function(){
    editableText.style.setProperty('--' + property, inputToSet.value)
  }
}

function buildStaticSelectForm(options){
  formContainer = createElementWithAttributes('div','',['column','is-narrow']);
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
  formContainer.append(form)
  return formContainer;
}

function buildStyleSetOption(styleSet, styleSetOptions){
  control = createElementWithAttributes('div','',['control','is-flex','has-align-center'])
  anchor = document.createElement('a')
  anchor.className = 'is-disabled';
  anchor.innerHTML = styleSetOptions[styleSet];
  control.append(anchor)
  return control;
}

function buildStylisticSetsForm(options){
  form = createElementWithAttributes("form", '', ['is-flex']);
  formLabel = createElementWithAttributes('p', '', ['has-margin-right'])
  formLabel.innerHTML = 'Stylistic&nbsp;Sets';
  form.append(formLabel)
  form.append(createElementWithAttributes('div','',['field', 'is-grouped']))
  for(set in options){
    form.childNodes[1].append(buildStyleSetOption(set, options))
  }
  return form;
}

function buildVariableSliderForm(variableProperty, propName, startValue, minValue, maxValue){
  formContainer = createElementWithAttributes('div','',['column','is-narrow']);
  form = createElementWithAttributes("form", '', ['is-flex','has-align-center']);
  formLabel = createElementWithAttributes('p','', ['has-margin-right','is-hidden-touch'])
  formLabel.innerHTML = propName;
  form.append(formLabel)
  formControl = createElementWithAttributes('div','',['control','is-flex','has-align-center','is-fullwidth-mobile'])
  sliderInput = createElementWithAttributes('input', variableProperty, ['input','slider','is-paddingless','is-fullwidth-mobile'])
  sliderInput.setAttribute('type','range')
  sliderInput.setAttribute('min', minValue)
  sliderInput.setAttribute('max', maxValue)
  sliderInput.setAttribute('value', startValue)
  setInputEvent(sliderInput, variableProperty)
  formControl.append(sliderInput);
  form.append(formControl);
  formContainer.append(form);
  return formContainer
}

function initStaticSelectionForms(fontDataToInitFrom){
  fontType.innerHTML = '';
  if(fontDataToInitFrom['staticStyles']['hasStaticStyles']){
    staticSelectionForm = buildStaticSelectForm(fontDataToInitFrom['staticStyles']['styles']);
    fontType.append(staticSelectionForm);
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

function initVariablePropertiesForm(fontSelection, fontDataToInitFrom){
  // fontType.innerHTML = '';
  //If Variable Style, but No Static Styles
  if(!fontDataToInitFrom['staticStyles']['hasStaticStyles'] && fontDataToInitFrom['variable']['hasVariable']){
    editableText.classList.add(fontSelection)
    for ( property in fontDataToInitFrom['variable']['variableProperties'] ){
      propertyData = fontDataToInitFrom['variable']['variableProperties'][property]
      fontType.append( buildVariableSliderForm(property, propertyData['name'], propertyData['init'], propertyData['start'], propertyData['end']) );
    }
  }
}

function initFontSelection(fontSelection){
  selectedFontData = setSelectedFontData(fontSelection);
  initStaticSelectionForms(selectedFontData)
  initStylisticSetsForm(selectedFontData)
  initVariablePropertiesForm(fontSelection, selectedFontData)
  editableText.style.fontFamily = fontSelection
}

function initEvents(){
  rangeSliderSize.oninput = function(){
    editableText.style.fontSize = (this.value * 0.1) +"rem";
  }

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

  initFontSelection(fontChoices[0].innerHTML.trim())

  initEvents()
})
