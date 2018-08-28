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
