"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { useEffect, useCallback } from "react";

interface Props {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export default function Lightbox({ src, alt, open, onClose }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  const handleDownload = async () => {
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `ai-studio-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(src, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#05050a]/90 backdrop-blur-xl p-6 sm:p-12"
        >
          {/* Controls */}
          <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.1] transition-all text-[12px] font-medium backdrop-blur-sm border border-white/[0.06]"
            >
              <Download className="w-3.5 h-3.5" />
              Save
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(src, "_blank");
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.1] transition-all text-[12px] font-medium backdrop-blur-sm border border-white/[0.06]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.1] transition-all backdrop-blur-sm border border-white/[0.06]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <motion.img
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <span className="text-[11px] text-white/20 font-medium">
              Press Esc to close
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
