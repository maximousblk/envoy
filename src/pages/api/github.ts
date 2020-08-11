import { NextApiHandler, NextApiResponse } from 'next'
import fetch from "node-fetch";

const MATCHER = /^([^\/]+)\/([^\/@]+)(@)?(.*)/

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
  const [, owner, repo, versionSpecified, rest] = m
  if (!owner || !repo) {
    return invalidURL(res)
  }
  const version: string = versionSpecified ? '' : 'master'
  const Location: string = `https://raw.githubusercontent.com/${owner}/${repo}/${version}${rest}`
  const headers: {} = Object.fromEntries(
    Object.entries(req.headers).filter(([k]) => {
      return !["host"].some((h) => h == k);
    }),
  );

  const data = await fetch(Location, { headers })
  const text = await data.text()

  res.status(data.status)
  res.end(text)
}

export default handler
