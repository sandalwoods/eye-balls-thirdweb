import {
  ThirdwebNftMedia,
  useContract,
  useMintNFTSupply,
  useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/Nfts.module.css";

const Nfts: NextPage = () => {
  const { contract } = useContract(
    "0x324cd8F28F1a83cdd67f2C79CC533bDe731aE3aB"
  );
  const { data: nfts, isLoading, error } = useNFTs(contract);

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.info}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          nfts?.map((nft) => {
            return (
              <div key={nft.metadata.id}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  height="200"
                  style={{ borderRadius: "10px" }}
                />
                <p>{nft.metadata.name}</p>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Nfts;
