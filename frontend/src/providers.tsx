import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Footer, Header } from "./widgets";
import compose from "compose-function";
import type { JSX } from "react";

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

export const withProviders = compose(withRouter, withLayout);
