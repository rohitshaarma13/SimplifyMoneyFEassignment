import axios from 'axios';
import Constants from 'expo-constants';
import { API_KEY } from "@env";

const USE_MOCK = true;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MOCK = {
  XAU: { name: 'Gold', symbol: 'XAU', price: 64500, currency: 'INR', previousClose: 64200, previousOpen: 64000, unit: 'per 10g (24K)' },
  XAG: { name: 'Silver', symbol: 'XAG', price: 760, currency: 'INR', previousClose: 755, previousOpen: 748, unit: 'per 1g (999)' },
  XPT: { name: 'Platinum', symbol: 'XPT', price: 2900, currency: 'INR', previousClose: 2885, previousOpen: 2870, unit: 'per 1g (950)' },
  XPD: { name: 'Palladium', symbol: 'XPD', price: 9632, currency: 'INR', previousClose: 9630, previousOpen: 9600, unit: 'per 1g (920)' },
};

const NAME_MAP = { XAU: 'Gold', XAG: 'Silver', XPT: 'Platinum', XPD: 'Palladium'};

export async function fetchMetal(symbol) {
  if (USE_MOCK) {
    await sleep(700 + Math.random() * 1200);
    const base = MOCK[symbol];
    const now = new Date();
    return { ...base, timestamp: now.toISOString(), date: now.toDateString() };
  }

  const apiKey = Constants?.expoConfig?.extra?.GOLDAPI_KEY;
  const url = `https://www.goldapi.io/api/XAU/INR/20250827`;
  const { data } = await axios.get(url, {
    headers: { 'x-access-token': API_KEY, 'Content-Type': 'application/json' },
  });

  const price = data?.price_gram_24k ?? data?.price_gram_999 ?? data?.price ?? data?.price_gram_22k ?? null;
  const timestampIso = data?.timestamp ? new Date(data.timestamp * 1000).toISOString() : new Date().toISOString();

  return {
    name: NAME_MAP[symbol] || symbol,
    symbol,
    price,
    previousClose: data?.prev_close_price ?? null,
    previousOpen: data?.open_price ?? null,
    unit: 'per gram',
    currency: data?.currency || 'INR',
    timestamp: timestampIso,
  };
}

// import axios from "axios";

// const NAME_MAP = {
//   XAU: "Gold",
//   XAG: "Silver",
//   XPT: "Platinum",
// };

// export async function fetchMetal(symbol) {
//   const url = `https://www.goldapi.io/api/${symbol}/INR/20250825`;

//   const { data } = await axios.get(url, {
//     headers: {
//       "x-access-token": "goldapi-rrsmev1h4rc-io", // replace with your actual key
//       "Content-Type": "application/json",
//     },
//   });

//   const price =
//     data?.price_gram_24k ??
//     data?.price_gram_999 ??
//     data?.price ??
//     data?.price_gram_22k ??
//     null;

//   const timestampIso = data?.timestamp
//     ? new Date(data.timestamp * 1000).toISOString()
//     : new Date().toISOString();

//   return {
//     name: NAME_MAP[symbol] || symbol,
//     symbol,
//     price,
//     previousClose: data?.prev_close_price ?? null,
//     previousOpen: data?.open_price ?? null,
//     unit: "per gram",
//     currency: data?.currency || "INR",
//     timestamp: timestampIso,
//   };
// }
