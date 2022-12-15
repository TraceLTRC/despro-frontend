import Head from 'next/head'
import React, { useState } from 'react';
import BikunChart from '../charts/bikun-chart';
import KantekChart from '../charts/kantek-chart';

import { Modal } from 'flowbite-react'

export default function Home() {
  const [isModalVisible, setModalVisiblity] = useState(false);

  return (
    <>
      <Head>
        <title>Keramaian FTUI</title>
        <meta name="description" content="Aplikasi untuk melihat status keramaian lokasi-lokasi di FTUI" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="color-scheme" content="dark"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className='flex flex-col font-sans mx-4 md:mx-24 lg:mx-32 xl:mx-48 2xl:mx-64 h-screen items-stretch'>
          <h1 className='text-center tracking-tight text-6xl font-light mt-2'>Keramaian FTUI</h1>
          <div className='text-center text-lg mt-4'>Keramaian Kantin Teknik</div>
          <div className='my-4 basis-1/2 text-center'>
            <KantekChart />
          </div>
          <div className='text-center text-lg'>Keramaian Halte Teknik</div>
          <div className='my-4 basis-1/2 text-center'>
            {/* <BikunChart /> */}
            <p>Coming soon!</p>
          </div>
        </div>
        <div className="overflow-clip fixed top-0 right-0">
          <button onClick={() => setModalVisiblity(true)} className="w-20 h-20 bg-blue-700 fab-clip pl-8 pb-8 text-3xl font-sans">?</button>
        </div>

        <Modal show={isModalVisible} onClose={() => setModalVisiblity(false)}>
          <Modal.Header>Ini aplikasi apa?</Modal.Header>
          <Modal.Body>
            Selamat datang di aplikasi keramaian FTUI!
            <br/>
            Aplikasi ini berguna untuk melihat kondisi keramaian di beberapa lokasi FTUI seperti <b>Kantin Teknik</b> dan <b>Halte Teknik</b>
            <br/>
            <br/>
            Aplikasi ini bekerja dengan menghitung banyaknya divais yang berada di suatu area. Dengan mengasumsikan bahwa satu divais sama dengan satu orang, maka kita dapat menghitung keramaian suatu lokasi.
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
