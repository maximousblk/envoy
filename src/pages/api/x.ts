import { NextApiHandler, NextApiResponse } from 'next'
import fetch from "node-fetch";

const MATCHER = /^([^\/@]+)(@[^\/]+)?(.*)/

const invalidURL = (res: NextApiResponse) => {
  res.status(500)
  res.end(`Invalid URL`)
}

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string

  const m = MATCHER.exec(slug)

  if (!m) {
    return invalidURL(res)
  }
  const [, moduleName, specifiedVersion, filepath] = m
  if (!moduleName) {
    return invalidURL(res)
  }
  const version: string = specifiedVersion ? specifiedVersion : ''
  const Location: string = `https://deno.land/x/${moduleName}${version}${filepath}`
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

  res.status(data.status)
  res.end(text)
}

export default handler
