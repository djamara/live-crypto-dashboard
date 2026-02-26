import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCoinDetail } from "../services/coinservice";
import Loading from "../components/layout/Loading";
import PriceChart from "../components/PriceChart";

export default function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

        let isMounted = true;

        const fetchCoin = async () => {
        try {
            setLoading(true);
            const data = await getCoinDetail(id);
            if (isMounted) setCoin(data);
            setError("");
        } catch (err) {
            console.error(err);
            if (isMounted) setError("Failed to fetch coin details.");
        } finally {
            if (isMounted) setLoading(false);
        }
        };

        fetchCoin();

        return () => {
        isMounted = false;
        };

  }, [id]);

  //when loading return the loading component
  if (loading) return <Loading />;

  //if an errror occured
  if (error) return <p className="text-red-500">{error}</p>;

  //if we do not find the coin data
  if (!coin) return null;

  // Transform sparkline data for chart
  const chartData = coin.market_data.sparkline_7d.price.map((p:number, i:number) => ({
    time: i,
    price: p,
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <div className="flex flex-col items-center mb-6">
        <img src={coin.image.large} alt={coin.name} className="w-20 h-20 mb-2" />
        <h1 className="text-3xl font-bold">{coin.name}</h1>
        <p className="text-xl">Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p
          className={
            coin.market_data.price_change_percentage_24h >= 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Price Chart (7d Sparkline)</h2>
        <PriceChart data={chartData} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="border p-4 rounded">Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</div>
        <div className="border p-4 rounded">Total Volume: ${coin.market_data.total_volume.usd.toLocaleString()}</div>
      </div>
    </div>
  );
}