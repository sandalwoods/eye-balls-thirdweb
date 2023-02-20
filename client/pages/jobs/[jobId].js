import { useRouter } from "next/router";
import Header from "../components/Header";
import styles from "../../styles/Job.module.css"
import { useState } from "react";

const Job = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [account, setAccount] = useState(null);

  return (
    <div className={styles.container}>
      <Header account={account} setAccount={setAccount} />
      <div>{jobId}</div>
    </div>
  );
};

export default Job;
