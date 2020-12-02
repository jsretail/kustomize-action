// Note: These are not official or complete. I've basically just made them up based on documentation.
// They are good enough for now but will probably need to be updated/expanded.
// Hopefully people start publishing OpenAPI schemas soon.

const { objectMeta } = require("./common.js");

module.exports = {
  "/sealedsecret-bitnami-v1alpha1.json": {
    $schema: "http://json-schema.org/draft-04/schema#",
    type: "object",
    properties: {
      apiVersion: {
        type: "string",
      },
      kind: {
        type: "string",
      },
      metadata: objectMeta,
      spec: {
        type: "object",
        properties: {
          encryptedData: {
            type: "object",
          },
          template: {
            type: "object",
            properties: {
              metadata: objectMeta,
              type: {
                type: "string",
              },
            },
            required: ["metadata", "type"],
          },
        },
        required: ["encryptedData"],
      },
    },
    required: ["apiVersion", "kind", "metadata", "spec"],
  },
};
