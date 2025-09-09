export default function Icon({
  name,
  size = 20,
  onClick,
  children,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center ${className}`}
    >
      <img src={`/icons/${name}.svg`} alt={name} width={size} height={size} />
      {children}
    </div>
  );
}
