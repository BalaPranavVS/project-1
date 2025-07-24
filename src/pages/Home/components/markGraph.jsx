import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Gauge({ label, value }) {
  return (
    <div style={{ width: 200, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ height: 150, overflow: 'hidden' }}>
        <CircularProgressbarWithChildren
          value={value}
          maxValue={100}
          circleRatio={0.5}
          styles={buildStyles({
            rotation: 0.75, // makes the semi-circle open upward
            strokeLinecap: 'round',
            trailColor: '#eee',
            pathColor: '#3e98c7',
            textColor: '#000',
          })}
        >
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '10px',
          }}>
            {value}%
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div style={{ marginTop: '8px', fontSize: '18px', color: '#555' }}>
        {label.toUpperCase()}
      </div>
    </div>
  );
}

export default Gauge;
