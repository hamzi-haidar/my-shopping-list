export default function TotalAndBalance({ balance, total, onSetClosed }) {
  const remaining = balance - total;

  return (
    <div className="total-container" onClick={onSetClosed}>
      <div className="arrow"></div>
      {total && <p>your total is ${total}</p>}
      <p className="balance">your balance is ${balance}</p>
      {total && (
        <p
          style={{
            color:
              remaining > 0 ? "#57cc99" : remaining === 0 ? "yellow" : "red",
          }}
        >
          {remaining > 0
            ? "You'll still have"
            : remaining === 0
            ? "you'll have"
            : "You still need"}{" "}
          ${Math.abs(remaining)}
        </p>
      )}
    </div>
  );
}
