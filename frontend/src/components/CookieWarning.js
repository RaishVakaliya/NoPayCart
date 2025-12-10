import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbCookieFilled } from "react-icons/tb";

const CookieWarning = ({ theme }) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Check if user has dismissed this warning before
    const dismissed = localStorage.getItem("cookieWarningDismissed");
    if (dismissed) {
      return;
    }

    const checkCookieSupport = async () => {
      // Detect Chrome browser (including Edge Chromium)
      const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor);
      const isEdgeChromium = /Edg/.test(navigator.userAgent);

      // Check if we're in a cross-origin scenario (different domains for frontend/backend)
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      let isCrossOrigin = false;

      if (backendUrl) {
        try {
          const backendHost = new URL(backendUrl).hostname;
          const frontendHost = window.location.hostname;
          isCrossOrigin = backendHost !== frontendHost;
        } catch (e) {
          // If URL parsing fails, assume cross-origin for Vercel deployments
          isCrossOrigin = true;
        }
      } else {
        // If no backend URL is set, assume production cross-origin scenario
        isCrossOrigin = !window.location.hostname.includes("localhost");
      }

      // Show warning for Chrome/Edge users in cross-origin scenarios
      // This is when third-party cookies are most likely to be blocked
      if ((isChrome || isEdgeChromium) && isCrossOrigin) {
        // Small delay to let the page load
        setTimeout(() => {
          setShowWarning(true);
        }, 1000);
      }
    };

    checkCookieSupport();
  }, []);

  const handleClose = () => {
    setShowWarning(false);
    localStorage.setItem("cookieWarningDismissed", "true");
  };

  if (!showWarning) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6 relative ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <AiOutlineClose className="text-xl" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <TbCookieFilled className="text-4xl text-orange-500 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Third-Party Cookies Required
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Please allow third-party cookies for login, otherwise you cannot login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieWarning;
