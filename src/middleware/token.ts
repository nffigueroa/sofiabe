import { verifyJWT } from "../util/common";


export const verifyToken = (req: any, res: any, checkToken: boolean) => {
    const token = req.headers['access-token'];
    if (!token && checkToken) {
        return false;
    }
    if (token && checkToken) {
        return !!verifyJWT(token);
    }
    return true;
}
