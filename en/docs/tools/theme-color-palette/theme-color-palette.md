---
sidebar_position: 0
sidebar_label: Theme & Color Palette
title: "Theme & Color Palette"
description: The brand color tokens this theme is built from (light and dark), plus the logo files and when to use which one.
slug: /tools/theme-color-palette
---

# Theme & Color Palette

Every color below is a real CSS custom property from
`src/css/custom.css` -- these are the actual values the theme renders
with, not a separate design reference that can drift from the code.
Swatches are shown with their literal hex/rgba value regardless of
this page's own current color mode, so both palettes are visible at
once.

## Light theme

<SwatchGrid>

<ColorSwatch color="#F14E23" label="Pulse Orange" varName="--ifm-color-primary" value="#F14E23" />
<ColorSwatch color="#FF8A3D" label="Pulse Orange (light)" varName="--ifm-color-primary-lighter" value="#FF8A3D" />
<ColorSwatch color="#D63B12" label="Pulse Orange (dark)" varName="--ifm-color-primary-dark" value="#D63B12" />
<ColorSwatch color="#1B2A49" label="Navy" varName="--wso2-navy" value="#1B2A49" />
<ColorSwatch color="#26365A" label="Navy (mid)" varName="--wso2-navy-mid" value="#26365A" />
<ColorSwatch color="#0F172A" label="Navy (deep)" varName="--wso2-navy-deep" value="#0F172A" />
<ColorSwatch color="#2F6FE4" label="AI Accent" varName="--wso2-ai-accent" value="#2F6FE4" />
<ColorSwatch color="#E5E9F0" label="Surface Border" varName="--wso2-surface-border" value="#E5E9F0" />
<ColorSwatch color="#F2F5F9" label="Well Background" varName="--wso2-well-bg" value="#F2F5F9" />
<ColorSwatch color="#7B8598" label="Text (muted)" varName="--wso2-text-muted" value="#7B8598" />

</SwatchGrid>

## Dark theme

Values that differ under `[data-theme='dark']` -- anything not listed
here (Pulse Orange, the navy shades) stays the same in both modes.

<SwatchGrid>

<ColorSwatch color="#5B9BFF" label="AI Accent" varName="--wso2-ai-accent" value="#5B9BFF" />
<ColorSwatch color="#EFF3F9" label="Heading Color" varName="--wso2-heading-color" value="#EFF3F9" />
<ColorSwatch color="#0F1930" label="Well Background" varName="--wso2-well-bg" value="#0F1930" />
<ColorSwatch color="#0C1424" label="Sidebar Background" varName="--wso2-sidebar-bg" value="#0C1424" />
<ColorSwatch color="#8B94A7" label="Text (muted)" varName="--wso2-text-muted" value="#8B94A7" />

</SwatchGrid>

## On dark surfaces (hero banner, etc.)

The homepage hero and similar fixed-dark-navy surfaces don't follow
the site's own light/dark toggle -- they're always navy, so they use
their own dedicated text-color tokens instead of the ones above.

<SwatchGrid>

<ColorSwatch color="#1B2A49" onColor="#FFFFFF" sample="Aa" label="On-Navy Text" varName="--wso2-on-navy-text" value="#FFFFFF" />
<ColorSwatch color="#1B2A49" onColor="#C8D3E6" sample="Aa" label="On-Navy Cool" varName="--wso2-on-navy-cool" value="#C8D3E6" />
<ColorSwatch color="#1B2A49" onColor="#9FB0CC" sample="Aa" label="On-Navy Muted" varName="--wso2-on-navy-muted" value="#9FB0CC" />
<ColorSwatch color="#1B2A49" onColor="#FFB59A" sample="Aa" label="On-Navy Label" varName="--wso2-on-navy-label" value="#FFB59A" />

</SwatchGrid>

## Logos

Each logo comes in a dark-on-light variant and a light-on-dark
variant -- shown here on a matching background so both are actually
visible, since the light variant is usually near-white and disappears
against this page's own background otherwise.

<SwatchGrid>

<LogoSwatch src="/img/wso2-integration-platform-black.svg" alt="WSO2 Integration Platform logo, dark-on-light" background="#FFFFFF" label="Full logo -- light background" />
<LogoSwatch src="/img/wso2-integration-platform-full-colour.svg" alt="WSO2 Integration Platform logo, light-on-dark" background="#1B2A49" label="Full logo -- dark background" />
<LogoSwatch src="/img/logo.svg" alt="Compact logo mark, dark-on-light" background="#FFFFFF" label="Compact mark -- light background" />
<LogoSwatch src="/img/logo-dark.svg" alt="Compact logo mark, light-on-dark" background="#1B2A49" label="Compact mark -- dark background" />

</SwatchGrid>

`logo.svg`/`logo-dark.svg` is this navbar's own compact mark
(`sharedNavbarLogo` in `theme-shared/themeConfig.ts` swaps between
them automatically based on color mode). The full
`wso2-integration-platform-*` pair is used for the footer and other
full-lockup placements. `WSO2_Integration_Platform_Black.svg` and
`WSO2_Integration_Platform_White.svg` (in `static/img/`, not shown
above) are this branch's own favicon-adjacent source files, not part
of the shared theme.
