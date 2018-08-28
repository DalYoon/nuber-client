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
