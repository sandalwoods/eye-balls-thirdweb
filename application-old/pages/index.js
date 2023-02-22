// import { Web3Button } from "@thirdweb-dev/react";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers"

const Home = () => {
  const [account, setAccount] = useState(null)

  return (
    <div className={styles.container}>
      <Header account={account} setAccount={setAccount} />

      <section className={styles.info}>
        <img className={styles.eyeLogo} src="./logo.svg" alt="logo" />
        <h1>The Car project.</h1>
        <p>Welcome to Car project.</p>
        <br />
        
      </section>
    </div>
  );
};

export default Home;
