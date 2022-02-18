// Note: These are not official or complete. I've basically just made them up based on documentation.
// They are good enough for now but will probably need to be updated/expanded. 
// Hopefully people start publishing OpenAPI schemas soon.

const { objectMeta } = require("./common.js");
const entityRule = {
  type: "object",
  properties: {
    nets: {
      type: ["array", "null"],
    },
    notNets: {
      type: ["array", "null"],
    },
    selector: { type: "string" },
    notSelector: { type: "string" },
    namespaceSelector: { type: "string" },
    ports: {
      type: ["array", "null"],
    },
    notPorts: {
      type: ["array", "null"],
    },
    serviceAccounts: {
      names: {
        type: ["array", "null"],
      },
      selector: { type: "string" },
    },
  },
};
const rule = {
  type: "object",
  properties: {
    action: {
      type: "string",
    },
    metadata: { annotations: {} },
    protocol: {
      type: "string",
    },
    notProtocol: {
      type: "string",
    },
    icmp: {
      type: "object",
    },
    notIcmp: {
      type: "object",
    },
    ipVersion: {
      type: "integer",
    },
    destination: entityRule,
    source: entityRule,
  },
};
module.exports = {
  "/globalnetworkpolicy-crd-v1.json": {
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
          selector: {
            type: "string",
          },
          order: {
            type: "number",
          },
          serviceAccountSelector: {
            type: "object",
          },
          types: {
            type: "array",
            items: [],
          },
          ingress: {
            type: ["array", "null"],
            items: [rule],
          },
          egress: {
            type: ["array", "null"],
            items: [rule],
          },
        },
      },
    },
    required: ["apiVersion", "kind", "metadata", "spec"],
  },
};
