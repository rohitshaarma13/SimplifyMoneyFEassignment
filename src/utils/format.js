export const formatINR = (value) => {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
  } catch (e) {
    return `₹${Number(value).toFixed(2)}`;
  }
};

export const formatTimestamp = (isoString) => {
  const d = new Date(isoString);
  const date = d.toLocaleDateString('en-IN');
  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  return { date, time };
};
