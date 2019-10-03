var fontData = {
  umAnimalStatic: {
    staticStyles: {
      hasStaticStyles: true,
      styles: {
        0:{
          styleName: 'regular',
          styleValue: 'umAnimalStatic',
          hasSubStyles: true,
          subStyles: ['one','two']
        },
        1:{
          styleName: 'Demi Bold',
          styleValue: 'umAnimalStatic-demi',
          hasSubStyles: false,
          subStyles: []
        },
        2:{
          styleName: 'Black',
          styleValue: 'umAnimalStatic-black',
          hasSubStyles: false,
          subStyles: []
        }
      }
    },
    staticProperties: ['size'],
    styleSets: {
      hasSets: false,
      sets: []
    },
    variable: {
      hasVariable: false,
      variableProperties:[]
    }
  },
  arethaVariable: {
    staticStyles: {
      hasStaticStyles: false,
      styles: {}
    },
    staticProperties: ['size'],
    styleSets: {
      hasSets: false,
      sets: []
    },
    variable: {
      hasVariable: true,
      variableProperties:{
        ital:{
          name: "Italic",
          init: 50,
          start:0,
          end:100
        },
        wght:{
          name:"Weight",
          init:500,
          start:100,
          end:900
        }
      }
    }
  },
  staticWithSets: {
    staticStyles: {
      hasStaticStyles: true,
      styles: {
        0:{
          styleName: 'regular',
          styleValue: 'umAnimalStatic',
          hasSubStyles: true,
          subStyles: ['one','two']
        },
        1:{
          styleName: 'Demi Bold',
          styleValue: 'umAnimalStatic-demi',
          hasSubStyles: false,
          subStyles: []
        },
        2:{
          styleName: 'Black',
          styleValue: 'umAnimalStatic-black',
          hasSubStyles: false,
          subStyles: []
        }
      }
    },
    staticProperties: ['size'],
    styleSets: {
      hasSets: true,
      sets: ['A','B','C']
    },
    variable: {
      hasVariable: false,
      variableProperties:{}
    }
  },
  trispace: {
    staticStyles: {
      hasStaticStyles: true,
      styles: {
        0:{
          styleName: 'regular',
          styleValue: 'trispace',
          hasSubStyles: false,
          subStyles: []
        },
        1:{
          styleName: 'Bold',
          styleValue: 'trispace-bold',
          hasSubStyles: false,
          subStyles: []
        }
      }
    },
    staticProperties: ['size'],
    styleSets: {
      hasSets: false,
      sets: []
    },
    variable: {
      hasVariable: true,
      variableProperties:{
        wght:{
          name:"Weight",
          init:500,
          start:100,
          end:900
        },
        ital:{
          name: "Italic",
          init: 50,
          start:0,
          end:100
        }
      }
    }
  },
}
