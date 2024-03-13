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

function App() {

  let { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const { switchTenant } = useAuthActions();

  const [APIName, setAPIName] = useState('');

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
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInRva2VuSXNzdWVyIjoiZnJvbnRlZ2cifQ.eyJzY29wZXMiOltdLCJ0eXBlIjoidmVuZG9yIiwidmVuZG9ySWQiOiIzNzJjYjc3ZC01MmVmLTQwZGMtOGY2Yy02YzZlMTI3YTY2OGUiLCJpYXQiOjE3MTAzNDk4NzcsImV4cCI6MTcxMDQzNjI3N30.az1mjmPyzRWz8xj0PAIrsqcPY9S-oZNxw0kGoQ9ALnIhvtnuNUcpdUPhyJcxlmuIknR99fyqXV5RQn0SdMXxaVq247kwy-ozPR_kYSpMuNt8kWkRtjDnTAeHUdGWogAVItOnjESK9SYDT5xRvXLGZIB8oVt4S_SkHmgIoURHkYwWHy2eqI9dD6JhoQm3Y1Zx5eWSHbZXNC801M68h7ZWUWFznOe71sO8q9AAsYYAMDamTgm0cYDE6_7oS-lZv-2HqD-fuzOmRoz9HW84EVOLgDWnnNMa0BtMxXjJ4cae9BJm3yVXHrzrjHAX6EUMMg1EjItNYKij4WY90q0KKxFp9A",
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
          <div>
            <button onClick={handleAPI}>Make API Request</button>
            {APIName && <div>{APIName}</div>}
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
