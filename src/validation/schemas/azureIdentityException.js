// Note: These are not official or complete. I've basically just made them up based on documentation.
// They are good enough for now but will probably need to be updated/expanded. 
// Hopefully people start publishing OpenAPI schemas soon.

const {objectMeta: metadata}= require('./common.js');

module.exports = {
  "/azurepodidentityexception-aadpodidentity-v1.json": {
    $schema: "http://json-schema.org/draft-04/schema#",
    type: "object",
    properties: {
      apiVersion: {
        type: "string",
      },
      kind: {
        type: "string",
      },
      metadata,
      spec: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          podLabels: {
            type: "object",
          },
        },
        required: ["podLabels"],
      },
    },
    required: ["apiVersion", "kind", "metadata", "spec"],
  },
};