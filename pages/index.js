import Head from 'next/head'
import BikunChart from '../charts/bikun-chart';
import KantekChart from '../charts/kantek-chart';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Keramaian FTUI</title>
        <meta name="description" content="Aplikasi untuk melihat status keramaian lokasi-lokasi di FTUI" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="color-scheme" content="light"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className='flex flex-col font-sans mx-4 md:mx-24 h-screen'>
          <h1 className='text-center tracking-tight text-6xl font-light mt-2'>Keramaian FTUI</h1>
          <div className='my-4 basis-1/2 text-center align-middle'>
            <KantekChart />
          </div>
          <div className='my-4 basis-1/2 text-center align-middle'>
            <BikunChart />
          </div>
        </div>
        <div className="overflow-clip fixed top-0 right-0">
          <button className="w-20 h-20 bg-blue-300 fab-clip pl-8 pb-8 text-3xl font-bold font-sans">?</button>
        </div>

      </div>

    </div>
  )
}
