import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, totalDeposits, totalWithdraws }) => (
  <section className={styles.balance}>
    <span className={styles.span}> + {totalDeposits} $ </span>
    <span className={styles.span}> - {totalWithdraws} $ </span>
    <span className={styles.span}> Balance: {balance} $ </span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  totalDeposits: PropTypes.number.isRequired,
  totalWithdraws: PropTypes.number.isRequired,
};

export default Balance;
