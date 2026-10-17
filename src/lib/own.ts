/**
 * Safe lookup of a key in an object: only the object's own properties are read, so inherited
 * names such as "constructor" or "__proto__" (e.g. from /services/constructor in the URL) return
 * undefined instead of a surprising value.
 *
 * Use it whenever the key could come from the URL, a form or any other outside input.
 */
export function own<T>(obj: Record<string, T>, key: string): T | undefined {
  // eslint-disable-next-line security/detect-object-injection -- guarded: only own properties are read
  return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : undefined
}
