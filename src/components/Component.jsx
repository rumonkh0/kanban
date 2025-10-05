import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const Icon = ({ name, size = 20, children, className = "" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <img src={`/icons/${name}.svg`} alt={name} width={size} height={size} />
    {children}
  </div>
);

export const RedButton = ({
  children,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={` py-2 bg-brand text-text rounded-sm hover:bg-brand/80 transition-colors duration-200 flex items-center justify-center cursor-pointer ${
        className || "px-4"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const RedBorderButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border border-brand text-brand rounded-sm hover:bg-brand/10 transition-colors duration-200 flex items-center justify-center cursor-pointer ${
        className || "px-4"
      }`}
    >
      {children}
    </button>
  );
};

export const Back = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className="cursor-pointer">
      {children}
    </div>
  );
};

export const FormatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const ChartHeader = ({ primaryLabel, keyValue, secondaryLabel }) => {
  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="typo-b2">{primaryLabel}:</div>
      <div className="typo-h3 flex items-baseline gap-1">
        {keyValue} <p className="typo-b3">{secondaryLabel}</p>
      </div>
    </div>
  );
};

export const Table = ({ children }) => (
  <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2">
    <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
      {children}
    </table>
  </div>
);

export const Thead = ({ children }) => (
  <thead className="table-header-group after:content-[''] after:block after:h-1">
    {children}
  </thead>
);

export const Td = ({ data, className, children }) => (
  <td
    className={`min-w-30 w-auto typo-b2 text-text py-2 px-2 md:px-4 bg-divider ${
      className || ""
    }`}
  >
    {data} {children}
  </td>
);
export const Th = ({ title }) => (
  <th className="typo-b3 text-left min-w-fit text-text2 py-3 px-2 md:px-4">
    {title}
  </th>
);
export const ImageName = ({ image, username, designation }) => (
  <div className="flex min-w-[150px] w-auto items-center gap-2">
    <img
      src={image}
      alt="image"
      className="w-8 h-8 rounded-full object-cover"
    />
    <div className="flex flex-col justify-between min-w-fit">
      <span className="whitespace-nowrap min-w-fit">{username}</span>
      {designation && (
        <p className="typo-b3 text-text2 whitespace-nowrap">{designation}</p>
      )}
    </div>
  </div>
);
// export const ImageName = ({ image, username, designation }) => (
//   <div className="flex items-center gap-2">
//     <img
//       src={image}
//       alt="image"
//       className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
//     />
//     <div className="flex flex-col justify-between">
//       <span className="truncate max-w-[100px] md:max-w-none">{username}</span>
//       {designation && <p className="typo-b3 text-text2">{designation}</p>}
//     </div>
//   </div>
// );
export const FormField = ({
  label,
  required,
  children,
  gap = 2,
  className,
}) => (
  <div className={`flex flex-col gap-${gap} ${className || ""}`}>
    <label className="typo-b2 text-text2">
      {label} {required && <span className="text-brand">*</span>}
    </label>
    {children}
  </div>
);

export const Input = ({
  type = "text",
  placeholder,
  className,
  required,
  value,
  onChange,
  ...rest
}) => (
  <input
    type={type}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={(e) => onChange && onChange(e.target.value)}
    className={`w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3 ${
      className || ""
    }`}
    {...rest}
  />
);

export const InputMoney = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  required,
  disabled = false,
}) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
      $
    </span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      required={required}
      className={`w-full h-12 bg-surface2 border border-divider rounded-lg px-4 pl-6 focus:outline-none focus:ring-2 focus:ring-brand typo-b3 ${
        className || ""
      }`}
      disabled={disabled}
    />
  </div>
);

export const Dropdownd = ({ options, value, onChange, placeholder }) => {
  const normalizeOptions = (opts) => {
    return opts.map((opt, i) => {
      if (typeof opt === "string") {
        return { value: opt, label: opt };
      }
      if (opt.value && opt.label !== undefined) {
        return opt; // already { value, label }
      }
      if (opt.value && opt.component) {
        return { value: opt.value, label: opt.component };
      }
      return { value: i, label: opt }; // fallback
    });
  };

  const normalized = normalizeOptions(options);
  return (
    <div className="relative w-full">
      <select
        className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {normalized.map((opt, i) => (
          <option key={i} value={opt.value}>
            {typeof opt.label === "string" ? opt.label : "Custom"}
          </option>
        ))}
      </select>
      <Icon
        name="arrow"
        size={24}
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
};

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
  allowClear = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Normalize options
  const normalized = options.map((opt, i) => {
    if (typeof opt === "string") return { value: opt, label: opt };
    if (opt.value && opt.label) return opt;
    if (opt.value && opt.component)
      return { value: opt.value, label: opt.component };
    return { value: i, label: opt };
  });

  const selected = normalized.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`flex-1 px-4 border flex justify-between items-center typo-b3 focus:outline-none focus:ring-2 focus:ring-brand cursor-pointer ${
          className || "w-full h-12 bg-surface2 rounded-lg border-divider"
        }`}
      >
        {selected ? selected.label : placeholder || "Select..."}
        <Icon name="arrow" className="ml-2" size={20} />
      </button>

      {!disabled && open && (
        <div className="absolute mt-1 w-full bg-surface2 border border-divider rounded-lg shadow-lg z-60 max-h-60 overflow-auto">
          {/* Normal options */}
          {normalized.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-brand flex justify-center items-center gap-2"
            >
              {opt.label}
            </div>
          ))}

          {/* Clear option */}
          {allowClear && (
            <div
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer text-red-500 hover:bg-red-100 flex justify-center items-center gap-2"
            >
              ✖ Clear
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const FilterDropdown = ({
  label,
  options = [], // array of strings or { value, label }
  value = null,
  onSelect,
  className,
  allowClear = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Normalize options: strings → { value, label }
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : label;

  const handleSelect = (option) => {
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  };

  const handleClear = () => {
    setIsOpen(false);
    if (onSelect) onSelect(null);
  };

  return (
    <div
      className={`relative min-w-36 px-2 py-1 border border-divider flex justify-between items-center rounded-sm cursor-pointer bg-surface ${
        className || ""
      }`}
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
    >
      <div className="flex-1 typo-b3 text-center">{displayLabel}</div>
      <Icon
        name="arrow"
        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
      />

      {isOpen && (
        <ul className="absolute top-full left-0 w-full mt-1 bg-surface2 border border-divider rounded-sm shadow-md z-50 overflow-hidden">
          {normalizedOptions.map((option, idx) => (
            <li
              key={idx}
              className="px-2 py-1 hover:bg-brand typo-b3 text-center"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
            >
              {option.label}
            </li>
          ))}

          {allowClear && value !== null && (
            <li
              className="px-2 py-1 hover:bg-red-100 typo-b3 text-center text-red-500 border-t border-divider"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              Clear Filter
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export const ToggleTabs = ({
  options = ["Week", "Month", "Year"],
  defaultValue = "Week",
  onChange,
  className = "",
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (val) => {
    setSelected(val);
    if (onChange) onChange(val);
  };

  return (
    // <div
    //   className={`bg-divider h-[30px] flex items-center rounded-sm typo-b3 cursor-pointer text-text2 ${className}`}
    // >
    //   {options.map((val) => (
    //     <div
    //       key={val}
    //       onClick={() => handleSelect(val)}
    //       className={`px-2 py-1.5 rounded-sm transition-colors ${
    //         selected === val ? "bg-brand text-white" : "text-text2"
    //       }`}
    //     >
    //       {val}
    //     </div>
    //   ))}
    // </div>
    <div
      className={`bg-divider h-[30px] flex items-center rounded-sm typo-b3 cursor-pointer text-text2 ${className}`}
    >
      {options.map((val) => (
        <div
          key={val}
          onClick={() => handleSelect(val)}
          className={`px-1.5 md:px-2 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
            selected === val ? "bg-brand text-white" : "text-text2"
          }`}
        >
          {val}
        </div>
      ))}
    </div>
  );
};

export const BinaryToggle = ({
  value,
  onChange,
  name = "binary-toggle",
  trueLabel = "Yes",
  falseLabel = "No",
  className = "",
}) => {
  // Define the options for mapping
  const options = [
    { val: true, label: trueLabel },
    { val: false, label: falseLabel },
  ];

  return (
    <div className={`flex typo-cta ${className}`}>
      {options.map((option, idx) => (
        <label
          key={option.val.toString()}
          className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
            value === option.val
              ? "bg-brand text-text"
              : "bg-surface2 text-text2"
          } ${idx === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
          // Ensure the click handler is on the label
          onClick={() => onChange(option.val)}
        >
          {/* Hidden native radio input for form accessibility/semantics */}
          <input
            type="radio"
            name={name}
            value={option.val.toString()}
            checked={value === option.val}
            // We use the parent label's onClick for cleaner state handling
            onChange={() => {}}
            className="hidden"
            readOnly
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export const MultiSelect = ({
  label = "Payment Method",
  options = [],
  value = [], // array of selected values
  onChange = () => {},
  placeholder = "Select...",
  className,
  height,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function onDocDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  // Normalize options like in Dropdownd
  const normalizedOptions = options.map((opt, i) => {
    if (typeof opt === "string") return { value: opt, label: opt };
    if (opt.value && opt.label !== undefined) return opt;
    if (opt.value && opt.component)
      return { value: opt.value, label: opt.component };
    return { value: i, label: opt }; // fallback
  });

  const toggle = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`bg-surface1 rounded-xl flex flex-col gap-2 relative ${
        className || ""
      }`}
    >
      {/* Label */}
      {label && <label className="typo-b2 text-text2">{label}</label>}

      {/* Display selected chips */}
      <div
        className={`relative bg-surface2 border border-divider rounded-lg px-4 flex flex-wrap items-center gap-2 cursor-pointer ${
          height || "h-12"
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        {value.length === 0 && (
          <span className="typo-b3 text-text2">{placeholder}</span>
        )}

        {value.map((val) => {
          const opt = normalizedOptions.find((o) => o.value === val);
          return (
            <div
              key={val}
              className="flex gap-1 rounded-lg border border-divider bg-surface h-auto px-2 py-1 items-center"
            >
              <span className="typo-b3">{opt?.label || val}</span>
              <button
                type="button"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((v) => v !== val));
                }}
                aria-label={`Remove ${opt?.label || val}`}
                title={`Remove ${opt?.label || val}`}
              >
                <Icon name="close" className="w-4 h-4 text-text2" />
              </button>
            </div>
          );
        })}

        {/* Right chevron */}
        <Icon
          name="arrow"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        />
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-surface2 border border-divider rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
          {normalizedOptions.map((opt) => {
            const selected = value.includes(opt.value);
            return (
              <div
                key={opt.value}
                className={`px-4 py-2 cursor-pointer hover:bg-divider ${
                  selected ? "bg-divider/60" : ""
                }`}
                onClick={() => {
                  toggle(opt.value);
                  setOpen(false);
                }}
              >
                {typeof opt.label === "string" ? opt.label : "Custom"}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
