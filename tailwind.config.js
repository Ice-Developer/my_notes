/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#5eedc0",
        
"secondary": "#d34c08",
        
"accent": "#f4c4b7",
        
"neutral": "#17191c",
        
"base-100": "#363636",
        
"info": "#4faef3",
        
"success": "#25985c",
        
"warning": "#f0ce47",
        
"error": "#ed1d46",
        },
      },
    ]
}
}



