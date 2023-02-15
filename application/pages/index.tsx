import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.info}>
        <img className={styles.eyeLogo} src="./logo.svg" alt="logo" />
        <h1>The Car project.</h1>
        <p>Welcome to Car project.</p>
        <br />
        <Web3Button
          contractAddress="0x324cd8F28F1a83cdd67f2C79CC533bDe731aE3aB"
          action={(contract) => {
            contract.erc721.claim(1);
          }}
          colorMode="dark"
          accentColor="#9702c4"
        >
          {" "}
          Claim Car
        </Web3Button>
      </section>
    </div>
  );
};

export default Home;
