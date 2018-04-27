'use strict';
const rp = require('request-promise');

// analysisType is either:
// - 'languages' - detects language
// - 'sentiment' - analyzes sentiment
// - 'keyPhrases' - extracts key phrases
//
// documents is an object structured as follows:
// { 'documents': [ { 'id': '0', 'language': 'languageCode, 'text': 'textToAnalyze' } ] }
//
module.exports.analyze = function(analysisType, documents) {

	// Replace the accessKey string value with your valid access key.
	const accessKey = process.env.TEXT_ANALYTICS_API;

	// Replace or verify the region.

	// You must use the same region in your REST API call as you used to obtain your access keys.
	// For example, if you obtained your access keys from the westus region, replace
	// "westcentralus" in the URI below with "westus".

	// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
	// a free trial access key, you should not need to change this region.
	const endpoint = "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0";
	const path = '/' + analysisType;

	const request_params = {
        method: 'POST',
        uri: endpoint + path,
        headers : {
            'Ocp-Apim-Subscription-Key' : accessKey,
        },
        body: JSON.stringify(documents),
        resolveWithFullResponse: true
    };

    const results_asPromise = rp(request_params)
        .then((res) => {
            console.log("IN ANALYTICS.JS: Response body: ", res.body)
            const body_asJson = JSON.parse(res.body);
            //const stringifiedBody = JSON.stringify(parsedBody, null, '  ');
			console.log(`IN ANALYTICS.JS: OUTPUT for ${analysisType}: `, body_asJson);
            return body_asJson;
        })
        .catch((err) => console.log(err));

    return results_asPromise;
}
