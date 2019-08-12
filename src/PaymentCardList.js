import React from "react";
import axios from "axios";
import toastr from "toastr";

const PaymentCardList = props => {
  const cards = props.cards.map(card => {
    return (
      <tr key={card.PmId}>
        <td onClick={() => props.handlePopulateForm(card)}>
          {card.CardOwnerName}
        </td>
        <td>{card.CardNumber}</td>
        <td>{card.ExpirationDate}</td>
        <td>
          <i
            className="fa fa-trash text-danger"
            onClick={async () => {
              await handleDeleteCard(card.PmId);
              props.handleRefreshList();
            }}
          />
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <tbody>{cards}</tbody>
    </table>
  );
};

const handleDeleteCard = async id => {
  await axios.delete("http://localhost:56000/api/PaymentDetail/" + id);
  toastr.warning("Deleted Successfully", "Payment Detail Register");
};

export default PaymentCardList;
