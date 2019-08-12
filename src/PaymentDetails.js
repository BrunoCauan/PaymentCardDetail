import React from "react";
import PaymentCardForm from "./PaymentCardForm";
import PaymentCardList from "./PaymentCardList";
import axios from "axios";

class PaymentDetails extends React.Component {
  state = {
    Cards: [],
    CardUpdate: ""
  };

  componentDidMount = () => {
    this.refreshList();
  };

  refreshList = async () => {
    const response = await axios.get(
      "http://localhost:56000/api/PaymentDetail"
    );
    await this.setState({ Cards: response.data });
  };

  populateForm = async Card => {
    await this.setState({
      CardUpdate: Card
    });
    console.log(this.state.CardUpdate);
  };

  render() {
    return (
      <div className="jumbotron bg-transparent">
        <h1 className="display-4 text-center">Payment Detail Register</h1>
        <hr />
        <div className="row">
          <div className="col-md-5">
            <PaymentCardForm handleRefreshList={this.refreshList} />
          </div>
          <div className="col-md-7">
            <PaymentCardList
              cards={this.state.Cards}
              handleRefreshList={this.refreshList}
              handlePopulateForm={this.populateForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentDetails;
