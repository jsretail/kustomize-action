const { objectMeta, listMeta } = require("./common.js");

// Generated using openapi2jsonschema https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json

const customResourceDefinitionCondition = {
  $schema: "http://json-schema.org/schema#",
  required: ["type", "status"],
  type: "object",
  description:
    "CustomResourceDefinitionCondition contains details for the current condition of this pod.",
  properties: {
    status: {
      type: "string",
      description:
        "status is the status of the condition. Can be True, False, Unknown.",
    },
    type: {
      type: "string",
      description:
        "type is the type of the condition. Types include Established, NamesAccepted and Terminating.",
    },
    message: {
      type: "string",
      description:
        "message is a human-readable message indicating details about last transition.",
    },
    lastTransitionTime: {
      description:
        "lastTransitionTime last time the condition transitioned from one status to another.",
      type: ["object", "null"],
      // Removed because its out of scope for now
      //   $ref:
      //     "_definitions.json#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.Time",
    },
    reason: {
      type: "string",
      description:
        "reason is a unique, one-word, CamelCase reason for the condition's last transition.",
    },
  },
};

const customResourceDefinitionNames = {
  $schema: "http://json-schema.org/schema#",
  required: ["plural", "kind"],
  type: "object",
  description:
    "CustomResourceDefinitionNames indicates the names to serve this CustomResourceDefinition",
  properties: {
    shortNames: {
      items: {
        type: "string",
      },
      type: "array",
      description:
        "shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get <shortname>`. It must be all lowercase.",
    },
    kind: {
      type: "string",
      description:
        "kind is the serialized kind of the resource. It is normally CamelCase and singular. Custom resource instances will use this value as the `kind` attribute in API calls.",
    },
    singular: {
      type: "string",
      description:
        "singular is the singular name of the resource. It must be all lowercase. Defaults to lowercased `kind`.",
    },
    listKind: {
      type: "string",
      description:
        'listKind is the serialized kind of the list for this resource. Defaults to "`kind`List".',
    },
    plural: {
      type: "string",
      description:
        "plural is the plural name of the resource to serve. The custom resources are served under `/apis/<group>/<version>/.../<plural>`. Must match the name of the CustomResourceDefinition (in the form `<names.plural>.<group>`). Must be all lowercase.",
    },
    categories: {
      items: {
        type: "string",
      },
      type: "array",
      description:
        "categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.",
    },
  },
};

const customResourceValidation = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  description:
    "CustomResourceValidation is a list of validation methods for CustomResources.",
  properties: {
    openAPIV3Schema: {
      description:
        "openAPIV3Schema is the OpenAPI v3 schema to use for validation and pruning.",
      type: ["object", "null"],
      // Removed because its out of scope for now
      //"$ref": "_definitions.json#/definitions/io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1.JSONSchemaProps"
    },
  },
};

const customResourceDefinitionVersion = {
  $schema: "http://json-schema.org/schema#",
  required: ["name", "served", "storage"],
  type: "object",
  description: "CustomResourceDefinitionVersion describes a version for CRD.",
  properties: {
    name: {
      type: "string",
      description:
        "name is the version name, e.g. \u201cv1\u201d, \u201cv2beta1\u201d, etc. The custom resources are served under this version at `/apis/<group>/<version>/...` if `served` is true.",
    },
    storage: {
      type: "boolean",
      description:
        "storage indicates this version should be used when persisting custom resources to storage. There must be exactly one version with storage=true.",
    },
    additionalPrinterColumns: {
      items: {
        type: ["object", "null"],
        // Removed because its out of scope for now
        // $ref:
        //   "_definitions.json#/definitions/io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceColumnDefinition",
      },
      type: "array",
      description:
        "additionalPrinterColumns specifies additional columns returned in Table output. See https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables for details. Top-level and per-version columns are mutually exclusive. Per-version columns must not all be set to identical values (top-level columns should be used instead). If no top-level or per-version columns are specified, a single column displaying the age of the custom resource is used.",
    },
    subresources: {
      description:
        "subresources specify what subresources this version of the defined custom resource have. Top-level and per-version subresources are mutually exclusive. Per-version subresources must not all be set to identical values (top-level subresources should be used instead).",
      type: ["object", "null"],
      // Removed because its out of scope for now
      //   $ref:
      //     "_definitions.json#/definitions/io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceSubresources",
    },
    served: {
      type: "boolean",
      description:
        "served is a flag enabling/disabling this version from being served via REST APIs",
    },
    schema: customResourceValidation,
  },
};

const customResourceDefinitionStatus = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  description:
    "CustomResourceDefinitionStatus indicates the state of the CustomResourceDefinition",
  properties: {
    acceptedNames: customResourceDefinitionNames,
    conditions: {
      items: customResourceDefinitionCondition,
      type: "array",
      description:
        "conditions indicate state for particular aspects of a CustomResourceDefinition",
    },
    storedVersions: {
      items: {
        type: "string",
      },
      type: "array",
      description:
        "storedVersions lists all versions of CustomResources that were ever persisted. Tracking these versions allows a migration path for stored versions in etcd. The field is mutable so a migration controller can finish a migration to another version (ensuring no old objects are left in storage), and then remove the rest of the versions from this list. Versions may not be removed from `spec.versions` while they exist in this list.",
    },
  },
};

const customResourceDefinitionSpec = {
  $schema: "http://json-schema.org/schema#",
  required: ["group", "names", "scope"],
  type: "object",
  description:
    "CustomResourceDefinitionSpec describes how a user wants their resource to appear",
  properties: {
    conversion: {
      description: "conversion defines conversion settings for the CRD.",
      type: ["object", "null"],
      // Removed because its out of scope for now
      //   $ref:
      //     "_definitions.json#/definitions/io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceConversion",
    },
    group: {
      type: "string",
      description:
        "group is the API group of the defined custom resource. The custom resources are served under `/apis/<group>/...`. Must match the name of the CustomResourceDefinition (in the form `<names.plural>.<group>`).",
    },
    versions: {
      items: customResourceDefinitionVersion,
      type: "array",
      description:
        'versions is the list of all API versions of the defined custom resource. Optional if `version` is specified. The name of the first item in the `versions` list must match the `version` field if `version` and `versions` are both specified. Version names are used to compute the order in which served versions are listed in API discovery. If the version string is "kube-like", it will sort above non "kube-like" version strings, which are ordered lexicographically. "Kube-like" versions start with a "v", then are followed by a number (the major version), then optionally the string "alpha" or "beta" and another number (the minor version). These are sorted first by GA > beta > alpha (where GA is a version with no suffix such as beta or alpha), and then by comparing major version, then minor version. An example sorted list of versions: v10, v2, v1, v11beta2, v10beta3, v3beta1, v12alpha1, v11alpha2, foo1, foo10.',
    },
    additionalPrinterColumns: {
      items: {
        type: ["object", "null"],
        // Removed because its out of scope for now
        // $ref:
        //   "_definitions.json#/definitions/io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceColumnDefinition",
      },
      type: "array",
      description:
        "additionalPrinterColumns specifies additional columns returned in Table output. See https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables for details. If present, this field configures columns for all versions. Top-level and per-version columns are mutually exclusive. If no top-level or per-version columns are specified, a single column displaying the age of the custom resource is used.",
    },
    preserveUnknownFields: {
      type: "boolean",
      description:
        "preserveUnknownFields indicates that object fields which are not specified in the OpenAPI schema should be preserved when persisting to storage. apiVersion, kind, metadata and known fields inside metadata are always preserved. If false, schemas must be defined for all versions. Defaults to true in v1beta for backwards compatibility. Deprecated: will be required to be false in v1. Preservation of unknown fields can be specified in the validation schema using the `x-kubernetes-preserve-unknown-fields: true` extension. See https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#pruning-versus-preserving-unknown-fields for details.",
    },
    version: {
      type: "string",
      description:
        "version is the API version of the defined custom resource. The custom resources are served under `/apis/<group>/<version>/...`. Must match the name of the first item in the `versions` list if `version` and `versions` are both specified. Optional if `versions` is specified. Deprecated: use `versions` instead.",
    },
    names: customResourceDefinitionNames,
    scope: {
      type: "string",
      description:
        "scope indicates whether the defined custom resource is cluster- or namespace-scoped. Allowed values are `Cluster` and `Namespaced`. Default is `Namespaced`.",
    },
    validation: customResourceValidation,
    subresources: {
      description:
        "subresources specify what subresources the defined custom resource has. If present, this field configures subresources for all versions. Top-level and per-version subresources are mutually exclusive.",
      type: ["object", "null"],
      // Removed because its out of scope for now
      //   $ref:
      //     "_definitions.json#/definitions/io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceSubresources",
    },
  },
};

const customResourceDefinition = {
  description:
    "CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>. Deprecated in v1.16, planned for removal in v1.19. Use apiextensions.k8s.io/v1 CustomResourceDefinition instead.",
  required: ["spec"],
  "x-kubernetes-group-version-kind": [
    {
      kind: "CustomResourceDefinition",
      version: "v1beta1",
      group: "apiextensions.k8s.io",
    },
  ],
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    status: customResourceDefinitionStatus,
    kind: {
      type: "string",
      description:
        "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
    },
    spec: customResourceDefinitionSpec,
    apiVersion: {
      type: "string",
      description:
        "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
    },
    metadata: objectMeta,
  },
};

const customResourceDefinitionList = {
  description:
    "CustomResourceDefinitionList is a list of CustomResourceDefinition objects.",
  required: ["items"],
  "x-kubernetes-group-version-kind": [
    {
      kind: "CustomResourceDefinitionList",
      version: "v1",
      group: "apiextensions.k8s.io",
    },
  ],
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    items: {
      items: customResourceDefinition,
    },
    type: "array",
    description: "items list individual CustomResourceDefinition objects",
  },
  kind: {
    type: "string",
    description:
      "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
  },
  apiVersion: {
    type: "string",
    description:
      "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
  },
  metadata: listMeta,
};

module.exports = {
  "/customresourcedefinition-apiextensions-v1beta1.json": customResourceDefinition,
  "/customresourcedefinitionlist-apiextensions-v1beta1.json": customResourceDefinitionList,
};
