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
