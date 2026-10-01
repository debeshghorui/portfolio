import { site } from "@/data";

export function apiCatalogDocument() {
  return {
    linkset: [
      {
        anchor: `${site.url}/api/`,
        "service-desc": [
          {
            href: `${site.url}/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${site.url}/llms.txt`,
            type: "text/plain",
          },
        ],
        status: [
          {
            href: `${site.url}/api/health`,
            type: "application/json",
          },
        ],
      },
    ],
  };
}
