import React, { Component } from 'react';
import shortid from 'shortid';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransatctionHistory from '../TransactionHistory/TransactionHistory';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    totalDeposits: 0,
    totalWithdraws: 0,
  };

  componentDidMount() {
    const localTransactions = localStorage.getItem('transactions');

    if (localTransactions) {
      this.setState({ transactions: JSON.parse(localTransactions) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { mass } = this.state;
    if (prevState.transaction !== mass) {
      localStorage.setItem('transactions', JSON.stringify(mass));
    }
  }

  handleNewTransaction = (amountOfMoney, typeOfTranaction) => {
    const transaction = {
      id: shortid.generate(),
      type: typeOfTranaction,
      amount: amountOfMoney,
      date: new Date().toLocaleString(),
    };

    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
    }));

    if (typeOfTranaction === 'Withdraw') {
      this.setState(prevState => ({
        balance: prevState.balance - amountOfMoney,
        totalWithdraws: prevState.totalWithdraws + Number(amountOfMoney),
      }));
    }

    if (typeOfTranaction === 'Deposit') {
      this.setState(prevState => ({
        balance: prevState.balance + Number(amountOfMoney),
        totalDeposits: prevState.totalDeposits + Number(amountOfMoney),
      }));
    }
  };

  render() {
    const { balance, totalDeposits, totalWithdraws, transactions } = this.state;
    return (
      <>
        <Controls onTransaction={this.handleNewTransaction} balance={balance} />
        <Balance
          balance={balance}
          totalDeposits={totalDeposits}
          totalWithdraws={totalWithdraws}
        />
        <TransatctionHistory transactions={transactions} />
      </>
    );
  }
}

export default Dashboard;
