import { useEffect, useState } from "react"
import CreateAccountPage from "./CreateAccountPage";
import LoginPage from "./LoginPage";

const STATES = {
  LANDING: 0,
  LOGIN: 1,
  CREATE: 2,
}

export default function NotLoggedInPage(props) {

  const [state, setState] = useState(STATES.LANDING);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (state === STATES.LANDING) {
      setErrorMessage('');
    }
  }, [state])

  return <>
    <button onClick={() => console.log(state)}>print state</button>
    <p>{errorMessage}</p>
    {(state === STATES.LANDING) && <>
        <button onClick={() => setState(STATES.LOGIN)}>Log in</button>
        <p>{errorMessage}</p>
        <button onClick={() => setState(STATES.CREATE)}>Create new account</button>
      </>
    }
    {(state === STATES.LOGIN)
    && <LoginPage logInAsUser={props.logInAsUser} setErrorMessage={setErrorMessage}/>
    }
    {(state === STATES.CREATE)
    && <CreateAccountPage createUser={props.createUser} setErrorMessage={setErrorMessage}/>
    }
  </>
}