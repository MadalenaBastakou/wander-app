/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        signupImg: "url('./assets/img/signup-page.jpg')",
        loginImg: "url('./assets/img/login-page.jpg')",
        heroImg: "url('./assets/img/hero-page.jpg')",
        Villas: "url('./assets/img/villas.jpg')",
        Apartments: "url('./assets/img/apartments.jpg')",
        Houses: "url('./assets/img/houses.jpg')",
        Cottages: "url('./assets/img/cottage.jpg')",
        footer: "url('./assets/img/footer.jpg')",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
};
