import * as React from "react";
import Head from "next/head";

const Span: React.FC<{ bg: string; leading?: boolean }> = ({
  children,
  bg,
  leading,
}) => {
  return (
    <span
      className={
        `rounded px-2 h-6 inline-flex items-center text-white text-sm` +
        (bg ? ` ${bg}` : "") +
        (leading ? ` mr-2` : ` mx-2`)
      }
    >
      {children}
    </span>
  );
};

export default () => {
  return (
    <div>
      <Head>
        <title>envoy</title>
        <meta name="title" content="envoy" />
        <meta property="og:title" content="envoy" />
        <meta property="twitter:title" content="envoy" />

        <meta
          name="description"
          content="A central gateway to various Deno module registries"
        />
        <meta
          property="og:description"
          content="A central gateway to various Deno module registries"
        />
        <meta
          property="twitter:description"
          content="A central gateway to various Deno module registries"
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://envoy.now.sh" />
        <meta property="twitter:url" content="https://envoy.now.sh" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="border-b border-gray-200 py-3">
        <div className="container px-2 max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl flex items-center">envoy</h1>
          <div>
            <a
              href="https://github.com/maximousblk/envoy"
              target="_blank"
              rel="noopener nofollow"
            >
              <svg
                id="i-github"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="32"
                height="32"
              >
                <path
                  strokeWidth="0"
                  fill="currentColor"
                  d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>
      <div className="container px-2 max-w-2xl mx-auto">
        <div className="my-5 text-xl">
          envoy provides a central gateway to various Deno module registries.
        </div>
        <div className="my-5 text-xl">
          Why would anyone use this? ¯\_(ツ)_/¯
        </div>
        <div className="my-5 text-xl">
          P.S. <a href="https://github.com/justablob" target="_blank" >blob</a> did not approve of the proxying method
        </div>
        <div className="my-5 text-xl">
          P.S. update: blob may change his mind...
        </div>
        <br />
        <div className="my-5 text-xl">Usage:</div>
        <div className="my-5 text-lg">For GitHub:</div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://envoy.now.sh/github
          </Span>
          /<Span bg="bg-black">user</Span>/
          <Span bg="bg-black">repo or repo@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div className="my-5 text-lg">For GitLab:</div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://envoy.now.sh/gitlab
          </Span>
          /<Span bg="bg-black">user</Span>/
          <Span bg="bg-black">repo or repo@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div className="my-5 text-lg">For BitBucket:</div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://envoy.now.sh/bitbucket
          </Span>
          /<Span bg="bg-black">user</Span>/
          <Span bg="bg-black">repo or repo@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div className="my-5 text-lg">For Github Gists:</div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://envoy.now.sh/gist
          </Span>
          /<Span bg="bg-black">gist-id or gist-id@revision-id</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div className="my-5 text-lg">For nest.land:</div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://envoy.now.sh/nest
          </Span>
          /<Span bg="bg-black">module@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div className="my-5 text-lg">For deno.land/x:</div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://envoy.now.sh/x
          </Span>
          /<Span bg="bg-black">module or module@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
        <div className="my-5 text-lg">For deno.land/std:</div>
        <div className="my-5 text-gray-400">
          <Span leading bg="bg-green-500">
            https://envoy.now.sh/std
          </Span>
          /<Span bg="bg-black">module or module@tag</Span>/
          <Span bg="bg-black">path/to/file</Span>
        </div>
      </div>
      <footer className="border-t border-gray-200 my-10 py-5 text-gray-500">
        <div className="container px-2 max-w-2xl mx-auto">
          &copy; 2020{" "}
          <a
            href="https://maximousblk.now.sh"
            target="_blank"
            rel="noopener nofollow"
          >
            Maximous Black
          </a>
        </div>
      </footer>
    </div>
  );
};
