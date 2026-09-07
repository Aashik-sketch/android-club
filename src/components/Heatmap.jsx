export default function Heatmap({ daily = [] }) {
  const max = Math.max(...daily.map(x => x.count), 1);
  return <div className="heatmap" aria-label="Daily message activity">{daily.slice(0, 84).map(item => <div className="heat-cell" key={item.day} title={`${item.day}: ${item.count} messages`} style={{ opacity: .2 + item.count / max * .8 }} />)}</div>;
}
