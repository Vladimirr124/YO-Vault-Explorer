/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      // ConnectKit/wagmi optional deps (browser build doesn't need them)
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false,
    };
    return config;
  },
};

export default nextConfig;
