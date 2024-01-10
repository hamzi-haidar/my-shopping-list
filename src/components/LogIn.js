export default function LogIn({
  onLogIn,
  user,
  balance,
  setUser,
  setBalance,
  children,
}) {
  return (
    <div>
      <div className="login-page">{children}</div>
    </div>
  );
}
