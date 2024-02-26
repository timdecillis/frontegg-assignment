import "./App.css";
import { useEffect } from "react";
import {
  useAuth,
  useLoginWithRedirect,
  ContextHolder,
  AdminPortal,
  useAuthActions,
} from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  const { switchTenant } = useAuthActions();

  const handleSwitchTenant = () => {
    switchTenant({ tenantId: "new-tenant-id" });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handleClick = () => {
    AdminPortal.show();
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <div>
            <img
              src={user?.profilePictureUrl ?? "../public/logo192.png"}
              alt={user?.name}
            />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user?.accessToken)}>
              What is my access token?
            </button>
          </div>
          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
          <div>
            <button onClick={handleClick}>Settings</button>
          </div>
          <div>
            <div>Select Active Tenant</div>
            <div>
              <select onChange={handleSwitchTenant}>
                {user?.tenantIds.map((ID) => (
                  <option value={ID}>{ID}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
