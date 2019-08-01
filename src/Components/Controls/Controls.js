import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Controls.module.css';

export default class Controls extends Component {
  static propTypes = {
    onTransaction: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
  };

  state = {
    amount: '',
  };

  notify = message => toast(message);

  handleInputChange = e => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleOperation = e => {
    if (
      e.target.name === 'Withdraw' &&
      this.state.amount > this.props.balance
    ) {
      this.notify('На счету недостаточно средств для проведения операции!');
      this.setState({
        amount: '',
      });
      return;
    }

    if (this.state.amount === 0 || this.state.amount === '') {
      this.notify('Введите сумму для проведения операции!');
      this.setState({
        amount: '',
      });
      return;
    }

    this.props.onTransaction(this.state.amount, e.target.name);
    this.setState({
      amount: '',
    });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={styles.controls}>
        <input
          className={styles.input}
          type="number"
          name="text"
          value={amount}
          onChange={this.handleInputChange}
        />
        <button
          className={styles.button}
          type="button"
          name="Deposit"
          onClick={this.handleOperation}
        >
          Deposit
        </button>
        <button
          className={styles.button}
          type="button"
          name="Withdraw"
          onClick={this.handleOperation}
        >
          Withdraw
        </button>
        <ToastContainer />
      </section>
    );
  }
}
