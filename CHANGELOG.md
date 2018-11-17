# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/proofdict/proofdict/compare/v2.2.1...v3.0.0) (2018-11-17)


### Bug Fixes

* **css:** adjust height and line-height ([072ac49](https://github.com/proofdict/proofdict/commit/072ac49))
* **deps:** remove unused "proofdict" ([132206d](https://github.com/proofdict/proofdict/commit/132206d)), closes [#10](https://github.com/proofdict/proofdict/issues/10)
* **deps:** upgrade to [@proofdict](https://github.com/proofdict)/tester@^2.2.1 ([7beaddf](https://github.com/proofdict/proofdict/commit/7beaddf))
* **dictionary:** add test pattern ui ([7c2e6b7](https://github.com/proofdict/proofdict/commit/7c2e6b7))
* **DictionarySlugCreator:** fix test ([3fd31b5](https://github.com/proofdict/proofdict/commit/3fd31b5))
* **DictSubmit:** disable submit button when not found SourceRepo ([4e7bc58](https://github.com/proofdict/proofdict/commit/4e7bc58))
* **DictSubmit:** restyle message ([41dd5c6](https://github.com/proofdict/proofdict/commit/41dd5c6))
* **editor:** fix "Save to Submit" state ([30d042e](https://github.com/proofdict/proofdict/commit/30d042e))
* **editor:** fix editor build setting ([d6d27ac](https://github.com/proofdict/proofdict/commit/d6d27ac))
* **html:** disable prefetch dict ([cf043db](https://github.com/proofdict/proofdict/commit/cf043db))
* **prh:** fix handling of regexp-like string /pattern/i ([706d757](https://github.com/proofdict/proofdict/commit/706d757))
* **prh:** use proofdict-tester ([df1aa15](https://github.com/proofdict/proofdict/commit/df1aa15))
* **Prh:** fix test ([e568e65](https://github.com/proofdict/proofdict/commit/e568e65))
* **Prh:** try-catch initialize tester ([9ce8567](https://github.com/proofdict/proofdict/commit/9ce8567))
* **TagInput:** fix tag options ([d09686a](https://github.com/proofdict/proofdict/commit/d09686a))
* **test:** fix slug test ([2af05f8](https://github.com/proofdict/proofdict/commit/2af05f8))
* **test:** remove unused test ([8a711a9](https://github.com/proofdict/proofdict/commit/8a711a9))
* **tester:** add validation regexp ([1d14345](https://github.com/proofdict/proofdict/commit/1d14345))
* **tester-cli:** exit with 1 ([5a05c16](https://github.com/proofdict/proofdict/commit/5a05c16)), closes [#16](https://github.com/proofdict/proofdict/issues/16)
* **url:** fix default path ([2361391](https://github.com/proofdict/proofdict/commit/2361391))
* **yaml:** yaml can not dump undefined value ([ef02774](https://github.com/proofdict/proofdict/commit/ef02774))


### Features

* **app:** add description to ([a890310](https://github.com/proofdict/proofdict/commit/a890310))
* **app:** add domain/component/store ([70b2231](https://github.com/proofdict/proofdict/commit/70b2231))
* **dictionary:** support "description" value ([5e95a75](https://github.com/proofdict/proofdict/commit/5e95a75))
* **dictionary:** support tags ([15a1493](https://github.com/proofdict/proofdict/commit/15a1493))
* **Dictionary:** add DictionarySlugCreator.ts ([27bd469](https://github.com/proofdict/proofdict/commit/27bd469))
* **Dictionary:** add WordClasses ([5e192ca](https://github.com/proofdict/proofdict/commit/5e192ca))
* **domain:** add DictionarySerializer ([750acb3](https://github.com/proofdict/proofdict/commit/750acb3))
* **domain:** add DictTester ([a08dd40](https://github.com/proofdict/proofdict/commit/a08dd40))
* **editor:** support ?dictionaryContent=<JSON> ([7ef2f85](https://github.com/proofdict/proofdict/commit/7ef2f85))
* **editor:** support allows field ([b3e763b](https://github.com/proofdict/proofdict/commit/b3e763b))
* **Form:** add checkbox for \b ([71a1dc9](https://github.com/proofdict/proofdict/commit/71a1dc9))
* **github:** add submit button ([6783f99](https://github.com/proofdict/proofdict/commit/6783f99))
* **html:** add preload ([cf2252d](https://github.com/proofdict/proofdict/commit/cf2252d))
* **menu:** add "reset" feature ([6beabcc](https://github.com/proofdict/proofdict/commit/6beabcc))
* **meta:** support suggest tags ([9f5fd77](https://github.com/proofdict/proofdict/commit/9f5fd77))
* **migration:** add migration script ([c8eb819](https://github.com/proofdict/proofdict/commit/c8eb819))
* **output:** support json/yaml/prh output ([9c0b5ab](https://github.com/proofdict/proofdict/commit/9c0b5ab))
* **prh:** add getUniqueTokens ([0254043](https://github.com/proofdict/proofdict/commit/0254043))
* **prh:** add prh-to-json ([3424ff5](https://github.com/proofdict/proofdict/commit/3424ff5))
* **store:** create util ([e8dfd0c](https://github.com/proofdict/proofdict/commit/e8dfd0c))
* **tester:** implement "allows" field ([#17](https://github.com/proofdict/proofdict/issues/17)) ([fc888a2](https://github.com/proofdict/proofdict/commit/fc888a2)), closes [#19](https://github.com/proofdict/proofdict/issues/19)
* **tool:** add convert tool ([81ec4e2](https://github.com/proofdict/proofdict/commit/81ec4e2))
* **url:** support url query ([710aee9](https://github.com/proofdict/proofdict/commit/710aee9)), closes [#2](https://github.com/proofdict/proofdict/issues/2)


### Performance Improvements

* **html:** add dict cache ([2186f1c](https://github.com/proofdict/proofdict/commit/2186f1c))





## [2.2.1](https://github.com/proofdict/proofdict/compare/v2.2.0...v2.2.1) (2018-11-08)


### Bug Fixes

* **proofdict:** fix wrong capture in multiple patterns ([5056a8e](https://github.com/proofdict/proofdict/commit/5056a8e))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/proofdict/proofdict/compare/v2.1.1...v2.2.0) (2018-06-16)


### Bug Fixes

* **packages:** fix path ([84ed491](https://github.com/proofdict/proofdict/commit/84ed491))
* **test-cli:** upgrade TypeScript ([2c66c8b](https://github.com/proofdict/proofdict/commit/2c66c8b))
* **textlint-rule:** fix local fallback mode ([80ee23a](https://github.com/proofdict/proofdict/commit/80ee23a))
* **website:** rename version to docusaurus-version ([0347828](https://github.com/proofdict/proofdict/commit/0347828))


### Features

* **website:** add website ([87bfc4a](https://github.com/proofdict/proofdict/commit/87bfc4a))




<a name="2.1.1"></a>
## [2.1.1](https://github.com/proofdict/proofdict/compare/v2.1.0...v2.1.1) (2018-03-18)




**Note:** Version bump only for package proofdict

<a name="2.1.0"></a>
# [2.1.0](https://github.com/proofdict/proofdict/compare/v2.0.1...v2.1.0) (2018-03-18)




**Note:** Version bump only for package proofdict

<a name="2.0.1"></a>
## [2.0.1](https://github.com/proofdict/proofdict/compare/v2.0.0...v2.0.1) (2018-03-18)




**Note:** Version bump only for package proofdict

<a name="2.0.0"></a>
# [2.0.0](https://github.com/proofdict/proofdict/compare/v1.0.0...v2.0.0) (2018-03-18)




**Note:** Version bump only for package proofdict

<a name="1.0.0"></a>
# [1.0.0](https://github.com/proofdict/proofdict/compare/1.2.1...1.0.0) (2018-03-18)


### Bug Fixes

* **deps:** pin prh dependencies ([8385760](https://github.com/proofdict/proofdict/commit/8385760))
* **dict:** Pointer Events should be pointer events ([39c6483](https://github.com/proofdict/proofdict/commit/39c6483))
* **prh:** upgrade prh@5.4 ([5062d2f](https://github.com/proofdict/proofdict/commit/5062d2f))
* **proofdict:** support description ([cbfe25d](https://github.com/proofdict/proofdict/commit/cbfe25d))
* **rule:** fix cache mechanism ([1d04405](https://github.com/proofdict/proofdict/commit/1d04405))
* **rule:** fix silent error ([39df9cd](https://github.com/proofdict/proofdict/commit/39df9cd))
* **rule:** support timeout error ([fc58364](https://github.com/proofdict/proofdict/commit/fc58364))
* **typescript:** add d.ts ([56049e1](https://github.com/proofdict/proofdict/commit/56049e1))
* meaningful message ([b76accc](https://github.com/proofdict/proofdict/commit/b76accc))


### Features

* **dict:** Add MySQL ([#2](https://github.com/proofdict/proofdict/issues/2)) ([611a2f4](https://github.com/proofdict/proofdict/commit/611a2f4))
* **proofdict-tester:** support whitelist and blacklist ([a97351f](https://github.com/proofdict/proofdict/commit/a97351f))
* **proofdict-tester-cli:** add cli ([8d42f4f](https://github.com/proofdict/proofdict/commit/8d42f4f))
* **rule:** rewrite rule ([32d9894](https://github.com/proofdict/proofdict/commit/32d9894))
* **rule:** support autoUpdate ([ca21a66](https://github.com/proofdict/proofdict/commit/ca21a66))
* **test:** support `rule` in results ([180f3f6](https://github.com/proofdict/proofdict/commit/180f3f6)), closes [#1](https://github.com/proofdict/proofdict/issues/1)


### Performance Improvements

* **tester:** add cache for creating tester ([4be1de9](https://github.com/proofdict/proofdict/commit/4be1de9))


### BREAKING CHANGES

* **test:** remove `url` from results
