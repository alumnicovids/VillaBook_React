import { useEffect } from "react";

export const PaymentStage = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="glass border border-border p-8 rounded-xl text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
    </div>
  );
};
