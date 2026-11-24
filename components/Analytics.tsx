import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * GA4's Enhanced Measurement (on by default) already records most of what this
 * site cares about with no extra code: page views, the CV PDF download
 * (`file_download`) and outbound clicks to WhatsApp / Behance / LinkedIn /
 * Instagram (`click` with `outbound: true`). The actions that are not plain
 * links — the contact form buttons, the mailto link and the copy-email button
 * — are reported through `track()` in those components instead.
 *
 * Renders nothing until NEXT_PUBLIC_GA_ID is set, so local dev and previews
 * without the id stay clean.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(
          GA_ID,
        )});`}
      </Script>
    </>
  );
}