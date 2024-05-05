"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useParams, usePathname } from "next/navigation";

export default function Specialization({
  params,
}: {
  params: { specialization: string };
}) {
  const pathname = usePathname();
  console.log(pathname);
  console.log(params.specialization);

  return (
    <>
      <h1>Specialization</h1>
      <h3>{pathname}</h3>
      <div className={styles.link}>
        <Link href="/">Home</Link>
      </div>
      <br />
      <div className={styles.link}>
        <Link href="/career_advisor">career_advisor</Link>
      </div>
      <br />
      <div className={styles.link}>
        <Link href="/cv_creator">cv_creator</Link>
      </div>
      <br />
      <div className={styles.link}>
        <Link href="/offer_scraping">offer_scraping</Link>
      </div>
      <br />
      <div className={styles.link}>
        <Link href="/statistics">statistics</Link>
      </div>
      <br />
      <div className={styles.link}>
        <Link href="/your_career">your_career</Link>
      </div>
      <br />
      <div className={styles.link}>
        <Link href="/machine_learning">Machine learning </Link>
      </div>
      <br />
      <div className={styles.link}>
        <Link href="/deep_learning">deep learning </Link>
      </div>
    </>
  );
}
