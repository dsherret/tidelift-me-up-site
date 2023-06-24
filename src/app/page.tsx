import { PackageOwnership } from "tidelift-me-up";
import { PackageEstimate, tideliftMeUp } from "tidelift-me-up";

import { OptionsForm } from "~/components/OptionsForm";
import { ResultDisplay } from "~/components/ResultDisplay";

import styles from "./page.module.css";

export interface HomeProps {
	searchParams: Record<string, unknown>;
}

export default async function Home({ searchParams }: HomeProps) {
	const options = {
		ownership: searchParams["ownership"] as PackageOwnership[],
		since: (searchParams["since"] || undefined) as string | undefined,
		username: searchParams["username"] as string,
	};
	let result: Error | PackageEstimate[] | undefined;

	try {
		result = options.username ? await tideliftMeUp(options) : undefined;
	} catch (error) {
		result = error as Error;
	}

	return (
		<>
			<main className={styles.main}>
				<h1 className={styles.h1}>tidelift-me-up</h1>
				<p className={styles.p}>
					Find your npm packages eligible for Tidelift funding 💸
				</p>
				<OptionsForm options={options} />
				<ResultDisplay result={result} />
			</main>
			<footer className={styles.footer}>
				Designed with 💙 by{" "}
				<a href="https://joshuakgoldberg.com" target="_blank">
					Josh Goldberg
				</a>{" "}
				and{" "}
				<a href="TODO" target="_blank">
					Kathryn Grayson Nanz
				</a>
				.
				<br />
				<br />
				<a
					href="https://github.com/JoshuaKGoldberg/tidelift-me-up"
					target="_blank"
				>
					CLI repo
				</a>{" "}
				/{" "}
				<a
					href="https://github.com/JoshuaKGoldberg/tidelift-me-up-site"
					target="_blank"
				>
					Website repo
				</a>
			</footer>
		</>
	);
}
