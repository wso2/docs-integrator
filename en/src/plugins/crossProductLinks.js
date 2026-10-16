/**
 * Remark plugin: lets markdown link to a SIBLING product's docs without
 * hardcoding the production path.
 *
 * Each product (saas, integrator, connectors) is a separate Docusaurus
 * build, so a relative `.md` link to another product's page is always a
 * broken link, and a hardcoded `/integration-platform/docs/<product>/...`
 * path only works on the real production host (a fork's GitHub Pages
 * serves everything one level deeper, under `/<repo-name>/`). Author such
 * links as
 *
 *     [Create a project](product://integrator/develop-and-test/create-workspace)
 *     [Keystores](product://saas/deploy-and-run/secure/keystore-truststore#overview)
 *
 * and this plugin rewrites them at build time to
 * `pathname://<CROSS_PRODUCT_BASE><product>/<path>` -- a plain `<a>` to the
 * sibling site (the same `pathname://` escape hatch the navbar uses), which
 * Docusaurus's broken-link check skips. `base` comes from
 * themeConfig.ts's CROSS_PRODUCT_BASE, so production and fork builds both
 * resolve correctly from the same markdown.
 *
 * Register per branch in docusaurus.config.ts (docs.remarkPlugins):
 *     remarkPlugins: [[require('./src/plugins/crossProductLinks'), { base: CROSS_PRODUCT_BASE }]]
 *
 * Walks the tree by hand (no unist-util-visit) so it works without adding
 * a dependency or caring about CJS/ESM interop.
 */
const PREFIX = 'product://';

function rewrite(url, base) {
  if (typeof url !== 'string' || !url.startsWith(PREFIX)) return url;
  const rest = url.slice(PREFIX.length).replace(/^\/+/, '');
  return `pathname://${base}${rest}`;
}

function walk(node, base) {
  if ((node.type === 'link' || node.type === 'definition') && node.url) {
    node.url = rewrite(node.url, base);
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => walk(child, base));
  }
}

module.exports = function crossProductLinks(options = {}) {
  const base = options.base || '/integration-platform/docs/';
  return (tree) => walk(tree, base);
};
