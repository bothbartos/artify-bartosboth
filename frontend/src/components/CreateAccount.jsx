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
        Username:
        <input type="text" name="username"></input>
      </label>
      <div className="registerButtons">
      <button type="submit">Create</button>
      <button type="button" onClick={onBack}>Cancel</button>
      </div>
    </form>
  </>
}