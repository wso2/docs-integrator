const fs = require('fs');
const path = require('path');
const { processMarkdownFile } = require('./mdxProcessor');

module.exports = function pluginMarkdownExport(context, options = {}) {
  const { siteDir } = context;
  let loadedContent;

  // Recursively find all .md and .mdx files
  function findMarkdownFiles(dir, baseDir = dir) {
    const files = [];
    if (!fs.existsSync(dir)) return files;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findMarkdownFiles(fullPath, baseDir));
      } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
        // Skip hidden files and category files
        if (entry.name.startsWith('.') || entry.name.startsWith('_') || entry.name === 'category.json') continue;

        const relativePath = path.relative(baseDir, fullPath);
        // Convert to slug (remove extension, use forward slashes)
        const slug = relativePath.replace(/\.(md|mdx)$/, '').split(path.sep).join('/');
        files.push({ fullPath, slug });
      }
    }
    return files;
  }

  // Docs to export, keyed by Docusaurus doc id. The copy-page button
  // (theme/Navbar/CopyPageButton.tsx) requests `/docs/<doc id>.md`, and a
  // doc id is NOT the source file's path relative to `docs/`: it is
  // relative to the docs plugin's own `path` (connectors sets
  // docs/connectors), and Docusaurus collapses `foo/foo.md` to `foo`.
  // Deriving the output name from the file path therefore 404s for every
  // connectors page and every folder index page, so take ids from the docs
  // plugin itself.
  function docsFromPluginContent(allContent) {
    const byPlugin = allContent && allContent['docusaurus-plugin-content-docs'];
    if (!byPlugin) return null;
    const files = [];
    for (const content of Object.values(byPlugin)) {
      const versions = content.loadedVersions || [];
      // Only the version served at the site root; the button always asks
      // for the active doc's id, which the older versions would collide on.
      const version = versions.find((v) => v.isLast) || versions[0];
      if (!version) continue;
      for (const doc of version.docs) {
        if (!doc.source || !doc.source.startsWith('@site/')) continue;
        files.push({
          fullPath: path.join(siteDir, doc.source.slice('@site/'.length)),
          slug: doc.id,
        });
      }
    }
    return files;
  }

  // Export markdown files
  async function exportAllDocs(outputBaseDir, allContent) {
    let totalExported = 0;
    const docsDir = path.join(siteDir, 'docs');

    if (!fs.existsSync(docsDir)) {
      console.warn('[markdown-export] docs directory not found');
      return 0;
    }

    const files = docsFromPluginContent(allContent) || findMarkdownFiles(docsDir);
    console.log(`[markdown-export] Processing ${files.length} docs`);

    for (const { fullPath, slug } of files) {
      const outputPath = path.join(outputBaseDir, 'docs', slug + '.md');

      try {
        const sourceContent = fs.readFileSync(fullPath, 'utf-8');
        const cleanMarkdown = await processMarkdownFile(
          sourceContent,
          {}, // No constants for now
          path.dirname(fullPath)
        );

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, cleanMarkdown);
        totalExported++;
      } catch (error) {
        console.error(`[markdown-export] Error processing ${fullPath}:`, error.message);
      }
    }

    return totalExported;
  }

  return {
    name: 'docusaurus-plugin-markdown-export',

    // Generate during development. allContentLoaded (not loadContent) so
    // the docs plugin's ids are available.
    async allContentLoaded({ allContent }) {
      loadedContent = allContent; // postBuild isn't handed allContent
      if (process.env.NODE_ENV === 'production') return; // postBuild handles it
      console.log('[markdown-export] Generating markdown files for development...');
      const staticDocsDir = path.join(siteDir, 'static');
      const totalExported = await exportAllDocs(staticDocsDir, allContent);
      console.log(`[markdown-export] Exported ${totalExported} markdown files to static/docs/`);
    },

    // Generate during build
    async postBuild({ outDir }) {
      console.log('[markdown-export] Generating markdown files for build...');
      const totalExported = await exportAllDocs(outDir, loadedContent);
      console.log(`[markdown-export] Exported ${totalExported} markdown files to build/docs/`);
    },
  };
};
