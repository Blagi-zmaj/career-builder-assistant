import Link from "next/link"
import styles from './page.module.css'

export default function OfferScraping(){
    return (
        <>
            <h1>OfferScraping</h1>
            <div className={styles.link}><Link href="/">Home</Link></div>
            <br/>
            <div className={styles.link}><Link href="/career_advisor">career_advisor</Link></div>
            <br/>
            <div className={styles.link}><Link href="/cv_creator">cv_creator</Link></div>
            <br/>
            <div className={styles.link}><Link href="/offer_scraping">offer_scraping</Link></div>
            <br/>
            <div className={styles.link}><Link href="/statistics">statistics</Link></div>
            <br/>
            <div className={styles.link}><Link href="/your_career">your_career</Link></div>
            <br/>
            <div className={styles.link}><Link href="/machine_learning">dynamic specialization </Link></div>
            <br />
            <div className={styles.link}><Link href="/deep_learning">deep learning </Link></div>
        </>
    )
}