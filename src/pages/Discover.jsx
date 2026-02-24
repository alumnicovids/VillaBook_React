import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Background } from "@/components/Background";
import {
  MdKeyboardArrowDown,
  MdOutlineCategory,
  MdSearch,
  MdSearchOff,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useVilla } from "@/context/VillaContext";

export const Discover = () => {
  const { villaList } = useVilla();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [filteredVillas, setFilteredVillas] = useState([]);

  useEffect(() => {
    setFilteredVillas(villaList);
  }, [villaList]);

  const handleSearch = () => {
    const results = villaList?.filter((villa) => {
      const matchesSearch =
        villa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        villa.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryTerm === "" ||
        (categoryTerm === "Promo"
          ? villa.promo && villa.promo.status === "active"
          : villa.tag === categoryTerm);

      return matchesSearch && matchesCategory;
    });
    setFilteredVillas(results);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Background />

      <div className="container mx-auto px-4 mt-32 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
            Explore Destinations
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
            Find Your Sanctuary
          </h2>
          <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50" />
        </div>

        <div className="glass p-1.5 rounded-2xl flex flex-col md:flex-row items-center gap-2 mb-10 border border-border/40 transition-all duration-300 focus-within:border-primary/50 shadow-2xl">
          <div className="relative flex-1 w-full flex items-center group">
            <div className="pl-4 text-muted-foreground group-focus-within:text-primary transition-colors">
              <MdSearch size={22} />
            </div>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-transparent py-4 px-3 outline-none text-foreground placeholder:text-muted-foreground/60 text-sm"
            />
          </div>

          <div className="h-8 w-1px bg-border/50 hidden md:block" />

          <div className="relative w-full md:w-60 flex items-center group glass rounded-xl">
            <div className="pl-4 text-muted-foreground group-focus-within:text-accent transition-colors">
              <MdOutlineCategory size={20} />
            </div>
            <select
              value={categoryTerm}
              onChange={(e) => setCategoryTerm(e.target.value)}
              className="w-full bg-transparent py-4 pl-3 pr-10 outline-none text-foreground cursor-pointer appearance-none text-sm font-medium"
            >
              <option value="" className="bg-surface">
                All Categories
              </option>
              <option value="Couple Villa" className="bg-surface">
                Couple Villa
              </option>
              <option value="Family Villa" className="bg-surface">
                Family Villa
              </option>
              <option value="Promo" className="bg-surface">
                Promo
              </option>
            </select>
            <div className="absolute right-4 pointer-events-none text-muted-foreground">
              <MdKeyboardArrowDown size={20} />
            </div>
          </div>

          <Button
            onClick={handleSearch}
            size="sm"
            className="w-full md:w-auto px-12 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>
              <MdSearch size={20} />
            </span>
            Search
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {filteredVillas && filteredVillas.length > 0 ? (
            filteredVillas.map((villa, index) => (
              <div
                key={villa.id}
                className="transform transition-all duration-200 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 1}ms` }}
              >
                <Card villa={villa} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <MdSearchOff size={80} className="text-muted opacity-50" />
              </div>
              <h3 className="text-2xl font-serif text-primary mb-2">
                No Sanctuaries Found
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xs">
                We couldn't find any villas matching your current criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryTerm("");
                  setFilteredVillas(villaList);
                }}
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-primary-foreground"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
