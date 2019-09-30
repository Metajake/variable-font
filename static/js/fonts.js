var fontData = {
  staticVariable: {
    staticStyles: {
      hasStaticStyles: true,
      styles: {
        one:{
          hasSubStyles: true,
          subStyles: ['one','two']
        },
        two:{
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
      variableProperties:['width','italic','size']
    }
  },
  static: {
    staticStyles: {
      hasStaticStyles: true,
      styles: {
        0:{
          styleName: 'regular',
          styleValue: 'Animal-reg',
          hasSubStyles: true,
          subStyles: ['one','two']
        },
        1:{
          styleName: 'Demi Bold',
          styleValue: 'Animal-demi',
          hasSubStyles: false,
          subStyles: []
        },
        2:{
          styleName: 'Black',
          styleValue: 'Animal-black',
          hasSubStyles: false,
          subStyles: []
        }
      }
    },
    staticProperties: ['size'],
    styleSets: {
      hasSets: true,
      sets: ['one','two','three']
    },
    variable: {
      hasVariable: false,
      variableProperties:[]
    }
  },
  variable: {
    staticStyles: {
      hasStaticStyles: false,
    },
    staticProperties: ['size'],
    styleSets: {
      hasSets: true,
      sets: ['one','two','three']
    },
    variable: {
      hasVariable: true,
      variableProperties:['weight','italic']
    }
  },
  UMAnimal: {
    staticStyles: {
      hasStaticStyles: true,
      styles: {
        black:{
          hasSubStyles: false,
          subStyles: []
        },
        demiBold:{
          hasSubStyles: false,
          subStyles: []
        },
        regular:{
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
}
