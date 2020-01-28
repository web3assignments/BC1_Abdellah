import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import App from "./App";
import System from "./System";
import MakeTicket from "./MakeTicket";
import BookTicket from "./BookTicket";
import GetLatestTicket from "./GetLatestTicket";
import web3connect from "./web3connect";

const AppRouter = () => (
    <Fragment>
        <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={App} />
                        <Route path="/system" exact component={System} />
                        <Route path="/maketicket" exact component={MakeTicket} />
                        <Route path="/bookticket" exact component={BookTicket} />
                        <Route path="/getlatestticket" exact component={GetLatestTicket} />
                        <Route path="/web3connect" exact component={web3connect} />

                    </Switch>
        </Router>
    </Fragment>
);
export default AppRouter;