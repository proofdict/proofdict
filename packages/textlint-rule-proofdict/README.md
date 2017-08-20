# textlint-rule-proofdict

textlint rule check text using proofdict.

webkit

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-proofdict

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "proofdict": true
    }
}
```

Via CLI

```
textlint --rule proofdict README.md
```

## Options

Default setting:

```json
{
    // = AutoUpdate settings
    // Automatically update proofdict source
    "autoUpdate": false,
    // 60sec(60 * 1000ms) by default
    "autoUpdateInterval": 60000,
    // If autoUpdate is failed, redirect to use cached proofdict
    "autoFallback": false,
    // = Tag settings
    // Filter dictionary by whitelist or blacklist
    // Default: Enable all terms of the dictionary.
    // When set both options, this rule prefer whitelist to blacklist
    "whitelistTags": [],
    "blacklistTags": []
}
```


### AutoUpdate(Default: false)

If `autoUpdate` is true, this rule automatically update dictionary source.
The fetched dictionary is put into `.cache/localstorage-ponyfill`.

### Whitelist/Blacklist

This rule use [proofdict](https://proofdict.github.io/proofdict/ "proofdict") as the source of dictionary.

Each dictionary items has `tag`.

For example, [WebKit](https://proofdict.github.io/proofdict/item/01BQ92YZ6QR8RJKA5Y8W2F9NMY "WebKit") has `noun` tag.

You can setting enable/disable by `whitelistTags` and `blacklistTags`

e.g.) Enable only "noun" tag.

```json
{
    "rules": {
        "proofdict": {
          "whitelistTags": ["noun"]
        }
    }
}
```

e.g.) Use items without `"opinion"` tag

```json
{
    "rules": {
        "proofdict": {
          "blacklistTags": ["opinion"]
        }
    }
}
```

## Changelog

See [Releases page](https://github.com/proofdict/textlint-rule-proofdict/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/proofdict/textlint-rule-proofdict/issues).

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
