import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Button } from "@/components/common/Button";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export const ReviewBooking = ({ guestInfo, onBack, onConfirm }) => {
  return (
    <div className="glass border border-border p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Review Booking</h2>
      <div className="space-y-6 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Guest Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{guestInfo.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{guestInfo.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{guestInfo.phone}</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-bold mb-2">Stay Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Check-in</p>
              <p className="font-medium">{guestInfo.checkin}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Check-out</p>
              <p className="font-medium">{guestInfo.checkout}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{guestInfo.nights} Night(s)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={onBack} background="muted" className="w-full">
          <FaArrowLeftLong /> Back
        </Button>
        <Button onClick={onConfirm} background="primary" className="w-full">
          Confirm <FaArrowRightLong />
        </Button>
      </div>
    </div>
  );
};
