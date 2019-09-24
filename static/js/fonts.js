var fonts = {
  variableOne: {
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
  staticOne: {
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
      hasSets: true,
      sets: ['one','two','three']
    },
    variable: {
      hasVariable: false,
      variableProperties:[]
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
