import compose from "compose-function";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JSX, ReactNode, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Footer, Header } from "./widgets";
import urls from "~/shared/routes";
import "./styles/index.scss";

import HomePage from "~/pages/home";
import NewsPage from "~/pages/news";
import AboutPage from "~/pages/about";
import TechnologiesPage from "./pages/technologies";
import MixturesPage from "./pages/mixtures";
import PrintersPage from "./pages/printers";
import Catalog3DPage from "./pages/catalog_3d";
import MafPage from "./pages/maf";
import HousePage from "./pages/house";
import HelpPage from "./pages/help";
import PrivacyPolicy from "./pages/privacy_policy";
import CartPage from "./pages/cart";

const App = () => {
  const public_routes: Array<[string, ReactNode]> = [
    [urls.HOME, <HomePage />],
    [urls.NEWS, <NewsPage />],
    [urls.ABOUT, <AboutPage />],
    [urls.CATALOG_3D, <Catalog3DPage />],
    [urls.HOUSE, <HousePage />],
    [urls.MAF, <MafPage />],
    [urls.CART, <CartPage />],
    [urls.TECHNOLOGIES, <TechnologiesPage />],
    [urls.MIXTURES, <MixturesPage />],
    [urls.PRINTERS, <PrintersPage />],
    [urls.HELP, <HelpPage />],
    [urls.PRIVACY_POLICY, <PrivacyPolicy />],
  ];

  return (
    <Routes>
      {public_routes.map(([path, element]) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={urls.HOME} replace />} />
    </Routes>
  );
};

const withLayout = (component: () => JSX.Element) => () =>
  (
    <>
      <Toaster position="top-center" />
      <Header />
      <main className="main">{component()}</main>
      <Footer />
    </>
  );

const withRouter = (component: () => JSX.Element) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={null}>{component()}</Suspense>
    </BrowserRouter>
  );

const withProviders = compose(withRouter, withLayout);

export default withProviders(App);
