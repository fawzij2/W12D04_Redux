import { createStore, combineReducers } from "redux";

import login from "./login";
import articles from "./article";

const reducers = combineReducers({login, articles});
const store = createStore(reducers);

export default store