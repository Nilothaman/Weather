import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButton() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div />;

  return (
    <div style={{ position: "absolute", right: 16, top: 16 }}>
      {isAuthenticated ? (
        <>
          <span style={{ marginRight: 10 }}>Hi, {user?.name || user?.email}</span>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </div>
  );
}
