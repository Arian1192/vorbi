/** @type {import('next').NextConfig} */
const dotenv = require('dotenv')

dotenv.config({
  path: '.env.local '
})

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
  },
  publicRuntimeConfig: {
    APP_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
  }
}

module.exports = nextConfig
