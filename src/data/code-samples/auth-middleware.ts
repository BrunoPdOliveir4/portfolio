export const authMiddlewareTS = `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  sub: string;
  tenantId: string;
  roles: string[];
  exp: number;
}

const RBAC_PERMISSIONS: Record<string, string[]> = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read'],
};

export function authMiddleware(requiredPermission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

      // Verify tenant isolation
      const tenantId = req.headers['x-tenant-id'] as string;
      if (payload.tenantId !== tenantId) {
        return res.status(403).json({ error: 'Tenant mismatch' });
      }

      // RBAC check
      const userPermissions = payload.roles.flatMap(
        (role) => RBAC_PERMISSIONS[role] ?? []
      );

      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}`;

export const authMiddlewarePython = `from functools import wraps
from fastapi import HTTPException, Depends, Header
from jose import jwt, JWTError
from pydantic import BaseModel

class TokenPayload(BaseModel):
    sub: str
    tenant_id: str
    roles: list[str]
    exp: int

RBAC_PERMISSIONS: dict[str, list[str]] = {
    "admin": ["read", "write", "delete", "manage_users"],
    "editor": ["read", "write"],
    "viewer": ["read"],
}

def require_permission(permission: str):
    async def dependency(
        authorization: str = Header(...),
        x_tenant_id: str = Header(...),
    ) -> TokenPayload:
        token = authorization.replace("Bearer ", "")

        try:
            data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            payload = TokenPayload(**data)
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")

        # Verify tenant isolation
        if payload.tenant_id != x_tenant_id:
            raise HTTPException(status_code=403, detail="Tenant mismatch")

        # RBAC check
        user_permissions = [
            perm
            for role in payload.roles
            for perm in RBAC_PERMISSIONS.get(role, [])
        ]

        if permission not in user_permissions:
            raise HTTPException(status_code=403, detail="Insufficient permissions")

        return payload

    return Depends(dependency)`;
