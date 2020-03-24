const { Kayn, REGIONS } = require('kayn');

module.exports = {
    kaynObject: Kayn('RGAPI-f84120c7-9c8f-475d-890c-f0692fd50849')({
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
    }),

    regions: REGIONS
    
};
