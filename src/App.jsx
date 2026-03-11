import { useState } from "react";

export default function App() {
  const [usdt, setUsdt] = useState("");
  const [discount, setDiscount] = useState(2);
  const [eur, setEur] = useState(null);

  const handleConvert = async () => {
    const amount = parseFloat(usdt);
    if (isNaN(amount)) return;

    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd,eur"
      );

      const data = await response.json();

      const usdtUsd = data.tether.usd;
      const usdtEur = data.tether.eur;

      // konvertimi
      const eurValue = amount * usdtEur;

      // zbritja
      const finalValue = eurValue * (1 - discount / 100);

      setEur(finalValue.toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">

      <h1 className="text-5xl font-bold mb-10 text-center">
        💶 USDT → EUR
      </h1>

      <div className="w-full max-w-sm flex flex-col gap-6">

        <input
          type="number"
          placeholder="Shuma në USDT"
          value={usdt}
          onChange={(e) => setUsdt(e.target.value)}
          className="w-full p-4 text-xl rounded-xl text-black"
        />

        <select
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value))}
          className="w-full p-4 text-xl rounded-xl text-black"
        >
          <option value={2}>2%</option>
          <option value={2.5}>2.5%</option>
          <option value={3}>3%</option>
          <option value={3.5}>3.5%</option>
        </select>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 p-4 rounded-xl text-xl"
        >
          Konverto
        </button>

        {eur && (
          <div className="text-center text-4xl font-bold text-green-400">
            {eur} €
          </div>
        )}

      </div>
    </div>
  );
}