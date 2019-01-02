/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock;
/* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function iconUrl(iconName) {
    return siteConfig.baseUrl + "feather/" + iconName;
}

function imgUrl(img) {
    return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
    return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

function pageUrl(page, language) {
    return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

class Button extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={this.props.href} target={this.props.target}>
                    {this.props.children}
                </a>
            </div>
        );
    }
}

Button.defaultProps = {
    target: "_self"
};

const SplashContainer = props => (
    <div className="homeContainer">
        <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
        </div>
    </div>
);

const Logo = props => (
    <div className="projectLogo">
        <img src={props.img_src} />
    </div>
);

const ProjectTitle = props => (
    <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
    </h2>
);

const PromoSection = props => (
    <div className="section promoSection">
        <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
        </div>
    </div>
);

class HomeSplash extends React.Component {
    render() {
        let language = this.props.language || "";
        return (
            <SplashContainer>
                <div className="inner">
                    <Logo img_src={imgUrl("proofdict.png")} />
                    <ProjectTitle />
                    <PromoSection>
                        <Button href={docUrl("usage.html", language)}>Get Started</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

const Block = props => (
    <Container padding={["bottom", "top"]} id={props.id} background={props.background}>
        <GridBlock align={props.align || "center"} contents={props.children} layout={props.layout} />
    </Container>
);

const Features = props => (
    <Block layout="twoColumn">
        {[
            {
                content: "Create original your dictionary.",
                image: iconUrl("book.svg"),
                imageAlign: "top",
                title: "Your Dictionary"
            },
            {
                content: `Support integration with textlint.

You just use [textlint-rule-proofdict]().
`,
                image: imgUrl("textlint/textlint-icon.png"),
                imageAlign: "top",
                title: "textlint"
            },
            {
                image: iconUrl("share.svg"),
                imageAlign: "top",
                title: "Sharable",
                content: `Easy to share your dictionary as website.

Also, Your dictionary have JSON API automatically`
            },
            {
                image: iconUrl("github.svg"),
                imageAlign: "top",
                title: "GitHub",
                content: `Your dictionary can be maintained on GitHub.


Your dictionary can be Open Source and You can fork existing dictionary.`
            }
        ]}
    </Block>
);

const LearnHow = props => (
    <Block align="left" background="dark" id={"usage"}>
        {[
            {
                title: "Usage",
                image: imgUrl("example/proof-dictionary.png"),
                imageAlign: "right",
                content: `You can start by just 2 steps:

1. Fork proof-dictionary repository
2. Enable gh-pages on your repository

For more details, please see [Get Started](${docUrl("usage.html", props.language)}).
`
            }
        ]}
    </Block>
);

const Textlint = props => (
    <Block align="left">
        {[
            {
                image: imgUrl("example/textlint.png"),
                imageAlign: "right",
                title: "textlint",
                content: `You can use your dictionary with [textlint](https://github.com/textlint/textlint "textlint").

textlint is a linter tool for natural language.
It can check your text(Markdown, text, html etc..) with your dictionary.
Also, it can fix your text automatically.

For more details, see [textlint-rule-proofdict](https://www.npmjs.com/package/textlint-rule-proofdict "textlint-rule-proo") and [textlint](https://github.com/textlint/textlint "textlint").
`
            }
        ]}
    </Block>
);

const Showcase = props => {
    if ((siteConfig.users || []).length === 0) {
        return null;
    }
    const showcase = siteConfig.users
        .filter(user => {
            return user.pinned;
        })
        .map((user, i) => {
            return (
                <a href={user.infoLink} key={i}>
                    <img src={user.image} title={user.caption} />
                </a>
            );
        });

    return (
        <div className="productShowcaseSection paddingBottom">
            <h2>{"Who's Using This?"}</h2>
            <p>This project is used by all these people</p>
            <div className="logos">{showcase}</div>
            <div className="more-users">
                <a className="button" href={pageUrl("users.html", props.language)}>
                    More {siteConfig.title} Users
                </a>
            </div>
        </div>
    );
};

class Index extends React.Component {
    render() {
        let language = this.props.language || "";

        return (
            <div>
                <HomeSplash language={language} />
                <div className="mainContainer">
                    <Features />
                    <LearnHow />
                    <Textlint />
                    <Showcase language={language} />
                </div>
            </div>
        );
    }
}

module.exports = Index;
