declare module "JSCPP" {
  const JSCPP: {
    run: (
      code: string,
      input: string,
      config: {
        stdio: { write: (s: string) => void }
        maxTimeout?: number
        unsigned_overflow?: string
      }
    ) => number
  }
  export default JSCPP
}
