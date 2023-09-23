// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/modules/**/*.html", "./src/modules/**/*.ts"],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: colors.slate,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
