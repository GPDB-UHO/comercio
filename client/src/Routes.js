import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout, PrivateRoute } from "components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  Nbhd as NbhdView,
  ProductList as ProductListView,
  Distributions as DistributionsView,
  // UserList as UserListView,
  // Typography as TypographyView,
  // Icons as IconsView,
  // Account as AccountView,
  // Settings as SettingsView,
  // SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Nbhd,
} from "./views";

function PrivateRouteWithMainLayout({ children, ...rest }) {
  return (
    <PrivateRoute {...rest}>
      <MainLayout>{children}</MainLayout>
    </PrivateRoute>
  );
}

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRouteWithMainLayout path="/nbhd">
        <NbhdView />
      </PrivateRouteWithMainLayout>
      <PrivateRouteWithMainLayout path="/products">
        <ProductListView />
      </PrivateRouteWithMainLayout>
      <PrivateRouteWithMainLayout path="/distributions">
        <DistributionsView />
      </PrivateRouteWithMainLayout>
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
