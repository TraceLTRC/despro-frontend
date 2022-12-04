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

      
    </div>
  )
}
