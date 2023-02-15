import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

const Header: React.FC = () => {
  const router = useRouter();

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
      <ConnectWallet colorMode="dark" accentColor="#9702c4" />
    </div>
  );
};

export default Header;
