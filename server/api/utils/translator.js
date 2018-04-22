'use strict';

const rp = require('request-promise');

module.exports.translate = function(text, targetLanguage) {

    console.log("IN TRANSLATOR.JS: Text to translate:", text);

    // Replace the subscriptionKey string value with your valid subscription key.
    const subscriptionKey = "cfc2b05f41a54fd7a1949ecb69c7ae9a";

    const host = 'api.microsofttranslator.com';
    const path = '/V2/Http.svc/Translate';

    const params = '?to=' + targetLanguage + '&text=' + encodeURI(text);

    const request_params = {
        method: 'GET',
        uri: 'http://' + host + path + params,
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        },
        resolveWithFullResponse: true
    };

    const translatedText = rp(request_params)
        .then((res) => {
            const strippedText = res.body.replace(/<string(.*?)>/, '').replace(/<\/string>/, '');
            console.log("IN TRANSLATOR.JS: Response body: ", res.body)
            console.log("IN TRANSLATOR.JS: Translated text: ", strippedText)
            return strippedText;
        });

    return translatedText;
}
