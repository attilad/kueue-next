import { Inter } from "next/font/google";
import styles from "@/styles/index.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

import { useShowSingers } from "../hooks/useKaraoke";
import { SingerCard } from "@/components";
import { useSingerSubscription } from "@/hooks/useSocket";

export default function Home() {
  useSingerSubscription();
  const { singers, isLoading } = useShowSingers();

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <h1 className={styles.title}>Karaoke Queue</h1>
      <div className={styles.grid}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          singers &&
          singers.map((singer, index) => (
            <SingerCard
              key={index}
              name={singer}
              isCurrent={index === 0}
              isNext={index === 1}
            />
          ))
        )}
      </div>
    </main>
  );
}
