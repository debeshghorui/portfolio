# ChaiTailwind

ChaiTailwind is a lightweight utility-first CSS engine that scans chai-* class names and applies inline styles dynamically.

## Install

```bash
npm install @debeshghorui/chaitailwind
```

## Local Development

```bash
npm install
npm test
npm run build
```

## Usage

```js
import { initChai } from "@debeshghorui/chaitailwind";

initChai();
```

## CDN Usage (Global)

```html
<script src="https://cdn.jsdelivr.net/npm/@debeshghorui/chaitailwind@0.1.0/dist/index.browser.js"></script>
<script>
  window.initchai();
  // Alias also available:
  // window.initChai();
</script>
```

For local demo usage in this repository:

```html
<script type="module">
  import { initChai } from "../src/index.js";
  initChai();
</script>
```

## Supported Utilities (v0.1)

- Spacing: chai-p-*, chai-m-*
- Colors: chai-bg-*, chai-text-*
- Typography: chai-fs-*, chai-center
- Borders: chai-border-*, chai-rounded-*
- Layout: chai-flex, chai-justify-center, chai-items-center

## Value Rules

- Numeric values auto-convert to px: chai-p-10 -> padding: 10px
- Explicit units are supported: px, rem, em, %, vh, vw, vmin, vmax, pt
- Percent shortcut is supported with pct suffix: chai-m-50pct -> margin: 50%
- Colors support common tokens (red, blue, gray-100, etc.) and hex formats (#fff, #ffffff, hex-ffffff)

## License

MIT
