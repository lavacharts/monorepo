/// <reference types="google.visualization" />
/**
 * Function for dynamically creating new google classes
 */
export declare function googleClassFactorySync(googleInstance: typeof google, className: string, ...restArgs: any[]): any;
/**
 * Async function for dynamically creating new google classes
 */
export declare function googleClassFactory(googleInstance: typeof google, className: string, ...restArgs: unknown[]): Promise<unknown>;
