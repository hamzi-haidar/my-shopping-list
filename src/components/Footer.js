export default function Footer({ onClearList, onSetSort, sort }) {
  return (
    <div className="footer">
      <div>
        <label>Sort by:</label>
        <select value={sort} onChange={onSetSort}>
          <option value="input">input time</option>
          <option value="highToLow">High to low price</option>
          <option value="lowToHigh">Low to high price</option>
        </select>
      </div>
      <button onClick={onClearList}>Clear list</button>
    </div>
  );
}
