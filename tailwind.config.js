const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/modules/**/*.html', './src/modules/**/*.js'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: colors.slate
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
