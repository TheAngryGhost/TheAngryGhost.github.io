const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/scripts/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};
