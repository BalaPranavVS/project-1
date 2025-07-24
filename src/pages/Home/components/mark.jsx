import Gauge from "./markGraph";
function Marks(props){
    let data={ react: 70,js: 40 }
    return (
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {Object.entries(data).map(([key, value]) => (
        <Gauge key={key} label={key} value={value} />
      ))}
    </div>
)};

export default Marks;