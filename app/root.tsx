import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "./+types/root";

import appStylesHref from "./app.css?url";
import normalizeStyles from "./normalize.css?url";
import type { GAMES } from "./routes/index.tsx";

export async function clientLoader() {
  const countryListPromise = fetch("https://ai.cloud7hub.uk/country/list")
    .then((value) => value.json())
    .then((data) => data.data);
  const mirrorLinksPromise = fetch("https://ai.cloud7hub.uk/mirror-links/")
    .then((value) => value.json())
    .then((data) => data.data);
  const defaultReferralPromise = fetch(
    "https://ai.cloud7hub.uk/referral/default/"
  )
    .then((value) => value.json())
    .then((data) => data.data);
  const gameProvidersPromise = fetch("https://ai.cloud7hub.uk/game/game-menu/")
    .then((value) => value.json())
    .then((data) => data.data);

  const [countryList, mirrorLinks, defaultReferral, gameProviders] =
    await Promise.all([
      countryListPromise,
      mirrorLinksPromise,
      defaultReferralPromise,
      gameProvidersPromise,
    ]);

  return {
    countryList,
    currencyList: mirrorLinks.domain_currency,
    mirrorLinks,
    defaultReferral,
    gameProviders,
  } as {
    countryList: {
      id: number;
      country_name: string;
      country_code: string;
      country_flag: string;
      phone_code: string;
    }[];
    currencyList: {
      id: number;
      currency: string;
      currency_title: string;
      currency_icon: string;
      user_currency: boolean;
      created_at: string;
      updated_at: string;
    }[];
    mirrorLinks: {
      name: string;
      url: string;
      support_contact: string;
      bot_username: string;
      login_enable: boolean;
      deposit_enable: boolean;
      withdraw_enable: boolean;
      link_logo: string;
      alt_text: string;
      favicon: string;
      web_title: string;
      domain_currency: {
        id: number;
        currency: string;
        currency_title: string;
        currency_icon: string;
        user_currency: boolean;
        created_at: string;
        updated_at: string;
      }[];
      registration_service: string;
      affiliate_registration_service: string;
    };
    defaultReferral: {
      id: number;
      referral_code: string;
      agent_referral_code: string;
      created_at: string;
      parent_user_id: number;
      user_id: number;
      local_agent_id: number;
      url_id: number;
    };
    gameProviders: GAMES;
  };
}

export type RootLoaderData = Awaited<ReturnType<typeof clientLoader>>;

export default function App() {
  return <Outlet />;
}

// The Layout component is a special export for the root route.
// It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
// For more information, see https://reactrouter.com/explanation/special-files#layout-export
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={appStylesHref} />
        <link rel="stylesheet" href={normalizeStyles} />
        <title>Live Game & Sportsbook</title>
        <Links />
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// The top most error boundary for the app, rendered when your app throws an error
// For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main id="error-page">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}
