import * as React from "react";
import * as ReactDOM from "react-dom";
import { Context } from "almin";
import { AppContainer } from "./component/container/App/AppContainer";
import AlminReactContainer from "almin-react-container";
import registerServiceWorker from "./registerServiceWorker";
import { appStoreGroup } from "./component/container/App/AppStoreGroup";
import { appLocator } from "./AppLocator";
import { createCreateNewDictionaryUseCase } from "./use-case/dictionary/CreateNewDictionaryUseCase";
import { parseQuery } from "./infra/url/QueryParser";
import { createInitializeUseCase } from "./use-case/initialization/InitializeUseCase";

require("./index.css");
require("office-ui-fabric-react/dist/css/fabric.min.css");

const context = new Context({
    store: appStoreGroup,
    options: {
        strict: true
    }
});
appLocator.context = context;
if (process.env.NODE_ENV !== "production") {
    const { AlminLogger } = require("almin-logger");
    const logger = new AlminLogger();
    logger.startLogging(context);

    const AlminDevTools = require("almin-devtools");
    const devTools = new AlminDevTools(context);
    devTools.connect();
}
context
    .transaction("Initialize", async transactionContext => {
        // ?owner=a&repo=b is minimal case
        // ?owner=a&repo=b&branch=gh-pages
        const query = parseQuery<{ owner: string; repo: string; branch: string; proofdictRelativePath: string }>(
            location.href
        );
        await transactionContext.useCase(createInitializeUseCase()).execute({
            owner: query.owner,
            repo: query.repo
        });
        await transactionContext.useCase(createCreateNewDictionaryUseCase()).execute();
        transactionContext.commit();
    })
    .then(() => {
        const App = AlminReactContainer.create(AppContainer, context);
        ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
        registerServiceWorker();
    });
