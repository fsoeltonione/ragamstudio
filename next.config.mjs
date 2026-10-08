/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: '/packages', destination: '/package-management/packages', permanent: false },
      { source: '/locations', destination: '/locations-management/locations', permanent: false },
      { source: '/reviews', destination: '/review-moderation', permanent: false },
      { source: '/medical', destination: '/medical-management/medical-questions', permanent: false },
      // To support the new structures without moving the actual folders, 
      // we'll rewrite instead of redirect, or better yet, move the folders.
      // Wait, let's use rewrites so the URL in the browser shows the long version
      // but it serves from the short version folder. 
    ];
  },
  async rewrites() {
    return [
      { source: '/package-management/packages', destination: '/packages' },
      { source: '/package-management/packages/create', destination: '/packages/create' },
      { source: '/locations-management/locations', destination: '/locations' },
      { source: '/locations-management/locations/create', destination: '/locations/create' },
      { source: '/medical-management/medical-questions', destination: '/medical' },
      { source: '/medical-management/medical-questions/create', destination: '/medical/create' },
      { source: '/shop-management/shop-products', destination: '/shop-management/products' },
      { source: '/shop-management/shop-purchases', destination: '/shop-management/purchases' },
      { source: '/shop-management/shop-sales', destination: '/shop-management/sales' },
      { source: '/shop-management/shop-vendors', destination: '/shop-management/vendors' },
      { source: '/shop-management/shop-stock-adjustments', destination: '/shop-management/stock-adjustments' }
    ];
  }
};

export default nextConfig;
