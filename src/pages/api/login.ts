import { User } from '../../pages/api/user';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { getGuestData } from '../../fetches';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { id } = await req.body;

  try {
    const result = await getGuestData(id);
    if (!result?.id) {
      req?.session?.destroy();
      return res.status(404).json({ isLoggedIn: false, id: '', message: 'User not found' });
    }

    const admins = process.env.ADMINS?.split(',') ?? [''];
    const user = { isLoggedIn: true, id: result.id, admin: admins.includes(result.id) } as User;
    req.session.user = user;
    await req.session.save();
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
