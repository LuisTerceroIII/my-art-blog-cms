"use client"

import styles from "./page.module.css";
import Form from "./components/form/form";
import { Signature } from "./components/signature/signature";

export default function Home() {
	
	return (
		<main className={styles.main}>
			<Signature png classes={styles.signature}/>
			<Form/>
		</main>
	);
}
