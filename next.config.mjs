/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_ROUTE: process.env.API_ROUTE,
        WEBSOCKET_ROUTE: process.env.WEBSOCKET_ROUTE
    }
};

export default nextConfig;
