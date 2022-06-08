const path = require('path');
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'prettier'
    ],
    extends: [
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
        "plugin:prettier/recommended"
    ],
    env: {
        browser: true,
        node: true
    },
    "globals": {
        "React": true,
        "document": true,
        "window": true,
        "localStorage": true,
        "fetch": true
    },
    "root": true,
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
            "warn"
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "max-len": [
            "warn",
            {
                "code": 140,
                "ignoreUrls": true
            }
        ],
        "react/prefer-stateless-function": "warn",
        "react/self-closing-comp": [
            "warn",
            {
                "component": true,
                "html": false
            }
        ],
        "react/jsx-props-no-spreading": 0,
        "react/sort-comp": [
            1,
            {
                "order": [
                    "static-methods",
                    "lifecycle",
                    "everything-else",
                    "rendering"
                ],
                "groups": {
                    "rendering": [
                        "/^render.+$/",
                        "render"
                    ]
                }
            }
        ],
        "react/require-default-props": 0,
        "jsx-a11y/label-has-associated-control": [
            2,
            {
                "controlComponents": [
                    "Input",
                    "DatePicker",
                    "RangePicker",
                    "Select"
                ],
                "depth": 3
            }
        ],
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/interactive-supports-focus": "off",
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": [
            "warn",
            {
                "aspects": [
                    "invalidHref"
                ]
            }
        ],
        "react/jsx-boolean-value": [
            "warn",
            "never"
        ],
        "react/jsx-curly-spacing": [
            "warn",
            "never",
            { "allowMultiline": true }
        ],
        "react/jsx-filename-extension": [
            "warn",
            {
                "extensions": [
                    ".tsx"
                ]
            }
        ],
        "react/jsx-first-prop-new-line": [
            "warn",
            "multiline"
        ],
        "react/jsx-handler-names": [
            "warn",
            {
                "eventHandlerPrefix": "handle",
                "eventHandlerPropPrefix": "on"
            }
        ],
        "react/jsx-key": "error",
        "react/jsx-wrap-multilines": [
            "warn"
        ],
        "no-trailing-spaces": [
            2,
            {
                "skipBlankLines": true
            }
        ],
        "prefer-template": 0,
        "import/prefer-default-export": 0,
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": [
                    "src/test-utils/setup-tests.ts",
                    "**/*.test.tsx",
                    "src/test-utils.tsx",
                    "src/mock/*",
                    "**/*.stories.tsx",
                    "src/utils/testing.tsx"
                ]
            }
        ],
        "import/extensions": 0,
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": [
            "warn"
        ],
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "argsIgnorePattern": "^_"
            }
        ],
        "@typescript-eslint/no-inferrable-types": [
            "warn",
            {
                "ignoreParameters": true
            }
        ],
        "prettier/prettier": [
            "warn",
            {
                "singleQuote": true,
                "trailingComma": "all",
                "arrowParens": "always"
            }
        ]
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        "import/parsers": {
            "@typescript-eslint/parser": [
                ".ts",
                ".tsx"
            ]
        },
        "import/resolver": {
            "typescript": {}
        }
    },
};
