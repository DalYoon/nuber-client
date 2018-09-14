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

### What is 'React.SFC'

- `SFC` stands for Stateless Functional Component

```js
import React from "react";

const ThisComponent = props => {
  return <div>This is SFC</div>;
};
```

or

```js
import React from "react";

function ThisComponent(props) {
  return <div>This is SFC</div>;
}
```

## issue

## links

- [React SFC](https://medium.com/@ethan_ikt/react-stateless-functional-component-with-typescript-ce5043466011)

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

# 2.12 OutHome Component

## section.log

- very important lecture
- how to pass router props and extends to use it

## tips

### RouteComponentProps type

```typescript
export interface RouteComponentProps<
  P,
  C extends StaticContext = StaticContext,
  S = H.LocationState
> {
  history: H.History;
  location: H.Location<S>;
  match: match<P>;
  staticContext?: C;
}
```

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.13 Login Component and React Helmet

## section.log

- basic css work for design
- change title with `react-helmet`

## tips

## issue

## links

## added dependencies

### dependencies

- react-helmet

### devDependencies

---

# 2.14 Route Components Review

## section.log

- how to import icon from `iconmonstr.com`
- make `backarrow`, `Input` components
- make `SocialLogin`, `PhoneLogin` pages

## tips

## issue

## links

- [iconmonstr](https://iconmonstr.com/)
- [json countries](https://github.com/serranoarevalo/jsoncountries)

## added dependencies

### dependencies

### devDependencies

---

# 2.15 Inputs and Typescript part One

## section.log

- make `phoneLogin` page
- make `Input` component

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.16 Inputs and Typescript part Two

## section.log

- make `phoneLogin` page

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.17 Notifications with React Toastify

## section.log

- set `react-toastify`

## tips

### importing css for react-toastify

```typescript
import "react-toastify/dist/ReactToastify.min.css";
```

## issue

## links

- [react-toastify](https://github.com/fkhadra/react-toastify)

## added dependencies

### dependencies

- react-toastify

### devDependencies

---

# 2.18 PhoneLogin Mutation part One

## section.log

- very important lecture
- how to write queries with apollo
- how to connect queries and components

## tips

- to define more than one class in a file, <br>
  `tslint`'s `max-classes-per-file` rule must be `false`

```json
// tslint file
"rules": {
    "max-classes-per-file": false
  },
```

- the children argument of a `Mutation` must be a function

## issue

## links

- [how to connect queries and components with typescript](https://www.apollographql.com/docs/react/recipes/static-typing.html)

## added dependencies

### dependencies

### devDependencies

---

# 2.19 Magic with Apollo Codegen

## section.log

- very important lecture
- how to use apollo codegen

## tips

- apollo codegen is similar with `graphql-to-typescript` at the backend

### merging process

```json
// package.json
{
  "scripts": {
    // ... scripts
    "precodegen": "apollo schema:download --endpoint=http://localhost:4000/graphql",
    "codegen": "apollo codegen:generate src/types/api.d.ts --queries='src/**/*.queries.ts' --addTypename --schema schema.json --target typescript --outputFlat"
  }
}
```

## issue

## links

- [apollo schema download guide](https://github.com/apollographql/apollo-cli#apollo-schemadownload-output)

## added dependencies

### global dependencies

- apollo

### dependencies

### devDependencies

---

# 2.20 PhoneLogin Mutation part Two

## section.log

- define `MutationUpdaterFn` (Mutation Updater Function) for mutation component

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.21 PhoneLogin Mutation part Three

## section.log

- `update` , `onCompleted` arguments on `Mutation` component

## tips

- to use lambda in jsx, you need to turn `jsx-no-lambda` option off on `tslint`

```json
// tslint.json
{
  // ...other options
  "rules": {
    // ...other rules
    "jsx-no-lambda": false
  }
}
```

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.22 VerifyPhone Screen

## section.log

- how to give `state` to other routes through `react-router`

## tips

- the function `history.push()` has state as a second argument

```js
this.props.history.push({
  pathname: "/verify-phone",
  state: {
    phoneNumber: phone
  }
});
```

- the `state` in `this.props.location` doesn't get lost by refreshing

- you can push user back to other route if user has no `state` from other route

```js
// ...JSX
constructor(props) {
  super(props)

  if (!props.location.state) {
    props.history.push("/");
  }
}
```

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.23 Testing the PhoneLogin Screen and Redirecting

## section.log

- test redirection

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.24 VerifyPhone Mutation part One

## section.log

- define queries for `VerifyPhone`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.25 VerifyPhone Mutation part Two

## section.log

- work on `VerifyPhone`

## tips

## issue

## links

- [postbird](https://github.com/Paxa/postbird)

## added dependencies

### global dependencies

- postbird

### dependencies

### devDependencies

---

# 2.26 Updating Local State

## section.log

- very important lecture
- how to add more than one `query` or `mutation` in one component (multi layer mutations)

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.27 SocialLogin with Apollo part One

## section.log

- define facebook login

## tips

## issue

## links

- [react facebook login](https://github.com/keppelen/react-facebook-login)

## added dependencies

### dependencies

- react-facebook-login

### devDependencies

---

# 2.28 SocialLogin with Apollo part Two

## section.log

- very important lecture
- how to take `mutation` out to component and give additional process

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.29 SocialLogin with Apollo part Three

## section.log

- handle facebook login callback

## tips

## issue

## links

- [facebook graph api User fields](https://developers.facebook.com/docs/graph-api/reference/v2.6/user)

## added dependencies

### dependencies

### devDependencies

---

# 2.30 SocialLogin with Apollo part Four

## section.log

- finish `facebook` login

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.31 Home Sidebar Component

## section.log

- add side bar navigation

## tips

## issue

## links

## added dependencies

### dependencies

- react-sidebar

### devDependencies

- @types/react-sidebar

---

# 2.32 Home Sidebar Query

## section.log

- write query to get `myProfile`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.33 Home Sidebar Query part Two

## section.log

- give profile data to `menu`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.34 Updating Driver Mode part One

## section.log

- very important lecture
- make `toggleDrivingMode`
- how to update component after run mutation

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.35 Updating Driver Mode part Two

## section.log

- very important lecture
- make `toggleDrivingMode`
- how to update component after run mutation (through cache without api transaction)

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.36 EditProfile Screen part One

## section.log

- make `EditProfile` page

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.37 EditProfile Screen part Two

## section.log

- give prefill for `EditAccount`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.38 EditProfile Screen part Three

## section.log

- give `refetchQuery` after Update User Profile

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.39 Uploading Profile Photo to Cloudinary part One (1)

## section.log

- very important lecture
- `fetchPolicy`
- `PhotoInput` component
- upload image
- cloudinary (Image Cloud)

## tips

### `fetchPolicy` is about where do you get your data

- How you want your component to interact with the Apollo cache. Defaults to “cache-first”.
- options
  - no-cache
  - cache-first (default)
  - cache-only
  - network-only
  - cache-and-network
  - standby

## issue

## links

### the codes to start this lecture

- [PhoeoInput Component](https://github.com/DalYoon/nuber-client/blob/master/notes/CodeStorage/2_39_PhotoInput.md)
- [EditAccountPresenter](https://github.com/DalYoon/nuber-client/blob/master/notes/CodeStorage/2_39_EditAccountPresenter.md)

## added dependencies

### dependencies

- axios

### devDependencies

---

# 2.40 Uploading Profile Photo to Cloudinary part Two

## section.log

- finish uploading profile photo with cloudinary

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.41 Settings Screen part One

## section.log

- `settings` page

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.42 Settings Screen part Two

## section.log

- make `place` component

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.43 Places + AddPlace Components

## section.log

- make `AddPlace`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.44 AddPlace Mutation

## section.log

- define mutatino for `addPlace`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.45 Edit Place Mutation

## section.log

- define toggle mutation for favorite place

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.46 Google Maps and React part One

## section.log

- basic setting for `google map`

## tips

## issue

## links

## added dependencies

### dependencies

- google-maps-react

### devDependencies

- @types/googlemaps

---

# 2.47 Google Maps and Geolocation

## section.log

- basic setting for `google map`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.48 Google Map Events

## section.log

- very important lecture
- how to get center after drag event

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.49 Reverse Geocoding part One

## section.log

- very important lecture
- how to get address with `lat`, `lng`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.50 Reverse Geocoding part Two

## section.log

- give adress to `map`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.51 Geocoding part One

## section.log

- very important lecture
- get geometry through `address`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.52 Geocoding part Two

## section.log

- very important lecture
- how to search address and move map center to the result

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.53 Refactoring AddPlace

## section.log

- very important lecture
- callback the address and coords for `addPlace`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.53 Refactoring AddPlace

## section.log

- very important lecture
- callback the address and coords for `addPlace`

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---

# 2.54 HomeScreen User Marker

## section.log

- very important lecture
- draw map marker

## tips

## issue

## links

## added dependencies

### dependencies

### devDependencies

---
