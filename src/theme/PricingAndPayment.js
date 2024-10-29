import React, { useState } from 'react';
import { FaMoneyBillWave, FaSchool, FaMobileAlt, FaCheck, FaStar, FaArrowRight, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import styles from '@site/src/css/pricingAndPayment.module.css';
import { updateUserPayableStatus, getCurrentUserEmail, signInWithGoogle } from './firebase';

const PricingAndPayment = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [transactionReference, setTransactionReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowInstructions(true);
  };

  const handlePaymentConfirmation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const currentEmail = getCurrentUserEmail();
    if (!currentEmail) {
      console.error("No user is signed in");
      setIsLoading(false);
      // Handle the error, maybe show a message to the user
      return;
    }
    
    const result = await updateUserPayableStatus(transactionReference);
    
    if (result.success) {
      setPaymentConfirmed(true);
      // Clear everything
      setSelectedPlan(null);
      setShowInstructions(false);
      setTransactionReference('');
    } else {
      // Handle the error, show an error message to the user
      console.error(result.error);
      // You might want to set some state to show an error message in the UI
    }
    
    setIsLoading(false);
  };

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (result.user) {
      console.log("User logged in successfully");
      setLoggedIn(true);
      // The confirmation message will disappear due to the conditional render
    } else if (result.error) {
      console.error("Login failed:", result.error);
      // Handle login error, maybe show a message to the user
    }
  };

  const renderContent = () => {
    if (paymentConfirmed && !loggedIn) {
      return (
        <div className={styles.paymentConfirmed}>
          <h2>Access Granted!</h2>
          <p>Thank you for your payment. You have been granted temporary access while we verify the details.</p>
          <p>Please note: If any fraudulent activity is detected, your account will be permanently blocked.</p>
          <p>Enjoy your access to the platform!</p>
          <button onClick={handleLogin} className={styles.loginButton}>
            Log In Now
          </button>
        </div>
      );
    }

    if (loggedIn) {
      return (
        <div className={styles.loggedIn}>
          <h2>Welcome!</h2>
          <p>You have successfully logged in. Enjoy your access to the platform.</p>
        </div>
      );
    }

    return (
      <div className={styles.pricingContainer}>
        <div className={styles.trialEndedBox}>
          <FaExclamationTriangle className={styles.warningIcon} />
          <span>Free trial ended. Select a plan:</span>
        </div>
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
              renderPricingOptions()
            )}
          </>
        )}
        {paymentConfirmed && renderConfirmation()}
      </div>
    );
  };

  const renderPricingOptions = () => (
    <div className={styles.pricingOptions}>
      <div 
        className={`${styles.pricingOption} ${styles.monthlyOption}`}
        onClick={() => handlePlanSelection('monthly')}
      >
        <h3><FaMoneyBillWave className={styles.optionIcon} /> Monthly</h3>
        <p className={styles.price}>40 <span>Pula</span></p>
        <ul className={styles.features}>
          <li><FaCheck /> Full access</li>
          <li><FaCheck /> Billed monthly</li>
        </ul>
      </div>
      <div 
        className={`${styles.pricingOption} ${styles.semesterOption}`}
        onClick={() => handlePlanSelection('semester')}
      >
        <div className={styles.popularBadge}><FaStar /> Best Value</div>
        <h3><FaSchool className={styles.optionIcon} /> Semester</h3>
        <p className={styles.price}>50 <span>Pula</span></p>
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
            <p>Enter amount: <strong>{selectedPlan === 'monthly' ? '40' : '50'} Pula</strong></p>
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
    <div className={styles.pricingAndPaymentWrapper}>
      {renderContent()}
    </div>
  );
};

export default PricingAndPayment;
