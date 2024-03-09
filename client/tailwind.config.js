/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily:{

        primary: 'roboto'

      },

      dropShadow:{

        '3xl' : '0px 10px 50px rgba(0, 0, 0, 0.1)'
        

      }, 

      animation:{

        'drop' : ' translateY(10px) 3s linear '

      }

    },
  },
  plugins: [

    require('tailwindcss-animated')
  ],
}

