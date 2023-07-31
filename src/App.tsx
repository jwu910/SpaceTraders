import { createSignal } from "solid-js";
import "./App.css";

function App() {
  const [token, setToken] = createSignal(
    import.meta.env.VITE_TOKEN ||
      localStorage.getItem("spaceTradersToken") ||
      ""
  );

  if (!token()) {
    setToken(localStorage.getItem("spaceTradersToken") || "");
  }

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
              setToken(token);
              localStorage.setItem("spaceTradersToken", token);
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
            Space Traders
          </a>

          <div>
            {import.meta.env.VITE_TOKEN && (
              <>
                <p>
                  Using token from local env. Clear env file before logging out.
                </p>
              </>
            )}
            <button onClick={() => logout()}>Logout</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
