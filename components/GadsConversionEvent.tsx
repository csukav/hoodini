"use client";

import { useEffect } from "react";

interface Props {
  value?: number;
  currency?: string;
  transactionId?: string;
}

declare function gtag(...args: unknown[]): void;

export default function GadsConversionEvent({
  value,
  currency = "HUF",
  transactionId,
}: Props) {
  useEffect(() => {
    if (typeof gtag !== "undefined") {
      gtag("event", "conversion", {
        send_to: "AW-18115939358/ySUcCJH18aEcEJ6Yrb5D",
        value,
        currency,
        transaction_id: transactionId,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
