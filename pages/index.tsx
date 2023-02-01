import Header from '@/components/Header';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>
      <Header />
    </>
  );
}
