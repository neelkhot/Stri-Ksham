import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "./Footer";
import Header from "./Header";
import LoadingOverlay from "./LoadingOverlay";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Layout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    return () => smoother.kill();
  }, []);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0);
      ScrollTrigger.refresh();
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <LoadingOverlay message="Please wait..." />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main key={location.pathname} className="page-transition">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
