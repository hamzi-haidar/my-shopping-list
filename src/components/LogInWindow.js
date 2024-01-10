export default function LogInWindow({
  onLogIn,
  user,
  balance,
  setUser,
  setBalance,
}) {
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={onLogIn}>
        <input
          value={user}
          type="text"
          placeholder="Enter name"
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <input
          value={balance}
          type="number"
          placeholder="Enter balance"
          onChange={(e) => setBalance(e.target.value)}
        ></input>
        <button>Log in</button>
      </form>
    </div>
  );
}
