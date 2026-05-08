"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "+264813404364";

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-72 rounded-2xl border border-[#dce9ec] bg-white p-5 shadow-xl"
          >
            <p className="text-sm font-semibold text-[#0d2233]">Chat with Dariva.co</p>
            <p className="mt-2 text-xs leading-5 text-[#5e7384]">
              Questions about the programme, applications, or partnerships? Reach us on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
            >
              <MessageCircle size={16} />
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1ebe57] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );
}
