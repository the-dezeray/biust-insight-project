import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaSchool, FaMobileAlt, FaCheck, FaStar, FaArrowRight, FaExclamationTriangle,FaArrowLeft} from 'react-icons/fa';
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
      <div 
        className={`${styles.pricingOption} ${styles.monthlyOption}`}
        onClick={() => handlePlanSelect('monthly')}
      >
        <h3><FaMoneyBillWave className={styles.optionIcon} /> Monthly</h3>
        <p className={styles.price}>60 <span>Pula</span></p>
        <ul className={styles.features}>
          <li><FaCheck /> Full access</li>
          <li><FaCheck /> Billed monthly</li>
        </ul>
      </div>
      <div 
        className={`${styles.pricingOption} ${styles.semesterOption}`}
        onClick={() => handlePlanSelect('semester')}
      >
        <div className={styles.popularBadge}><FaStar /> Best Value</div>
        <h3><FaSchool className={styles.optionIcon} /> Semester</h3>
        <p className={styles.price}>100 <span>Pula</span></p>
        <ul className={styles.features}>
          <li><FaCheck /> Full access</li>
          <li><FaCheck /> Billed per semester</li>
          <li><FaCheck /> Priority support</li>
        </ul>
      </div>
    </div>
  );

  const renderPaymentInstructions = () => (
    <div className={styles.paymentInstructions}>
      <h2>Payment Instructions for {selectedPlan} Plan</h2>
      <div className={styles.instructionSteps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <p>In the FNB app, select "Pay" then "Pay to Cell"</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <p>Enter amount: <strong>{selectedPlan === 'monthly' ? '60' : '100'} Pula</strong></p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <p>Set reference: <strong>Your initials + Student ID</strong></p>
            <p className={styles.example}>Example: RT2301904</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <p>Complete the transaction in the FNB app</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>5</div>
          <div className={styles.stepContent}>
            <p>Enter the reference below and click "Confirm Payment"</p>
          </div>
        </div>
      </div>
      <form onSubmit={handlePaymentConfirmation} className={styles.confirmationForm}>
        <input
          type="text"
          placeholder="Enter your reference (e.g., RT2301904)"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
          required
          className={styles.referenceInput}
        />
        <button type="submit" className={styles.confirmButton}>Confirm Payment</button>
      </form>
      <button className={styles.backButton} onClick={() => setShowInstructions(false)}>
        <FaArrowLeft className={styles.backIcon} /> Back to Plans
      </button>
    </div>
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
        <>
          {showInstructions ? (
            renderPaymentInstructions()
          ) : (
            <div>
              {trialEnded && (
                <div className={styles.trialEndedBox}>
                  <FaExclamationTriangle className={styles.warningIcon} />
                  Your trial has ended. Please select a plan to continue using our services.
                </div>
              )}
              <h1 className={styles.mainTitle}>Choose Your Plan</h1>
              {renderPricingOptions()}
            </div>
            
          )}
        </>
      )}
      {paymentConfirmed && renderConfirmation()}
    </div>
  );
};

export default PricingAndPayment;
