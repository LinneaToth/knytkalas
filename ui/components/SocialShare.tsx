// "use client";
// import { useState } from "react";

// export default function SocialShare({ url, title }) {
//   const [copied, setCopied] = useState(false);

//   const handleNativeShare = async () => {
//     try {
//       await navigator.share({ title, url });
//     } catch (err) {
//       console.log("Error sharing:", err);
//     }
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.log("Failed to copy:", err);
//     }
//   };

//   const shareLinks = {
//     twitter: `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
//     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
//     linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`,
//   };
// }
