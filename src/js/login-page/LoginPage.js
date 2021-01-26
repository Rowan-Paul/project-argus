import React, { useState } from "react";

function LoginPageUI(props) {
  const [error, setError] = useState("");

  const registerClicked = async () => {
    setError("");

    const url = "http://localhost:3000/api/account/signup";
    const data = {
      email: "rp-flynn@outlook.com",
      password: "password",
    };

    fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          props.history.push("/");
        } else {
          throw response.statusText;
        }
      })
      .catch((statusText) => {
        console.log("Error:", statusText);
        setError(`Error: ${statusText}. Check your credentials and try again`);
      });
  };

  const signinClicked = async () => {
    setError("");

    const url = "http://localhost:3000/api/account/signin";
    const data = {
      email: "rp-flynn@outlook.com",
      password: "password",
    };

    fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw response.statusText;
        }
      })
      .then((response) => {
        localStorage.token = response.token;
        props.history.push("/");
      })
      .catch((statusText) => {
        console.log("Error:", statusText);
        setError(`Error: ${statusText}. Check your credentials and try again`);
      });
  };

  const logoutClicked = async () => {
    setError("");

    const url = "http://localhost:3000/api/account/logout";
    const data = {
      token:
        "51b5aa915df9d4c17296bf941f92faa40f0ecae8c433a2a7a298c660d4e783ec77f609836d660803049b252fafbae517mkeLkyJLiKgOnOb46cTGusbZiuOHu2zZoxsTPynqraNo+AKrbu7jQ2cKGc9WGJzgbY3C48BLCIwy5ymDEb3tVdRj+B4VqO/TIVqVq5RM5ZPf1t4PBlSLDudQ/4MXuVrN",
    };

    fetch(url, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return "";
        } else {
          throw response.statusText;
        }
      })
      .then(() => {
        localStorage.removeItem("token");
        props.history.push("/");
      })
      .catch((statusText) => {
        console.log("Error:", statusText);
        setError(`Error: ${statusText}.`);
      });
  };

  return (
    <React.Fragment>
      <p>{error}</p>
      <button onClick={registerClicked}>Register</button>
      <button onClick={signinClicked}>Sign in</button>
      <button onClick={logoutClicked}>Logout</button>
    </React.Fragment>
  );
}

export const LoginPage = LoginPageUI;
