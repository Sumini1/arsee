import { GrInstagram } from "react-icons/gr";
import { SiShopee } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import React from "react";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  fallbackUrl?: string; // URL alternatif jika primary gagal
  icon?: React.ReactNode;
  description?: string;
  isExternal: boolean;
}

export const socialLinks: LinkItem[] = [
  {
    id: "instagram",
    title: "Instagram",
    url: "instagram://user?username=arsee.id",
    fallbackUrl: "https://www.instagram.com/arsee.id",
    icon: <GrInstagram className="w-5 h-5" />,
    description: "Follow us on Instagram",
    isExternal: true,
  },
  {
    id: "shopee",
    title: "Shopee",
    url: "https://shopee.co.id/arseeindonesia",
    icon: <SiShopee className="w-5 h-5" />,
    description: "Shop on Shopee",
    isExternal: true,
  },
];

export const contactLinks: LinkItem[] = [
  {
    id: "admin1",
    title: "Admin 1",
    url: "https://wa.me/62895607462853?text=Halo%20Admin%201,%20saya%20ingin%20bertanya",
    icon: <FaWhatsapp className="w-5 h-5" />,
    description: "Chat with Admin 1",
    isExternal: true,
  },
  // {
  //   id: "admin2",
  //   title: "Admin 2",
  //   url: "https://wa.me/6285719329232?text=Halo%20Admin%202,%20saya%20ingin%20bertanya",
  //   icon: <FaWhatsapp className="w-5 h-5" />,
  //   description: "Chat with Admin 2",
  //   isExternal: true,
  // },
];

export const paymentLinks: LinkItem[] = [
  {
    id: "transfer",
    title: "Pembayaran Transfer",
    url: "/links/transferPage",
    icon: <MdPayment className="w-5 h-5" />,
    description: "Bank Transfer Payment",
    isExternal: false,
  },
  {
    id: "qris",
    title: "Pembayaran QRIS",
    url: "/links/qrisPage",
    icon: <MdPayment className="w-5 h-5" />,
    description: "QRIS Payment",
    isExternal: false,
  },
];

// Gabungan semua links
export const allLinks: LinkItem[] = [
  ...socialLinks,
  ...contactLinks,
  ...paymentLinks,
];

// Utility functions
export const getLinkById = (id: string): LinkItem | undefined => {
  return allLinks.find((link) => link.id === id);
};

export const getLinksByType = (
  type: "social" | "contact" | "payment"
): LinkItem[] => {
  switch (type) {
    case "social":
      return socialLinks;
    case "contact":
      return contactLinks;
    case "payment":
      return paymentLinks;
    default:
      return [];
  }
};
