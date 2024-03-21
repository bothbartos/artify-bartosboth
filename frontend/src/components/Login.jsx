export default function LoginPage(props) {
  const { logIn, warn, onBack } = props;
  const onLogin = async (event) => {
    event.preventDefault();
    const formValues = Object.fromEntries((new FormData(event.target)).entries());
    try {
      await logIn(formValues.username);
    } catch (error) {
      warn(error.message);
    }
  }
  return <>
    <form name="login" onSubmit={onLogin}>
      <label>
        Username: 
        <input type="text" name="username"></input>
      </label>
      <button type="submit">Log in</button>
    </form>
    <button onClick={onBack}>Back</button>
  </>
}