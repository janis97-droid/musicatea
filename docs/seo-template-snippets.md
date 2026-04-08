# Musicatea SEO Template Snippets

This file is a reusable reference for page-level SEO blocks.

## What each template includes
- Canonical URL
- Hreflang alternates
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data

## Usage rules
- Keep the `<title>` tag, `meta description`, canonical URL, Open Graph title, Twitter title, and JSON-LD `name` aligned.
- Use absolute URLs only.
- Use the Arabic block on Arabic pages and the English block on English pages.
- Replace every placeholder before publishing.
- Keep one canonical per page.
- Reuse the same image only if no page-specific image exists.

---

## 1) Homepage template — Arabic (`index.html`)

```html
<link rel="canonical" href="https://musicatea.com/">
<link rel="alternate" hreflang="ar" href="https://musicatea.com/">
<link rel="alternate" hreflang="en" href="https://musicatea.com/index-en.html">
<link rel="alternate" hreflang="x-default" href="https://musicatea.com/">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Musicatea">
<meta property="og:title" content="موسيقتي | موسوعة الموسيقى العربية">
<meta property="og:description" content="موسيقتي — موسوعة الموسيقى العربية: نوتات موسيقية، شرح المقامات، الإيقاعات الشرقية، والتاريخ الموسيقي.">
<meta property="og:url" content="https://musicatea.com/">
<meta property="og:image" content="https://musicatea.com/assets/seo/og-home-ar.jpg">
<meta property="og:locale" content="ar_AR">
<meta property="og:locale:alternate" content="en_US">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="موسيقتي | موسوعة الموسيقى العربية">
<meta name="twitter:description" content="موسيقتي — موسوعة الموسيقى العربية: نوتات موسيقية، شرح المقامات، الإيقاعات الشرقية، والتاريخ الموسيقي.">
<meta name="twitter:image" content="https://musicatea.com/assets/seo/og-home-ar.jpg">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Musicatea",
  "alternateName": "موسيقتي",
  "url": "https://musicatea.com/",
  "inLanguage": "ar",
  "description": "موسوعة الموسيقى العربية: نوتات موسيقية، شرح المقامات، الإيقاعات الشرقية، والتاريخ الموسيقي.",
  "publisher": {
    "@type": "Organization",
    "name": "Musicatea",
    "alternateName": "موسيقتي",
    "url": "https://musicatea.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://musicatea.com/assets/logo-mark.jpg"
    }
  }
}
</script>
```

---

## 2) Homepage template — English (`index-en.html`)

```html
<link rel="canonical" href="https://musicatea.com/index-en.html">
<link rel="alternate" hreflang="ar" href="https://musicatea.com/">
<link rel="alternate" hreflang="en" href="https://musicatea.com/index-en.html">
<link rel="alternate" hreflang="x-default" href="https://musicatea.com/">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Musicatea">
<meta property="og:title" content="Musicatea | The Arabic Music Encyclopedia">
<meta property="og:description" content="Musicatea — The Arabic Music Encyclopedia: sheet music, maqam guides, oriental rhythms, and music history.">
<meta property="og:url" content="https://musicatea.com/index-en.html">
<meta property="og:image" content="https://musicatea.com/assets/seo/og-home-en.jpg">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="ar_AR">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Musicatea | The Arabic Music Encyclopedia">
<meta name="twitter:description" content="Musicatea — The Arabic Music Encyclopedia: sheet music, maqam guides, oriental rhythms, and music history.">
<meta name="twitter:image" content="https://musicatea.com/assets/seo/og-home-en.jpg">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Musicatea",
  "alternateName": "موسيقتي",
  "url": "https://musicatea.com/index-en.html",
  "inLanguage": "en",
  "description": "The Arabic Music Encyclopedia: sheet music, maqam guides, oriental rhythms, and music history.",
  "publisher": {
    "@type": "Organization",
    "name": "Musicatea",
    "alternateName": "موسيقتي",
    "url": "https://musicatea.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://musicatea.com/assets/logo-mark.jpg"
    }
  }
}
</script>
```

---

## 3) Section page template — Arabic

Use this for pages such as:
- `library.html`
- `maqamat.html`
- `rhythms.html`
- `history.html`
- `ensemble.html`

```html
<link rel="canonical" href="https://musicatea.com/{{AR_PATH}}">
<link rel="alternate" hreflang="ar" href="https://musicatea.com/{{AR_PATH}}">
<link rel="alternate" hreflang="en" href="https://musicatea.com/{{EN_PATH}}">
<link rel="alternate" hreflang="x-default" href="https://musicatea.com/{{AR_PATH}}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Musicatea">
<meta property="og:title" content="{{AR_TITLE}}">
<meta property="og:description" content="{{AR_DESCRIPTION}}">
<meta property="og:url" content="https://musicatea.com/{{AR_PATH}}">
<meta property="og:image" content="https://musicatea.com/assets/seo/{{AR_OG_IMAGE}}">
<meta property="og:locale" content="ar_AR">
<meta property="og:locale:alternate" content="en_US">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{AR_TITLE}}">
<meta name="twitter:description" content="{{AR_DESCRIPTION}}">
<meta name="twitter:image" content="https://musicatea.com/assets/seo/{{AR_OG_IMAGE}}">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{AR_TITLE}}",
  "url": "https://musicatea.com/{{AR_PATH}}",
  "inLanguage": "ar",
  "description": "{{AR_DESCRIPTION}}",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Musicatea",
    "url": "https://musicatea.com/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Musicatea",
    "alternateName": "موسيقتي",
    "url": "https://musicatea.com/"
  }
}
</script>
```

### Arabic section example — `history.html`

```html
<link rel="canonical" href="https://musicatea.com/history.html">
<link rel="alternate" hreflang="ar" href="https://musicatea.com/history.html">
<link rel="alternate" hreflang="en" href="https://musicatea.com/history-en.html">
<link rel="alternate" hreflang="x-default" href="https://musicatea.com/history.html">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Musicatea">
<meta property="og:title" content="تاريخ الموسيقى العربية — موسيقتي">
<meta property="og:description" content="رحلة عبر تاريخ الموسيقى العربية من الجذور حتى اليوم.">
<meta property="og:url" content="https://musicatea.com/history.html">
<meta property="og:image" content="https://musicatea.com/assets/seo/og-history-ar.jpg">
<meta property="og:locale" content="ar_AR">
<meta property="og:locale:alternate" content="en_US">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="تاريخ الموسيقى العربية — موسيقتي">
<meta name="twitter:description" content="رحلة عبر تاريخ الموسيقى العربية من الجذور حتى اليوم.">
<meta name="twitter:image" content="https://musicatea.com/assets/seo/og-history-ar.jpg">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "تاريخ الموسيقى العربية",
  "url": "https://musicatea.com/history.html",
  "inLanguage": "ar",
  "description": "رحلة عبر تاريخ الموسيقى العربية من الجذور حتى اليوم.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Musicatea",
    "url": "https://musicatea.com/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Musicatea",
    "alternateName": "موسيقتي",
    "url": "https://musicatea.com/"
  }
}
</script>
```

---

## 4) Section page template — English

Use this for pages such as:
- `library-en.html`
- `maqamat-en.html`
- `rhythms-en.html`
- `history-en.html`
- `ensemble-en.html`

```html
<link rel="canonical" href="https://musicatea.com/{{EN_PATH}}">
<link rel="alternate" hreflang="ar" href="https://musicatea.com/{{AR_PATH}}">
<link rel="alternate" hreflang="en" href="https://musicatea.com/{{EN_PATH}}">
<link rel="alternate" hreflang="x-default" href="https://musicatea.com/{{AR_PATH}}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Musicatea">
<meta property="og:title" content="{{EN_TITLE}}">
<meta property="og:description" content="{{EN_DESCRIPTION}}">
<meta property="og:url" content="https://musicatea.com/{{EN_PATH}}">
<meta property="og:image" content="https://musicatea.com/assets/seo/{{EN_OG_IMAGE}}">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="ar_AR">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{EN_TITLE}}">
<meta name="twitter:description" content="{{EN_DESCRIPTION}}">
<meta name="twitter:image" content="https://musicatea.com/assets/seo/{{EN_OG_IMAGE}}">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{EN_TITLE}}",
  "url": "https://musicatea.com/{{EN_PATH}}",
  "inLanguage": "en",
  "description": "{{EN_DESCRIPTION}}",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Musicatea",
    "url": "https://musicatea.com/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Musicatea",
    "alternateName": "موسيقتي",
    "url": "https://musicatea.com/"
  }
}
</script>
```

### English section example — `history-en.html`

```html
<link rel="canonical" href="https://musicatea.com/history-en.html">
<link rel="alternate" hreflang="ar" href="https://musicatea.com/history.html">
<link rel="alternate" hreflang="en" href="https://musicatea.com/history-en.html">
<link rel="alternate" hreflang="x-default" href="https://musicatea.com/history.html">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Musicatea">
<meta property="og:title" content="History of Arabic Music | Musicatea">
<meta property="og:description" content="A concise historical journey through Arabic music — from early foundations to major modern transformations.">
<meta property="og:url" content="https://musicatea.com/history-en.html">
<meta property="og:image" content="https://musicatea.com/assets/seo/og-history-en.jpg">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="ar_AR">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="History of Arabic Music | Musicatea">
<meta name="twitter:description" content="A concise historical journey through Arabic music — from early foundations to major modern transformations.">
<meta name="twitter:image" content="https://musicatea.com/assets/seo/og-history-en.jpg">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "History of Arabic Music",
  "url": "https://musicatea.com/history-en.html",
  "inLanguage": "en",
  "description": "A concise historical journey through Arabic music — from early foundations to major modern transformations.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Musicatea",
    "url": "https://musicatea.com/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Musicatea",
    "alternateName": "موسيقتي",
    "url": "https://musicatea.com/"
  }
}
</script>
```

---

## Suggested image naming
- `assets/seo/og-home-ar.jpg`
- `assets/seo/og-home-en.jpg`
- `assets/seo/og-library-ar.jpg`
- `assets/seo/og-library-en.jpg`
- `assets/seo/og-maqamat-ar.jpg`
- `assets/seo/og-maqamat-en.jpg`
- `assets/seo/og-rhythms-ar.jpg`
- `assets/seo/og-rhythms-en.jpg`
- `assets/seo/og-history-ar.jpg`
- `assets/seo/og-history-en.jpg`
- `assets/seo/og-ensemble-ar.jpg`
- `assets/seo/og-ensemble-en.jpg`

## Next implementation order
1. Homepage files
2. Core section files
3. About / contact / privacy pages
4. Page-specific images in `assets/seo/`
