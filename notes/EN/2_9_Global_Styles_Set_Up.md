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
