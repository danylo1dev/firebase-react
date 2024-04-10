import { useState } from "react";
import firebase from "../utils/firebase";

const LoginForm = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const [registration, setRegistration] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const submit = (e) => {
    e.preventDefault();
    if (registration) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.login, data.password)
        .then((res) => {
          res.user.sendEmailVerification();
        })
        .catch((err) => console.log(err));
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.login, data.password)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <form action="" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="from-control"
            name="login"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="text"
            className="from-control"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">{registration ? "Sign Up" : "Sign In"}</button>
        <button type="button" onClick={() => setRegistration((prev) => !prev)}>
          switch
        </button>
        <button
          type="button"
          onClick={() => {
            firebase
              .auth()
              .signOut()
              .then(() => console.log("signed out"));
          }}
        >
          Log Out
        </button>
        <button
          type="button"
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase
              .auth()
              .signInWithPopup(provider)
              .then((res) => console.log(res))
              .catch((err) => console.error(err));
          }}
        >
          Google sing in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
