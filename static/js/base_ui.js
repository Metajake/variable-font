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
    fontControls = document.getElementById("font-controls"),
    fontDisplay = document.querySelector(".section#font-display"),
    rangeSliderSizeProperty = document.querySelector('#range-size'),
    editableText = document.querySelector('#text-area p'),
    fontChoices = document.querySelectorAll('#font-selection ul li')
    selectedFontData = {}
    fontType = document.querySelector('#font-type');
    fontSets = document.querySelector('#font-sets');
    fontToggle = document.querySelector('#font-toggle');

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

function setVariableRangeSliderEvent(inputToSet, property){
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

function buildVariableRangeSlider(varProp, minVal, maxVal, startVal){
  slider = createElementWithAttributes('input', varProp, ['input','slider','is-paddingless','is-fullwidth-mobile'])
  slider.setAttribute('type','range')
  slider.setAttribute('min', minVal)
  slider.setAttribute('max', maxVal)
  slider.setAttribute('value', startVal)
  return slider
}

function buildVariableSliderForm(variableProperty, propName, startValue, minValue, maxValue){
  formContainer = createElementWithAttributes('div','',['column','is-narrow']);
  form = createElementWithAttributes("form", '', ['is-flex','has-align-center']);
  formLabel = createElementWithAttributes('p','', ['has-margin-right','is-hidden-touch'])
  formLabel.innerHTML = propName;
  form.append(formLabel)
  formControl = createElementWithAttributes('div','',['control','is-flex','has-align-center','is-fullwidth-mobile'])
  sliderInput = buildVariableRangeSlider(variableProperty, minValue, maxValue, startValue)
  setVariableRangeSliderEvent(sliderInput, variableProperty)
  formControl.append(sliderInput);
  form.append(formControl);
  formContainer.append(form);
  return formContainer
}

function buildStaticVariableToggle(){
  form = createElementWithAttributes('form','',['is-flex','has-align-center','is-pulled-right'])
  formLabel = createElementWithAttributes('p','',['has-margin-right'])
  formLabel.innerHTML = 'Variable';
  form.append(formLabel);
  inputWrapper = createElementWithAttributes('label','',['switch'])
  formInput = document.createElement('input')
  formInput.setAttribute('type', 'checkbox')
  inputToggle = createElementWithAttributes('span','',['toggle','round'])
  inputWrapper.append(formInput)
  inputWrapper.append(inputToggle)
  form.append(inputWrapper)
  return form;
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
  if(!fontDataToInitFrom['staticStyles']['hasStaticStyles'] && fontDataToInitFrom['variable']['hasVariable']){
    fontType.innerHTML = '';
    editableText.classList.add(fontSelection)
    for (i = 0; i < Object.keys(fontDataToInitFrom['variable']['variableProperties']).length; i ++){
      console.log(i)
    }
    for ( property in fontDataToInitFrom['variable']['variableProperties'] ){
      propertyData = fontDataToInitFrom['variable']['variableProperties'][property]
      fontType.append( buildVariableSliderForm(property, propertyData['name'], propertyData['init'], propertyData['start'], propertyData['end']) );
    }
  }
}

function initStaticVariableToggle(fontDataToInitFrom){
  fontToggle.innerHTML = '';
  if(fontDataToInitFrom['staticStyles']['hasStaticStyles'] && fontDataToInitFrom['variable']['hasVariable']){
    fontToggle.append(buildStaticVariableToggle(fontDataToInitFrom));
  }
}

function updateFontSelectionCallback(fontSelection){
  editableText.style.fontFamily = fontSelection
  
  fontDisplay.style.marginTop = fontControls.offsetHeight + 'px';
}

function updateFontSelection(fontSelection){
  selectedFontData = setSelectedFontData(fontSelection);

  initStaticSelectionForms(selectedFontData)
  initStylisticSetsForm(selectedFontData)
  initVariablePropertiesForm(fontSelection, selectedFontData)
  initStaticVariableToggle(selectedFontData)

  updateFontSelectionCallback(fontSelection)
}

function initPageEvents(){
  rangeSliderSizeProperty.oninput = function(){
    editableText.style.fontSize = (this.value * 0.1) +"rem";
  }

  editableText.addEventListener('input', function(){
    if(editableText.innerHTML == ''){
      editableText.innerHTML = '(Type Here)';
    }
  })

  fontChoices.forEach(function(choice){
    choice.addEventListener('click',function(event){
      updateFontSelection(event.target.innerHTML.trim())
    })
  })
}

window.addEventListener("load", function(e){
  textArea.style.height = (docHeight-fontControls.offsetHeight)+'px';
  fontDisplay.style.marginTop = fontControls.offsetHeight + 40 + 'px';
  editableText.focus();

  updateFontSelection(fontChoices[0].innerHTML.trim())

  initPageEvents()
})
