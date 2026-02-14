import { Card } from "@/components/Card";
import { Background } from "@/components/Background";
import { useVilla } from "../context/VillaContext";

export const Home = () => {
  const { villaList } = useVilla();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Background />

      <div className="container mx-auto px-4 mt-32 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
            Exclusive Collection
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
            Our Luxury Villa
          </h2>
          <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {villaList &&
            villaList.map((villa, index) => (
              <div
                key={villa.id}
                className="transform transition-all duration-200 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 1}ms` }}
              >
                <Card villa={villa} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
