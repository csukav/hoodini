"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SizeData {
  size: string;
  chest: string; // cm
  length: string; // cm
}

const DEFAULT_SIZE_DATA: SizeData[] = [
  { size: "XS", chest: "88", length: "68" },
  { size: "S", chest: "92", length: "70" },
  { size: "M", chest: "96", length: "72" },
  { size: "L", chest: "100", length: "74" },
  { size: "XL", chest: "104", length: "76" },
];

interface SizeChartProps {
  sizeData?: SizeData[];
}

export default function SizeChart({
  sizeData = DEFAULT_SIZE_DATA,
}: SizeChartProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-stone-200 text-left text-sm font-medium text-stone-950 hover:border-stone-900 transition-colors"
        aria-expanded={isOpen}
        aria-label="Mérettáblázat megnyitása"
      >
        <span>Mérettáblázat</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="border border-t-0 border-stone-200 p-4 bg-stone-50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left font-semibold text-stone-950 py-2">
                  Méret
                </th>
                <th className="text-left font-semibold text-stone-950 py-2">
                  Mellbőség (cm)
                </th>
                <th className="text-left font-semibold text-stone-950 py-2">
                  Hossz (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row) => (
                <tr key={row.size} className="border-b border-stone-100">
                  <td className="py-2 text-stone-950 font-medium">
                    {row.size}
                  </td>
                  <td className="py-2 text-stone-600">{row.chest}</td>
                  <td className="py-2 text-stone-600">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-stone-500 mt-3">
            💡 Tipp: Mérd meg kedvenc holmid és hasonlítsd az adatokkal!
          </p>
        </div>
      )}
    </div>
  );
}
