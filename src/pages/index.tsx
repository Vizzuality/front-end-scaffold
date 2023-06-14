import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Welcome</title>
    </Head>
    <div className="prose p-20">
      <h1>Welcome to Vizzuality Front End scaffold project.</h1>
      <p>Remember to edit:</p>
      <ul>
        <li>package.json</li>
        <li>pages/app.js</li>
      </ul>
      <p>
        Also, we strongly recommend to read and follow our{' '}
        <a
          href="https://vizzuality.github.io/devismos/docs/guidelines/standardization/"
          target="_blank"
        >
          Standardization guidelines
        </a>
      </p>
      <p>
        Don&apos;t forget to check the <Link href="/docs">Documentation</Link>
      </p>
    </div>
  </div>
);

export default Home;
