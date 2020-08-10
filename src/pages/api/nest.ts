import { NextApiHandler, NextApiResponse } from 'next'

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
    const [, moduleName, version, rest] = m
    if (!moduleName) {
        return invalidURL(res)
    }

    if (!version) {
        return invalidNestURL(res)
    }

    const filepath: string = rest || '/mod.ts'
    const Location: string = `https://x.nest.land/${moduleName}${version}${filepath}`
    res.status(301)
    res.setHeader('Location', Location)
    res.end()
}

export default handler
