import React from "react";
import axios from "axios";
import toastr from "toastr";

class PaymentCardForm extends React.Component {
  state = {
    PmId: 0,
    CardOwnerName: "",
    CardNumber: "",
    ExpirationDate: "",
    CVV: "",
    nameValid: "",
    numberValid: "",
    dateValid: "",
    cvvValid: ""
  };

  componentWillReceiveProps = async props => {
    if (props.CardUpdate !== "") {
      await this.setState({
        PmId: props.CardUpdate.PmId,
        CardOwnerName: props.CardUpdate.CardOwnerName,
        CardNumber: props.CardUpdate.CardNumber,
        ExpirationDate: props.CardUpdate.ExpirationDate,
        CVV: props.CardUpdate.CVV,
        nameValid: "valid",
        numberValid: "valid",
        dateValid: "valid",
        cvvValid: "valid"
      });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    let creditCard = {
      PmId: this.state.PmId,
      CardOwnerName: this.state.CardOwnerName,
      CardNumber: this.state.CardNumber,
      ExpirationDate: this.state.ExpirationDate,
      CVV: this.state.CVV
    };

    if (creditCard.PmId !== 0) {
      await axios.put(
        `http://localhost:56000/api/PaymentDetail/${creditCard.PmId}`,
        creditCard
      );
      toastr.info("Updated Successfully", "Payment Detail Register");
    } else {
      await axios.post("http://localhost:56000/api/PaymentDetail", creditCard);
      toastr.success("Submited Successfully", "Payment Detail Register");
    }

    this.props.handleDisPopulateForm();
    this.props.handleRefreshList();
    this.resetState();
  };

  resetState = () => {
    this.setState({
      PmId: 0,
      CardOwnerName: "",
      CardNumber: "",
      ExpirationDate: "",
      CVV: "",
      nameValid: "",
      numberValid: "",
      dateValid: "",
      cvvValid: ""
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "CardOwnerName") this.handleInputChangeText(name, value);
    if (name === "CardNumber" || name === "CVV")
      this.handleInputChangeNumber(name, value);
    if (name === "ExpirationDate") this.handleInputChangeDate(name, value);
  };

  handleInputChangeText = (targetName, targetValue) => {
    if (targetValue.match("^[A-Za-z ]*$") != null) {
      this.setState({ [targetName]: targetValue }, () => {
        this.validateFormFields(targetName);
      });
    }
  };

  handleInputChangeNumber = (targetName, targetValue) => {
    if (targetValue.match("^[0-9]*$") != null) {
      this.setState({ [targetName]: targetValue }, () => {
        this.validateFormFields(targetName);
      });
    }
  };

  handleInputChangeDate = (targetName, targetValue) => {
    if (targetValue.match("^[0-9/]*$") != null) {
      this.setState({ [targetName]: targetValue }, () => {
        this.validateFormFields(targetName);
      });
    }
  };

  handleInputBlur = event => {
    this.validateFormFields(event.target.name);
  };

  validateFormFields = fieldName => {
    if (fieldName === "CardOwnerName") this.validateName();
    if (fieldName === "CardNumber") this.validateNumber();
    if (fieldName === "ExpirationDate") this.validateDate();
    if (fieldName === "CVV") this.validateCVV();
  };

  validateName = () => {
    if (this.state.CardOwnerName.length >= 3)
      this.setState({
        nameValid: "valid"
      });
    else
      this.setState({
        nameValid: "invalid"
      });
  };

  validateNumber = () => {
    if (this.state.CardNumber.length === 16)
      this.setState({
        numberValid: "valid"
      });
    else
      this.setState({
        numberValid: "invalid"
      });
  };

  validateDate = () => {
    if (this.state.ExpirationDate.length === 5)
      this.setState({
        dateValid: "valid"
      });
    else
      this.setState({
        dateValid: "invalid"
      });
  };

  validateCVV = () => {
    if (this.state.CVV.length === 3) {
      this.setState({
        cvvValid: "valid"
      });
    } else
      this.setState({
        cvvValid: "invalid"
      });
  };

  formIsValid = () => {
    if (
      this.state.nameValid === "valid" &&
      this.state.numberValid === "valid" &&
      this.state.dateValid === "valid" &&
      this.state.cvvValid === "valid"
    ) {
      return true;
    } else return false;
  };

  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-white">
                <i
                  className={`fas fa-user-circle ${
                    this.state.nameValid === "valid" ? "text-success" : ""
                  }
                  ${this.state.nameValid === "invalid" ? "text-danger" : ""}
                `}
                />
              </div>
            </div>
            <input
              name="CardOwnerName"
              className={`form-control ${
                this.state.nameValid === "valid" ? "border-success" : ""
              }
              ${this.state.nameValid === "invalid" ? "border-danger" : ""}
              `}
              type="text"
              placeholder="Card Owner Name"
              value={this.state.CardOwnerName}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-white">
                <i
                  className={`fas fa-credit-card ${
                    this.state.numberValid === "valid" ? "text-success" : ""
                  }
                  ${this.state.numberValid === "invalid" ? "text-danger" : ""}
                `}
                />
              </div>
            </div>
            <input
              name="CardNumber"
              className={`form-control ${
                this.state.numberValid === "valid" ? "border-success" : ""
              }
              ${this.state.numberValid === "invalid" ? "border-danger" : ""}
              `}
              type="text"
              placeholder="16 Digits Card Number"
              maxLength="16"
              minLength="16"
              value={this.state.CardNumber}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-7">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text bg-white">
                  <i
                    className={`fas fa-calendar ${
                      this.state.dateValid === "valid" ? "text-success" : ""
                    }
                  ${this.state.dateValid === "invalid" ? "text-danger" : ""}
                `}
                  />
                </div>
              </div>
              <input
                name="ExpirationDate"
                className={`form-control ${
                  this.state.dateValid === "valid" ? "border-success" : ""
                }
                ${this.state.dateValid === "invalid" ? "border-danger" : ""}
                `}
                type="text"
                placeholder="MM/YY"
                maxLength="5"
                minLength="5"
                value={this.state.ExpirationDate}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
                required
              />
            </div>
          </div>

          <div className="form-group col-md-5">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text bg-white">
                  <i
                    className={`fas fa-key ${
                      this.state.cvvValid === "valid" ? "text-success" : ""
                    }
                  ${this.state.cvvValid === "invalid" ? "text-danger" : ""}
                `}
                  />
                </div>
              </div>
              <input
                name="CVV"
                className={`form-control ${
                  this.state.cvvValid === "valid" ? "border-success" : ""
                }
                ${this.state.cvvValid === "invalid" ? "border-danger" : ""}
                `}
                type="password"
                placeholder="CVV"
                maxLength="3"
                minLength="3"
                value={this.state.CVV}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <button
            className="btn btn-success btn-lg btn-block"
            type="submit"
            disabled={this.formIsValid() ? false : true}
          >
            <i className="fas fa-database" /> Submit
          </button>
        </div>
      </form>
    );
  }
}

export default PaymentCardForm;
