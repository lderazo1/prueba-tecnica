import * as crypto from 'crypto';

export function generateHash(data: object, previousHash: string = '0'): string {
  const payload = JSON.stringify({ ...data, previousHash, timestamp: Date.now() });
  return crypto.createHash('sha256').update(payload).digest('hex');
}