import React from "react";
import styles from "../styles/JobCard.module.css";
import Header from "./components/Header";
import { useState } from "react";

const jobs = () => {
  const [account, setAccount] = useState(null);
  return (
    <div className={styles.container}>
      <Header account={account} setAccount={setAccount} />
      <div>{account}</div>
    </div>
  );
  
};

export default jobs;
