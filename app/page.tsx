import Image from "next/image"
import styles from "./page.module.css"
import Link from "next/link"

const Home = () => {
  return (
    <div className={styles.home}>
      <Image src="/hostelIcon.png" alt="logo" priority={true} width={100} height={100} />
      <p className={styles.caption_txt}>Unlock Your Adventure:<br /> Where Comfort Meets Affordability<br /> Book Your Home Away from Home with Ease<br /> on Our Hostel Haven App!</p>

      <Link href="/register" className={styles.btn}>click me</Link>
    </div>
  )
}
export default Home