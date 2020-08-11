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

  const data = await fetch(Location)
  const text = await data.text()

  res.setHeader('Cache-Control', ['s-maxage=86400', 'stale-if-error=1', 'immutable'])
  res.status(data.status)
  res.end(text)
}

export default handler
