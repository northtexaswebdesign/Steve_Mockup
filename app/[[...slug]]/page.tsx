import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), 'content/pages');
  if (!fs.existsSync(pagesDir)) return [];
  const files = fs.readdirSync(pagesDir).filter((f: string) => f.endsWith('.json'));
  
  return files.map((file: string) => {
    const data = JSON.parse(fs.readFileSync(path.join(pagesDir, file), 'utf8'));
    const pathParts = data.path === '/' ? [] : data.path.replace(/^//, '').split('/');
    return { slug: pathParts };
  });
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  const currentPath = '/' + (params.slug?.join('/') || '');
  const pagesDir = path.join(process.cwd(), 'content/pages');
  let pageData = null;
  
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir).filter((f: string) => f.endsWith('.json'));
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(pagesDir, file), 'utf8'));
      if (data.path === currentPath || data.path === currentPath + '/') {
        pageData = data;
        break;
      }
    }
  }

  if (!pageData) {
    return <div>Page not found: {currentPath}</div>;
  }

  return (
    <main>
      {pageData.sections?.map((sec: any, i: number) => {
        if (sec.type === 'custom_html') {
          return <div key={i} dangerouslySetInnerHTML={{ __html: sec.html }} />;
        }
        return null;
      })}
    </main>
  );
}