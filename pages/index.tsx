import Head from 'next/head';
import PostBox from '@/components/PostBox';

export default function Home() {
  return (
    <>
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      <PostBox />
      <div>{/* Feed */}</div>
    </>
  );
}
