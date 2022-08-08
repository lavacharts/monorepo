/**
 * Function for dynamically creating new google classes
 */
export function googleClassFactorySync(
  googleInstance: typeof google,
  className: string,
  ...restArgs: any[]
) {
  const { visualization } = googleInstance;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const googleClass = (visualization as any)[className];

  if (restArgs) {
    return new googleClass(...restArgs);
  } else {
    return new googleClass();
  }
}

/**
 * Async function for dynamically creating new google classes
 */
export async function googleClassFactory(
  googleInstance: typeof google,
  className: string,
  ...restArgs: unknown[]
) {
  return new Promise(resolve => {
    resolve(googleClassFactorySync(googleInstance, className, ...restArgs));
  });
}
