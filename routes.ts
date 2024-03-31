/**
 * Array of routes which dont need authentication
 * @type {string[]}
 */
export const PublicRoutes = ['/public',];

/**
 * Array of routes which are need for authentication
 * @type {string[]}
 */
export const AuthRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/error",
  "/auth/verify-email",
  "/auth/reset-password",
  "/auth/new-password",
];

/**
 * Prefix for API Authentication Routes
 * @type {string}
 */
export const APIAuthPrefix = '/api/auth';

/**
 * Default Redirect Route after login
 * @type {string}s
 */
export const DefaultRedirectRoute = '/';