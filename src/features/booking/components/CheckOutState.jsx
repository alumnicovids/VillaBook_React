import { MdCardTravel, MdStarRate, MdHome } from "react-icons/md";
import { Button } from "@/components/common/Button";

export const CheckOutState = ({ onReview, onHome }) => {
  return (
    <div className="glass border border-border p-10 rounded-xl text-center flex flex-col items-center gap-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-accent to-primary"></div>
      <MdCardTravel className="text-6xl text-accent mb-2" />
      <div>
        <h2 className="text-4xl font-serif font-bold mb-2 text-foreground">
          Thank You for Staying
        </h2>
        <p className="text-muted-foreground text-lg mt-2">
          We truly appreciate you choosing us for your getaway. Safe travels,
          and we hope to see you again soon!
        </p>
      </div>
      <div className="flex gap-4 w-full mt-6">
        <Button
          onClick={onReview}
          background="primary"
          className="w-1/2 flex items-center justify-center gap-2"
        >
          <MdStarRate /> Leave a Review
        </Button>
        <Button
          onClick={onHome}
          variant="outline"
          className="w-1/2 flex items-center justify-center gap-2"
        >
          <MdHome /> Back to Home
        </Button>
      </div>
    </div>
  );
};
