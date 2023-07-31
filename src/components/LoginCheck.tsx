import { createEffect, createSignal, onMount } from "solid-js";
import { getAgentInfo } from "../api/info";

interface IAgent {
  accountId: string;
  credits: number;
  headquarters: string;
  startingFaction: string;
  symbol: string;
}

function LoginCheck() {
  const [token, setToken] = createSignal("");
  const [usingStorage, setUsingStorage] = createSignal(false);
  const [agentInfo, setAgentInfo] = createSignal({} as IAgent);

  const handleTokenChange = async (newToken: string) => {
    try {
      const agentInfoResponse = await getAgentInfo({ token: newToken });
      console.log(
        "Handle token change: Agent Info Response :>>",
        agentInfoResponse
      );
      if (agentInfoResponse?.data?.symbol) {
        setAgentInfo(agentInfoResponse.data);
        console.log("agentInfo()", agentInfo());
      }

      setUsingStorage(true);
    } catch (e) {
      console.error(e);
    }
  };

  onMount(async () => {
    console.log("Mounting...");
    if (!token()) {
      const existingToken = localStorage.getItem("spaceTradersToken") || "";

      if (existingToken) {
        console.log("Found token in storage");
        setUsingStorage(true);
        setToken(existingToken);
      }
    }
  });

  createEffect(
    (prev) => {
      if (prev !== token()) {
        console.log("New token found, fetching agent info...");
        return handleTokenChange(token());
      }
    },
    token(),
    { render: true }
  );

  const logout = () => {
    setToken("");
    localStorage.removeItem("spaceTradersToken");
  };

  return (
    <>
      {!token() ? (
        <>
          <h2>Enter your token to get started</h2>
          {/* Create form with one input for a string, the submit button should invoke setToken with the string value from the input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const token = e.currentTarget.token.value;
              localStorage.setItem("spaceTradersToken", token);
              setToken(token);
              setUsingStorage(true);
            }}
          >
            <label>
              Token:
              <input type="text" name="token" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <>
          <h1>Welcome to Space Traders UI</h1>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://spacetraders.io"
          >
            Space Traders Docs
          </a>

          <div>
            {agentInfo().symbol && usingStorage() && (
              <>
                <p>Logged in via localStorage</p>
                <p>
                  Logged in as: <strong>{agentInfo().symbol}</strong>
                </p>
                <div>
                  <p>Headquarters: {agentInfo().headquarters}</p>
                  <p>Starting Faction: {agentInfo().startingFaction}</p>
                  <p>Credits: {agentInfo().credits}</p>
                </div>
              </>
            )}
            <button onClick={() => logout()}>Logout</button>
          </div>
        </>
      )}
    </>
  );
}

export default LoginCheck;
