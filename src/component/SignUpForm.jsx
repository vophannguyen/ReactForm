import { useState } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  async function handleForm(e) {
    e.preventDefault();
    try {
      const respone = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      // const respone = await fetch(
      //   "https://fsa-jwt-practice.herokuapp.com/signup"
      // );
      const data = await respone.json();
      console.log(data);
      setToken(() => data.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return error ? (
    <p>{error}</p>
  ) : (
    <form onSubmit={handleForm}>
      <label>
        Username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:{" "}
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
