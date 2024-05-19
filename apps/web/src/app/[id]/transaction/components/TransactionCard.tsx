import useGetEvent from "@/hooks/api/admin/useGetEvent";
import useCreateTransaction from "@/hooks/api/transaction/useCreateTransaction";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";

interface TransactionCardProps {
  eventStock: number;
  pricePerTicket: number;
  eventId: number;
  paramsId: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  eventStock,
  pricePerTicket,
  paramsId,
}) => {
  const { createTransaction } = useCreateTransaction();
  const user = useAppSelector((state) => state.user);
  const { event } = useGetEvent(Number(paramsId));
  const [ticketCount, setTicketCount] = useState(1);
  const [usePoints, setUsePoints] = useState(false);
  const [showsVoucher, setShowsVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const totalPoints =
    user.points && user.points.length > 0 ? user.points[0].total : 0;

  const totalPrice = usePoints
    ? pricePerTicket * ticketCount - totalPoints
    : pricePerTicket * ticketCount;

  const totalPriceTicket = pricePerTicket * ticketCount;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAddTicket = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleRemoveTicket = () => {
    setTicketCount(ticketCount - 1);
  };

  const toggleVoucherDropdown = () => {
    setShowsVoucher(!showsVoucher);
  };

  const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  const voucherInputRef = useRef<HTMLInputElement>(null);

  useOutsideClick(voucherInputRef, () => {
    setShowsVoucher(false);
  });

  const handleReferralCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferralCode(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      const payload = {
        userId: user.id,
        eventId: event?.id,
        total: totalPrice,
        amount: ticketCount,
        status: "Pending",
        paymentProof: [] as File[],
        userVoucherId: voucherCode ? Number(voucherCode) : null,
        isPointUse: usePoints,
        isUseVoucher: !!voucherCode,
        referralCode
      };

      await createTransaction(payload);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div className="transaction-card">
      <div className="card-content">
        <h1 className="card-title">Transaction</h1>
        <div className="ticket-info">
          <p>Available Ticket :</p>
          <p>{eventStock - ticketCount}</p>
        </div>
        <div className="price-info">
          <p>Price :</p>
          <span>{formatCurrency(pricePerTicket)}</span>
        </div>
        <div className="ticket-control">
          <button
            className="control-button"
            onClick={handleRemoveTicket}
            disabled={ticketCount === 1}
          >
            -
          </button>
          <input
            type="number"
            value={ticketCount}
            min="1"
            max={eventStock}
            className="ticket-input"
            onChange={(e) =>
              setTicketCount(Math.min(Number(e.target.value), eventStock))
            }
          />
          <button
            className="control-button"
            onClick={handleAddTicket}
            disabled={ticketCount === eventStock}
          >
            +
          </button>
        </div>
        <div className="subtotal-info">
          <span>Subtotal:</span>
          <span>{formatCurrency(totalPriceTicket)}</span>
        </div>
        {usePoints && (
          <div className="flex justify-end">
            <span className="flex flex-col justify-end">
              <span>{totalPoints}</span>
              <span className="text-right">-</span>
            </span>
          </div>
        )}
        <div className="flex flex-row gap-4">
          {/* Toggle for using points */}
          <label className="mt-2 cursor-pointer rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300">
            <input
              type="checkbox"
              checked={usePoints}
              onChange={() => setUsePoints(!usePoints)}
              className="mr-2"
            />
            Use Points
          </label>
          {/* Voucher badge */}
          <div
            className="mt-2 cursor-pointer rounded-lg bg-gray-200 px-2 py-2 hover:bg-gray-300"
            onClick={toggleVoucherDropdown}
          >
            <span>Voucher</span>
            {showsVoucher && (
              <div className="absolute mt-2 rounded border bg-white p-2 shadow-lg hover:bg-gray-50">
                <input
                  ref={voucherInputRef}
                  type="text"
                  value={referralCode}
                  onChange={handleReferralCodeChange}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setShowsVoucher(false);
                    }
                  }}
                  placeholder="Enter voucher code"
                  className="w-full rounded border p-1"
                />
              </div>
            )}
          </div>
        </div>
        <div className="total-info">
          <span>Total:</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="checkout-button">
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
