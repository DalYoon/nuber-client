# 2.0 Create React App with Typescript

## section.log

- Create React App with Typescript
- Changes some `tsconfig.json` options

## tips

- `tsconfig.json` - module option

  - `module: "esnext"` -> `module: "commonjs"` <br>
    it allows you to write code like `import React from 'react';` <br>
    instead of `import * as React from 'react';`

- adjusted `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "build/dist",
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "dom", "esnext.asynciterable"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts"
  ]
}
```

## issue

- none

## links

- [tsconfig options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## added dependencies

### dependencies

### devDependencies

---

# 2.1 Apollo Setup part One

## section.log

- Basic config for `Apollo Client`

## tips

## issue

- none

## links

- [Apollo Boost](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost)

## added dependencies

### dependencies

- apollo-boost
- graphql
- react-apollo

### devDependencies

---

# 2.2 Apollo Setup part Two

## section.log

- how to catch request and put jwt in header

## tips

- catching request through `ApolloClient` from 'Apollo-Boost' and put object into header

```typescript
ApolloClient({
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "key": "value"
      }
    });
  },
  ...
});
```

## issue

- none

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.3 Apollo Setup part Three

## section.log

- set default client state through `ApolloClient/clientState`
- adjust `tsconfig.js` - `"noImplicitAny": false,`

## tips

## issue

- after change `noImplicitAny` option to `false` <br>
  vcs still complain about implicit <br>
  after reload whole vcs editor, it's solved

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.4 Apollo Setup Recap

## section.log

- explain for authorization header for apollo-boost

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.5 Connecting Local State to Components

## section.log

- How to get data from `auth` resolver(that we made) in `cache`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.6 Typescript and React Components

## section.log

- very important lecture
- how to define `type` for `React Component`

## tips

## issue

## links

## added dependencies

### dependencies

- prop-types

### devDependencies

---

# 2.7 Typescript and Styled Components part One

## section.log

- very important lecture
- how to use `styled-components` with typescript

## tips

## issue

## links

- [styled-components with typescript](https://www.styled-components.com/docs/api#typescript)

## added dependencies

### dependencies

- styled-components

### devDependencies

---

# 2.8 Typescript and Styled Components part Two

## section.log

- How to reset default style with `styled-reset`

## tips

- in code, `// tslint:disable-next-line` comment disables all rules for the following line<br>
  make sure there is no space after colon`:`

## issue

## links

- [styled-reset](https://github.com/zacanger/styled-reset)
- [tslink rule flag](https://palantir.github.io/tslint/usage/rule-flags/)

## added dependencies

### dependencies

- styled-reset

### devDependencies

---

# 2.9 Global Styles Set Up

## section.log

- eject global style
- basic style setting

## tips

`font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`

- `-apple-system` targets San Francisco in Safari (on Mac OS X and iOS), <br>
  and it targets Neue Helvetica and Lucida Grande on older versions of Mac OS X. <br>
  It properly selects between San Francisco Text and San Francisco Display depending<br>
  on the text’s size.
- `system-ui` represents the default UI font on a given platform.
- `BlinkMacSystemFont` is the equivalent for Chrome on Mac OS X.
- `Segoe UI` targets Windows and Windows Phone.
- `Roboto` targets Android and newer Chrome OS. It is deliberately listed after Segoe UI<br>
  so that if you’re an Android developer on Windows and have Roboto installed, Segoe UI <br>
  will be used instead.

## issue

#### ejected global styled does not work!

- Because I didn't import `global-styles.ts` in `src/index.ts`, idiot

## links

- [font-family](https://github.com/necolas/normalize.css/issues/665)

## added dependencies

### dependencies

### devDependencies

---

# 2.10 Planning the Routes

## section.log

- create `Routes`(screens)

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.11 Router and Routes

## section.log

- set routes
- set redirection for routes those are not existing

## tips

## issue

## links

## added dependencies

### dependencies

- react-router-dom

### devDependencies

- @types/react-router-dom

---
