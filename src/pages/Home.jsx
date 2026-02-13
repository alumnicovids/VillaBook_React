import { Card } from "@/components/Card";
import { useVilla } from "@/hooks/useVilla";

export const Home = () => {
  const { villaList } = useVilla();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/Background.png"
          alt="background image"
          className="w-full h-full object-cover opacity-40 bg-repeat"
        />
        <div className="absolute inset-0" />
      </div>

      <div className="grid grid-cols-4 gap-2 px-2 py-0 bg-transparent mt-24">
        {villaList &&
          villaList.map((villa) => <Card key={villa.id} villa={villa} />)}
      </div>
    </section>
  );
};
