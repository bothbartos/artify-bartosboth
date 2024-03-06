import { useEffect, useState } from "react"
import CreateAccountPage from "../Pages/CreateAccountPage";
import LoginPage from "../Pages/LoginPage";

const STATES = {
  LANDING: 0,
  LOGIN: 1,
  CREATE: 2,
};

export default function NotLoggedInPage(props) {
  const {logIn, createUser} = props;

  const [state, setState] = useState(STATES.LANDING);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (state === STATES.LANDING) {
      setErrorMessage('');
    }
  }, [state])

  return <>
    {(state === STATES.LANDING) && <>
        <button onClick={() => setState(STATES.LOGIN)}>Log in</button>
        <button onClick={() => setState(STATES.CREATE)}>Create new account</button>
      </>
    }
    {(state === STATES.LOGIN) && <LoginPage
      logIn={logIn}
      warn={setErrorMessage}
      onBack={()=>setState(STATES.LANDING)}/>
    }
    {(state === STATES.CREATE) && <CreateAccountPage
      createUser={createUser}
      warn={setErrorMessage}
      onBack={()=>setState(STATES.LANDING)}/>
    }
    <p>{errorMessage}</p>
  </>
}