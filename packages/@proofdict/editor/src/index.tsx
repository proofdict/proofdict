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
import { initializeIcons } from "@uifabric/icons";

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons();
require("normalize.css/normalize.css");
require("./index.css");
require("office-ui-fabric-react/dist/css/fabric.min.css");

const context = new Context({
    store: appStoreGroup,
    options: {
        strict: false,
        performanceProfile: true
    }
});
appLocator.context = context;
if (process.env.NODE_ENV !== "production") {
    const { AlminLogger } = require("almin-logger");
    const logger = new AlminLogger();
    logger.startLogging(context);
}
context
    .transaction("Initialize", async (transactionContext) => {
        // ?owner=a&repo=b is minimal case
        // ?owner=a&repo=b&branch=gh-pages
        const query = parseQuery<{
            owner: string;
            repo: string;
            branch: string;
            proofdictRelativePath: string;
            dictionaryContent: string;
            dictionaryType: string;
        }>(location.href);
        await transactionContext.useCase(createInitializeUseCase()).execute({
            owner: query.owner,
            repo: query.repo
        });
        await transactionContext.useCase(createCreateNewDictionaryUseCase()).execute(query.dictionaryContent);
        transactionContext.commit();
    })
    .then(() => {
        const App = AlminReactContainer.create(AppContainer, context);
        ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
        registerServiceWorker();
    });
