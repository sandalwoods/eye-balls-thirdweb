import { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from "../../styles/JobCard.module.css";

const JobCard = ({ job }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <h3>{job.name}</h3>

        <p>
          <>
            <strong>
              {ethers.utils.formatUnits(job.cost.toString(), "ether")}
            </strong>
            ETH
          </>
        </p>
      </div>
      <button
        type="button"
        className={styles.card__button}
        onClick={() => console.log("")}
      >
        Buy it
      </button>
    </div>
  );
};

export default JobCard;
