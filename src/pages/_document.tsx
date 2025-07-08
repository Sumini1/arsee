import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Ganti favicon dengan logo Arsee */}
        <link rel="icon" href="/arsee.jpeg" />
        {/* Tambahan jika kamu punya versi khusus Apple */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FFB6C1" />
        <meta
          name="description"
          content="Arsee - Fashion Muslimah Elegan & Syar'i"
        />
      </Head>
      <body className="antialiased bg-white text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
