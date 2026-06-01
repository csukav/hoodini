"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SizeData {
  size: string;
  vall: string; // cm
  chest: string; // cm
  length: string; // cm
  ujjhossz: string; // cm
}

const DEFAULT_SIZE_DATA: SizeData[] = [
  { size: "S", vall: "46", chest: "110", length: "70", ujjhossz: "65" },
  { size: "M", vall: "48", chest: "114", length: "72", ujjhossz: "66" },
  { size: "L", vall: "50", chest: "118", length: "74", ujjhossz: "67" },
  { size: "XL", vall: "52", chest: "122", length: "76", ujjhossz: "68" },
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
                  Vállszélesség (cm)
                </th>
                <th className="text-left font-semibold text-stone-950 py-2">
                  Mellbőség (cm)
                </th>
                <th className="text-left font-semibold text-stone-950 py-2">
                  Hossz (cm)
                </th>
                <th className="text-left font-semibold text-stone-950 py-2">
                  Ujjhossz (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row) => (
                <tr key={row.size} className="border-b border-stone-100">
                  <td className="py-2 text-stone-950 font-medium">
                    {row.size}
                  </td>
                  <td className="py-2 text-stone-600">{row.vall}</td>
                  <td className="py-2 text-stone-600">{row.chest}</td>
                  <td className="py-2 text-stone-600">{row.length}</td>
                  <td className="py-2 text-stone-600">{row.ujjhossz}</td>
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
