export const Constants = {
    PORT: 8080,
    API: '/api',
    VERSION_1: '/v1',
    VERSION_2: '/v2',
    VERSION_3: '/v3',
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASS: 'root',
    DB_NAME: 'generic',
    BAD_REQ: 'Bad request',
    UNAUTH_REQ: 'Unauthorized',
    NOT_FOUND: 'Not found',
    UPDATE_FAILED: 'Update failed',
    GENERIC_ERROR: 'An error occurred',
    HTTP_200: 200, // ok
    HTTP_201: 201, // created
    HTTP_400: 400, // bad req
    HTTP_401: 401, // Unauthorized
    HTTP_404: 404,
    HTTP_500: 500,
} as const;