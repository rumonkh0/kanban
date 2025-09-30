import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex  justify-center p-4">
      <div
        ref={modalRef}
        className="shadow-xl z-50 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto mt-20 md:mt-30 lg:mt-40"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
