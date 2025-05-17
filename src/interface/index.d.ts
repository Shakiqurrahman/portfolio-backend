/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            files: {
                [fieldname: string]: any | UploadedFile[];
            };
            user: JwtPayload;
        }
    }
}
