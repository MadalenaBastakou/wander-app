export const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  numberOfNights,
  listing,
}) => {


  return (
    <div className="grid gap-4 rounded-lg border border-neutral-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your booking details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">
          {listing.type} in {listing.city}
          {listing.province && `,${listing.province}`}, {listing.country}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
            <div className="font-bold">{checkIn?.toDateString()}</div>
        </div>
        <div>
          Check-out
            <div className="font-bold">{checkOut?.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
    </div>
  );
};
