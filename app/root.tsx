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

import loader from "./assets/loader.webm";

import normalizeStyles from "./normalize.css?url";
import appStylesHref from "./app.css?url";
import type { PROVIDERS } from "./routes/index.tsx";
import CurrentUserProvider from "./contexts/CurrentUserContext";
import { useEffect } from "react";
import Toast from "./components/ui/toast/Toast";

export type PROMOTIONLIST = PROMOTION[];
export type LINKS = LINK[];

export interface PROMOTION {
  id: number;
  currency_title: any[];
  title: string;
  sub_title: string;
  description: string;
  banner_image?: string;
  alt_text: string;
  video_url: any;
  forward_url?: string;
  started_at: string;
  end_at: string;
  is_active: boolean;
  slider_show: boolean;
  promotion_page: boolean;
  affiliate_page: boolean;
  deposit_option: boolean;
  contact_option: boolean;
  apply_option: boolean;
  signup: boolean;
  login: boolean;
  blog: boolean;
  landing_page: boolean;
  welcome_page: boolean;
  event: boolean;
  apply_url: any;
  gift_amount: string;
  gift_amount_type: string;
  turnover: string;
  created_at: string;
  updated_at: string;
  url_id?: number;
  selected_currency: any[];
}

export interface LINK {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  page_name: number;
  url_id: number;
}

export async function clientLoader() {
  const countryListPromise = fetch(
    import.meta.env.VITE_API_URL + "/country/list"
  )
    .then((value) => value.json())
    .then((data) => data.data);
  const mirrorLinksPromise = fetch(
    import.meta.env.VITE_API_URL + "/mirror-links/"
  )
    .then((value) => value.json())
    .then((data) => data.data);
  const defaultReferralPromise = fetch(
    import.meta.env.VITE_API_URL + "/referral/default/"
  )
    .then((value) => value.json())
    .then((data) => data.data);
  const gameProvidersPromise = fetch(
    import.meta.env.VITE_API_URL + "/game/game-menu/"
  )
    .then((value) => value.json())
    .then((data) => data.data);
  const socialListPromise = fetch(
    import.meta.env.VITE_API_URL + "/domain-wise/admin-social-list/"
  )
    .then((value) => value.json())
    .then((data) => data.data);
  const promotionListPromise = fetch(
    import.meta.env.VITE_API_URL + "/statics/banner-promition/"
  )
    .then((value) => value.json())
    .then((data) => data.data as PROMOTIONLIST);

  const LinksPromise = fetch(
    import.meta.env.VITE_API_URL + "/statics/page-content/"
  )
    .then((value) => value.json())
    .then((data) => data.data as LINKS);

  const [
    countryList,
    mirrorLinks,
    defaultReferral,
    gameProviders,
    socialList,
    promotionList,
    links,
  ] = await Promise.all([
    countryListPromise,
    mirrorLinksPromise,
    defaultReferralPromise,
    gameProvidersPromise,
    socialListPromise,
    promotionListPromise,
    LinksPromise,
  ]);

  return {
    countryList,
    currencyList: mirrorLinks.domain_currency,
    mirrorLinks,
    defaultReferral,
    gameProviders,
    socialList,
    promotionList,
    links,
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
    gameProviders: PROVIDERS;
    socialList: {
      id: number;
      social_prefix_id: {
        id: number;
        name: string;
        prefix: string;
        general_user_show: boolean;
        admin_show: boolean;
        agent_show: boolean;
        social_register: boolean;
        sort_id: number;
        logo: string;
      };
      admin_user: { username: string; referral_code: string };
      resource: string;
      status: boolean;
    }[];
    promotionList: PROMOTIONLIST;
    links: LINKS;
  };
}

export type RootLoaderData = Awaited<ReturnType<typeof clientLoader>>;

export default function App() {
  const data = useRouteLoaderData<RootLoaderData>("root");

  useEffect(() => {
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/6783e17249e2fd8dfe06606e/1ihdihae5";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);
  }, []);

  return (
    <CurrentUserProvider>
      <title>{data?.mirrorLinks.web_title}</title>
      <link
        rel="icon"
        type="image/png"
        href={import.meta.env.VITE_API_URL + "" + data?.mirrorLinks.favicon}
      />
      <Toast />
      <Outlet />
    </CurrentUserProvider>
  );
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
        <link rel="stylesheet" href={normalizeStyles} />
        <link rel="stylesheet" href={appStylesHref} />
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
  return (
    <div className="flex h-full w-full min-h-screen justify-center items-center">
      <video width={150} autoPlay={true} muted={true} loop={true}>
        <source src={loader} type="video/webm" />
      </video>
    </div>
  );
}
