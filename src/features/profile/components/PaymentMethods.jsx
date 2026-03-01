import { useState } from "react";
import { useVilla } from "@/context/VillaContext";
import { MdAdd, MdCreditCard, MdDeleteOutline, MdStars } from "react-icons/md";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";

export const PaymentMethods = () => {
  const { paymentMethods, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } = useVilla();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="ml-80 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">
            Billing details
          </span>
          <h2 className="text-3xl font-serif text-primary">Payment Methods</h2>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20"
        >
          <MdAdd size={20} />
          Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((card) => (
          <div key={card.id} className="glass rounded-2xl p-6 border border-white/5 relative group overflow-hidden transition-all hover:border-accent/30">
            <div className="absolute top-0 right-0 p-4 flex gap-2">
              {card.isDefault && (
                <span className="flex items-center gap-1 text-[9px] font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-full uppercase tracking-widest border border-accent/20">
                  <MdStars /> Default Method
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 rounded-xl bg-background/50 ring-1 ring-white/10 shadow-inner">
                {card.type === "visa" ? <FaCcVisa size={36} className="text-blue-500" /> : <FaCcMastercard size={36} className="text-orange-500" />}
              </div>
              <div>
                <p className="font-bold text-lg text-primary tracking-[0.2em]">•••• •••• •••• {card.last4}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-medium">Expires {card.expiry}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-6 border-t border-white/10">
              {!card.isDefault ? (
                <button 
                  onClick={() => setDefaultPaymentMethod(card.id)}
                  className="text-[10px] font-bold text-muted-foreground hover:text-accent transition-colors uppercase tracking-widest"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest opacity-60">Currently Active</span>
              )}
              <button 
                onClick={() => removePaymentMethod(card.id)}
                className="p-2 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
              >
                <MdDeleteOutline size={22} />
              </button>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="glass-soft border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center group min-h-[160px] hover:border-accent/30 transition-all"
        >
          <div className="p-4 rounded-full bg-surface/50 text-muted-foreground mb-4 group-hover:text-accent group-hover:bg-accent/10 transition-all">
            <MdCreditCard size={36} />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Add Another Card</p>
        </button>
      </div>

      <AddPaymentMethodModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addPaymentMethod}
      />
    </div>
  );
};
