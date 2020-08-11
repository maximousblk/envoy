import { NextApiHandler, NextApiResponse } from 'next'
import fetch from "node-fetch";

const MATCHER = /^([^\/@]+)(@[^\/]+)?(.*)/

const invalidURL = (res: NextApiResponse) => {
  res.status(500)
  res.end(`Invalid URL`)
}

const invalidNestURL = (res: NextApiResponse) => {
  res.status(500)
  res.end(`Implicit versioning not supported by nest.land`)
}

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string

  const m = MATCHER.exec(slug)

  if (!m) {
    return invalidURL(res)
  }
  const [, moduleName, version, filepath] = m
  if (!moduleName) {
    return invalidURL(res)
  }

  if (!version) {
    return invalidNestURL(res)
  }

  const Location: string = `https://x.nest.land/${moduleName}${version}${filepath}`
  const headers: {} = Object.fromEntries(
    Object.entries(req.headers).filter(([k]) => {
      return !["host"].some((h) => h == k);
    }),
  );

  if (!filepath) {
    res.status(301)
    res.setHeader("x-deno-warning", `Implicitly using "mod.ts" as entry file for ${moduleName}${version}`);
    res.setHeader('Location', `${moduleName}${version}/mod.ts`)
    res.end()
  }

  const data = await fetch(Location, { headers })
  const text = await data.text()

  res.setHeader('Cache-Control', ['s-maxage=86400', 'stale-if-error=1', 'immutable'])
  res.status(data.status)
  res.end(text)
}

export default handler
