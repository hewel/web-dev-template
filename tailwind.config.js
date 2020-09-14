const { colors, spacing, fontFamily, inset } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: false,
  theme: {
    extend: {
      colors: {
        red: {
          ...colors.red,
          600: '#DC1414',
          500: '#EC6726'
        },
        gray: {
          ...colors.gray,
          200: '#EFEFF4',
          600: '#999999',
          900: '#333333',
          800: '#383838',
          700: '#707070'
        },
        orange: {
          ...colors.orange,
          400: '#FF1E00',
          500: '#FF5A24',
          600: '#EC6726'
        },
        green: { ...colors.green, 700: '#1FB67C' },
        yellow: { ...colors.yellow, 300: '#ffdb78', 500: '#e3d76b' },
        cyan: {
          400: '#76cad5'
        },
        golden: {
          400: '#F1DBA0',
          500: '#E7BE7C',
          600: '#C99669'
        }
      },
      boxShadow: {
        float: '0 60px 65px -50px rgba(0, 0, 0, 0.25)',
        outline: '0 0 0 3px rgba(201, 150, 105, 0.3)'
      },
      maxWidth: {
        'screen-2xl': '1920px'
      },
      minHeight: {
        ...spacing,
        em: '1em',
        96: '24rem'
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      inset: {
        ...spacing,
        ...inset,
        '1/2': '50%'
      },
      borderRadius: {
        xl: '0.75rem',
        large: '22px'
      },
      screens: {
        '2xl': '1440px'
      },
      lineHeight: {
        12: '3rem'
      },
      height: {
        160: '40rem',
        190: '58rem'
      },
      spacing: {
        em: '1em',
        7: '1.75rem',
        11: '2.75rem',
        12: '3.25rem',
        14: '3.5rem',
        18: '4.5rem',
        30: '7.5rem',
        35: '8.75rem',
        36: '9rem',
        55: '12.5rem',
        60: '15rem',
        80: '20rem'
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          '"PingFang SC"',
          '"Noto Sans SC"',
          '"Microsoft YaHei UI"',
          '"Microsoft Yahei"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      }
    }
  },
  purge: ['./src/**/*.html', './src/**/*.liquid', './src/**/*.js'],
  variants: {},
  plugins: []
};
