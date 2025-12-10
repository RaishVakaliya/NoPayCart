import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbCookieFilled } from "react-icons/tb";

const CookieWarning = ({ theme }) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookieWarningDismissed");
    if (dismissed) {
      return;
    }

    const checkCookieSupport = async () => {
      const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor);
      const isEdgeChromium = /Edg/.test(navigator.userAgent);

      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      let isCrossOrigin = false;

      if (backendUrl) {
        try {
          const backendHost = new URL(backendUrl).hostname;
          const frontendHost = window.location.hostname;
          isCrossOrigin = backendHost !== frontendHost;
        } catch (e) {
          isCrossOrigin = true;
        }
      } else {
        isCrossOrigin = !window.location.hostname.includes("localhost");
      }

      if ((isChrome || isEdgeChromium) && isCrossOrigin) {
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
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <AiOutlineClose className="text-xl" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <TbCookieFilled className="text-4xl text-orange-500 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Third-Party Cookies Required
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Please allow third-party cookies for login, otherwise you cannot
            login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieWarning;
