import React from "react";

const Signup = () => {
  return (
    <div className="signup">
      <form>
        <h2>Signup</h2>
        <h6>
          <i>* Only for new Users</i> <br />
          <i>* If already signedin then login</i> <br />
          <i>* Password must be 8 characters long</i>
          <i>* Use strong password mixed of characters and letters</i>
        </h6>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Age
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="must be a number "
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Gender
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Male/Female/Trans"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Blood Group
          </label>
          <select
            className="form-select form-select-sm"
            aria-label="Small select example"
          >
            <option selected>Select</option>
            <option value="1">A+</option>
            <option value="2">A-</option>
            <option value="3">B+</option>
            <option value="4">B-</option>
            <option value="5">O+</option>
            <option value="6">O-</option>
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Phone number
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="must be a number (10 digits)"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
