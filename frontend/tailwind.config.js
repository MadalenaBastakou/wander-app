/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'signupImg': "url('./assets/img/signup-page.jpg')",
        'loginImg': "url('./assets/img/login-page.jpg')",
        "heroImg": "url('./assets/img/hero-page.jpg')",
        "house": "url('./assets/img/houses.jpg')",
        "apartment": "url('./assets/img/apartments.jpg')",
        "villa": "url('./assets/img/villas.jpg')",
        "cottage": "url('./assets/img/cottage.jpg')",
        "footer" : "url('./assets/img/footer.jpg')"
      }
    },
  },
  plugins: [],
};
