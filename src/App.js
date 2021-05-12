import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from './containers/layouts/Layout'
import Login from "./components/Pages/Login";
import Tickets from './components/Pages/Tickets';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Route>
          <Layout>
            <Switch>
              <Route path="/" exact={true} component={Login} />
              <Route path="/login" exact={true} component={Login} />
              <Route path="/tickets" exact={true} component={Tickets} />
              <Route component={() => (<div>404 Main</div>)} exact path="/*" />
            </Switch>
          </Layout>
        </Route>
      </Router>
    </>);
}

export default App;
