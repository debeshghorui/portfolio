import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFoundComponent } from "./routes/__root";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFoundComponent,
  });

  // Move focus to #main after client-side navigation so keyboard and
  // screen-reader users land on the new page content.
  router.subscribe("onResolved", () => {
    if (typeof document === "undefined") return;
    const main = document.getElementById("main");
    if (main) {
      main.focus();
    }
  });

  return router;
};
