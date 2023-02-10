import Head from 'next/head';
import PostBox from '@/components/PostBox';

export default function Home() {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      <PostBox />
      <div className="flex">{/* Feed */}</div>
    </div>
  );
}
