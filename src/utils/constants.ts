export const Constants = {
    PORT: 8080,
    API: '/api',
    VERSION_1: '/v1',
    VERSION_2: '/v2',
    VERSION_3: '/v3',
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASS: 'root',
    DB_DATABASE: 'demo_db',
    BAD_REQ: 'Bad request',
    UNAUTH_REQ: 'Unauthorized',
    NOT_FOUND: 'Not found',
    UPDATE_FAILED: 'Update failed',
    GENERIC_ERROR: 'An error occurred',
    COM_KABBIK: 'com.kabbik',
    FB_BASE_URL: 'https://graph.facebook.com',
    SMS_API_BASE_IP: '66.45.237.70',
    SMS_API_ID: '8IQ3HNF6SJ',
    SMS_API_USER_NAME: '01784464747',
    SMS_API_PASS: 'Wonder@987',
    ROOT_PATH: './',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    PHONE: 'phone',
    HTTP_200: 200, // ok
    HTTP_201: 201, // created
    HTTP_400: 400, // bad req
    HTTP_401: 401, // Unauthorized
    HTTP_404: 404,
    HTTP_500: 500,
    SMS_SENDER_ID: 820,
} as const;