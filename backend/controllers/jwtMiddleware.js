import jsonwebtoken from "jsonwebtoken";

async function jwtMiddleware(req, res, next) {
    const {jwt} = req.cookies;
        if (!jwt) {
            return res.status(500).json({"msg":"jwtError"})
        }
        const jasonWebTokenDecoded = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
        if (jasonWebTokenDecoded==false) {
            return res.status(500).json({"msg":"jwtError"})
        }
        req.player = jasonWebTokenDecoded;
        next();
}

export default {
    jwtMiddleware
}