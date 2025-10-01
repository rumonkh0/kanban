export default function PersonCard({
  name,
  image,
  designation,
  id,
  start,
  end,
  date,
  returning,
  joining,
  award,
  active = false,
  lastLogin,
  className,
  children,
}) {
  // format date helper
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`min-w-[227px] h-[116px] p-4 rounded-lg bg-surface2 border-2 border-divider flex items-center gap-2 ${
        className || ""
      }`}
    >
      <img
        src={image || "/images/profile.png"}
        alt="profile"
        className="h-full aspect-square object-cover rounded-sm"
      />
      <div className="flex-1 flex flex-col gap-[1px]">
        <p className="typo-b2 pb-[1px]">{name}</p>
        <p className="typo-b3 text-text2">{designation}</p>
        {id && <p className="typo-b3 text-text2">ID: {id}</p>}
        {active ? (
          <p className="typo-b3 text-text2 flex gap-2 items-center">
            Last login:<span className="h-2 w-2 rounded-full bg-success"></span>
            Active
          </p>
        ) : lastLogin ? (
          <p className="typo-b3 text-text2">
            Last login: {formatDate(lastLogin)}
          </p>
        ) : null}
        {start && (
          <p className="typo-b3 text-text2">Start: {formatDate(start)}</p>
        )}
        {end && <p className="typo-b3 text-text2">End: {formatDate(end)}</p>}
        {date && <p className="typo-b3 text-text2">Date: {date}</p>}
        {returning && (
          <p className="typo-b3 text-text2">Returning: {returning}</p>
        )}
        {joining && <p className="typo-b3 text-text2">Joining: {joining}</p>}
        {award && <p className="typo-b3 text-text2">Award: {award}</p>}
        {children}
      </div>
    </div>
  );
}
