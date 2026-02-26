import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function PriceChart({ data=[] }) {
  return (
    <LineChart width={500} height={250} data={data}>
      <Line type="monotone" dataKey="price" stroke="#00b894" />
      <XAxis dataKey="time" hide />
      <YAxis domain={['auto', 'auto']} />
      <Tooltip />
    </LineChart>
  );
}