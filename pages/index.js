import Head from 'next/head'
import Image from 'next/image'
import {Container, Row, Col, Button, ProgressBar, Card} from 'react-bootstrap';
import BikunChart from '../charts/bikun-chart';
import KantekChart from '../charts/kantek-chart';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Keramaian FTUI</title>
        <meta name="description" content="Aplikasi untuk melihat status keramaian lokasi-lokasi di FTUI" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="color-scheme" content="dark light"></meta>
        <style></style>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container vh-100'>
        <div className='row ratio ratio-16x9 h-50 justify-content-center mx-auto'>
          <KantekChart/>
        </div>
        <div className='row ratio ratio-16x9h h-50 justify-content-center mx-auto'>
          <BikunChart/>
        </div>
      </div>
    </div>
  )
}
