export function formatThaiCurrency(amount: number | null | undefined) {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return "-";
  }

  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}
