import { useEffect, useState } from "react";
import {
  useAuth,
  useLoginWithRedirect,
  ContextHolder,
  AdminPortal,
  useAuthActions,
} from "@frontegg/react";

import "./App.css";
import axios from "axios";

const token = process.env.BEARER_TOKEN;

function App() {
  let { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const { switchTenant } = useAuthActions();

  const [APIName, setAPIName] = useState("");

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

  const handleAPI = () => {
    const options = {
      method: "GET",
      url: "https://api.frontegg.com/identity/resources/vendor-only/users/v1/170d09a9-a6d3-4b29-a983-d889a754041d",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response: any) {
        const { name } = response.data;
        setAPIName(name);
        console.log(response.data);
      })
      .catch(function (error: any) {
        console.error(error);
      });
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
              <select onChange={(e) => handleSwitchTenant(e.target.value)}>
                {user?.tenantIds.map((ID) => (
                  <option key={ID} value={ID}>
                    {ID}
                  </option>
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
