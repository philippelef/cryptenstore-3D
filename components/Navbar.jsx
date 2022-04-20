import { useRouter } from "next/router"
import styles from "../styles/Navbar.module.css"
import Link from "next/link"

const NavItem = ({ title, link }) => {
    const router = useRouter()

    return (
        <div className={`${styles.NavItemContainer} ${router.pathname === link ? styles.active : ''}`}>
            <Link href={link} passHref>
                <a>
                    {title}
                </a>
            </Link>
        </div >
    )
}


const Navbar = () => {
    return (
        <div className={styles.topNav}>
            <NavItem title="Home" link="/" />
            <NavItem title="about" link="/about" />
            <NavItem title="contact" link="/contact" />
        </div>
    )
}

export default Navbar;