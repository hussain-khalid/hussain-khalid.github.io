import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Technical documentation',
    Svg: require('@site/static/img/technical-docs-icon.svg').default,
    description: (
      <>
        Clear, comprehensive technical documentation that helps developers and users
        understand complex systems and processes.
      </>
    ),
    link: '/docs/developer-tools/create-a-document',
  },
  {
    title: 'API documentation',
    Svg: require('@site/static/img/api-docs-icon.svg').default,
    description: (
      <>
        Structured API guides with code examples, integration tutorials,
        and developer-friendly references.
      </>
    ),
    link: '/docs/developer-tools/deploy-your-site',
  },
  {
    title: 'User guides',
    Svg: require('@site/static/img/user-guides-icon.svg').default,
    description: (
      <>
        Step-by-step user guides and tutorials that make complex workflows
        accessible to users of all technical levels.
      </>
    ),
    link: '/docs/user-guides/congratulations',
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.featureLink}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
