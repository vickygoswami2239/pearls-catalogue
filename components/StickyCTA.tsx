'use client';
import QtyStepper from './QtyStepper';

export default function StickyCTA({
  finalAmount, qty, onQtyChange, onBuy, onEnquire, showEnquire = false
}: {
  finalAmount: number;
  qty: number;
  onQtyChange: (n: number) => void;
  onBuy: () => void;
  onEnquire?: () => void;
  showEnquire?: boolean;
}) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 bg-white sticky-cta-shadow border-t">
      <div className="container py-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-gray-500">Payable</div>
          <div className="text-xl font-bold">₹{finalAmount.toLocaleString('en-IN')}</div>
        </div>
        <QtyStepper value={qty} onChange={onQtyChange} />
        {showEnquire && onEnquire && (
          <button onClick={onEnquire} className="btn">Enquire</button>
        )}
        <button onClick={onBuy} className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  );
}
