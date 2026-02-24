import { MdCheckCircle } from "react-icons/md";
import { Button } from "@/components/Button";

export const SuccessStage = ({
  bookingReference,
  guestInfo,
  villaName,
  onNext,
}) => {
  return (
    <div className="glass border border-border p-0 rounded-xl overflow-hidden flex flex-col relative">
      <div className="bg-primary/20 p-8 text-center border-b-2 border-dashed border-border relative">
        <MdCheckCircle className="text-6xl text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-primary">Payment Successful</h2>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-background rounded-full border-r border-t border-border transform rotate-45"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-background rounded-full border-l border-t border-border transform -rotate-45"></div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
            Booking Reference
          </p>
          <p className="text-2xl font-mono font-bold tracking-wider">
            {bookingReference}
          </p>
        </div>
        <div className="p-5 bg-background border border-border rounded-xl">
          <p className="font-bold text-lg mb-4 text-center">{villaName}</p>
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1">Check-in</p>
              <p className="font-bold text-lg">{guestInfo?.checkin}</p>
            </div>
            <div className="flex-1 px-4 flex items-center">
              <div className="w-full h-0.5 bg-border border-dashed"></div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Check-out</p>
              <p className="font-bold text-lg">{guestInfo?.checkout}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-base border-t border-border pt-4">
          <span className="text-muted-foreground">Guest Name</span>
          <span className="font-bold">{guestInfo?.name}</span>
        </div>
        <Button onClick={onNext} background="primary" className="w-full mt-2">
          Check In
        </Button>
      </div>
    </div>
  );
};
