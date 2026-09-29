/**
 * Swizzled from @docusaurus/theme-classic -- same real logo files, same
 * ThemedImage src/srcDark rendering as stock Logo. The ONLY difference:
 * a plain native <a href> instead of Docusaurus's <Link>.
 *
 * Why: sharedNavbarLogo.href is a plain absolute path
 * ("/integration-platform/docs/", the saas site's root), meant to
 * resolve against whatever origin is currently serving the site --
 * localhost during local testing, the real domain in production --
 * never a hardcoded domain. Stock Logo can't do this: it always runs
 * `logo.href` through `useBaseUrl()` before handing it to <Link>, which
 * unconditionally PREPENDS the current site's own baseUrl to an
 * already-absolute path (unlike navbar items, Logo has no
 * `autoAddBaseUrl:false` escape hatch to opt out of that). On
 * wso2-integrator/wso2-connectors that doubles the path into something
 * like "/integration-platform/docs/integrator/integration-platform/docs/".
 * A plain native anchor sidesteps all of that -- same fix
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
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = logo?.href || '/';
  const fallbackAlt = navbarTitle ? '' : title;
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <a href={logoLink} {...propsRest} {...(logo?.target && { target: logo.target })}>
      {logo && <LogoThemedImage logo={logo} alt={alt} imageClassName={imageClassName} />}
      {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
    </a>
  );
}
