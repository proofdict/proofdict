# proofdict [![Build Status](https://travis-ci.org/proofdict/proofdict.svg?branch=master)](https://travis-ci.org/proofdict/proofdict)

Proofdict is a collection of dict.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install proofdict

## Website

Visit <https://proofdict.github.io/proofdict/>

## API

Get the dictionary as JSON

- <https://proofdict.github.io/proofdict/dict.json>

## Node module

    const dictionaries = require("proofdict");
    console.log(dictionaries);
    /*
    [
        {
            "id": "01BQ92YYBJQ3A865VJ3ASRPCHB",
            "description": "",
            "expected": ".js $1",
            "patterns": [
                "/.js([.0-9]+)/"
            ],
            "specs": [],
            "tags": [
                "JavaScript"
            ]
        },
        ...
    ]
    */
       

## Changelog

See [Releases page](https://github.com/proofdict/proofdict/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/proofdict/proofdict/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
