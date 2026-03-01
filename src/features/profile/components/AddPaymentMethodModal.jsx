import { useState } from "react";
import { MdClose, MdCreditCard } from "react-icons/md";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

export const AddPaymentMethodModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    holderName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Basic formatting for card number (adding spaces)
    if (name === "cardNumber") {
      const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || "";
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length) {
        setFormData(prev => ({ ...prev, [name]: parts.join(" ") }));
      } else {
        setFormData(prev => ({ ...prev, [name]: v }));
      }
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const last4 = formData.cardNumber.replace(/\s/g, "").slice(-4);
    const type = formData.cardNumber.startsWith("4") ? "visa" : "mastercard";
    onAdd({ type, last4, expiry: formData.expiry });
    onClose();
    setFormData({ cardNumber: "", expiry: "", cvv: "", holderName: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass-strong w-full max-w-md rounded-[2rem] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif text-primary">Add New Card</h2>
            <button onClick={onClose} className="p-2 hover:bg-surface/50 rounded-full transition-all text-muted-foreground">
              <MdClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                  className="w-full bg-surface/30 border-b border-white/10 py-3 text-primary outline-none focus:border-accent transition-all pl-10"
                  placeholder="0000 0000 0000 0000"
                  required
                />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {formData.cardNumber.startsWith("4") ? <FaCcVisa size={20} /> : <FaCcMastercard size={20} />}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full bg-surface/30 border-b border-white/10 py-3 text-primary outline-none focus:border-accent transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="***"
                  maxLength="3"
                  className="w-full bg-surface/30 border-b border-white/10 py-3 text-primary outline-none focus:border-accent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Card Holder</label>
              <input
                type="text"
                name="holderName"
                value={formData.holderName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-surface/30 border-b border-white/10 py-3 text-primary outline-none focus:border-accent transition-all uppercase tracking-widest text-xs"
                required
              />
            </div>

            <button type="submit" className="w-full py-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all mt-4">
              Authorize Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
