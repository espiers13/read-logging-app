import React from "react";
import useIsMobile from "../custom-hooks/useIsMobile";
import QRCode from "react-qr-code";

const MobileOnlyGate = ({ children }) => {
  const isMobile = useIsMobile();
  if (!isMobile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">
          This site is only available on mobile
        </h1>
        <p className="mb-6 text-gray-600">
          Scan this QR code to open the site on your phone:
        </p>
        <QRCode value={window.location.href} size={200} />
      </div>
    );
  }

  return children;
};

export default MobileOnlyGate;
