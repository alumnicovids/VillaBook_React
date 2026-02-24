import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Button } from "@/components/Button";

export const GuestInfoForm = ({ initialData, onBack, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "checkin" || name === "checkout") {
        if (newData.checkin && newData.checkout) {
          const start = new Date(newData.checkin);
          const end = new Date(newData.checkout);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          newData.nights = diffDays > 0 ? diffDays : 1;
        }
      }
      return newData;
    });
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.checkin &&
      formData.checkout &&
      new Date(formData.checkout) > new Date(formData.checkin)
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="glass border border-border p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Guest Information
      </h2>
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-background border border-border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-background border border-border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-background border border-border rounded-lg"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Check-in</label>
            <input
              type="date"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Check-out</label>
            <input
              type="date"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              className="w-full p-3 bg-background border border-border rounded-lg"
              min={formData.checkin}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={onBack} background="muted" className="w-full">
          <MdArrowBack /> Back
        </Button>
        <Button
          onClick={handleSubmit}
          background="primary"
          className="w-full"
          disabled={!isFormValid()}
        >
          Continue <MdArrowForward />
        </Button>
      </div>
    </div>
  );
};
