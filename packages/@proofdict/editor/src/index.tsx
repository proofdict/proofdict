import * as React from "react";
import * as ReactDOM from "react-dom";
import { Context, Dispatcher } from "almin";
import { AlminLogger } from "almin-logger";
import { AppContainer } from "./component/container/App/AppContainer";
import AlminReactContainer from "almin-react-container";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
// FIXME: office-ui-fabric-react CSS warning hack
if (process.env.NODE_ENV !== "production") {
    // console.clear();
}

import { appStoreGroup } from "./component/container/App/AppStoreGroup";
import { appLocator } from "./AppLocator";
import { createCreateNewDictionaryUseCase } from "./use-case/dictionary/CreateNewDictionaryUseCase";

const context = new Context({
    store: appStoreGroup,
    dispatcher: new Dispatcher()
});
appLocator.context = context;
if (process.env.NODE_ENV !== "production") {
    const logger = new AlminLogger();
    logger.startLogging(context);

    const AlminDevTools = require("almin-devtools");
    const devTools = new AlminDevTools(context);
    devTools.connect();
}
context.useCase(createCreateNewDictionaryUseCase()).executor(useCase => useCase.execute()).then(() => {
    const App = AlminReactContainer.create(AppContainer, context);
    ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
    registerServiceWorker();
});
