import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },

  },

 { 
  rules: {
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-console': 'warn',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
  }
},
{
  ignores:["**node_modules/", "**/dist/"]
}

];