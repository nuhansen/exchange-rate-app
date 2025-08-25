"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  palm_oil_usd: number;
  idr_usd: number;
}

export default function CommodityFxDashboard() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    Papa.parse("data/palm_oil_vs_idr_monthly.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = result.data as any[];
        const cleaned: DataPoint[] = parsed.map((row) => ({
          date: row.date,
          palm_oil_usd: parseFloat(row.palm_oil_usd),
          idr_usd: parseFloat(row.idr_usd),
        }));
        // filter hanya data valid (bukan NaN)
        setData(cleaned.filter((d) => !isNaN(d.palm_oil_usd) && !isNaN(d.idr_usd)));
      },
    });
  }, []);

  return (
    <div>
      {/* Judul Dashboard */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📊 Commodity vs FX Dashboard
      </h1>

      {/* Container Chart */}
      <div className="w-full h-[500px] bg-white shadow-lg rounded-2xl p-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis
              yAxisId="left"
              label={{
                value: "Palm Oil (USD/mt)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "IDR per USD",
                angle: -90,
                position: "insideRight",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="palm_oil_usd"
              stroke="#16a34a" // green-600
              strokeWidth={2}
              dot={false}
              name="Palm Oil Price"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="idr_usd"
              stroke="#2563eb" // blue-600
              strokeWidth={2}
              dot={false}
              name="IDR/USD Rate"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
