import { NextApiHandler, NextApiResponse } from 'next'

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
  const filepath: string = rest || '/mod.ts'
  const Location: string = `https://raw.githubusercontent.com/${owner}/${repo}/${version}${filepath}`
  res.status(301)
  res.setHeader('Location', Location)
  res.end()
}

export default handler
