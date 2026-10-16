/**
 * Swizzled from @docusaurus/theme-classic -- same real logo files, same
 * ThemedImage src/srcDark rendering as stock Logo. The ONLY difference:
 * a plain native <a href> instead of Docusaurus's <Link>.
 *
 * Why: the logo links to the CURRENT site's own landing page
 * (siteConfig.baseUrl -- /integration-platform/docs/saas/,
 * .../integrator/, .../connectors/), so clicking it never jumps to
 * another product. Stock Logo can't be pointed at that safely: it
 * always runs `logo.href` through `useBaseUrl()` before handing it to
 * <Link>, which PREPENDS the current site's baseUrl to an already-
 * absolute path and doubles it into something like
 * "/integration-platform/docs/integrator/integration-platform/docs/".
 * A plain native anchor on the bare baseUrl sidesteps that -- same fix
 * SidebarProductHeader already uses for its own cross-product links,
 * see its docstring for the fuller isInternalUrl explanation.
 *
 * Original: node_modules/@docusaurus/theme-classic/lib/theme/Logo/index.js
 * Keep this file in sync if you bump the @docusaurus/theme-classic major version.
 */
import type { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';
import type { Props } from '@theme/Logo';
import { detectCurrentProduct } from '@site/src/components/SidebarProductHeader';

function LogoThemedImage({
  logo,
  alt,
  imageClassName,
}: {
  logo: NonNullable<ReturnType<typeof useThemeConfig>['navbar']['logo']>;
  alt: string;
  imageClassName?: string;
}): ReactNode {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
  return imageClassName ? <div className={imageClassName}>{themedImage}</div> : themedImage;
}

export default function Logo(props: Props): ReactNode {
  const {
    siteConfig: { title, baseUrl },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { imageClassName, titleClassName, ...propsRest } = props;
  // Connectors has no standalone landing page worth landing on -- its
  // home IS the catalog, same target as the navbar's own Connectors link.
  const logoLink = detectCurrentProduct(baseUrl) === 'connectors' ? `${baseUrl}catalog` : baseUrl;
  const fallbackAlt = navbarTitle ? '' : title;
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <a href={logoLink} {...propsRest} {...(logo?.target && { target: logo.target })}>
      {logo && <LogoThemedImage logo={logo} alt={alt} imageClassName={imageClassName} />}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </a>
  );
}
