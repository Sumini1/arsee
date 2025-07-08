import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { allLinks, LinkItem } from "../components/data/links";

// Component untuk individual link button
const LinkButton = ({ link }: { link: LinkItem }) => {
  const [isClicked, setIsClicked] = useState(false);

  const openLink = (url: string) => {
    try {
      // Coba buka di tab baru
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");

      // Jika window.open gagal atau diblokir
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        // Fallback: redirect di tab yang sama
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error opening link:", error);
      // Fallback terakhir
      window.location.href = url;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);

    // Reset animation state
    setTimeout(() => setIsClicked(false), 200);

    console.log(`Clicked: ${link.title} - ${link.url}`);

    if (link.isExternal) {
      // Untuk Instagram, coba buka app dulu, lalu fallback ke web
      if (link.id === "instagram") {
        // Coba buka Instagram app
        const timeout = setTimeout(() => {
          // Jika app tidak terbuka dalam 1 detik, buka web version
          if (link.fallbackUrl) {
            openLink(link.fallbackUrl);
          }
        }, 1000);

        // Coba buka deep link
        window.location.href = link.url;

        // Bersihkan timeout jika berhasil
        window.addEventListener("blur", () => {
          clearTimeout(timeout);
        });

        return;
      }

      // Untuk WhatsApp, coba beberapa format
      if (link.id.includes("admin")) {
        const whatsappUrls = [
          link.url, // wa.me link
          link.url.replace("wa.me", "api.whatsapp.com/send/?phone="), // alternative format
          link.url.replace("https://wa.me/", "whatsapp://send?phone="), // deep link
        ];

        let urlIndex = 0;
        const tryNextUrl = () => {
          if (urlIndex < whatsappUrls.length) {
            try {
              openLink(whatsappUrls[urlIndex]);
              urlIndex++;
            } catch (error) {
              console.error(`WhatsApp URL ${urlIndex} failed:`, error);
              urlIndex++;
              if (urlIndex < whatsappUrls.length) {
                setTimeout(tryNextUrl, 500);
              }
            }
          }
        };

        tryNextUrl();
        return;
      }

      // Untuk link lainnya
      openLink(link.url);
    } else {
      // Internal links
      window.location.href = link.url;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group w-full flex items-center justify-center gap-3 py-4 px-6 
        bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600
        text-white rounded-xl text-base font-medium shadow-lg border border-pink-300
        transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50
        ${isClicked ? "scale-95" : ""}
      `}
      aria-label={link.description || link.title}
    >
      <span className="flex items-center gap-3">
        <span className="group-hover:scale-110 transition-transform duration-200">
          {link.icon}
        </span>
        <span className="font-semibold">{link.title}</span>
      </span>
    </button>
  );
};

// Component untuk section links
const LinksSection = ({
  title,
  links,
}: {
  title: string;
  links: LinkItem[];
}) => {
  if (links.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <LinkButton key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
};

// Main component
export default function Home() {
  const socialLinks = allLinks.filter((link) =>
    ["instagram", "shopee"].includes(link.id)
  );

  const contactLinks = allLinks.filter((link) =>
    ["admin1", "admin2"].includes(link.id)
  );

  const paymentLinks = allLinks.filter((link) =>
    ["transfer", "qris"].includes(link.id)
  );

  return (
    <>
      <Head>
        <title>arseé.id | Links</title>
        <meta
          name="description"
          content="Temukan kami di berbagai platform dan hubungi admin kami"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white text-gray-800">
        <div className="flex items-center justify-center px-4 py-10 min-h-screen">
          <div className="w-full max-w-md">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <Image
                  src="/arse.png"
                  alt="arseé.id logo"
                  width={120}
                  height={120}
                  className="mx-auto rounded-full shadow-lg border-4 border-white"
                  priority
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🤍</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                arseé.id
              </h1>
              <p className="text-sm text-gray-600 mb-6 px-4">
                Temukan kami di platform berikut dan hubungi admin untuk
                informasi lebih lanjut
              </p>
            </div>

            {/* Links Sections */}
            <div className="space-y-6">
              <LinksSection title="Social Media & Store" links={socialLinks} />
              <LinksSection title="Contact Admin" links={contactLinks} />
              <LinksSection title="Payment Methods" links={paymentLinks} />
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                © 2025 arseé.id - All rights reserved
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
