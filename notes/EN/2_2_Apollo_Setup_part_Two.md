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
