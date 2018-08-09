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
