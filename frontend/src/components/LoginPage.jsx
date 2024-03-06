export default function LoginPage(props) {
  const onLogin = async (event) => {
    event.preventDefault();
    const formValues = Object.fromEntries((new FormData(event.target)).entries());
    try {
      await props.logInAsUser(formValues.username);
    } catch (error) {
      props.setErrorMessage(error.message);
    }
  }
  return <>
    <form name="login" onSubmit={onLogin}>
      <label>
        username: 
        <input type="text" name="username"></input>
      </label>
      <button type="submit">Log in</button>
    </form>
  </>
}