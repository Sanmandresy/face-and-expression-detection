import AWS from 'aws-sdk';

const log = () => {
    AWS.config.region = process.env.REACT_APP_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID as string
    });
}

export default log;