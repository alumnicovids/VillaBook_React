import { useState, useEffect } from "react";
import { Background } from "../components/Background";
import { fetchVilla } from "../api/VillaGecko";

export const Compare = () => {
  const [selectedVillas, setSelectedVillas] = useState(() => {
    const saved = localStorage.getItem("compare_villas");
    return saved ? JSON.parse(saved) : [];
  });
  const [villasData, setVillasData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("compare_villas", JSON.stringify(selectedVillas));
  }, [selectedVillas]);

  useEffect(() => {
    const loadVillas = async () => {
      const data = await fetchVilla();
      setVillasData(data);
    };
    loadVillas();
  }, []);

  const handleAddVilla = (villaId) => {
    const villa = villasData.find((v) => v.id === parseInt(villaId));
    if (villa && !selectedVillas.some((v) => v.id === villa.id)) {
      setSelectedVillas([...selectedVillas, villa]);
    }
  };

  const handleRemoveVilla = (id) => {
    setSelectedVillas(selectedVillas.filter((v) => v.id !== id));
  };

  return (
    <section className="relative min-h-screen flex flex-col pb-8 overflow-auto text-foreground">
      <Background />
      <div className="container mx-auto px-4 mt-32 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-2 block">
            Make Your Choice
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-primary leading-tight">
            Compare Villas
          </h2>
          <div className="w-24 h-1 bg-accent mt-4 md:mx-0 mx-auto opacity-50" />
        </div>

        <div className="glass p-6 rounded-lg shadow-lg w-full border border-border">
          <div className="mb-6 flex gap-4">
            <button
              className="border border-border glass text-foreground p-3 rounded w-full md:w-1/3 text-left"
              onClick={() => setIsModalOpen(true)}
            >
              Select villa to add...
            </button>
          </div>

          {selectedVillas.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr>
                    <th className="border border-border p-4 text-left w-48 glass text-muted-foreground">
                      Features
                    </th>
                    {selectedVillas.map((villa) => (
                      <th
                        key={villa.id}
                        className="border border-border p-4 min-w-75 text-center glass"
                      >
                        <img
                          src={villa.image[0]}
                          alt={villa.name}
                          className="w-full h-40 object-cover rounded mb-3"
                        />
                        <h3 className="font-bold text-lg text-primary">
                          {villa.name}
                        </h3>
                        <button
                          onClick={() => handleRemoveVilla(villa.id)}
                          className="text-highlight text-sm mt-2 font-normal"
                        >
                          Remove
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-4 font-semibold glass text-muted-foreground">
                      Price / Night
                    </td>
                    {selectedVillas.map((villa) => (
                      <td
                        key={villa.id}
                        className="border border-border p-4 text-foreground"
                      >
                        Rp {villa.price.toLocaleString("id-ID")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold glass text-muted-foreground">
                      Rating
                    </td>
                    {selectedVillas.map((villa) => (
                      <td
                        key={villa.id}
                        className="border border-border p-4 text-accent font-bold"
                      >
                        {villa.rating} / 5.0
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold glass text-muted-foreground">
                      Full Description
                    </td>
                    {selectedVillas.map((villa) => (
                      <td
                        key={villa.id}
                        className="border border-border p-4 text-sm text-foreground text-justify"
                      >
                        {villa.detail.description}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold glass text-muted-foreground align-top">
                      Facilities
                    </td>
                    {selectedVillas.map((villa) => (
                      <td
                        key={villa.id}
                        className="border border-border p-4 align-top"
                      >
                        <ul className="list-disc pl-4 text-sm text-foreground">
                          {villa.detail.facilities.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold glass text-muted-foreground align-top">
                      Nearby Locations
                    </td>
                    {selectedVillas.map((villa) => (
                      <td
                        key={villa.id}
                        className="border border-border p-4 align-top"
                      >
                        <ul className="list-disc pl-4 text-sm text-foreground">
                          {villa.detail.nearbyPlaces.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold glass text-muted-foreground">
                      Cancellation Policy
                    </td>
                    {selectedVillas.map((villa) => (
                      <td
                        key={villa.id}
                        className="border border-border p-4 text-sm text-foreground"
                      >
                        {villa.detail.cancellationPolicy}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="glass p-6 rounded-lg border border-border w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary font-serif">
                Select Villa
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-highlight hover:text-red-400"
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto flex flex-col gap-2 pr-2">
              {villasData.map((v) => (
                <button
                  key={v.id}
                  className="p-3 text-left border border-border rounded glass hover:bg-muted/50 transition-colors text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    handleAddVilla(v.id);
                    setIsModalOpen(false);
                  }}
                  disabled={selectedVillas.some(
                    (selected) => selected.id === v.id,
                  )}
                >
                  {v.name}{" "}
                  {selectedVillas.some((selected) => selected.id === v.id)
                    ? "(Added)"
                    : ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
