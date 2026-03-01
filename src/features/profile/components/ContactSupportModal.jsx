import { MdClose, MdEmail, MdChat, MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export const ContactSupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const supportOptions = [
    {
      title: "Direct Concierge",
      desc: "Live chat with our dedicated villa assistants.",
      icon: <MdChat size={24} />,
      action: "Start Chat",
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      title: "WhatsApp",
      desc: "Instant messaging for quick stay adjustments.",
      icon: <FaWhatsapp size={24} />,
      action: "Open WhatsApp",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Email Support",
      desc: "For formal requests and booking documentation.",
      icon: <MdEmail size={24} />,
      action: "Send Email",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass-strong w-full max-w-md rounded-[2rem] overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-serif text-primary mb-1">Concierge Support</h2>
              <p className="text-xs text-muted-foreground italic">Your luxury experience, assisted 24/7.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-surface/50 rounded-full transition-all text-muted-foreground">
              <MdClose size={20} />
            </button>
          </div>

          <div className="space-y-3">
            {supportOptions.map((opt, i) => (
              <div key={i} className="glass flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group cursor-pointer">
                <div className={`p-3 rounded-xl ${opt.bg} ${opt.color} group-hover:scale-110 transition-transform`}>
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary text-[11px] uppercase tracking-widest mb-1">{opt.title}</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{opt.desc}</p>
                </div>
                <button className="text-[9px] font-bold text-accent uppercase tracking-widest border-b border-accent/30 pb-1 group-hover:border-accent transition-all">
                  {opt.action}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-3">Urgent Assistance</p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
              <MdPhone className="text-accent" />
              +62 800 1234 5678
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
