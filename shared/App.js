import React from "react";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { actionCreators as userActions} from "../redux/modules/User";
import { useDispatch } from "react-redux";

import { apiKey } from "./firebase";

import {Button} from "../elements/paper"
import { Main, Login, Detail, Make } from "../pages/paper";
import Header from "../components/Header";
import Permit from "./Permit";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(()=>{
    if(is_session){
      dispatch(userActions.loginCheckFB())
    }
  },[])

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />  
        <Route path="/" exact component={Main}/>
        <Route path="/login/:form" exact component={Login}/>
        <Route path="/detail" exact component={Detail}/>
        <Route path="/make" exact component={Make}/>
        <Route path="/make/:id" exact component={Make}/>
        <Permit><Button is_float>N</Button></Permit>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
