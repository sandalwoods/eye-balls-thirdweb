import { useRouter } from "next/router";
import Header from "../components/Header";
import styles from "../../styles/Job.module.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import JobMarketplace from "../../const/JobMarketplace.json";
import config from "../../const/JobMarketplaceAddress.json";

const Job = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [account, setAccount] = useState(null);
  const [job, setJob] = useState(null);

  const getJob = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const network = await provider.getNetwork();
    const jobMarketplace = new ethers.Contract(
      config[network.chainId].JobMarketplace[0],
      JobMarketplace,
      provider
    );

    const job = await jobMarketplace.getJob(jobId);

    setJob(job);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    if (jobId != null) {
      getJob()
    }    
  }, [jobId]);

  console.log(job);

  return (
    <div className={styles.container}>
      <Header account={account} setAccount={setAccount} />
      <div className={styles.card}>
        {/* <div className={styles.card__info}>{job?.cost.toString()}</div> */}
        {/* <div className={styles.card__info}>{ethers.utils.parseEther("1.0")}</div> */}
        <p>{ethers.utils.formatUnits(job.cost, 'ether')}</p>
      </div>
    </div>
  );
};

export default Job;
