import Link from "next/link";
import TiThMenuOutline from "react-icons/ti";
import { FiMenu } from "react-icons/fi";
import styles from "../../styles/Header.module.css";
import { useState } from "react";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const navClasslist = isActive
    ? `${styles["main_nav"]} ${styles["active"]}`
    : styles.main_nav;

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_left}>
          <h2>Winnipeg Transit</h2>
        </div>

        <div className={styles.header_right}>
          <a href='#!' className={styles.nav_ico}>
            <FiMenu
              size={40}
              color='white'
              alt='NavIcon'
              onClick={() => {
                setIsActive(!isActive);
              }}
            />
          </a>
          <nav className={navClasslist}>
            <ul
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <li>
                <Link href='/'>
                  <a> Home </a>
                </Link>
              </li>
              <li>
                <Link href='/favorite'>
                  <a> Favorites </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
