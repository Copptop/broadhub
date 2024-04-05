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
 * Array of routes only admins can access
 * @type {string[]}
 */
export const AdminRoutes = [
]

/**
 * Array of routes only HR and above can access
 * @type {string[]}
 */

export const HRPlusRoutes = [
  '/analytics',
]

/**
 * Array of routes only Managers and above can access
 * @type {string[]}
 */

export const ManagerPlusRoutesPrefix = '/management'


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