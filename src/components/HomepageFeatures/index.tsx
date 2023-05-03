import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Img: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy',
    Img: "img/index/easy.png",
    description: (
      <>
        Our API makes it easy to access liquidity pool data.
      </>
    ),
  },
  {
    title: 'Fast',
    Img: "img/index/fast.png",
    description: (
      <>
        Less than 2ms processing time and 1000+ requests per second.
      </>
    ),
  },
  {
    title: 'Affordable',
    Img: "img/index/affordable.png",
    description: (
      <>
        Pay only for what you use with our <a href='https://www.blockchainapis.io/pricing.html' target='_blank'>on-demand plan</a>.
      </>
    ),
  },
];

function Feature({title, Img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Img} alt={title} className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
