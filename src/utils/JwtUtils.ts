import jwt from "jsonwebtoken";

const JwtUtils = {
   encrypt: (data: string | object | Buffer, expiresIn?: number | string) => {
      const token = jwt.sign(data, process.env.JWT_SECRET as string, expiresIn ? { expiresIn } : {});
      return token;
   },
   decrypt: <PayloadType>(token: string): PayloadType => {
      const data = jwt.verify(token, process.env.JWT_SECRET as string);
      return data as PayloadType;
   },
};

export default JwtUtils;
