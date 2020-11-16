import { useAuth0 } from "@auth0/auth0-react";

import Missions from "./Missions";

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout
  } = useAuth0();

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Oops... {error.message}</div>;
  } else if (isAuthenticated) {
    content = (
      <>
        <button
          className="btn btn-secondary m-4 absolute top-0 right-0"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
        <Missions />
      </>
    );
  } else {
    content = (
      <>
        <p className="italic mb-4">View Apollo mission data here!</p>
        <button className="btn btn-primary" onClick={loginWithRedirect}>
          Log in
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8">{content}</div>
  );
}

export default App;
