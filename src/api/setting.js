const { Kayn, REGIONS } = require('kayn');


const kayn = Kayn('RGAPI-aab8b0a9-b0f3-4f51-a83f-b855f5c7fcc8')({
  region: REGIONS.BRAZIL,
  apiURLPrefix: 'https://%s.api.riotgames.com',
  locale: 'pt_BR',
  debugOptions: {
      isEnabled: true,
      showKey: false,
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: false,
    shouldExitOn403: false,
  },
  cacheOptions: {
    cache: null,
    timeToLives: {
        useDefault: false,
        byGroup: {},
        byMethod: {},
    },
  },
})

export default kayn;
