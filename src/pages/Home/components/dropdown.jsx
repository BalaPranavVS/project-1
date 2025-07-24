function Dropdown(props) {
  
  return(
  <div>
  <select value={props.value}onChange={props.onChange}>
  <option value="">-- Choose --</option>
  {props.options.map(opt => (
    <option key={opt} value={opt.toLowerCase()}>{opt}</option>
  ))}
</select>
</ div>)
}

export default Dropdown;