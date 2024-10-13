import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaSchool, FaMobileAlt, FaCheck, FaStar, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../css/pricingAndPayment.module.css';

const PricingAndPayment = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactionReference, setTransactionReference] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [trialEnded, setTrialEnded] = useState(false);

  useEffect(() => {
    // Simulate loading delay and check trial status
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically check the trial status from your backend
      // For this example, we'll just set it to true
      setTrialEnded(true);
    }, 1000);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowInstructions(true);
  };

  const handlePaymentConfirmation = (e) => {
    e.preventDefault();
    // Here you would typically send the transaction reference to your backend for verification
    // For this example, we'll just set paymentConfirmed to true
    setPaymentConfirmed(true);
  };

  const renderPricingOptions = () => (
    <div className={styles.pricingOptions}>
      <motion.div 
        className={`${styles.pricingOption} ${styles.monthlyOption}`}
        onClick={() => handlePlanSelect('monthly')}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <h3><FaMoneyBillWave className={styles.optionIcon} /> Monthly</h3>
        <p className={styles.price}>60 <span>Pula</span></p>
        <ul className={styles.features}>
          <li><FaCheck /> Full access</li>
          <li><FaCheck /> Billed monthly</li>
        </ul>

      </motion.div>
      <motion.div 
        className={`${styles.pricingOption} ${styles.semesterOption}`}
        onClick={() => handlePlanSelect('semester')}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className={styles.popularBadge}><FaStar /> Best Value</div>
        <h3><FaSchool className={styles.optionIcon} /> Semester</h3>
        <p className={styles.price}>100 <span>Pula</span></p>
        <ul className={styles.features}>
          <li><FaCheck /> Full access</li>
          <li><FaCheck /> Billed per semester</li>
        </ul>

      </motion.div>
    </div>
  );

  const renderPaymentInstructions = () => (
    <motion.div
      className={styles.paymentInstructions}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2>Payment Instructions for {selectedPlan} Plan</h2>
      <ol>
        <li>Open your mobile banking app or visit your bank's website.</li>
        <li>Navigate to the "Send Money" or "Make a Transfer" section.</li>
        <li>Enter the following details:
          <ul>
            <li>Recipient: [Your Company Name]</li>
            <li>Account Number: [Your Account Number]</li>
            <li>Bank: [Your Bank Name]</li>
            <li>Amount: {selectedPlan === 'monthly' ? '60' : '100'} Pula</li>
          </ul>
        </li>
        <li>In the reference or description field, please enter: "[Student's Full Name] - {selectedPlan} Plan"</li>
        <li>Review the details and confirm the transfer.</li>
      </ol>
      <form onSubmit={handlePaymentConfirmation}>
        <input
          type="text"
          placeholder="Enter transaction reference"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
          required
        />
        <button type="submit">Confirm Payment</button>
      </form>
      <button className={styles.backButton} onClick={() => setShowInstructions(false)}>
        <FaArrowRight className={styles.backIcon} /> Back to Plans
      </button>
    </motion.div>
  );

  const renderConfirmation = () => (
    <div className={styles.confirmation}>
      <FaCheck className={styles.checkIcon} />
      <h2>Payment Confirmed!</h2>
      <p>Thank you for your payment. Your account has been upgraded to the {selectedPlan} plan.</p>
    </div>
  );

  return (
    <div className={styles.pricingContainer}>
      {isLoading ? (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Loading pricing options...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {showInstructions ? (
            renderPaymentInstructions()
          ) : (
            <motion.div
              key="pricing-options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {trialEnded && (
                <div className={styles.trialEndedBox}>
                  <FaExclamationTriangle className={styles.warningIcon} />
                  Your trial has ended. Please select a plan to continue using our services.
                </div>
              )}
              <h1 className={styles.mainTitle}>Choose Your Plan</h1>
              {renderPricingOptions()}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {paymentConfirmed && renderConfirmation()}
    </div>
  );
};

export default PricingAndPayment;
