import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/node";
import { getStyles } from "./entry.server"; // Fonction pour récupérer les styles injectés

// Typage du loader
type LoaderData = {
  styles: string; // Les styles sont sous forme de chaîne de caractères
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    styles: getStyles(), // Obtenez les styles collectés dans entry.server.tsx
  });
};

export default function App() {
  // Typage de useLoaderData pour récupérer les styles
  const { styles } = useLoaderData<LoaderData>();

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
        {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}{" "}
        {/* Injection des styles ici */}
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
