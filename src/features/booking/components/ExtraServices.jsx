import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Button } from "@/components/common/Button";
import { formatPrice } from "@/utils/Formatter";

export const ExtraServices = ({
  initialServices,
  availableServices,
  onBack,
  onSubmit,
}) => {
  const [localServices, setLocalServices] = useState(initialServices);

  const toggleService = (index) => {
    setLocalServices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="glass border border-border p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Extra Services</h2>
      <div className="space-y-4 mb-8">
        {availableServices.map((service, index) => (
          <div
            key={index}
            onClick={() => toggleService(index)}
            className={`p-6 border rounded-lg cursor-pointer transition-all ${
              localServices.includes(index)
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{service.type}</h3>
              </div>
              <p className="font-bold text-primary">
                +{formatPrice(service.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Button onClick={onBack} background="muted" className="w-full">
          <MdArrowBack /> Back
        </Button>
        <Button
          onClick={() => onSubmit(localServices)}
          background="primary"
          className="w-full"
        >
          Continue <MdArrowForward />
        </Button>
      </div>
    </div>
  );
};
