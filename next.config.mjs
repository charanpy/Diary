/** @type {import('next').NextConfig} */
import PWA from "next-pwa";

const nextConfig = {};
const withPWA = PWA({
  dest: "public", // Destination directory for the PWA files
  disable: false,
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});
export default withPWA(nextConfig);
