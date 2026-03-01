import { useVilla } from "@/context/VillaContext.jsx";

export const Toast = () => {
  const { toast } = useVilla();

  if (!toast) return null;

  return (
    <div className="fixed top-24 right-10 z-100 transition-all duration-300">
      <div
        className={`glass px-6 py-4 rounded-xl border shadow-2xl flex items-center gap-3 ${
          toast.type === "success" ? "border-accent/50" : "border-red-500/50"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            toast.type === "success" ? "bg-accent" : "bg-red-500"
          }`}
        />
        <p className="text-primary font-medium tracking-tight">
          {toast.message}
        </p>
      </div>
    </div>
  );
};
