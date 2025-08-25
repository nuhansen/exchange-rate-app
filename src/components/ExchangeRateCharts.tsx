"use client";

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card"; // pakai shadcn card atau bisa div biasa

// Types
type RatePoint = {
  date: string;
  rate: number;
};

type LatestRate = {
  base: string;
  target: string;
  date: string;
  rate: number;
};

// Component
const ExchangeRateCharts: React.FC = () => {
  const [latest, setLatest] = useState<LatestRate | null>(null);
  const [threeMonths, setThreeMonths] = useState<RatePoint[]>([]);
  const [threeYears, setThreeYears] = useState<RatePoint[]>([]);

  // Load local JSON (dummy data)
  useEffect(() => {
    const loadData = async () => {
      const latestData: LatestRate = await fetch("/data/latest.json").then(res => res.json());
      const threeMonthsData = await fetch("/data/3months.json").then(res => res.json());
      const threeYearsData = await fetch("/data/3years.json").then(res => res.json());

      // Convert rates object → array
      const mapRates = (data: any): RatePoint[] =>
        Object.entries(data.rates).map(([date, value]: any) => ({
          date,
          rate: value.USD
        }));

      setLatest(latestData);
      setThreeMonths(mapRates(threeMonthsData));
      setThreeYears(mapRates(threeYearsData));
    };

    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Latest */}
      <Card className="p-4">
        <h2 className="text-xl font-bold">Kurs Hari Ini</h2>
        {latest ? (
          <p>
            {latest.base} → {latest.target}: <span className="font-mono">{latest.rate}</span> ( {latest.date} )
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </Card>

      {/* 3 Months Chart */}
      <Card className="p-4 col-span-1 md:col-span-2">
        <h2 className="text-xl font-bold mb-2">Tren 3 Bulan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={threeMonths}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["dataMin - 0.000005", "dataMax + 0.000005"]} />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* 3 Years Chart */}
      <Card className="p-4 col-span-1 md:col-span-2">
        <h2 className="text-xl font-bold mb-2">Tren 3 Tahun</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={threeYears}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["dataMin - 0.00001", "dataMax + 0.00001"]} />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#82ca9d" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default ExchangeRateCharts;
