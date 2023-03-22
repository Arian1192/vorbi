import { NextApiRequest } from 'next'
export function middleware(req: NextApiRequest) {
    console.log(req.body)
}

export const config = {
    matcher: ['/api/user/:path*']
}