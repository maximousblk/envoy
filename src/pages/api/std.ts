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
  const Location: string = `https://deno.land/std${version}/${moduleName}${filepath}`

  if (!filepath) {
    res.status(301)
    res.setHeader("x-deno-warning", `Implicitly using "mod.ts" as entry file for ${moduleName}${version}`);
    res.setHeader('Location', `${moduleName}${version}/mod.ts`)
    res.end()
  }

  const data = await fetch(Location)
  const text = await data.text()

  res.setHeader('Cache-Control', ['s-maxage=86400', 'stale-if-error=1', 'immutable'])
  res.status(data.status)
  res.end(text)
}

export default handler
