"use strict"

const { SES } = require("@aws-sdk/client-ses");
const sesClient = new SES({
    // The key apiVersion is no longer supported in v3, and can be removed.
    // @deprecated The client uses the "latest" apiVersion.
    apiVersion: "2010-12-01",
})

module.exports.contactForm = (event, context, callback) => {
    const data = JSON.parse(event.body)
    let response = {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        }
    }

    try {
        sendContactFormToAlbaWebStudio(data)

        // create a response
        response['statusCode'] = 200
        response['body'] = JSON.stringify({
            success: true
        })
    } catch (err) {
        console.error(err)
        response['body'] = JSON.stringify({
            success: false,
            message: err.message
        })
    }

    callback(null, response)
}

const sendContactFormToAlbaWebStudio = (data) => {
    // massage data
    sesClient
        .sendTemplatedEmail({
            Destination: {
                ToAddresses: process.env.TO_EMAIL.split(","),
            },
            Source: process.env.SOURCE_EMAIL,
            Template: `alba-web-studio-contact_${process.env.STAGE}`,
            TemplateData: JSON.stringify(data),
            ReplyToAddresses: [process.env.REPLY_TO_EMAIL],
        })
        .then(function () {
            console.log("sendContactFormToAlbaWebStudio email queued")
        })
        .catch(function (err) {
            console.error(err, err.stack)
        })
}
