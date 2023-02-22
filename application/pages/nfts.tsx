import {
    ThirdwebNftMedia,
    useContract,
    useMintNFTSupply,
    useNFTs,
  } from "@thirdweb-dev/react";
  import type { NextPage } from "next";
  import styles from "../styles/Nfts.module.css";
  
  const Nfts: NextPage = () => {
    const { contract } = useContract(
      "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
    );
    const { data: nfts, isLoading, error } = useNFTs(contract);
  
    return (
      <div className={styles.container}>
        <section className={styles.info}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            nfts?.map((nft) => {
              return (
                <div key={nft.metadata.id}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    height="100"
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
  