const { Kayn, REGIONS } = require('kayn');

module.exports = {
    kaynObject: Kayn('RGAPI-719ced7a-6219-486f-aa93-acc42c4380ec')({
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
