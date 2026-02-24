import { MdWavingHand, MdMeetingRoom } from "react-icons/md";
import { Button } from "@/components/Button";

export const ActiveBookingState = ({ villaName, onCheckOut }) => {
  return (
    <div className="glass border border-border p-10 rounded-xl text-center flex flex-col items-center gap-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-accent"></div>
      <MdWavingHand className="text-6xl text-primary mb-2 animate-bounce" />
      <div>
        <h2 className="text-4xl font-serif font-bold mb-2 text-foreground">
          Welcome to Your Retreat
        </h2>
        <p className="text-muted-foreground text-lg mt-2">
          We hope you have an unforgettable stay at{" "}
          <span className="text-primary font-bold">{villaName}</span>. Relax,
          unwind, and enjoy all our premium amenities.
        </p>
      </div>
      <div className="bg-primary/10 p-6 rounded-xl border border-primary/20 w-full mt-4">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2 text-foreground">
          <MdMeetingRoom className="text-primary" /> Room Key Accessed
        </h3>
        <p className="text-sm text-muted-foreground">
          Your smart lock is activated. Feel free to explore the villa and let
          us know if you need anything.
        </p>
      </div>
      <Button
        onClick={onCheckOut}
        variant="outline"
        className="w-full mt-4 border-highlight text-highlight hover:bg-highlight/10"
      >
        Check Out
      </Button>
    </div>
  );
};
