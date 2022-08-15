module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        
      'gray': {
        50 : '#fafafa',
        100 : '#E2EFDA', //Light Gray
        300 : 'rgb(242, 242, 242)',//'#F2F2F2', //Format 1 - fill
        700 : '#ccc',
        900: '#2a2a2a',
        'light' : 'rgb(217, 217, 217)',
        'dark' : 'rgb(166, 166, 166)',
      },
      'red' : {
        900 : 'rgb(255, 0, 0)',//'#AC1634', //Format 1 - font
      },
      'purple' : {
        400 : 'rgb(175, 91, 227)',
        500 : 'rgb(176, 22, 52)',//'#AC1634', //Format 2 - font
      },
      'pink' : {
        500 : 'rgb(255, 199, 206)',//'#FFC7CE', //Format 2 - fill
      },
      'yellow' : {
        400 : 'rgb(255, 235, 156)',//'#FFEB9C', //Format 4 - fill
        500 : 'rgb(255, 255, 102)',//'#FFFF66' //Format 3 - font
      },
      'brown' : {
        400 : 'rgb(240, 142, 82)',
        500 : 'rgb(166, 121, 55)',//'#A67937', //Format 4 - font
      },
      'green': {
        300 : 'rgb(198, 239, 206)',
        400 : 'rgb(31, 121, 39)',
        500 : '#70AD47',
        'light' : '#E2EFDA', //Light green
        'dark' : '#C6E0B4', //Dark green
        600 : '#4E7931',
      },
      'blue' : {
        'light' : 'rgb(221, 235, 247)',
        'dark' : 'rgb(189, 215, 238)',
        'darker' : 'rgb(91, 155, 213)'
      }
    }
    },
  },
  plugins: [],
}
