import { formatPrice } from "@/utils/Formatter";

export const BookingSummary = ({
  villa,
  selectedRoom,
  selectedServices,
  roomTotal,
  totalPrice,
  discountInfo,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 glass border border-border p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-primary">Booking Summary</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <img
              src={villa.image[0]}
              alt={villa.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div>
              <h4 className="font-bold text-foreground">{villa.name}</h4>
              <p className="text-sm text-muted-foreground">{villa.location}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex justify-between items-center text-foreground">
              <span>{selectedRoom?.type}</span>
              <div className="text-right">
                {discountInfo ? (
                  <>
                    <p className="line-through text-xs text-muted-foreground mb-1">
                      {formatPrice(roomTotal + discountInfo.savings)}
                    </p>
                    <p className="font-bold text-primary">
                      {formatPrice(roomTotal)}
                    </p>
                  </>
                ) : (
                  <span className="font-bold text-primary">
                    {formatPrice(roomTotal)}
                  </span>
                )}
              </div>
            </div>

            {discountInfo && (
              <div className="flex justify-between text-sm text-accent font-medium p-2 bg-accent/10 rounded-xl">
                <span>Promo ({discountInfo.percent}%)</span>
                <span>- {formatPrice(discountInfo.savings)}</span>
              </div>
            )}

            {selectedServices?.length > 0 && (
              <div className="pt-4">
                {selectedServices.map((serviceIndex) => {
                  const service = villa.detail.extraServices[serviceIndex];
                  return (
                    <div
                      key={serviceIndex}
                      className="flex justify-between text-sm text-foreground mb-2"
                    >
                      <span>{service.type}</span>
                      <span className="font-bold text-primary">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex justify-between items-baseline mb-4 text-foreground">
              <span className="text-sm">Total Price</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>

            <div className="bg-accent/10 p-3 rounded-xl border border-accent/20">
              <p className="text-xs font-bold uppercase mb-1 text-accent">
                Cancellation Policy
              </p>
              <p className="text-xs text-accent/80">
                {villa.detail.cancellationPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
