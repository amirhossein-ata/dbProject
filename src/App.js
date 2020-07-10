import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import AllBusinessesPage from "./scripts/view/pages/business/AllBusinesses";
import ServicePage from "./scripts/view/pages/service/Service";
import ServicePanel from "./scripts/view/pages/service/ServicePanel";
import Navbar from "./scripts/view/components/Navbar";
import Login from "./scripts/view/components/forms/LoginForm";
import Signup from "./scripts/view/components/forms/SignupForm";
import AddBusiness from "./scripts/view/pages/business/AddBusinessForm";
import BusinessDetailPage from "./scripts/view/pages/business/BusinessDetails";
import ProfilePage from "./scripts/view/pages/profile/Profile";
import TicketsPage from "./scripts/view/pages/ticket/Ticket";
import BusinessPanel from "./scripts/view/pages/business/businessPanel";
import "antd/dist/antd.css";
import "./App.scss";

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth && auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
class App extends React.Component {
  render() {
    const { dispatch, auth, history } = this.props;
    return (
      <div>
        <Navbar dispatch={dispatch} history={history} auth={auth} />
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <AllBusinessesPage history={history} />}
            />
            <Route
              path="/login"
              component={() => (
                <Login dispatch={dispatch} history={history} auth={auth} />
              )}
            />
            <Route
              path="/signup"
              component={() => (
                <Signup dispatch={dispatch} history={history} auth={auth} />
              )}
            />
            <Route
              path="/business"
              component={() => <AllBusinessesPage history={history} />}
              auth={auth}
            />
            <Route
              path="/add_business"
              component={() => (
                <AddBusiness
                  dispatch={dispatch}
                  history={history}
                  auth={auth}
                />
              )}
              auth={auth}
            />
            <Route
              path="/business_detail/:businessID"
              auth={auth}
              component={() => (
                <BusinessDetailPage dispatch={dispatch} auth={auth} />
              )}
            />
            <Route
              path="/service/:serviceID/business/:businessID"
              auth={auth}
              component={() => <ServicePage dispatch={dispatch} auth={auth} />}
            />
            <Route
              path="/service-panel/:serviceID/business/:businessID"
              auth={auth}
              component={() => <ServicePanel dispatch={dispatch} auth={auth} />}
            />
            <Route
              path="/profile"
              auth={auth}
              component={() => <ProfilePage dispatch={dispatch} auth={auth} />}
            />
            <Route
              path="/tickets/:businessID"
              auth={auth}
              component={() => <TicketsPage dispatch={dispatch} auth={auth} />}
            />
            <Route
              path="/business-panel/:businessID"
              auth={auth}
              component={() => (
                <BusinessPanel dispatch={dispatch} auth={auth} />
              )}
            />
            {/* <PrivateRoute
              path="/add_business"
              component={() => (
                <AddBusiness
                  dispatch={dispatch}
                  history={history}
                  auth={auth}
                />
              )}
              auth={auth}
            />
            <PrivateRoute
              path="/business_detail/:businessID"
              auth={auth}
              component={() => (
                <BusinessDetailPage dispatch={dispatch} auth={auth} />
              )}
            />
            <PrivateRoute
              path="/service/:serviceID"
              auth={auth}
              component={() => <ServicePage dispatch={dispatch} auth={auth} />}
            /> */}
          </Switch>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapDispatchToProps)(withRouter(App));
