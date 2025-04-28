import { useState } from "react";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <button className="flex flex-col items-center" onClick={handleCopyLink}>
        <svg
          className="h-12 w-12 text-slate-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          {" "}
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />{" "}
          <polyline points="16 6 12 2 8 6" />{" "}
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>

      {copied && (
        <div className="button absolute right-1.5 mt-2 bg-black text-white text-sm px-3 py-1 rounded shadow z-50">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default ShareButton;
