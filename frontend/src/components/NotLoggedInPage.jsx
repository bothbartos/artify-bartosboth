import { useEffect, useState } from "react"

const STATES = {
  LANDING: 0,
  LOGIN: 1,
  CREATE: 2,
}

export default function NotLoggedInPage(props) {
  const onLogin = async (event) => {
    event.preventDefault();
    const formValues = Object.fromEntries((new FormData(event.target)).entries());
    try {
      await props.logInAsUser(formValues.username);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const onCreate = async (event) => {
    event.preventDefault();
    const formValues = Object.fromEntries((new FormData(event.target)).entries());
    try {
      await props.createUser({
        firstName:formValues['first-name'],
        lastName: formValues['last-name'],
        username: formValues['username']
      });
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

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
    {(() => {switch (state) {
      case STATES.LANDING:
        return <>
          <button onClick={() => setState(STATES.LOGIN)}>Log in</button>
          <p>{errorMessage}</p>
          <button onClick={() => setState(STATES.CREATE)}>Create new account</button>
        </>
      case STATES.LOGIN:
        return <>
          <form onSubmit={onLogin}>
            <label>
              username: 
              <input type="text" name="username"></input>
            </label>
            <button type="submit">Log in</button>
          </form>
        </>
      case STATES.CREATE:
        return <>
          <form onSubmit={onCreate}>
            <label>
              First Name:
              <input type="text" name="first-name"></input>
            </label>
            <label>
              Last Name:
              <input type="text" name="last-name"></input>
            </label>
            <label>
              username:
              <input type="text" name="username"></input>
            </label>
            <button type="submit">Create</button>
          </form>
        </>
    }})()}
  </>
}