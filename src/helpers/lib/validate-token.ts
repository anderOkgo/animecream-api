import { Request, Response, NextFunction } from '../middle.helper';
import { token } from '../token.helper';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers || !req.headers['authorization']) {
    return res.status(401).json({
      error: 'Unauthorized: Missing or invalid token format',
    });
  }
  const headerToken = req.headers['authorization'];

  if (!headerToken || !headerToken.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized: Missing or invalid token format',
    });
  }

  const bearerToken = headerToken.slice(7); // Remove 'Bearer ' prefix
  try {
    let valid = ''; //token.verify(bearerToken, process.env.SECRET_KEY || 'qwertgfdsa')
    token.verify(bearerToken, process.env.SECRET_KEY || 'qwertgfdsa', (err, decoded) => {
      if (err) {
        console.error('JWT verification failed:', err);
        return res.status(401).json({
          error: 'Unauthorized: Invalid token',
        });
      } else {
        valid = 'true';
        // Handle valid token
      }
    });
    if (valid) {
      // Token is valid, proceed to the next middleware
      next();
    } else {
      // Token is invalid
      return res.status(401).json({
        error: 'Unauthorized: Invalid token',
      });
    }
  } catch (error) {
    // An error occurred while verifying the token
    console.error('Token verification error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export default validateToken;
