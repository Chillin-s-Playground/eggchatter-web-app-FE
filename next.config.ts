import type { NextConfig } from "next";


const giphyDomains = [
  'media0.giphy.com', 
  'media1.giphy.com', 
  'media2.giphy.com', 
  'media3.giphy.com', 
  'media4.giphy.com', 
  'giphy.com'
];

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/webp'],
    domains: giphyDomains
  }
};

export default nextConfig;
