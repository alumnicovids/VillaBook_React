import { useVilla } from "@/context/VillaContext.jsx";
import { useEffect, useState } from "react";
import { MdCheckCircle, MdError, MdInfo, MdClose } from "react-icons/md";

export const Toast = () => {
  const { toast } = useVilla();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let fadeTimer;
    if (toast) {
      setIsVisible(true);
      fadeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
    return () => {
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, [toast]);

  if (!toast) return null;

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          icon: <MdCheckCircle className="text-emerald-500" size={24} />,
          border: "border-emerald-500/20",
          bg: "bg-emerald-500/10",
          progress: "bg-emerald-500",
          accent: "text-emerald-500",
        };
      case "error":
        return {
          icon: <MdError className="text-rose-500" size={24} />,
          border: "border-rose-500/20",
          bg: "bg-rose-500/10",
          progress: "bg-rose-500",
          accent: "text-rose-500",
        };
      default:
        return {
          icon: <MdInfo className="text-sky-500" size={24} />,
          border: "border-sky-500/20",
          bg: "bg-sky-500/10",
          progress: "bg-sky-500",
          accent: "text-sky-500",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`fixed top-24 right-6 md:right-10 z-100 transition-all duration-500 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
      }`}
    >
      <div
        className={`relative overflow-hidden glass-strong min-w-[320px] max-w-md p-5 rounded-2xl border ${styles.border} shadow-2xl flex items-start gap-4 backdrop-blur-xl`}
      >
        {/* Progress Bar Animation */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
          <div
            className={`h-full ${styles.progress} transition-all duration-3000ms ease-linear`}
            style={{ width: isVisible ? "0%" : "100%" }}
          />
        </div>

        <div className={`p-2 rounded-xl ${styles.bg}`}>{styles.icon}</div>

        <div className="flex-1 pt-1">
          <h4
            className={`text-xs font-bold uppercase tracking-widest mb-1 ${styles.accent}`}
          >
            {toast.type || "Notification"}
          </h4>
          <p className="text-primary font-medium text-sm leading-relaxed">
            {toast.message}
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <MdClose size={20} />
        </button>
      </div>
    </div>
  );
};
