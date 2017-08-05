import * as React from "react";
import * as ReactDOM from "react-dom";
import { Context, Dispatcher } from "almin";
import { AppContainer } from "./component/container/App/AppContainer";
import AlminReactContainer from "almin-react-container";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { appStoreGroup } from "./component/container/App/AppStoreGroup";

const context = new Context({
    store: appStoreGroup,
    dispatcher: new Dispatcher()
});
const App = AlminReactContainer.create(AppContainer, context);
ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
