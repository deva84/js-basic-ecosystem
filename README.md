# Homework #13
## Description
There are 3 parts of the project: `web`, `testable-code` and `server`.

## Running original project
In order to run the ***original project*** follow next steps:

1. `./server` - run `npm i`
2. `./web` - run `npm i`
3. `./server/index.js` - replace line 17:


    app.use(express.static(path.join(__dirname, '../testable-code/dist')));

    with:

    app.use(express.static(path.join(__dirname, '../web/')));
4. `./server` - run `npm start`

## Running refactored Project

To run refactored project do the next:
1. `./server/index.js` - make sure line 17 has the next code:

    `app.use(express.static(path.join(__dirname, '../testable-code/dist')));`

    Otherwise, replace it with a mentioned above.
2. `./testable-code` - run `npm i`
3. `./testable-code` - run `build-dev` or `build-prod` script.
4. `./server` - run npm start

## Running tests on refactored project
`./testable-code` - run `test`;
