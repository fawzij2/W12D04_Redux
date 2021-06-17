import { createStore, combineReducers } from "redux";

import login from "./login/index";
import articles from "./article/index";

const reducers = combineReducers({login, articles});
const store = createStore(reducers);

export default store