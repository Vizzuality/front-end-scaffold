import Head from 'next/head';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Welcome</title>
    </Head>
    <div>
      <h1>Welcome to Vizzuality Front End scaffold project.</h1>
      <p>Remember to edit:</p>
      <ul>
        <li>package.json</li>
        <li>pages/app.js</li>
        <li>now.json (Vercel)</li>
      </ul>
      <p>
        Also, we strongly recommend to read and follow our [Standardization
        guidelines](https://vizzuality.github.io/devismos/docs/guidelines/standardization/).
      </p>
    </div>
  </div>
);

export default Home;
