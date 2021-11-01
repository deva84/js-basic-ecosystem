# testable-code

This module replaces logic of the `app/web` module. There are 2 types of configuration (dev and prod) which can be used to run the project. Feel free to use any of them.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

## Running

```sh
node dist/bundle.js
```

## Testing

To run unit tests:

```sh
npm test:init
```

