import { Link, useLocation } from "react-router";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";

const navLinks = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/discover",
    text: "Discover",
  },
  {
    href: "/compare",
    text: "Compare",
  },
  {
    href: "/book",
    text: "Book",
  },
];

export const Navbar = () => {
  const location = useLocation();
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${isScroll ? "glass" : "bg-transparent"} py-5 z-50`}
    >
      <nav className="container margin-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-primary"
        >
          Luxe<span className="text-primary">Nest</span>
        </Link>

        {/* desktop navigations */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 glass rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                } hover:text-primary rounded-full hover:bg-surface`}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/profile"
          className="min-w-28 flex items-center justify-center hover:text-primary"
        >
          <CgProfile size={30} />
        </Link>
      </nav>
    </header>
  );
};
