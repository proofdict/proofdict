---
id: usage
title: "Usage"
---

The Usage navigate that create your Dictionary and use it.

## Create your dictionary

### 0. Requirements

- [GitHub](https://github.com/) account
- [Node.js](http://nodejs.org/)

### 1. Fork Dictionary repository

1. Visit [proofdict/proof-dictionary](https://github.com/proofdict/proof-dictionary "proofdict/proof-dictionary")
2. Click "Fork" button

![fork](assets/fork.png)

### 2. Setting

1. Open "Setting" on your forked repository

![open setting](assets/open-settings.png)

2. Go to "GitHub Pages" section

You should set "master" branch for GitHub Pages.

- Select "master branch"
- Click "Save"
    
![GitHub Pages](assets/settings.png)

3. Open your GitHub pages

For example. your GitHub account name is `azu` and please you visit <https://azu.github.io/proof-dictionary/>.

![your-github-pages.png](assets/your-github-pages.png)

Finally, You can see own dictionary!

![gh-pages](assets/gh-pages.png)

Next, use your dictionary with [textlint](https://textlint.github.io/).

### FAQ

#### Q. GitHub pages is blank

At first time, GitHub Pages is not built yet.
You should edit some file like `README.md` and GitHub build pages.

## Use with [textlint](https://textlint.github.io/)

You can use your dictionry with [textlint](https://textlint.github.io/).
[textlint](https://textlint.github.io/) is plugabble linting tool for natural language.

### Create new workspace

Create `<your-workspace>` directory and `package.json` file. A [package.json](https://docs.npmjs.com/files/package.json "package.json") manages dependencies of packages that include `textlint`:

```
# Create your workspace directory and move to it.
mkdir your-workspace
cd your-workspace

# `npm init` command creates `package.json` file.
npm init --yes
```

### Installation of [@proofdict/textlint-rule-proofdict](https://github.com/proofdict/proofdict/tree/master/packages/%40proofdict/textlint-rule-proofdict)

Install [textlint](https://textlint.github.io/) and [@proofdict/textlint-rule-proofdict](https://github.com/proofdict/proofdict/tree/master/packages/%40proofdict/textlint-rule-proofdict) rule.

```
npm install --save-dev textlint @proofdict/textlint-rule-proofdict
```

### Configuration `.textlintrc`

`.textlintrc` is configuration file for textlint.
You should set your dictionary url to `.textlintrc` before using this rule.

Create a `.textlintrc` file in your workspace:


```
./node_modules/.bin/textlint --init
```

Edit `.textlintrc` as below:

```json
{
    "rules": {
        "@proofdict/proofdict": {
          "dictURL": "https://<your-name>.github.io/proof-dictionary/"
        }
    }
}
```

For example, your GitHub account name is `azu`, set `dictURL` to `https://azu.github.io/proof-dictionary/`.

### Lint text

Finally, you can lint file with your dictionary.

```
./node_modules/.bin/textlint file.md
```

[@proofdict/textlint-rule-proofdict](https://github.com/proofdict/proofdict/tree/master/packages/%40proofdict/textlint-rule-proofdict) always fetch latest version of your dictionary.
In other word, you have edit your dictionary and the rule use it automatically.

For more details, See [Getting Started with textlint · textlint](https://textlint.github.io/docs/getting-started.html "Getting Started with textlint · textlint").
