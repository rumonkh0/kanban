export default function MetricCard({ title, growth, value, color, desc }) {
  const formattedGrowth = growth >= 0 ? `+${growth}%` : `${growth}%`;
  return (
    <div className="min-w-[293px] h-[116px] p-4 rounded-lg bg-surface2 border-2 border-divider flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="typo-b2 text-text">{title}</div>
        {growth && (
          <div
            className={` p-1 rounded-sm typo-b3 ${
              growth >= 0
                ? "bg-[#8FC951]/20 text-[#8FC951]"
                : "bg-[#FE4E4D]/20 text-brand"
            } `}
          >
            {formattedGrowth}
          </div>
        )}
      </div>
      <div
        className={`typo-h3 flex items-end gap-1 ${
          color ? "text-brand" : "text-text"
        }`}
      >
        {value}
        <p className="typo-b3 text-text2 pb-1"> {desc}</p>
      </div>
    </div>
  );
}
