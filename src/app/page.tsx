import CommodityFxDashboard from "@/components/CommodityFxDashboard";
import ExchangeRateCharts from "@/components/ExchangeRateCharts";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="w-4/5">
      <h1 className="text-2xl font-bold mb-4">📊 Exchange Rate Dashboard</h1>
      <ExchangeRateCharts />
      <br /><br />
      <CommodityFxDashboard />
      </div>
    </main>
  );
}
