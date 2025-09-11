import { Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
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
import StlEditPage from "./shared/ui/StlEditPage";
import HelpPage from "./pages/help";
import PrivacyPolicy from "./pages/privacy_policy";
import UserAgreement from "./pages/user_agreement";
import CartPage from "./pages/cart";

export default function App() {
  const public_routes: Array<[string, ReactNode]> = [
    [urls.HOME, <HomePage />],
    [urls.NEWS, <NewsPage />],
    [urls.ABOUT, <AboutPage />],
    [urls.CATALOG_3D, <Catalog3DPage />],
    [urls.HOUSE, <HousePage />],
    [urls.HOUSE_EDIT, <StlEditPage />],
    [urls.MAF, <MafPage />],
    [urls.MAF_EDIT, <StlEditPage />],
    [urls.CART, <CartPage />],
    [urls.TECHNOLOGIES, <TechnologiesPage />],
    [urls.MIXTURES, <MixturesPage />],
    [urls.PRINTERS, <PrintersPage />],
    [urls.HELP, <HelpPage />],
    [urls.PRIVACY_POLICY, <PrivacyPolicy />],
    [urls.USER_AGREEMENT, <UserAgreement />],
  ];

  return (
    <Routes>
      {public_routes.map(([path, element]) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={urls.HOME} replace />} />
    </Routes>
  );
}
