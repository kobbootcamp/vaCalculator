require('dotenv')

export const AUTH_CONFIG = {
    domain: process.env.AUTH0_DOMAIN || 'mute-fog-9217.auth0.com',
    clientId: process.env.AUTH0_CLIENT_ID || 'XveaSTbYF1pB7pQVHH1DaArFw-c89pPX',
    callbackUrl: process.env.AUTH0_CALLBACK_URL || 'https://vacalc.herokuapp.com/callback'
}