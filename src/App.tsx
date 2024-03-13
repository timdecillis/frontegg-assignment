import { useEffect } from "react";
import {
  useAuth,
  useLoginWithRedirect,
  ContextHolder,
  AdminPortal,
  useAuthActions,
} from "@frontegg/react";

import "./App.css";
const axios = require("axios");
function App() {
  let { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  const { switchTenant } = useAuthActions();

  const handleSwitchTenant = (ID: string) => {
    switchTenant({ tenantId: ID });
    window.location.reload();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    window.location.href = `http://localhost:3000/account/logout`;
  };

  const handleClick = () => {
    AdminPortal.show();
  };

  const handleAPI = () => {};

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
              <select onChange={(e) => handleSwitchTenant(e.target.value)}>
                {user?.tenantIds.map((ID) => (
                  <option key={ID} value={ID}>
                    {ID}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button onClick={handleAPI}>Make API Request</button>
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
