import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history"
import { connectRouter } from "connected-react-router";

import User from "./modules/User";
import Image from "./modules/Image";
import Post from "./modules/Post";
import Like from "./modules/Like";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: User,
    image: Image,
    post: Post,
    like: Like,
    router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({history:history})];

const env = process.env.NODE_ENV;

if(env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
        );

        let store = (initialStore) => createStore(rootReducer, enhancer);

    export default store();