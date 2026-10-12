export const formatINR = (n: number): string => {
  if (!isFinite(n)) return "₹0";
  return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
};

export const formatCrLakh = (n: number): string => {
  if (!isFinite(n) || n <= 0) return "—";
  if (n >= 1_00_00_000) {
    return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (n >= 1_00_000) {
    return `₹${(n / 1_00_000).toFixed(2)} Lakh`;
  }
  return formatINR(n);
};
