import { Link, Route, Routes, useLocation } from "react-router";
import {
  MdPerson,
  MdCalendarMonth,
  MdFavorite,
  MdPayment,
} from "react-icons/md";
import { Background } from "@/components/Background";
import { ProfileDetails } from "./SubProfile/ProfileDetails";
import { SavedVillas } from "./SubProfile/SavedVillas";

const sidebarLinks = [
  { href: "/profile", text: "Personal Details", icon: <MdPerson size={20} /> },
  {
    href: "/profile/my-bookings",
    text: "My Bookings",
    icon: <MdCalendarMonth size={20} />,
  },
  {
    href: "/profile/saved-villas",
    text: "Saved Villas",
    icon: <MdFavorite size={20} />,
  },
  {
    href: "/profile/payment-methods",
    text: "Payment Methods",
    icon: <MdPayment size={20} />,
  },
];

export const Profile = () => {
  const location = useLocation();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="container mx-auto px-4 mt-32 mb-20 relative z-10 flex gap-8">
        <aside className="fixed top-30 left-4 bottom-2 w-70 flex flex-col gap-4">
          <div className="glass rounded-3xl p-3 flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-surface/50 hover:text-primary"
                }`}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>

          <div className="glass-soft rounded-3xl p-6 border border-border/30">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Need help with your booking? Our concierge team is available 24/7.
            </p>
            <button className="text-sm font-bold text-foreground hover:text-primary transition-colors">
              Contact Support
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-8">
          <Routes>
            <Route path="/profile" element={<ProfileDetails />} />
            {/* <Route path="/my-bookings" element={<MyBookings />} /> */}
            <Route path="/saved-villas" element={<SavedVillas />} />
            {/* <Route path="/payment-methods" element={<PaymentMethods />} /> */}
          </Routes>
        </main>
      </div>
    </section>
  );
};
