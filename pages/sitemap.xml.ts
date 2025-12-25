import { GetServerSideProps } from 'next';

const SITE_URL = 'https://rentmybooks.in';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    // Static pages
    const staticPages = [
        '',
        '/#books',
        '/about',
        '/contact',
    ];

    const staticUrls = staticPages
        .map((path) => {
            return `
      <url>
        <loc>${SITE_URL}${path}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`;
        })
        .join('');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${staticUrls}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
};

export default Sitemap;
