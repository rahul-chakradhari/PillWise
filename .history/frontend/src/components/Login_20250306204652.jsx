import React from "react";

const Login = () => {
  return (
    <div className="login">
      <form>
        <div className="mb-3">
          <h2>Login</h2>
          <h4>Welcome user</h4>
          <h6>
            {" "}
            <i>* Come after Signing in </i>
            <br /> <i>* Password should be 8 characters long </i>
            <br />
            <i>* Use strong password mixed of characters and letters</i>
          </h6>
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      ;
    </div>
  );
};

export default Login;
