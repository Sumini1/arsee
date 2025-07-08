import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaCopy, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
  color: string;
  logo?: string;
}

const bankAccounts: BankAccount[] = [
  {
    bank: "Bank BSI",
    accountNumber: "7233399684",
    accountName: "Arij Hanun Athaya",
    color: "from-blue-500 to-blue-600",
    // Optional: logo: "/images/bsi.png"
  },
];

export default function TransferPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, accountNumber: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    });
  };

  const openWhatsApp = () => {
    const message =
      "Halo Admin, saya sudah melakukan transfer. Berikut bukti transfernya:";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/62895607462853?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-pink-100 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <MdAccountBalance className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Pembayaran Transfer Bank
          </h1>
          <p className="text-gray-600 text-sm">
            Pilih rekening bank untuk melakukan transfer
          </p>
        </div>

        {/* Bank Accounts */}
        <div className="space-y-4 mb-8">
          {bankAccounts.map((account) => (
            <div
              key={account.accountNumber}
              className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${account.color} p-4`}>
                <h3 className="text-white font-semibold text-lg">
                  {account.bank}
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nomor Rekening</p>
                    <p className="text-xl font-bold text-gray-800">
                      {account.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        account.accountNumber,
                        account.accountNumber
                      )
                    }
                    className="p-2 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors"
                    title="Salin nomor rekening"
                  >
                    {copiedAccount === account.accountNumber ? (
                      <FaCheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <FaCopy className="w-4 h-4 text-pink-600" />
                    )}
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-sm text-gray-500 mb-1">Atas Nama</p>
                  <p className="font-medium text-gray-800">
                    {account.accountName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">
            📋 Cara Transfer:
          </h3>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Pilih salah satu rekening di atas</li>
            <li>Transfer sesuai nominal yang diminta</li>
            <li>Simpan bukti transfer</li>
            <li>Kirim bukti ke Admin WhatsApp</li>
          </ol>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center gap-3"
        >
          <FaWhatsapp className="w-5 h-5" />
          Kirim Bukti Transfer ke Admin
        </button>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Transfer akan diverifikasi maksimal 1x24 jam
          </p>
        </div>
      </main>
    </div>
  );
}
