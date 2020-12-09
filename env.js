
const variables = {
  development: {
      googleApiKey: 'AIzaSyDvyjdrGPPnfbitbjAUAqj7pEA0_FkSNqM'
  },
  production: {
      googleApiKey: 'AIzaSyDvyjdrGPPnfbitbjAUAqj7pEA0_FkSNqM'
  }
};

const getEnvVariables = () => {
  if (__DEV__) {
      return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function