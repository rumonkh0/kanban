"use client";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const Icon = ({ name, size = 20, children, className = "" }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <img src={`/icons/${name}.svg`} alt={name} width={size} height={size} />
    {children}
  </div>
);

export const RedButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-brand text-text rounded-sm hover:bg-brand/80 transition-colors duration-200 flex items-center justify-center cursor-pointer ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
};

export const RedBorderButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-brand text-brand rounded-sm hover:bg-brand/10 transition-colors duration-200 flex items-center justify-center cursor-pointer"
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
  <td className={`min-w-30 typo-b2 py-2 px-4 bg-divider ${className || ""}`}>
    {data} {children}
  </td>
);
export const Th = ({ title }) => (
  <th className="typo-b3 text-left min-w-fit text-text2 py-3 px-4">{title}</th>
);
export const ImageName = ({ image, username, designation }) => (
  <div className="flex items-center gap-2">
    <img
      src={image}
      alt="image"
      className="w-8 h-8 rounded-full object-cover"
    />
    <div className="flex flex-col justify-between">
      <span>{username}</span>
      {designation && <p className="typo-b3 text-text2">{designation}</p>}
    </div>
  </div>
);

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
}) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
      $
    </span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full h-12 bg-surface2 border border-divider rounded-lg px-4 pl-6 focus:outline-none focus:ring-2 focus:ring-brand typo-b3 ${
        className || ""
      }`}
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
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-12 px-4 bg-surface2 border border-divider rounded-lg flex justify-between items-center typo-b3 focus:outline-none focus:ring-2 focus:ring-brand ${
          className || ""
        }`}
      >
        {selected ? selected.label : placeholder || "Select..."}
        <Icon name="arrow" className="ml-2" size={20} />
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-surface2 border border-divider rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
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
        </div>
      )}
    </div>
  );
};

export const MultiSelect = ({
  label = "Payment Method",
  options = ["Zelle", "PayPal", "Bank Transfer", "Cash"], // array of strings
  value = [], // array of selected strings
  onChange = () => {},
  placeholder = "Select...",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function onDocDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

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
      className="bg-surface1 rounded-xl flex flex-col gap-2 relative"
    >
      {/* Label */}
      {label && <label className="typo-b2 text-text2">{label}</label>}

      {/* Display (chips + arrow) */}
      <div
        className={`relative bg-surface2 h-12 border border-divider rounded-lg px-4 flex flex-wrap items-center gap-2 cursor-pointer ${
          className || ""
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        {value.length === 0 && (
          <span className="typo-b3 text-text2">{placeholder}</span>
        )}

        {value.map((val) => (
          <div
            key={val}
            className="flex gap-1 rounded-lg border border-divider bg-surface h-auto px-2 py-1 items-center"
          >
            <span className="typo-b3">{val}</span>
            {/* wrap Icon in a button so we don't depend on Icon handling onClick */}
            <button
              type="button"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onChange(value.filter((v) => v !== val));
              }}
              aria-label={`Remove ${val}`}
              title={`Remove ${val}`}
            >
              <Icon name="close" className="w-4 h-4 text-text2" />
            </button>
          </div>
        ))}

        {/* Right chevron, non-interactive so clicks go to container */}
        <Icon
          name="arrow"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-surface2 border border-divider rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
          {options.map((opt) => {
            const selected = value.includes(opt);
            return (
              <div
                key={opt}
                className={`px-4 py-2 cursor-pointer hover:bg-divider ${
                  selected ? "bg-divider/60" : ""
                }`}
                onClick={() => {
                  toggle(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
