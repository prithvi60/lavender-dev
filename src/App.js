import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import { routes } from "./routes";
import Loader from "./components/Loader";
import "./styles/global.css";
import "./styles/admin.css";
import "./styles/login.css";
import "./styles/landing.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchDetailsPage from "./pages/SearchDetailsPage";
import { UserPage } from "./pages/UserPage.tsx";
import { MyFavorites } from "./features/MyFavorites/MyFavorites.tsx";
import { SnackbarProvider } from "./components/Snackbar.tsx";
import ServiceDialog from "./features/ServiceDialog/ServiceDialog.jsx";
import Reschedule from "./features/ServiceDialog/Reschedule.jsx";
import { FilterProvider } from "./features/Business/FilterContext.tsx";
import OnBoardingSteps from "./features/Business/SalonProfile/Onboarding/OnBoardingSteps.tsx";
import BusinessHomePage from "./features/Business/BusinessHomePage/BusinessHomePage.jsx";
import BusinessLoginPage from "./pages/BusinessLoginPage"
import BusinessRegisterPage from "./pages/BusinessRegisterPage"
import BusinessForgotPasswordPage from "./pages/BusinessForgotPasswordPage"

const Admin = React.lazy(() => import("./pages/AdminPage"));
const Places = React.lazy(() => import("./pages/Places"));
const Bookings = React.lazy(() => import("./pages/Bookings"));
const Login = React.lazy(() => import("./pages/LoginPage"));
const Register = React.lazy(() => import("./pages/RegisterPage"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPasswordPage"));
const Search = React.lazy(() => import("./pages/SearchPage"));
const BusinessSchedule = React.lazy(() =>
  import("./pages/BusinessLayoutPage.js")
);

const BusinessLogin = React.lazy(() => import("./pages/BusinessLoginPage.js"));
const BusinessRegister = React.lazy(() => import("./pages/BusinessRegisterPage.jsx"));
const BusinessForgotPassword = React.lazy(() => import("./pages/BusinessForgotPasswordPage.js"));
//const MyFavorites = React.lazy(() => import('./features/MyFavorites/MyFavorites'));

// const UserDetails = React.lazy(() => import('./pages/UserPage'));
// const SearchDetails = React.lazy(() => import('./pages/SearchDetailsPage'));

const components = [
  Admin,
  Places,
  Bookings,
  Login,
  Register,
  ForgotPassword,
  Search,
  // BusinessSchedule,
  // BusinessSchedule,
];

const businessComponents = [
  BusinessLogin,
  BusinessRegister,
  BusinessForgotPassword,
];
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path="/" exact element={<LandingPage />} />
              {routes?.map((route, index) => {
                const Component = components?.[index];
                
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={
                      <Suspense fallback={<Loader />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
              {/* {routes?.map((route, index) => {
                const BusinessComponent = businessComponents?.[index];
               
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={
                      <Suspense fallback={<Loader />}>
                        <BusinessComponent />
                      </Suspense>
                    }
                  />
                );
              })} */}
              <Route
                path="/salon/:estId"
                element={<SearchDetailsPage />}
              ></Route>
              <Route path="/userprofile" element={<UserPage />}></Route>
              <Route path="/favourites" element={<MyFavorites />}></Route>
              <Route
                path="/salon/:estId/service"
                element={<ServiceDialog />}
              ></Route>
              <Route
                path="/salon/:estId/reschedule"
                element={<Reschedule />}
              ></Route>
              <Route
                path="/business/dashboard"
                element={
                  <FilterProvider>
                    <BusinessSchedule />
                  </FilterProvider>
                }
              ></Route>
              <Route path="/business" element={<BusinessHomePage />} />
              <Route path="/business/login" element={<BusinessLoginPage />} />
              <Route path="/business/register" element={<BusinessRegisterPage />} />
              <Route path="/business/forgotPassword" element={<BusinessForgotPasswordPage />} />
              <Route
                path="/business/getStarted"
                element={<OnBoardingSteps />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
