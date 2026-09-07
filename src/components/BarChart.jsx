export default function BarChart({ data = [], label = 'Count' }) {
  const max = Math.max(...data.map(x => x.count), 1);
  return <div className="bar-chart" aria-label={label}>{data.map(item => <div className="chart-row" key={item.name}><span>{item.name}</span><div className="bar-track"><div className="bar" style={{ width: `${item.count / max * 100}%` }} /></div><b>{item.count}</b></div>)}</div>;
}
