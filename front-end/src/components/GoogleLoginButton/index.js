import React from 'react'
import GoogleButton from 'react-google-button'

const GoogleLoginButton = () => {
    return (
        <GoogleButton
            type='light'
            style={{ width: '100%', marginBottom: '2rem' }}
            onClick={() => window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=866422515517-oap3ucv9kfa81as0oqrl9hiohl0u4gu0.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&scope=openid+profile+email&response_type=code'}
        />
    )
}

export default GoogleLoginButton
