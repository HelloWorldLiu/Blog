module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "warn",
    "vue/no-unused-vars": "warn",
    indent: [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "never"],
    "max-len": [
      "warn",
      {
        code: 120
      }
    ]
  }
};
