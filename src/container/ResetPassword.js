import React from "react";

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: "",
      password: "",
      confirmPassword: "",
      last3Password: {
        password1: "RupeshRupesh1",
        password2: "RupeshRupesh2",
        Password3: "RupeshRupesh3",
      },
      match: null,
      charNumberValid: false,
      specialCharValid: false,
      uppercaseValid: false,
      lowercaseValid: false,
      numberValid: false,
      input: {},
      errors: {},
      isOtherValiation: false,
    };
    this.validate = this.validate.bind(this);
  }

  //

  checkOldPswdValidation = (oldPassword, newPassword) => {
    let isUsedBefore = false;
    for (var prop in oldPassword) {
      if (
        oldPassword.hasOwnProperty(prop) &&
        oldPassword[prop] === newPassword
      ) {
        return (isUsedBefore = true);
      }
    }
    return isUsedBefore;
  };

  // Check the Password validation on blur
  checkPasswordValidation = (event) => {
    let errors = {};
    let passwordLength = event.target.value.length;

    if (
      this.checkOldPswdValidation(this.state.last3Password, event.target.value)
    ) {
      errors["password"] =
        "New password must be different to the last 3 passwords.";
      this.setState({
        errors: errors,
      });
    } else if (passwordLength >= 12) {
      errors["password"] = "";
      this.setState(
        {
          charNumberValid: true,
        },
        () => {
          console.log(this.state.charNumberValid);
          this.checkOtherValidation(this.state.password);
        }
      );
    } else {
      errors["password"] = "Passwords should be at least 12 characters long.";
      this.setState({
        charNumberValid: this.state.charNumberValid,
        specialCharValid: this.state.specialCharValid,
        uppercaseValid: this.state.uppercaseValid,
        numberValid: this.state.numberValid,
        lowercaseValid: this.state.lowercaseValid,
        errors: errors,
      });
    }
  };

  checkOtherValidation = (password) => {
    const splCharPattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const UpperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const numberCasePattern = /[0-9]/;
    let errors = {};

    if (
      (splCharPattern.test(password) && UpperCasePattern.test(password)) ||
      (splCharPattern.test(password) && lowerCasePattern.test(password)) ||
      (splCharPattern.test(password) && numberCasePattern.test(password)) ||
      (UpperCasePattern.test(password) && lowerCasePattern.test(password)) ||
      (lowerCasePattern.test(password) && numberCasePattern.test(password)) ||
      (UpperCasePattern.test(password) && numberCasePattern.test(password))
    ) {
      errors["password"] = "";
      this.setState({
        specialCharValid: true,
        uppercaseValid: true,
        numberValid: true,
        lowercaseValid: true,
        isOtherValiation: true,
        errors: errors,
      });
    } else {
      errors["password"] =
        "The password must contain a character from at least 2 of the above categories.";
      this.setState({
        specialCharValid: this.state.specialCharValid,
        uppercaseValid: this.state.uppercaseValid,
        numberValid: this.state.numberValid,
        lowercaseValid: this.state.lowercaseValid,
        isOtherValiation: false,
        errors: errors,
      });
    }
  };
  // Check for special characters
  checkSpecialCharacters = (password) => {
    const pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (pattern.test(password)) {
      this.setState({
        specialCharValid: true,
      });
    } else {
      this.setState({
        specialCharValid: false,
      });
    }
  };

  // Check for an uppercase character
  checkUppercase = (password) => {
    const pattern = /[A-Z]/;
    if (pattern.test(password)) {
      this.setState({
        uppercaseValid: true,
      });
    } else {
      this.setState({
        uppercaseValid: false,
      });
    }
  };

  // Check for an lowercase character

  checkLowercase = (password) => {
    const pattern = /[a-z]/;
    if (pattern.test(password)) {
      this.setState({
        lowercaseValid: true,
      });
    } else {
      this.setState({
        lowercaseValid: false,
      });
    }
  };

  // Check for a number
  checkNumber = (password) => {
    const pattern = /[0-9]/;
    if (pattern.test(password)) {
      this.setState({
        numberValid: true,
      });
    } else {
      this.setState({
        numberValid: false,
      });
    }
  };

  // Check the length of the input

  checkPasswordLength = (password) => {
    if (password.length >= 12) {
      this.setState({
        charNumberValid: true,
      });
    } else {
      this.setState({
        charNumberValid: false,
      });
    }
  };

  handleUserEmailChange = (event) => {
    this.setState({
      useremail: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    if (event) {
      this.setState({
        password: event.target.value,
      });
    }
    this.checkPasswordLength(event.target.value);
    this.checkSpecialCharacters(event.target.value);
    this.checkUppercase(event.target.value);
    this.checkLowercase(event.target.value);
    this.checkNumber(event.target.value);
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({
      confirmPassword: event.target.value,
      match: null,
    });
  };

  comparePassword = (event) => {
    let errors = {};
    if (this.state.password === this.state.confirmPassword) {
      this.setState({
        match: true,
        errors: errors,
      });
    } else {
      errors["confirmPassword"] = "Passwords don't match.";
      this.setState({
        match: false,
        errors: errors,
      });
    }
  };
  checkUserMailValidation = (event) => {
    let errors = {};
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(event.target.value)) {
      errors["useremail"] = "Please enter valid email address.";
      this.setState({
        errors: errors,
      });
    } else {
      this.setState({
        errors: errors,
      });
    }
  };

  resetForm = () => {
    this.setState({
      useremail: "",
      password: "",
      confirmPassword: "",
      match: null,
    });

    this.useremail.focus();
  };

  validate = () => {
    let input = this.state;

    let errors = {};

    let isValid = true;

    if (!input["useremail"]) {
      isValid = false;

      errors["useremail"] = "Please enter your email Address.";
      this.setState({
        errors: errors,
      });

      return isValid;
    }

    if (typeof input["useremail"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["useremail"])) {
        isValid = false;

        errors["useremail"] = "Please enter valid email address.";
      }
    }

    if (!input["password"] && isValid) {
      isValid = false;
      errors["password"] = "Please enter your Password.";
    }

    if (!input["confirmPassword"] && isValid) {
      isValid = false;
      errors["confirmPassword"] = "Please enter your confirm password.";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirmPassword"] !== "undefined" &&
      isValid
    ) {
      if (input["password"] !== input["confirmPassword"]) {
        isValid = false;

        errors["password"] = "Passwords don't match.";
      }
    }

    this.setState({
      errors: errors,
    });

    if (isValid) {
      console.log(this.state);

      let input = {};

      input["useremail"] = this.state.useremail;

      input["password"] = this.state.password;

      input["confirmPassword"] = this.state.confirmPassword;

      this.setState({ input: input });

      alert("Test Form is submited");
    }

    return isValid;
  };

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log(this.state);

      let input = {};

      input["useremail"] = this.state.input.useremail;

      input["password"] = this.state.input.password;

      input["confirmPassword"] = this.state.input.confirmPassword;

      this.setState({ input: input });

      alert("Test Form is submited");
    }
  }

  render() {
    return (
      <div className="account__container">
        <form>
          <div className="validation">
            <div className="validator">
              <i
                className={
                  this.state.charNumberValid
                    ? "fas fa-check success"
                    : "fas fa-times error"
                }
              ></i>
              <p className="validation-item">12 characters</p>
            </div>
            <div className="validator">
              <i
                className={
                  this.state.specialCharValid
                    ? "fas fa-check success"
                    : "fas fa-times error"
                }
              ></i>
              <p className="validation-item">1 special character</p>
            </div>
            <div className="validator">
              <i
                className={
                  this.state.uppercaseValid
                    ? "fas fa-check success"
                    : "fas fa-times error"
                }
              ></i>
              <p className="validation-item">1 uppercase letter</p>
            </div>

            <div className="validator">
              <i
                className={
                  this.state.lowercaseValid
                    ? "fas fa-check success"
                    : "fas fa-times error"
                }
              ></i>
              <p className="validation-item">1 lowercase letter</p>
            </div>

            <div className="validator">
              <i
                className={
                  this.state.numberValid
                    ? "fas fa-check success"
                    : "fas fa-times error"
                }
              ></i>
              <p className="validation-item">1 number</p>
            </div>
          </div>
          {/* <div className="input__container">
            <label className="input__label">Email Address:</label>
            <input
              className="input"
              ref={(input) => {
                this.useremail = input;
              }}
              type="text"
              value={this.state.useremail}
              onChange={(event) => this.handleUserEmailChange(event)}
              onBlur={(event) => this.checkUserMailValidation(event)}
              required
            />
            <div className="text-danger">{this.state.errors.useremail}</div>
          </div> */}

          {/* Dummy test Code start here  */}
          <div className="input__container">
            <label className="input__label">Old Password:</label>
            <input
              className="input"
              type="password"
              disabled="true"
              value={this.state.last3Password.password1}
              // onChange={(event) => this.handlePasswordChange(event)}
              // onBlur={(event) => this.checkPasswordValidation(event)}
            />
          </div>
          {/* Dummy test Code end here  */}
          <div className="password-container">
            <div className="password">
              <div className="input__container">
                <label className="input__label">Password:</label>
                <input
                  className="input"
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.handlePasswordChange(event)}
                  onBlur={(event) => this.checkPasswordValidation(event)}
                  required
                />
                <div className="text-danger">{this.state.errors.password}</div>
              </div>
              <div className="input__container">
                <label
                  className={`input__label ${
                    this.state.match == false ? "error-msg" : null
                  }`}
                >
                  Confirm Password:
                </label>
                <input
                  className={`input${
                    this.state.match == false ? "--error" : ""
                  }`}
                  type="password"
                  disabled={
                    !this.state.charNumberValid && !this.state.isOtherValiation
                  }
                  value={this.state.confirmPassword}
                  onChange={(event) => this.handleConfirmPasswordChange(event)}
                  onBlur={this.comparePassword}
                  required
                />
                <div className="text-danger">
                  {this.state.errors.confirmPassword}
                </div>
              </div>
            </div>
          </div>
          <div className="button__container">
            <button className="button--primary" onClick={this.validate}>
              Submit
            </button>
            <button className="button--secondary" onClick={this.resetForm}>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}
