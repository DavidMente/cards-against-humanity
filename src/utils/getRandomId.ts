import * as crypto from "crypto";

export function getRandomId(): string {
  return crypto.randomBytes(10).toString('hex')
}
