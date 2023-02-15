import {
  useContract,
  useContractWrite,
  useMintNFTSupply,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/WriteNote.module.css";
import { useState } from "react";

const WriteNote: NextPage = () => {
  const { contract } = useContract(
    "0x324cd8F28F1a83cdd67f2C79CC533bDe731aE3aB"
  );
  const [id, setID] = useState("");
  const [note, setNote] = useState("");

  const {
    mutate: write,
    isLoading,
    error,
  } = useContractWrite(contract, "writeNote");

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.info}>
        <p className="label">ID:</p>
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        <p className="label">Note:</p>
        <textarea
          name="note"
          rows={10}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <br />
        <button disabled={isLoading} onClick={() => write([id, note])}>
          Write Note
        </button>
        <div style={{ width: "20px", alignItems: "center" }}>
          <Web3Button
            contractAddress="0x324cd8F28F1a83cdd67f2C79CC533bDe731aE3aB"
            action={async (contract) => {
              await contract.call("writeNote", id, note);
            }}
            colorMode="dark"
            accentColor="#9702c4"
          >
            {" "}
            Write Note
          </Web3Button>
        </div>

        {error ? <p>{error.toString()}</p> : null}
      </section>
    </div>
  );
};

export default WriteNote;
