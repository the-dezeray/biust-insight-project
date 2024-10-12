import React from 'react';
import styles from '../css/pricingAndPayment.module.css';
import { FaMoneyBillWave, FaSchool, FaMobileAlt } from 'react-icons/fa';

const PricingAndPayment = () => {
  return (
    <div className={styles.pricingContainer}>
      <h1>Pricing and Payment</h1>
      <div className={styles.pricingOptions}>
        <div className={styles.pricingOption}>
          <h2><FaMoneyBillWave /> Monthly Plan</h2>
          <p className={styles.price}>80 Pula</p>
          <p>per month</p>
        </div>
        <div className={styles.pricingOption}>
          <h2><FaSchool /> Semester Plan</h2>
          <p className={styles.price}>150 Pula</p>
          <p>per semester</p>
        </div>
      </div>
      <div className={styles.paymentMethods}>
        <h2>Payment Methods</h2>
        <div className={styles.paymentMethod}>
          <FaMobileAlt />
          <p>FNB Pay to Cell Phone Number: 74672323</p>
        </div>
        {/* Add more payment methods here if needed */}
      </div>
      <button className={styles.paymentButton}>Proceed to Payment</button>
    </div>
  );
};

export default PricingAndPayment;

