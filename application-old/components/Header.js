import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";
import { ethers } from "ethers";

const Header = ({account, setAccount}) => {
  const router = useRouter();

  const connectHandler = async () => {
    const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }

  return (
    <div className={styles.container}>
      <div>
        <Link href={"/"} legacyBehavior>
          <a className={router.pathname == "/" ? styles.active : styles.link}>
            Claim
          </a>
        </Link>
        <Link href={"/nfts"} legacyBehavior>
          <a
            className={router.pathname == "/nfts" ? styles.active : styles.link}
          >
            NFTs
          </a>
        </Link>
        <Link href={"my-nfts/"} legacyBehavior>
          <a
            className={router.pathname == "/my-nfts" ? styles.active : styles.link}
          >
            My NFTs
          </a>
        </Link>
        <Link href={"write-note/"} legacyBehavior>
          <a
            className={router.pathname == "/write-note" ? styles.active : styles.link}
          >
            Write Note
          </a>
        </Link>
      </div>
      {/* <ConnectWallet colorMode="dark" accentColor="#9702c4" /> */}
      {account ? (
        <button
        
          type="button"
          className='nav__connect'
        >
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className='nav__connect'
          onClick={connectHandler}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Header;
