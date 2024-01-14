module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended',
        '@vue/prettier',
    
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {

    }
}