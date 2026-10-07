export function VisaBadge({ className = "h-6 w-9" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded border border-[#00579F]/30 bg-[#00579F] px-1.5 py-0.5 text-white shadow-xs ${className}`}
      title="Visa"
    >
      <span className="text-[10px] font-black italic tracking-wider">VISA</span>
    </div>
  );
}

export function MastercardBadge({ className = "h-6 w-9" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded border border-gray-800 bg-[#1A1F2C] px-1 py-0.5 shadow-xs ${className}`}
      title="Mastercard"
    >
      <div className="flex -space-x-1.5 items-center">
        <div className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />
        <div className="h-3.5 w-3.5 rounded-full bg-[#F79E1B] opacity-90" />
      </div>
    </div>
  );
}

export function AmexBadge({ className = "h-6 w-9" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded border border-[#006FCF]/40 bg-[#006FCF] px-1 py-0.5 text-white shadow-xs ${className}`}
      title="American Express"
    >
      <span className="text-[8px] font-black tracking-tighter">AMEX</span>
    </div>
  );
}

export function UnionPayBadge({ className = "h-6 w-9" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden rounded border border-gray-300 bg-white shadow-xs ${className}`}
      title="UnionPay"
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-full w-2.5 bg-[#D81E06]" />
        <div className="h-full w-2.5 bg-[#004B87]" />
        <div className="h-full w-2.5 bg-[#007B78] flex items-center justify-center">
          <span className="text-[6px] font-bold text-white">银联</span>
        </div>
      </div>
    </div>
  );
}
