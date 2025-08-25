import ExchangeRateCharts from "@/components/ExchangeRateCharts";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Exchange Rate Dashboard</h1>
      <ExchangeRateCharts />
    </main>
  );
}
