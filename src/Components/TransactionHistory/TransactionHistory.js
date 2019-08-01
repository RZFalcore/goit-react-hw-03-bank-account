import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <table className={styles.history}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Transaction</th>
          <th className={styles.th}>Amount</th>
          <th className={styles.th}>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td className={styles.td}>{transaction.type}</td>
            <td className={styles.td}>{transaction.amount} $</td>
            <td className={styles.td}>{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TransactionHistory;
