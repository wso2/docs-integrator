import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './contribute.module.css';

/** Per-branch, not shared: the GitHub link below points at this
 * branch's own CONTRIBUTING.md, same file `sharedContributeNavbarItem`
 * used to link straight to (this page replaces that direct link -- the
 * navbar item now points here instead, see theme-shared/themeConfig.ts). */
const BRANCH = 'main';

function GithubIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5.01 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const STEPS = [
  {
    title: 'Find something to fix',
    text: 'A typo, an outdated screenshot, a missing step, or a page you wish existed. Open an issue first for anything larger than a small fix.',
  },
  {
    title: 'Fork and branch',
    text: `Fork wso2/docs-integrator and branch from ${BRANCH} -- that's this site's own source branch.`,
  },
  {
    title: 'Make your change',
    text: 'Follow the existing page structure and style. Small, focused pull requests are easier to review than large ones.',
  },
  {
    title: 'Open a pull request',
    text: `Target the ${BRANCH} branch. A maintainer will review it and may ask for changes before merging.`,
  },
];

export default function Contribute(): ReactNode {
  return (
    <Layout title="Contribute" description="How to contribute to the WSO2 Integration Platform documentation.">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Heading as="h1">Contribute</Heading>
          <p className={styles.heroSubtitle}>
            These docs are open source. Fixes, clarifications, and new guides are all welcome --
            here's how to send one.
          </p>
          <a
            className={styles.githubBtn}
            href={`https://github.com/wso2/docs-integrator/blob/${BRANCH}/CONTRIBUTING.md`}
            target="_blank"
            rel="noopener noreferrer">
            <GithubIcon />
            Read the full contributing guide
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <div>
                <Heading as="h3" className={styles.stepTitle}>
                  {step.title}
                </Heading>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.footerNote}>
          <p>
            Full guidelines -- section ownership, what's shared vs. per-branch content, and the
            release process -- live in{' '}
            <a
              href={`https://github.com/wso2/docs-integrator/blob/${BRANCH}/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer">
              CONTRIBUTING.md
            </a>{' '}
            on GitHub.
          </p>
        </div>
      </main>
    </Layout>
  );
}
