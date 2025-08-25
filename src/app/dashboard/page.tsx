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

export default function Dashboard() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    Papa.parse("data/palm_oil_vs_idr_monthly.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const parsed = result.data as any[];
        const cleaned: DataPoint[] = parsed.map((row) => ({
          date: row.date,
          palm_oil_usd: parseFloat(row.palm_oil_usd),
          idr_usd: parseFloat(row.idr_usd),
        }));
        setData(cleaned.filter((d) => !isNaN(d.palm_oil_usd) && !isNaN(d.idr_usd)));
      },
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard Harga & Kurs</h1>

      <div className="w-full h-96 bg-white shadow rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" label={{ value: "Palm Oil (USD/mt)", angle: -90, position: "insideLeft" }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: "IDR per USD", angle: -90, position: "insideRight" }} />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="palm_oil_usd"
              stroke="#82ca9d"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="idr_usd"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
