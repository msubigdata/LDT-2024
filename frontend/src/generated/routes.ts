/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./../routes/__root";
import { Route as PublicImport } from "./../routes/_public";
import { Route as ProtectedImport } from "./../routes/_protected";
import { Route as ProtectedIndexImport } from "./../routes/_protected/index";
import { Route as PublicSignInRouteImport } from "./../routes/_public/sign-in/route";
import { Route as ProtectedViewIndexImport } from "./../routes/_protected/view/index";
import { Route as ProtectedMapIndexImport } from "./../routes/_protected/map/index";
import { Route as ProtectedHubIndexImport } from "./../routes/_protected/hub/index";

// Create/Update Routes

const PublicRoute = PublicImport.update({
  id: "/_public",
  getParentRoute: () => rootRoute,
} as any);

const ProtectedRoute = ProtectedImport.update({
  id: "/_protected",
  getParentRoute: () => rootRoute,
} as any);

const ProtectedIndexRoute = ProtectedIndexImport.update({
  path: "/",
  getParentRoute: () => ProtectedRoute,
} as any);

const PublicSignInRouteRoute = PublicSignInRouteImport.update({
  path: "/sign-in",
  getParentRoute: () => PublicRoute,
} as any);

const ProtectedViewIndexRoute = ProtectedViewIndexImport.update({
  path: "/view/",
  getParentRoute: () => ProtectedRoute,
} as any);

const ProtectedMapIndexRoute = ProtectedMapIndexImport.update({
  path: "/map/",
  getParentRoute: () => ProtectedRoute,
} as any);

const ProtectedHubIndexRoute = ProtectedHubIndexImport.update({
  path: "/hub/",
  getParentRoute: () => ProtectedRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_protected": {
      id: "/_protected";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof ProtectedImport;
      parentRoute: typeof rootRoute;
    };
    "/_public": {
      id: "/_public";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof PublicImport;
      parentRoute: typeof rootRoute;
    };
    "/_public/sign-in": {
      id: "/_public/sign-in";
      path: "/sign-in";
      fullPath: "/sign-in";
      preLoaderRoute: typeof PublicSignInRouteImport;
      parentRoute: typeof PublicImport;
    };
    "/_protected/": {
      id: "/_protected/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof ProtectedIndexImport;
      parentRoute: typeof ProtectedImport;
    };
    "/_protected/hub/": {
      id: "/_protected/hub/";
      path: "/hub";
      fullPath: "/hub";
      preLoaderRoute: typeof ProtectedHubIndexImport;
      parentRoute: typeof ProtectedImport;
    };
    "/_protected/map/": {
      id: "/_protected/map/";
      path: "/map";
      fullPath: "/map";
      preLoaderRoute: typeof ProtectedMapIndexImport;
      parentRoute: typeof ProtectedImport;
    };
    "/_protected/view/": {
      id: "/_protected/view/";
      path: "/view";
      fullPath: "/view";
      preLoaderRoute: typeof ProtectedViewIndexImport;
      parentRoute: typeof ProtectedImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  ProtectedRoute: ProtectedRoute.addChildren({
    ProtectedIndexRoute,
    ProtectedHubIndexRoute,
    ProtectedMapIndexRoute,
    ProtectedViewIndexRoute,
  }),
  PublicRoute: PublicRoute.addChildren({ PublicSignInRouteRoute }),
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_protected",
        "/_public"
      ]
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/",
        "/_protected/hub/",
        "/_protected/map/",
        "/_protected/view/"
      ]
    },
    "/_public": {
      "filePath": "_public.tsx",
      "children": [
        "/_public/sign-in"
      ]
    },
    "/_public/sign-in": {
      "filePath": "_public/sign-in/route.tsx",
      "parent": "/_public"
    },
    "/_protected/": {
      "filePath": "_protected/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/hub/": {
      "filePath": "_protected/hub/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/map/": {
      "filePath": "_protected/map/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/view/": {
      "filePath": "_protected/view/index.tsx",
      "parent": "/_protected"
    }
  }
}
ROUTE_MANIFEST_END */
