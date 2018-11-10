# Proofdict [![Build Status](https://travis-ci.org/proofdict/proofdict.svg?branch=master)](https://travis-ci.org/proofdict/proofdict)

Proofdict is a collection of dictionary.

## Website

See website for using it.

- <https://proofdict.github.io/>

## Integration textlint

Use [textlint-rule-proofdict](https://github.com/proofdict/textlint-rule-proofdict "textlint-rule-proofdict")

## Proofdict format

```yml
# `id` is unique string
id: 01BQ92YYBEFBXEHH8T8HC8RCRD
# `description` is a short comment
description: 'Reference https://www.ecma-international.org/publications/standards/Ecma-262.htm'
# `expected` is expected result
# `$1` ... `$9` reference `patterns`'s capture word
# This is same behavior with RegExp https://github.com/zeeshanu/learn-regex 
expected: ECMAScript $1
# `patterns` are match string or RegExp
# RegExp should be started with `/` and be ended with `/`
# Also, can use `()` for capturing
patterns:
  - /ECMAScript([0-9]+)/i
  - /ECMA Script([0-9]+)/i
# `allows` define ignore patterns
#  If `allows` pattern are matched, just ignore it
allows:
  - ECMASCRIPT1
# `specs` are test cases
# `specs[n].from` is actual word
# `specs[n].to` is expected word that is replaced result
specs:
  - from: ECMASCRIPT5
    to: ECMAScript 5
  - from: ECMASCRIPT1
    to: ECMASCRIPT1 # because "ECMASCRIPT1" is allowed
# `tags` are keywords
# Some `tag` means special meaning
tags:
  - noun
  - JavaScript
```

This format is similar with [prh](https://github.com/prh/prh).
Proofdict includes some additional features. 

### `allows`

`allows` has defined typical patterns.

#### typical patterns

- `{{COMBINATION_WORD}}`: ignore combination word like `node-webkit`
   
When `pattern` is `webkit` and set `allows` to `{{COMBINATION_WORD}}"`, ignore `/-webkit/` and `webkit-`.
As a result, this pattern match `webkit`, but does not match `node-webkit`.

### Example

```yaml
id: JavaScript
description: 'JavaScript is not Java Script'
expected: JavaScript
patterns:
  - /javascript/i
  - /Java Script/i
allows:
  - {{COMBINATION_WORD}} # allow "x-javascript"
specs:
  - from: javascript
    to: JavaScript
  - from: java script
    to: JavaScript
  - from: Java script
    to: JavaScript
  - from: x-javascript
    to: x-javascript
tags:
  - noun
  - JavaScript
```

## modules

This repository is monorepo.

This repository includes following modules.

- [@proofdict/tester](packages/@proofdict/tester)
    - core logic 
- [@proofdict/tester-cli](packages/@proofdict/tester-cli)
    - run test for dictionary 
- [@proofdict/textlint-rule-proofdict](packages/@proofdict/textlint-rule-proofdict)
    - textlint rule for proofdict's dictionary

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

## Acknowledge

- [prh/prh](https://github.com/prh/prh)
