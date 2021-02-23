import React from "react";

class App extends React.Component {
  constructor() {
    super();
    // this.myRef = React.createRef();
    this.state = {
      input: {},

      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.myRef.current.focus();
  // }

  handleChange(event) {
    let input = this.state.input;

    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log(this.state);

      let input = {};

      input["email"] = this.state.input.email;

      input["password"] = this.state.input.password;

      input["confirm_password"] = this.state.input.confirm_password;

      this.setState({ input: input });

      alert("Test Form is submited");
    }
  }

  validate() {
    let input = this.state.input;

    let errors = {};

    let isValid = true;

    if (!input["email"]) {
      isValid = false;

      errors["email"] = "Please enter your email Address!";
      this.setState({
        errors: errors,
      });

      return isValid;
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;

        errors["email"] = "Please enter valid email address!";
      }
    }

    if (!input["password"] && isValid) {
      isValid = false;
      errors["password"] = "Please enter your Password!";
    }

    if (input["password"] && isValid) {
      let resCount = 0;
      if (input["password"].length < 13) {
        isValid = false;
        errors["password"] = "Password must contain at least 12 characters!";
        resCount++;
      }

      let regexNum = /[0-9]/;
      if (!regexNum.test(input["password"])) {
        errors["password"] = "Password must contain at least one number (0-9)!";
        resCount++;
      }

      let regexLow = /[a-z]/;
      if (!regexLow.test(input["password"])) {
        errors["password"] =
          "password must contain at least one lowercase letter (a-z)!";
        resCount++;
      }
      let regexUpp = /[A-Z]/;
      if (!regexUpp.test(input["password"])) {
        errors["password"] =
          "password must contain at least one uppercase letter (A-Z)!";
        resCount++;
      }

      let regexSpe = /(?=.*[!@#$%^&*])/;
      if (!regexSpe.test(input["password"])) {
        errors["password"] =
          "password must contain at least one special character!";
        resCount++;
      }

      if (resCount > 2) {
        this.setState({
          errors: errors,
        });

        return isValid;
      }
    }

    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password!";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirm_password"] !== "undefined"
    ) {
      if (input["password"] !== input["confirm_password"]) {
        isValid = false;

        errors["password"] = "Passwords don't match!";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <div>
        <div className="container mt-2">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <div className="form-group">
                  Email Address:
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={this.state.input.email}
                    onChange={this.handleChange}
                    placeholder="Enter Email"
                    className="form-control"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required
                  />
                  <div className="text-danger">{this.state.errors.email}</div>
                </div>

                <div className="form-group">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={this.state.input.password}
                    onChange={this.handleChange}
                    id="password"
                    className="form-control pwds"
                    placeholder="Enter password"
                    required
                  />
                  <div className="text-danger">
                    {this.state.errors.password}
                  </div>
                </div>

                <div className="form-group">
                  Confirm Password
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="form-control pwds"
                    value={this.state.input.confirm_password}
                    onChange={this.handleChange}
                    placeholder="Enter confirm password"
                    required
                  />
                  <div className="text-danger">
                    {this.state.errors.confirm_password}
                  </div>
                </div>
                <div className="form-group">
                  <button
                    id="submitBtn"
                    type="submit"
                    value="Submit"
                    className="btn btn-primary submit-button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
