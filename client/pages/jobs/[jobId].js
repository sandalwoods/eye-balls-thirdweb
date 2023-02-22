import { useRouter } from "next/router";
import Header from "../components/Header";
import styles from "../../styles/Job.module.css";
import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import JobMarketplace from "../../const/JobMarketplace.json";
import config from "../../const/JobMarketplaceAddress.json";

const Job = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [account, setAccount] = useState(null);
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [jobMarketplace, setJobMarketplace] = useState(null);

  const getJob = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const jobMarketplace = new ethers.Contract(
      config[network.chainId].JobMarketplace[0.0],
      JobMarketplace,
      provider
    );
    setJobMarketplace(jobMarketplace);

    const job = await jobMarketplace.getJob(jobId);
    if (job) {
      setJob(job);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (jobId != null) {
      getJob();
    }
  }, [jobId]);

  const completeJob = async () => {
    const signer = await provider.getSigner();
    const transaction = await jobMarketplace
      .connect(signer)
      .mint(jobId, { value: job.cost });
    await transaction.wait();
    console.log("done job")
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Header account={account} setAccount={setAccount} />
      <div className={styles.card}>
        {job && (
          <>
            <div className={styles.card__info}>{job.name}</div>
            <div className={styles.card__info}>
              {ethers.utils.formatUnits(BigNumber.from(job.cost), "ether")}
            </div>
          </>
        )}
        <button
          type="button"
          className={styles.card__button}
          onClick={() => completeJob()}
        >
          Complete Job
        </button>
      </div>
    </div>
  );
};

export default Job;
