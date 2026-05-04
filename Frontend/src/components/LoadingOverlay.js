import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LoadingOverlay = ({ active, message = "Loading..." }) => {
  const loadingAction = useSelector((state) => state?.auth?.loadingAction);
  const contactLoading = useSelector((state) => state?.contact?.isLoading);
  const reduxLoading =
    contactLoading ||
    [
      "login",
      "register",
      "forgot-password",
      "reset-password",
      "create-order",
      "update-profile",
    ].includes(loadingAction);
  const shouldShow = active ?? reduxLoading;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!shouldShow) {
      setVisible(false);
      return undefined;
    }

    const timer = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(timer);
  }, [shouldShow]);

  if (!visible) return null;

  return (
    <div className="site-loading-overlay" role="status" aria-live="polite">
      <div className="site-loading-card">
        <div className="site-loading-logo">R</div>
        <div className="site-loading-spinner" aria-hidden="true"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
