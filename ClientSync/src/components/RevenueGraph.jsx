import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const dummyData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 6000 },
  { month: 'June', revenue:3400 },
  { month: 'Jul', revenue: 9300 },
  { month: 'Aug', revenue: 5600 },
  { month: 'Sept', revenue:6100 },
  { month: 'Oct', revenue: 6900 },
  { month: 'Nov', revenue: 7100 },
  { month: 'Dec', revenue: 8000 },
]

const RevenueGraph = () => {
  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#60A5FA" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueGraph
