export default function CreateAccountPage(props) {
  const { createUser, warn, onBack } = props;
  const onCreate = async (event) => {
    event.preventDefault();
    const formValues = Object.fromEntries((new FormData(event.target)).entries());
    try {
      await createUser({
        firstName: formValues['first-name'],
        lastName: formValues['last-name'],
        username: formValues['username']
      });
    } catch (error) {
      warn(error.message)
    }
  }

  return <>
    <form name="create" onSubmit={onCreate}>
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
    <button onClick={onBack}>Back</button>
  </>
}