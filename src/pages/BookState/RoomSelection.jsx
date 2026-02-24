import { MdArrowForward } from "react-icons/md";
import { Button } from "@/components/Button";
import { formatPrice } from "@/utils/Formatter";

export const RoomSelection = ({
  villa,
  selectedRoom,
  setSelectedRoom,
  hasPromo,
  calculateDiscountedPrice,
  isStage1Valid,
  nextStage,
}) => {
  return (
    <div className="glass border border-border p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-primary">Select Room Type</h2>
      <div className="space-y-4 mb-8">
        {villa.rooms.map((room, index) => {
          const roomPrice = calculateDiscountedPrice(room.price);
          return (
            <div
              key={index}
              onClick={() => setSelectedRoom(room)}
              className={`p-6 border rounded-lg cursor-pointer transition-all ${
                selectedRoom === room
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{room.type}</h3>
                <div className="text-right">
                  {hasPromo ? (
                    <div>
                      <p className="font-bold text-primary">
                        {formatPrice(roomPrice)}
                      </p>
                      <p className="text-sm text-muted-foreground line-through">
                        {formatPrice(room.price)}
                      </p>
                    </div>
                  ) : (
                    <p className="font-bold text-primary">
                      {formatPrice(room.price)}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">/ night</p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-3">
        <Button
          onClick={nextStage}
          background="primary"
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isStage1Valid()}
        >
          Continue <MdArrowForward />
        </Button>
      </div>
    </div>
  );
};
