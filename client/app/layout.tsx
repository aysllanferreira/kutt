import getConfig from "next/config";
import React from "react";
import Head from "next/head";
import LayoutClientComponent from "./layout-client-component";

import { Colors } from "../consts";

const { publicRuntimeConfig } = getConfig();

interface Props {
  children: React.ReactNode;
  styleTags: any;
}

export default function AppDocument(
  props: Props
) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content={`${publicRuntimeConfig.SITE_NAME} is a free and open source URL shortener with custom domains and stats.`}
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:300,400,700&display=optional"
          rel="stylesheet"
        />
        <link rel="icon" sizes="196x196" href="/images/favicon-196x196.png" />
        <link rel="icon" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/images/favicon-196x196.png" />
        <link rel="mask-icon" href="/images/icon.svg" color="blue" />
        <link rel="manifest" href="manifest.webmanifest" />
        <meta name="theme-color" content="#f3f3f3" />

        <meta property="fb:app_id" content="123456789" />
        <meta
          property="og:url"
          content={`https://${publicRuntimeConfig.DEFAULT_DOMAIN}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={publicRuntimeConfig.SITE_NAME} />
        <meta
          property="og:image"
          content={`https://${publicRuntimeConfig.DEFAULT_DOMAIN}/images/card.png`}
        />
        <meta
          property="og:description"
          content="Free & Open Source Modern URL Shortener"
        />
        <meta
          name="twitter:url"
          content={`https://${publicRuntimeConfig.DEFAULT_DOMAIN}`}
        />
        <meta name="twitter:title" content={publicRuntimeConfig.SITE_NAME} />
        <meta
          name="twitter:description"
          content="Free & Open Source Modern URL Shortener"
        />
        <meta
          name="twitter:image"
          content={`https://${publicRuntimeConfig.DEFAULT_DOMAIN}/images/card.png`}
        />

        {props.styleTags}

        <script
          dangerouslySetInnerHTML={{
            __html: `window.recaptchaCallback = function() { window.isCaptchaReady = true; }`
          }}
        />

        <script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          async
          defer
        />
      </Head>
      <body
        style={{
          margin: 0,
          backgroundColor: Colors.Bg,
          font: '16px/1.45 "Nunito", sans-serif',
          overflowX: "hidden",
          color: Colors.Text
        }}
      >
        <LayoutClientComponent> {props.children} </LayoutClientComponent>
      </body>
    </html>
  );
}