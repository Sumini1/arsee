// app/(your-path)/qris/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function QRISPage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = "/qris.jpeg";
    link.download = "qris-arsee.jpeg";
    link.click();
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Halo Admin, saya sudah melakukan pembayaran via QRIS. Berikut bukti pembayarannya:"
    );
    window.open(`https://wa.me/62895607462853?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        {/* Title */}
        <section className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Pembayaran QRIS
          </h1>
          <p className="text-gray-600 text-sm">
            Scan QR Code untuk melakukan pembayaran
          </p>
        </section>

        {/* QR Card */}
        <section className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden mb-6">
          {/* Card Header */}
          <div className="bg-purple-600 p-4 flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              QRIS Payment
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadQR}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                title="Download QR Code"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => setShowFullscreen(true)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                title="Lihat Fullscreen"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* QR Image */}
          <div className="p-6">
            <div className="relative max-w-xs mx-auto">
              {!imageLoaded && !imageError && (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              )}

              {imageError && (
                <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 text-sm">
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>QR Code gagal dimuat</span>
                </div>
              )}

              <Image
                src="/qris.jpeg"
                alt="QRIS Arsee"
                width={500}
                height={500}
                className={`rounded-lg shadow-md cursor-pointer transition-opacity duration-300 ${
                  imageLoaded
                    ? "opacity-100"
                    : "opacity-0 absolute top-0 left-0"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                onClick={
                  imageLoaded ? () => setShowFullscreen(true) : undefined
                }
              />
            </div>

            {imageLoaded && !imageError && (
              <p className="mt-4 text-center text-sm text-gray-600">
                Klik gambar untuk memperbesar
              </p>
            )}
          </div>
        </section>

        {/* Steps & App Support (Keep your existing HTML here, cleanly organized) */}
        {/* ... */}

        {/* WhatsApp CTA */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Kirim Bukti Pembayaran ke Admin
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          Pembayaran akan diverifikasi maksimal 1x24 jam
        </p>
      </main>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute -top-12 right-0 text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            <img
              src="/qris.jpeg"
              alt="QRIS Fullscreen"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
