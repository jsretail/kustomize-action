// ➜  tmp.cxdEWiLJbp git clone git@github.com:istio/api.git
// ➜  tmp.cxdEWiLJbp echo '[' > schema.js; find api -iname '*.gen.json' -exec sh -c "cat {}; echo ','" \; >> schema.js; echo ']' >> schema.js
const schemas = [
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting network reachability of a sidecar.",
      version: "v1alpha3",
    },
    components: {
      schemas: {
        "istio.networking.v1alpha3.ClientTLSSettings": {
          description:
            "SSL/TLS related settings for upstream connections. See Envoy's [TLS context](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/auth/cert.proto.html) for more details. These settings are common to both HTTP and TCP upstreams.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings.TLSmode",
            },
            clientCertificate: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client-side TLS certificate to use. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client's private key. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "OPTIONAL: The path to the file containing certificate authority certificates to use in verifying a presented server certificate. If omitted, the proxy will not verify the server's certificate. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "The name of the secret that holds the TLS certs for the client including the CA certificates. Applicable only on Kubernetes. Secret must exist in the same namespace with the proxy using the certificates. The secret (of type `generic`)should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for client certificates along with ca.crt key for CA certificates is also supported. Only one of client certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate. If specified, the proxy will verify that the server certificate's subject alt name matches one of the specified values. If specified, this list overrides the value of subject_alt_names from the ServiceEntry.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sni: {
              description:
                "SNI string to present to the server during TLS handshake.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.PortSelector": {
          description:
            "PortSelector specifies the number of a port to be used for matching or selection for final routing.",
          type: "object",
          properties: {
            number: {
              description: "Valid port number",
              type: "integer",
            },
          },
        },
        "istio.networking.v1alpha3.ClientTLSSettings.TLSmode": {
          description: "TLS connection mode",
          type: "string",
          enum: ["DISABLE", "SIMPLE", "MUTUAL", "ISTIO_MUTUAL"],
        },
        "istio.networking.v1alpha3.WorkloadSelector": {
          description:
            "`WorkloadSelector` specifies the criteria used to determine if the `Gateway`, `Sidecar`, or `EnvoyFilter` or `ServiceEntry` configuration can be applied to a proxy. The matching criteria includes the metadata associated with a proxy, workload instance info such as labels attached to the pod/VM, or any other info that the proxy provides to Istio during the initial handshake. If multiple conditions are specified, all conditions need to match in order for the workload instance to be selected. Currently, only label based selection mechanism is supported.",
          type: "object",
          properties: {
            labels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which the configuration should be applied. The scope of label search is restricted to the configuration namespace in which the the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.Port": {
          description:
            "Port describes the properties of a specific port of a service.",
          type: "object",
          properties: {
            number: {
              description: "A valid non-negative integer port number.",
              type: "integer",
            },
            name: {
              description: "Label assigned to the port.",
              type: "string",
              format: "string",
            },
            protocol: {
              description:
                "The protocol exposed on the port. MUST BE one of HTTP|HTTPS|GRPC|HTTP2|MONGO|TCP|TLS. TLS implies the connection will be routed based on the SNI header to the destination without terminating the TLS connection.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.ServerTLSSettings": {
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings.TLSmode",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server's private key.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to a file containing certificate authority certificates to use in verifying a presented client side certificate.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "For gateways running on Kubernetes, the name of the secret that holds the TLS certs including the CA certificates. Applicable only on Kubernetes. The secret (of type`generic`) should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for server certificates along with ca.crt key for CA certificates is also supported. Only one of server certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate presented by the client.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            httpsRedirect: {
              description:
                "If set to true, the load balancer will send a 301 redirect for all http connections, asking the clients to use HTTPS.",
              type: "boolean",
            },
            serverCertificate: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server-side TLS certificate to use.",
              type: "string",
              format: "string",
            },
            verifyCertificateSpki: {
              description:
                "An optional list of base64-encoded SHA-256 hashes of the SKPIs of authorized client certificates. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            verifyCertificateHash: {
              description:
                "An optional list of hex-encoded SHA-256 hashes of the authorized client certificates. Both simple and colon separated formats are acceptable. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            minProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings.TLSProtocol",
            },
            maxProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings.TLSProtocol",
            },
            cipherSuites: {
              description:
                "Optional: If specified, only support the specified cipher list. Otherwise default to the default cipher list supported by Envoy.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.ServerTLSSettings.TLSmode": {
          description: "TLS modes enforced by the proxy",
          type: "string",
          enum: [
            "PASSTHROUGH",
            "SIMPLE",
            "MUTUAL",
            "AUTO_PASSTHROUGH",
            "ISTIO_MUTUAL",
          ],
        },
        "istio.networking.v1alpha3.ServerTLSSettings.TLSProtocol": {
          description: "TLS protocol versions.",
          type: "string",
          enum: ["TLS_AUTO", "TLSV1_0", "TLSV1_1", "TLSV1_2", "TLSV1_3"],
        },
        "istio.networking.v1alpha3.Sidecar": {
          description:
            "`Sidecar` describes the configuration of the sidecar proxy that mediates inbound and outbound communication of the workload instance to which it is attached.",
          type: "object",
          properties: {
            workloadSelector: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.WorkloadSelector",
            },
            ingress: {
              description:
                "Ingress specifies the configuration of the sidecar for processing inbound traffic to the attached workload instance. If omitted, Istio will automatically configure the sidecar based on the information about the workload obtained from the orchestration platform (e.g., exposed ports, services, etc.). If specified, inbound ports are configured if and only if the workload instance is associated with a service.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.IstioIngressListener",
              },
            },
            egress: {
              description:
                "Egress specifies the configuration of the sidecar for processing outbound traffic from the attached workload instance to other services in the mesh. If not specified, inherits the system detected defaults from the namespace-wide or the global default Sidecar.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.IstioEgressListener",
              },
            },
            outboundTrafficPolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.OutboundTrafficPolicy",
            },
            localhost: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Localhost",
            },
          },
        },
        "istio.networking.v1alpha3.IstioIngressListener": {
          description:
            "`IstioIngressListener` specifies the properties of an inbound traffic listener on the sidecar proxy attached to a workload instance.",
          type: "object",
          properties: {
            port: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Port",
            },
            bind: {
              description:
                "The IP to which the listener should be bound. Must be in the format `x.x.x.x`. Unix domain socket addresses are not allowed in the bind field for ingress listeners. If omitted, Istio will automatically configure the defaults based on imported services and the workload instances to which this configuration is applied to.",
              type: "string",
              format: "string",
            },
            defaultEndpoint: {
              description:
                "The loopback IP endpoint or Unix domain socket to which traffic should be forwarded to. This configuration can be used to redirect traffic arriving at the bind `IP:Port` on the sidecar to a `localhost:port` or Unix domain socket where the application workload instance is listening for connections. Format should be `127.0.0.1:PORT` or `unix:///path/to/socket`",
              type: "string",
              format: "string",
            },
            captureMode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.CaptureMode",
            },
            localhostClientTls: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings",
            },
          },
        },
        "istio.networking.v1alpha3.IstioEgressListener": {
          description:
            "`IstioEgressListener` specifies the properties of an outbound traffic listener on the sidecar proxy attached to a workload instance.",
          type: "object",
          properties: {
            port: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Port",
            },
            bind: {
              description:
                "The IP or the Unix domain socket to which the listener should be bound to. Port MUST be specified if bind is not empty. Format: `x.x.x.x` or `unix:///path/to/uds` or `unix://@foobar` (Linux abstract namespace). If omitted, Istio will automatically configure the defaults based on imported services, the workload instances to which this configuration is applied to and the captureMode. If captureMode is `NONE`, bind will default to 127.0.0.1.",
              type: "string",
              format: "string",
            },
            hosts: {
              description:
                "One or more service hosts exposed by the listener in `namespace/dnsName` format. Services in the specified namespace matching `dnsName` will be exposed. The corresponding service can be a service in the service registry (e.g., a Kubernetes or cloud foundry service) or a service specified using a `ServiceEntry` or `VirtualService` configuration. Any associated `DestinationRule` in the same namespace will also be used.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            captureMode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.CaptureMode",
            },
            localhostServerTls: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings",
            },
          },
        },
        "istio.networking.v1alpha3.OutboundTrafficPolicy": {
          description:
            "`OutboundTrafficPolicy` sets the default behavior of the sidecar for handling outbound traffic from the application. If your application uses one or more external services that are not known apriori, setting the policy to `ALLOW_ANY` will cause the sidecars to route any unknown traffic originating from the application to its requested destination. Users are strongly encouraged to use `ServiceEntry` configurations to explicitly declare any external dependencies, instead of using `ALLOW_ANY`, so that traffic to these services can be monitored.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.OutboundTrafficPolicy.Mode",
            },
            egressProxy: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.Destination",
            },
          },
        },
        "istio.networking.v1alpha3.Localhost": {
          description:
            "`Localhost` describes the sidecar settings related to the communication between the sidecar and the workload it is attached to in a Kubernetes Pod or a VM. These settings apply by default to all ingress and egress listeners in a sidecar unless overridden.",
          type: "object",
          properties: {
            clientTls: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings",
            },
            serverTls: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings",
            },
          },
        },
        "istio.networking.v1alpha3.CaptureMode": {
          description:
            "`CaptureMode` describes how traffic to a listener is expected to be captured. Applicable only when the listener is bound to an IP.",
          type: "string",
          enum: ["DEFAULT", "IPTABLES", "NONE"],
        },
        "istio.networking.v1alpha3.OutboundTrafficPolicy.Mode": {
          type: "string",
          enum: ["REGISTRY_ONLY", "ALLOW_ANY"],
        },
        "istio.networking.v1alpha3.Destination": {
          description:
            "Destination indicates the network addressable service to which the request/connection will be sent after processing a routing rule. The destination.host should unambiguously refer to a service in the service registry. Istio's service registry is composed of all the services found in the platform's service registry (e.g., Kubernetes services, Consul services), as well as services declared through the [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry) resource.",
          type: "object",
          properties: {
            host: {
              description:
                "The name of a service from the service registry. Service names are looked up from the platform's service registry (e.g., Kubernetes services, Consul services, etc.) and from the hosts declared by [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry). Traffic forwarded to destinations that are not found in either of the two, will be dropped.",
              type: "string",
              format: "string",
            },
            port: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.PortSelector",
            },
            subset: {
              description:
                "The name of a subset within the service. Applicable only to services within the mesh. The subset must be defined in a corresponding DestinationRule.",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Customizing Envoy configuration generated by Istio.",
      version: "v1alpha3",
    },
    components: {
      schemas: {
        "istio.networking.v1alpha3.EnvoyFilter": {
          description:
            "EnvoyFilter provides a mechanism to customize the Envoy configuration generated by Istio Pilot.",
          type: "object",
          properties: {
            workloadSelector: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.WorkloadSelector",
            },
            configPatches: {
              description: "One or more patches with match conditions.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.EnvoyConfigObjectPatch",
              },
            },
          },
        },
        "istio.networking.v1alpha3.WorkloadSelector": {
          description:
            "`WorkloadSelector` specifies the criteria used to determine if the `Gateway`, `Sidecar`, or `EnvoyFilter` or `ServiceEntry` configuration can be applied to a proxy. The matching criteria includes the metadata associated with a proxy, workload instance info such as labels attached to the pod/VM, or any other info that the proxy provides to Istio during the initial handshake. If multiple conditions are specified, all conditions need to match in order for the workload instance to be selected. Currently, only label based selection mechanism is supported.",
          type: "object",
          properties: {
            labels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which the configuration should be applied. The scope of label search is restricted to the configuration namespace in which the the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.EnvoyConfigObjectPatch": {
          description: "Changes to be made to various envoy config objects.",
          type: "object",
          properties: {
            applyTo: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ApplyTo",
            },
            match: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.EnvoyConfigObjectMatch",
            },
            patch: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.Patch",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.ApplyTo": {
          description:
            "ApplyTo specifies where in the Envoy configuration, the given patch should be applied.",
          type: "string",
          enum: [
            "INVALID",
            "LISTENER",
            "FILTER_CHAIN",
            "NETWORK_FILTER",
            "HTTP_FILTER",
            "ROUTE_CONFIGURATION",
            "VIRTUAL_HOST",
            "HTTP_ROUTE",
            "CLUSTER",
          ],
        },
        "istio.networking.v1alpha3.EnvoyFilter.PatchContext": {
          description:
            "PatchContext selects a class of configurations based on the traffic flow direction and workload type.",
          type: "string",
          enum: ["ANY", "SIDECAR_INBOUND", "SIDECAR_OUTBOUND", "GATEWAY"],
        },
        "istio.networking.v1alpha3.EnvoyFilter.ProxyMatch": {
          description: "One or more properties of the proxy to match on.",
          type: "object",
          properties: {
            proxyVersion: {
              description:
                "A regular expression in golang regex format (RE2) that can be used to select proxies using a specific version of istio proxy. The Istio version for a given proxy is obtained from the node metadata field ISTIO_VERSION supplied by the proxy when connecting to Pilot. This value is embedded as an environment variable (ISTIO_META_ISTIO_VERSION) in the Istio proxy docker image. Custom proxy implementations should provide this metadata variable to take advantage of the Istio version check option.",
              type: "string",
              format: "string",
            },
            metadata: {
              description:
                "Match on the node metadata supplied by a proxy when connecting to Istio Pilot. Note that while Envoy's node metadata is of type Struct, only string key-value pairs are processed by Pilot. All keys specified in the metadata must match with exact values. The match will fail if any of the specified keys are absent or the values fail to match.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.ClusterMatch": {
          description:
            "Conditions specified in ClusterMatch must be met for the patch to be applied to a cluster.",
          type: "object",
          properties: {
            name: {
              description:
                'The exact name of the cluster to match. To match a specific cluster by name, such as the internally generated "Passthrough" cluster, leave all fields in clusterMatch empty, except the name.',
              type: "string",
              format: "string",
            },
            portNumber: {
              description:
                "The service port for which this cluster was generated. If omitted, applies to clusters for any port.",
              type: "integer",
            },
            service: {
              description:
                "The fully qualified service name for this cluster. If omitted, applies to clusters for any service. For services defined through service entries, the service name is same as the hosts defined in the service entry.",
              type: "string",
              format: "string",
            },
            subset: {
              description:
                "The subset associated with the service. If omitted, applies to clusters for any subset of a service.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch": {
          description:
            "Conditions specified in RouteConfigurationMatch must be met for the patch to be applied to a route configuration object or a specific virtual host within the route configuration.",
          type: "object",
          properties: {
            name: {
              description:
                'Route configuration name to match on. Can be used to match a specific route configuration by name, such as the internally generated "http_proxy" route configuration for all sidecars.',
              type: "string",
              format: "string",
            },
            portNumber: {
              description:
                "The service port number or gateway server port number for which this route configuration was generated. If omitted, applies to route configurations for all ports.",
              type: "integer",
            },
            portName: {
              description:
                "Applicable only for GATEWAY context. The gateway server port name for which this route configuration was generated.",
              type: "string",
              format: "string",
            },
            gateway: {
              description:
                "The Istio gateway config's namespace/name for which this route configuration was generated. Applies only if the context is GATEWAY. Should be in the namespace/name format. Use this field in conjunction with the portNumber and portName to accurately select the Envoy route configuration for a specific HTTPS server within a gateway config object.",
              type: "string",
              format: "string",
            },
            vhost: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch.VirtualHostMatch",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch.VirtualHostMatch": {
          description:
            "Match a specific virtual host inside a route configuration.",
          type: "object",
          properties: {
            name: {
              description:
                "The VirtualHosts objects generated by Istio are named as host:port, where the host typically corresponds to the VirtualService's host field or the hostname of a service in the registry.",
              type: "string",
              format: "string",
            },
            route: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch.RouteMatch",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch.RouteMatch": {
          description:
            "Match a specific route inside a virtual host in a route configuration.",
          type: "object",
          properties: {
            name: {
              description:
                'The Route objects generated by default are named as "default". Route objects generated using a virtual service will carry the name used in the virtual service\'s HTTP routes.',
              type: "string",
              format: "string",
            },
            action: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch.RouteMatch.Action",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch.RouteMatch.Action": {
          description:
            "Action refers to the route action taken by Envoy when a http route matches.",
          type: "string",
          enum: ["ANY", "ROUTE", "REDIRECT", "DIRECT_RESPONSE"],
        },
        "istio.networking.v1alpha3.EnvoyFilter.ListenerMatch": {
          description:
            "Conditions specified in a listener match must be met for the patch to be applied to a specific listener across all filter chains, or a specific filter chain inside the listener.",
          type: "object",
          properties: {
            name: {
              description:
                "Match a specific listener by its name. The listeners generated by Pilot are typically named as IP:Port.",
              type: "string",
              format: "string",
            },
            portNumber: {
              description:
                "The service port/gateway port to which traffic is being sent/received. If not specified, matches all listeners. Even though inbound listeners are generated for the instance/pod ports, only service ports should be used to match listeners.",
              type: "integer",
            },
            portName: {
              description:
                "Instead of using specific port numbers, a set of ports matching a given service's port name can be selected. Matching is case insensitive. Not implemented. $hide_from_docs",
              type: "string",
              format: "string",
            },
            filterChain: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ListenerMatch.FilterChainMatch",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.ListenerMatch.FilterChainMatch": {
          description:
            "For listeners with multiple filter chains (e.g., inbound listeners on sidecars with permissive mTLS, gateway listeners with multiple SNI matches), the filter chain match can be used to select a specific filter chain to patch.",
          type: "object",
          properties: {
            name: {
              description: "The name assigned to the filter chain.",
              type: "string",
              format: "string",
            },
            sni: {
              description:
                "The SNI value used by a filter chain's match condition. This condition will evaluate to false if the filter chain has no sni match.",
              type: "string",
              format: "string",
            },
            transportProtocol: {
              description:
                "Applies only to SIDECAR_INBOUND context. If non-empty, a transport protocol to consider when determining a filter chain match. This value will be compared against the transport protocol of a new connection, when it's detected by the tls_inspector listener filter.",
              type: "string",
              format: "string",
            },
            applicationProtocols: {
              description:
                "Applies only to sidecars. If non-empty, a comma separated set of application protocols to consider when determining a filter chain match. This value will be compared against the application protocols of a new connection, when it's detected by one of the listener filters such as the http_inspector.",
              type: "string",
              format: "string",
            },
            filter: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ListenerMatch.FilterMatch",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.ListenerMatch.FilterMatch": {
          description:
            "Conditions to match a specific filter within a filter chain.",
          type: "object",
          properties: {
            name: {
              description: "The filter name to match on.",
              type: "string",
              format: "string",
            },
            subFilter: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ListenerMatch.SubFilterMatch",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.ListenerMatch.SubFilterMatch": {
          description:
            "Conditions to match a specific filter within another filter. This field is typically useful to match a HTTP filter inside the envoy.http_connection_manager network filter. This could also be applicable for thrift filters.",
          type: "object",
          properties: {
            name: {
              description: "The filter name to match on.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.Patch": {
          description:
            "Patch specifies how the selected object should be modified.",
          type: "object",
          properties: {
            operation: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.Patch.Operation",
            },
            value: {
              description:
                "The JSON config of the object being patched. This will be merged using json merge semantics with the existing proto in the path.",
              type: "object",
            },
          },
        },
        "istio.networking.v1alpha3.EnvoyFilter.Patch.Operation": {
          description:
            "Operation denotes how the patch should be applied to the selected configuration.",
          type: "string",
          enum: [
            "INVALID",
            "MERGE",
            "ADD",
            "REMOVE",
            "INSERT_BEFORE",
            "INSERT_AFTER",
            "INSERT_FIRST",
          ],
        },
        "istio.networking.v1alpha3.EnvoyFilter.EnvoyConfigObjectMatch": {
          description:
            "One or more match conditions to be met before a patch is applied to the generated configuration for a given proxy.",
          type: "object",
          properties: {
            context: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.PatchContext",
            },
            proxy: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ProxyMatch",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["listener"],
                    properties: {
                      listener: {
                        $ref:
                          "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ListenerMatch",
                      },
                    },
                  },
                  {
                    required: ["routeConfiguration"],
                    properties: {
                      routeConfiguration: {
                        $ref:
                          "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch",
                      },
                    },
                  },
                  {
                    required: ["cluster"],
                    properties: {
                      cluster: {
                        $ref:
                          "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ClusterMatch",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["listener"],
              properties: {
                listener: {
                  $ref:
                    "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ListenerMatch",
                },
              },
            },
            {
              required: ["routeConfiguration"],
              properties: {
                routeConfiguration: {
                  $ref:
                    "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.RouteConfigurationMatch",
                },
              },
            },
            {
              required: ["cluster"],
              properties: {
                cluster: {
                  $ref:
                    "#/components/schemas/istio.networking.v1alpha3.EnvoyFilter.ClusterMatch",
                },
              },
            },
          ],
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting service registry.",
      version: "v1alpha3",
    },
    components: {
      schemas: {
        "istio.networking.v1alpha3.WorkloadSelector": {
          description:
            "`WorkloadSelector` specifies the criteria used to determine if the `Gateway`, `Sidecar`, or `EnvoyFilter` or `ServiceEntry` configuration can be applied to a proxy. The matching criteria includes the metadata associated with a proxy, workload instance info such as labels attached to the pod/VM, or any other info that the proxy provides to Istio during the initial handshake. If multiple conditions are specified, all conditions need to match in order for the workload instance to be selected. Currently, only label based selection mechanism is supported.",
          type: "object",
          properties: {
            labels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which the configuration should be applied. The scope of label search is restricted to the configuration namespace in which the the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.Port": {
          description:
            "Port describes the properties of a specific port of a service.",
          type: "object",
          properties: {
            number: {
              description: "A valid non-negative integer port number.",
              type: "integer",
            },
            name: {
              description: "Label assigned to the port.",
              type: "string",
              format: "string",
            },
            protocol: {
              description:
                "The protocol exposed on the port. MUST BE one of HTTP|HTTPS|GRPC|HTTP2|MONGO|TCP|TLS. TLS implies the connection will be routed based on the SNI header to the destination without terminating the TLS connection.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.ServiceEntry": {
          description:
            "ServiceEntry enables adding additional entries into Istio's internal service registry.",
          type: "object",
          properties: {
            exportTo: {
              description:
                "A list of namespaces to which this service is exported. Exporting a service allows it to be used by sidecars, gateways and virtual services defined in other namespaces. This feature provides a mechanism for service owners and mesh administrators to control the visibility of services across namespace boundaries.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            subjectAltNames: {
              description:
                "If specified, the proxy will verify that the server certificate's subject alternate name matches one of the specified values.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            workloadSelector: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.WorkloadSelector",
            },
            hosts: {
              description:
                "The hosts associated with the ServiceEntry. Could be a DNS name with wildcard prefix.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            addresses: {
              description:
                "The virtual IP addresses associated with the service. Could be CIDR prefix. For HTTP traffic, generated route configurations will include http route domains for both the `addresses` and `hosts` field values and the destination will be identified based on the HTTP Host/Authority header. If one or more IP addresses are specified, the incoming traffic will be identified as belonging to this service if the destination IP matches the IP/CIDRs specified in the addresses field. If the Addresses field is empty, traffic will be identified solely based on the destination port. In such scenarios, the port on which the service is being accessed must not be shared by any other service in the mesh. In other words, the sidecar will behave as a simple TCP proxy, forwarding incoming traffic on a specified port to the specified destination endpoint IP/host. Unix domain socket addresses are not supported in this field.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            ports: {
              description:
                "The ports associated with the external service. If the Endpoints are Unix domain socket addresses, there must be exactly one port.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1alpha3.Port",
              },
            },
            location: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServiceEntry.Location",
            },
            resolution: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServiceEntry.Resolution",
            },
            endpoints: {
              description:
                "One or more endpoints associated with the service. Only one of `endpoints` or `workloadSelector` can be specified.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.WorkloadEntry",
              },
            },
          },
        },
        "istio.networking.v1alpha3.ServiceEntry.Location": {
          description:
            "Location specifies whether the service is part of Istio mesh or outside the mesh. Location determines the behavior of several features, such as service-to-service mTLS authentication, policy enforcement, etc. When communicating with services outside the mesh, Istio's mTLS authentication is disabled, and policy enforcement is performed on the client-side as opposed to server-side.",
          type: "string",
          enum: ["MESH_EXTERNAL", "MESH_INTERNAL"],
        },
        "istio.networking.v1alpha3.ServiceEntry.Resolution": {
          description:
            "Resolution determines how the proxy will resolve the IP addresses of the network endpoints associated with the service, so that it can route to one of them. The resolution mode specified here has no impact on how the application resolves the IP address associated with the service. The application may still have to use DNS to resolve the service to an IP so that the outbound traffic can be captured by the Proxy. Alternatively, for HTTP services, the application could directly communicate with the proxy (e.g., by setting HTTP_PROXY) to talk to these services.",
          type: "string",
          enum: ["NONE", "STATIC", "DNS"],
        },
        "istio.networking.v1alpha3.WorkloadEntry": {
          description:
            "WorkloadEntry enables specifying the properties of a single non-Kubernetes workload such a VM or a bare metal services that can be referred to by service entries.",
          type: "object",
          properties: {
            labels: {
              description: "One or more labels associated with the endpoint.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            ports: {
              description:
                "Set of ports associated with the endpoint. The ports must be associated with a port name that was declared as part of the service. Do not use for `unix://` addresses.",
              type: "object",
              additionalProperties: {
                type: "integer",
              },
            },
            weight: {
              description:
                "The load balancing weight associated with the endpoint. Endpoints with higher weights will receive proportionally higher traffic.",
              type: "integer",
            },
            address: {
              description:
                "Address associated with the network endpoint without the port. Domain names can be used if and only if the resolution is set to DNS, and must be fully-qualified without wildcards. Use the form unix:///absolute/path/to/socket for Unix domain socket endpoints.",
              type: "string",
              format: "string",
            },
            network: {
              description:
                "Network enables Istio to group endpoints resident in the same L3 domain/network. All endpoints in the same network are assumed to be directly reachable from one another. When endpoints in different networks cannot reach each other directly, an Istio Gateway can be used to establish connectivity (usually using the `AUTO_PASSTHROUGH` mode in a Gateway Server). This is an advanced configuration used typically for spanning an Istio mesh over multiple clusters.",
              type: "string",
              format: "string",
            },
            locality: {
              description:
                'The locality associated with the endpoint. A locality corresponds to a failure domain (e.g., country/region/zone). Arbitrary failure domain hierarchies can be represented by separating each encapsulating failure domain by /. For example, the locality of an an endpoint in US, in US-East-1 region, within availability zone az-1, in data center rack r11 can be represented as us/us-east-1/az-1/r11. Istio will configure the sidecar to route to endpoints within the same locality as the sidecar. If none of the endpoints in the locality are available, endpoints parent locality (but within the same network ID) will be chosen. For example, if there are two endpoints in same network (networkID "n1"), say e1 with locality us/us-east-1/az-1/r11 and e2 with locality us/us-east-1/az-2/r12, a sidecar from us/us-east-1/az-1/r11 locality will prefer e1 from the same locality over e2 from a different locality. Endpoint e2 could be the IP associated with a gateway (that bridges networks n1 and n2), or the IP associated with a standard service endpoint.',
              type: "string",
              format: "string",
            },
            serviceAccount: {
              description:
                "The service account associated with the workload if a sidecar is present in the workload. The service account must be present in the same namespace as the configuration ( WorkloadEntry or a ServiceEntry)",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting edge load balancer.",
      version: "v1alpha3",
    },
    components: {
      schemas: {
        "istio.networking.v1alpha3.Gateway": {
          description:
            "Gateway describes a load balancer operating at the edge of the mesh receiving incoming or outgoing HTTP/TCP connections.",
          type: "object",
          properties: {
            servers: {
              description: "A list of server specifications.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1alpha3.Server",
              },
            },
            selector: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which this gateway configuration should be applied. The scope of label search is restricted to the configuration namespace in which the the resource is present. In other words, the Gateway resource must reside in the same namespace as the gateway workload instance. If selector is nil, the Gateway will be applied to all workloads.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.Server": {
          description:
            "`Server` describes the properties of the proxy on a given load balancer port. For example,",
          type: "object",
          properties: {
            name: {
              description:
                "An optional name of the server, when set must be unique across all servers. This will be used for variety of purposes like prefixing stats generated with this name etc.",
              type: "string",
              format: "string",
            },
            tls: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings",
            },
            port: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Port",
            },
            bind: {
              description:
                "The ip or the Unix domain socket to which the listener should be bound to. Format: `x.x.x.x` or `unix:///path/to/uds` or `unix://@foobar` (Linux abstract namespace). When using Unix domain sockets, the port number should be 0.",
              type: "string",
              format: "string",
            },
            hosts: {
              description:
                "One or more hosts exposed by this gateway. While typically applicable to HTTP services, it can also be used for TCP services using TLS with SNI. A host is specified as a `dnsName` with an optional `namespace/` prefix. The `dnsName` should be specified using FQDN format, optionally including a wildcard character in the left-most component (e.g., `prod/*.example.com`). Set the `dnsName` to `*` to select all `VirtualService` hosts from the specified namespace (e.g.,`prod/*`).",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            defaultEndpoint: {
              description:
                "The loopback IP endpoint or Unix domain socket to which traffic should be forwarded to by default. Format should be `127.0.0.1:PORT` or `unix:///path/to/socket` or `unix://@foobar` (Linux abstract namespace). NOT IMPLEMENTED. $hide_from_docs",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.Port": {
          description:
            "Port describes the properties of a specific port of a service.",
          type: "object",
          properties: {
            number: {
              description: "A valid non-negative integer port number.",
              type: "integer",
            },
            name: {
              description: "Label assigned to the port.",
              type: "string",
              format: "string",
            },
            protocol: {
              description:
                "The protocol exposed on the port. MUST BE one of HTTP|HTTPS|GRPC|HTTP2|MONGO|TCP|TLS. TLS implies the connection will be routed based on the SNI header to the destination without terminating the TLS connection.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.ServerTLSSettings": {
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings.TLSmode",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server's private key.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to a file containing certificate authority certificates to use in verifying a presented client side certificate.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "For gateways running on Kubernetes, the name of the secret that holds the TLS certs including the CA certificates. Applicable only on Kubernetes. The secret (of type`generic`) should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for server certificates along with ca.crt key for CA certificates is also supported. Only one of server certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate presented by the client.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            httpsRedirect: {
              description:
                "If set to true, the load balancer will send a 301 redirect for all http connections, asking the clients to use HTTPS.",
              type: "boolean",
            },
            serverCertificate: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server-side TLS certificate to use.",
              type: "string",
              format: "string",
            },
            verifyCertificateSpki: {
              description:
                "An optional list of base64-encoded SHA-256 hashes of the SKPIs of authorized client certificates. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            verifyCertificateHash: {
              description:
                "An optional list of hex-encoded SHA-256 hashes of the authorized client certificates. Both simple and colon separated formats are acceptable. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            minProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings.TLSProtocol",
            },
            maxProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ServerTLSSettings.TLSProtocol",
            },
            cipherSuites: {
              description:
                "Optional: If specified, only support the specified cipher list. Otherwise default to the default cipher list supported by Envoy.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.ServerTLSSettings.TLSmode": {
          description: "TLS modes enforced by the proxy",
          type: "string",
          enum: [
            "PASSTHROUGH",
            "SIMPLE",
            "MUTUAL",
            "AUTO_PASSTHROUGH",
            "ISTIO_MUTUAL",
          ],
        },
        "istio.networking.v1alpha3.ServerTLSSettings.TLSProtocol": {
          description: "TLS protocol versions.",
          type: "string",
          enum: ["TLS_AUTO", "TLSV1_0", "TLSV1_1", "TLSV1_2", "TLSV1_3"],
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting VMs onboarded into the mesh.",
      version: "v1alpha3",
    },
    components: {
      schemas: {
        "istio.networking.v1alpha3.WorkloadEntry": {
          description:
            "WorkloadEntry enables specifying the properties of a single non-Kubernetes workload such a VM or a bare metal services that can be referred to by service entries.",
          type: "object",
          properties: {
            labels: {
              description: "One or more labels associated with the endpoint.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            ports: {
              description:
                "Set of ports associated with the endpoint. The ports must be associated with a port name that was declared as part of the service. Do not use for `unix://` addresses.",
              type: "object",
              additionalProperties: {
                type: "integer",
              },
            },
            weight: {
              description:
                "The load balancing weight associated with the endpoint. Endpoints with higher weights will receive proportionally higher traffic.",
              type: "integer",
            },
            address: {
              description:
                "Address associated with the network endpoint without the port. Domain names can be used if and only if the resolution is set to DNS, and must be fully-qualified without wildcards. Use the form unix:///absolute/path/to/socket for Unix domain socket endpoints.",
              type: "string",
              format: "string",
            },
            network: {
              description:
                "Network enables Istio to group endpoints resident in the same L3 domain/network. All endpoints in the same network are assumed to be directly reachable from one another. When endpoints in different networks cannot reach each other directly, an Istio Gateway can be used to establish connectivity (usually using the `AUTO_PASSTHROUGH` mode in a Gateway Server). This is an advanced configuration used typically for spanning an Istio mesh over multiple clusters.",
              type: "string",
              format: "string",
            },
            locality: {
              description:
                'The locality associated with the endpoint. A locality corresponds to a failure domain (e.g., country/region/zone). Arbitrary failure domain hierarchies can be represented by separating each encapsulating failure domain by /. For example, the locality of an an endpoint in US, in US-East-1 region, within availability zone az-1, in data center rack r11 can be represented as us/us-east-1/az-1/r11. Istio will configure the sidecar to route to endpoints within the same locality as the sidecar. If none of the endpoints in the locality are available, endpoints parent locality (but within the same network ID) will be chosen. For example, if there are two endpoints in same network (networkID "n1"), say e1 with locality us/us-east-1/az-1/r11 and e2 with locality us/us-east-1/az-2/r12, a sidecar from us/us-east-1/az-1/r11 locality will prefer e1 from the same locality over e2 from a different locality. Endpoint e2 could be the IP associated with a gateway (that bridges networks n1 and n2), or the IP associated with a standard service endpoint.',
              type: "string",
              format: "string",
            },
            serviceAccount: {
              description:
                "The service account associated with the workload if a sidecar is present in the workload. The service account must be present in the same namespace as the configuration ( WorkloadEntry or a ServiceEntry)",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting label/content routing, sni routing, etc.",
      version: "v1alpha3",
    },
    components: {
      schemas: {
        "istio.networking.v1alpha3.PortSelector": {
          description:
            "PortSelector specifies the number of a port to be used for matching or selection for final routing.",
          type: "object",
          properties: {
            number: {
              description: "Valid port number",
              type: "integer",
            },
          },
        },
        "istio.networking.v1alpha3.Destination": {
          description:
            "Destination indicates the network addressable service to which the request/connection will be sent after processing a routing rule. The destination.host should unambiguously refer to a service in the service registry. Istio's service registry is composed of all the services found in the platform's service registry (e.g., Kubernetes services, Consul services), as well as services declared through the [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry) resource.",
          type: "object",
          properties: {
            host: {
              description:
                "The name of a service from the service registry. Service names are looked up from the platform's service registry (e.g., Kubernetes services, Consul services, etc.) and from the hosts declared by [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry). Traffic forwarded to destinations that are not found in either of the two, will be dropped.",
              type: "string",
              format: "string",
            },
            port: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.PortSelector",
            },
            subset: {
              description:
                "The name of a subset within the service. Applicable only to services within the mesh. The subset must be defined in a corresponding DestinationRule.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.VirtualService": {
          description: "Configuration affecting traffic routing.",
          type: "object",
          properties: {
            exportTo: {
              description:
                "A list of namespaces to which this virtual service is exported. Exporting a virtual service allows it to be used by sidecars and gateways defined in other namespaces. This feature provides a mechanism for service owners and mesh administrators to control the visibility of virtual services across namespace boundaries.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            tls: {
              description:
                "An ordered list of route rule for non-terminated TLS \u0026 HTTPS traffic. Routing is typically performed using the SNI value presented by the ClientHello message. TLS routes will be applied to platform service ports named 'https-*', 'tls-*', unterminated gateway ports using HTTPS/TLS protocols (i.e. with \"passthrough\" TLS mode) and service entry ports using HTTPS/TLS protocols. The first rule matching an incoming request is used. NOTE: Traffic 'https-*' or 'tls-*' ports without associated virtual service will be treated as opaque TCP traffic.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1alpha3.TLSRoute",
              },
            },
            tcp: {
              description:
                "An ordered list of route rules for opaque TCP traffic. TCP routes will be applied to any port that is not a HTTP or TLS port. The first rule matching an incoming request is used.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1alpha3.TCPRoute",
              },
            },
            http: {
              description:
                "An ordered list of route rules for HTTP traffic. HTTP routes will be applied to platform service ports named 'http-*'/'http2-*'/'grpc-*', gateway ports with protocol HTTP/HTTP2/GRPC/ TLS-terminated-HTTPS and service entry ports using HTTP/HTTP2/GRPC protocols. The first rule matching an incoming request is used.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.HTTPRoute",
              },
            },
            hosts: {
              description:
                "The destination hosts to which traffic is being sent. Could be a DNS name with wildcard prefix or an IP address. Depending on the platform, short-names can also be used instead of a FQDN (i.e. has no dots in the name). In such a scenario, the FQDN of the host would be derived based on the underlying platform.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            gateways: {
              description:
                "The names of gateways and sidecars that should apply these routes. Gateways in other namespaces may be referred to by `\u003cgateway namespace\u003e/\u003cgateway name\u003e`; specifying a gateway with no namespace qualifier is the same as specifying the VirtualService's namespace. A single VirtualService is used for sidecars inside the mesh as well as for one or more gateways. The selection condition imposed by this field can be overridden using the source field in the match conditions of protocol-specific routes. The reserved word `mesh` is used to imply all the sidecars in the mesh. When this field is omitted, the default gateway (`mesh`) will be used, which would apply the rule to all sidecars in the mesh. If a list of gateway names is provided, the rules will apply only to the gateways. To apply the rules to both gateways and sidecars, specify `mesh` as one of the gateway names.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.HTTPRoute": {
          description:
            "Describes match conditions and actions for routing HTTP/1.1, HTTP2, and gRPC traffic. See VirtualService for usage examples.",
          type: "object",
          properties: {
            name: {
              description:
                "The name assigned to the route for debugging purposes. The route's name will be concatenated with the match's name and will be logged in the access logs for requests matching this route/match.",
              type: "string",
              format: "string",
            },
            route: {
              description:
                "A HTTP rule can either redirect or forward (default) traffic. The forwarding target can be one of several versions of a service (see glossary in beginning of document). Weights associated with the service version determine the proportion of traffic it receives.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.HTTPRouteDestination",
              },
            },
            match: {
              description:
                "Match conditions to be satisfied for the rule to be activated. All conditions inside a single match block have AND semantics, while the list of match blocks have OR semantics. The rule is matched if any one of the match blocks succeed.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.HTTPMatchRequest",
              },
            },
            redirect: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.HTTPRedirect",
            },
            delegate: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Delegate",
            },
            rewrite: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.HTTPRewrite",
            },
            timeout: {
              description: "Timeout for HTTP requests.",
              type: "string",
            },
            retries: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.HTTPRetry",
            },
            fault: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.HTTPFaultInjection",
            },
            mirror: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.Destination",
            },
            mirrorPercent: {
              description:
                "Percentage of the traffic to be mirrored by the `mirror` field. Use of integer `mirror_percent` value is deprecated. Use the double `mirror_percentage` field instead",
              type: "integer",
              deprecated: true,
              nullable: true,
            },
            mirrorPercentage: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Percent",
            },
            corsPolicy: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.CorsPolicy",
            },
            headers: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Headers",
            },
          },
        },
        "istio.networking.v1alpha3.TLSRoute": {
          description:
            'Describes match conditions and actions for routing unterminated TLS traffic (TLS/HTTPS) The following routing rule forwards unterminated TLS traffic arriving at port 443 of gateway called "mygateway" to internal services in the mesh based on the SNI value.',
          type: "object",
          properties: {
            route: {
              description:
                "The destination to which the connection should be forwarded to.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.RouteDestination",
              },
            },
            match: {
              description:
                "Match conditions to be satisfied for the rule to be activated. All conditions inside a single match block have AND semantics, while the list of match blocks have OR semantics. The rule is matched if any one of the match blocks succeed.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.TLSMatchAttributes",
              },
            },
          },
        },
        "istio.networking.v1alpha3.TCPRoute": {
          description:
            "Describes match conditions and actions for routing TCP traffic. The following routing rule forwards traffic arriving at port 27017 for mongo.prod.svc.cluster.local to another Mongo server on port 5555.",
          type: "object",
          properties: {
            route: {
              description:
                "The destination to which the connection should be forwarded to.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.RouteDestination",
              },
            },
            match: {
              description:
                "Match conditions to be satisfied for the rule to be activated. All conditions inside a single match block have AND semantics, while the list of match blocks have OR semantics. The rule is matched if any one of the match blocks succeed.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.L4MatchAttributes",
              },
            },
          },
        },
        "istio.networking.v1alpha3.HTTPMatchRequest": {
          description:
            "HttpMatchRequest specifies a set of criterion to be met in order for the rule to be applied to the HTTP request. For example, the following restricts the rule to match only requests where the URL path starts with /ratings/v2/ and the request contains a custom `end-user` header with value `jason`.",
          type: "object",
          properties: {
            name: {
              description:
                "The name assigned to a match. The match's name will be concatenated with the parent route's name and will be logged in the access logs for requests matching this route.",
              type: "string",
              format: "string",
            },
            method: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.StringMatch",
            },
            port: {
              description:
                "Specifies the ports on the host that is being addressed. Many services only expose a single port or label ports with the protocols they support, in these cases it is not required to explicitly select the port.",
              type: "integer",
            },
            gateways: {
              description:
                "Names of gateways where the rule should be applied. Gateway names in the top-level `gateways` field of the VirtualService (if any) are overridden. The gateway match is independent of sourceLabels.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            headers: {
              description:
                "The header keys must be lowercase and use hyphen as the separator, e.g. _x-request-id_.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.StringMatch",
              },
            },
            uri: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.StringMatch",
            },
            scheme: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.StringMatch",
            },
            authority: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.StringMatch",
            },
            sourceLabels: {
              description:
                "One or more labels that constrain the applicability of a rule to workloads with the given labels. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            queryParams: {
              description: "Query parameters for matching.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.StringMatch",
              },
            },
            ignoreUriCase: {
              description:
                "Flag to specify whether the URI matching should be case-insensitive.",
              type: "boolean",
            },
            withoutHeaders: {
              description:
                "withoutHeader has the same syntax with the header, but has opposite meaning. If a header is matched with a matching rule among withoutHeader, the traffic becomes not matched one.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.StringMatch",
              },
            },
            sourceNamespace: {
              description:
                "Source namespace constraining the applicability of a rule to workloads in that namespace. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.HTTPRouteDestination": {
          description:
            'Each routing rule is associated with one or more service versions (see glossary in beginning of document). Weights associated with the version determine the proportion of traffic it receives. For example, the following rule will route 25% of traffic for the "reviews" service to instances with the "v2" tag and the remaining traffic (i.e., 75%) to "v1".',
          type: "object",
          properties: {
            headers: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Headers",
            },
            destination: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.Destination",
            },
            weight: {
              description:
                "The proportion of traffic to be forwarded to the service version. (0-100). Sum of weights across destinations SHOULD BE == 100. If there is only one destination in a rule, the weight value is assumed to be 100.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.networking.v1alpha3.HTTPRedirect": {
          description:
            "HTTPRedirect can be used to send a 301 redirect response to the caller, where the Authority/Host and the URI in the response can be swapped with the specified values. For example, the following rule redirects requests for /v1/getProductRatings API on the ratings service to /v1/bookRatings provided by the bookratings service.",
          type: "object",
          properties: {
            uri: {
              description:
                "On a redirect, overwrite the Path portion of the URL with this value. Note that the entire path will be replaced, irrespective of the request URI being matched as an exact path or prefix.",
              type: "string",
              format: "string",
            },
            authority: {
              description:
                "On a redirect, overwrite the Authority/Host portion of the URL with this value.",
              type: "string",
              format: "string",
            },
            redirectCode: {
              description:
                "On a redirect, Specifies the HTTP status code to use in the redirect response. The default response code is MOVED_PERMANENTLY (301).",
              type: "integer",
            },
          },
        },
        "istio.networking.v1alpha3.Delegate": {
          description:
            "Describes the delegate VirtualService. The following routing rules forward the traffic to `/productpage` by a delegate VirtualService named `productpage`, forward the traffic to `/reviews` by a delegate VirtualService named `reviews`.",
          type: "object",
          properties: {
            name: {
              description:
                "Name specifies the name of the delegate VirtualService.",
              type: "string",
              format: "string",
            },
            namespace: {
              description:
                "Namespace specifies the namespace where the delegate VirtualService resides. By default, it is same to the root's.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.HTTPRewrite": {
          description:
            "HTTPRewrite can be used to rewrite specific parts of a HTTP request before forwarding the request to the destination. Rewrite primitive can be used only with HTTPRouteDestination. The following example demonstrates how to rewrite the URL prefix for api call (/ratings) to ratings service before making the actual API call.",
          type: "object",
          properties: {
            uri: {
              description:
                "rewrite the path (or the prefix) portion of the URI with this value. If the original URI was matched based on prefix, the value provided in this field will replace the corresponding matched prefix.",
              type: "string",
              format: "string",
            },
            authority: {
              description: "rewrite the Authority/Host header with this value.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.HTTPRetry": {
          description:
            "Describes the retry policy to use when a HTTP request fails. For example, the following rule sets the maximum number of retries to 3 when calling ratings:v1 service, with a 2s timeout per retry attempt.",
          type: "object",
          properties: {
            attempts: {
              description:
                "Number of retries for a given request. The interval between retries will be determined automatically (25ms+). Actual number of retries attempted depends on the request `timeout` of the [HTTP route](https://istio.io/docs/reference/config/networking/virtual-service/#HTTPRoute).",
              type: "integer",
              format: "int32",
            },
            perTryTimeout: {
              description:
                "Timeout per retry attempt for a given request. format: 1h/1m/1s/1ms. MUST BE \u003e=1ms.",
              type: "string",
            },
            retryOn: {
              description:
                "Specifies the conditions under which retry takes place. One or more policies can be specified using a ‘,’ delimited list. See the [retry policies](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/router_filter#x-envoy-retry-on) and [gRPC retry policies](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/router_filter#x-envoy-retry-grpc-on) for more details.",
              type: "string",
              format: "string",
            },
            retryRemoteLocalities: {
              description:
                "Flag to specify whether the retries should retry to other localities. See the [retry plugin configuration](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/http/http_connection_management#retry-plugin-configuration) for more details.",
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.networking.v1alpha3.HTTPFaultInjection": {
          description:
            "HTTPFaultInjection can be used to specify one or more faults to inject while forwarding HTTP requests to the destination specified in a route. Fault specification is part of a VirtualService rule. Faults include aborting the Http request from downstream service, and/or delaying proxying of requests. A fault rule MUST HAVE delay or abort or both.",
          type: "object",
          properties: {
            delay: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.HTTPFaultInjection.Delay",
            },
            abort: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.HTTPFaultInjection.Abort",
            },
          },
        },
        "istio.networking.v1alpha3.Percent": {
          description:
            "Percent specifies a percentage in the range of [0.0, 100.0].",
          type: "object",
          properties: {
            value: {
              type: "number",
              format: "double",
            },
          },
        },
        "istio.networking.v1alpha3.CorsPolicy": {
          description:
            "Describes the Cross-Origin Resource Sharing (CORS) policy, for a given service. Refer to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) for further details about cross origin resource sharing. For example, the following rule restricts cross origin requests to those originating from example.com domain using HTTP POST/GET, and sets the `Access-Control-Allow-Credentials` header to false. In addition, it only exposes `X-Foo-bar` header and sets an expiry period of 1 day.",
          type: "object",
          properties: {
            allowOrigin: {
              description:
                "The list of origins that are allowed to perform CORS requests. The content will be serialized into the Access-Control-Allow-Origin header. Wildcard * will allow all origins. $hide_from_docs",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
              deprecated: true,
            },
            allowOrigins: {
              description:
                "String patterns that match allowed origins. An origin is allowed if any of the string matchers match. If a match is found, then the outgoing Access-Control-Allow-Origin would be set to the origin as provided by the client.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.StringMatch",
              },
            },
            allowMethods: {
              description:
                "List of HTTP methods allowed to access the resource. The content will be serialized into the Access-Control-Allow-Methods header.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            allowHeaders: {
              description:
                "List of HTTP headers that can be used when requesting the resource. Serialized to Access-Control-Allow-Headers header.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            exposeHeaders: {
              description:
                "A white list of HTTP headers that the browsers are allowed to access. Serialized into Access-Control-Expose-Headers header.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            maxAge: {
              description:
                "Specifies how long the results of a preflight request can be cached. Translates to the `Access-Control-Max-Age` header.",
              type: "string",
            },
            allowCredentials: {
              description:
                "Indicates whether the caller is allowed to send the actual request (not the preflight) using credentials. Translates to `Access-Control-Allow-Credentials` header.",
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.networking.v1alpha3.Headers": {
          description:
            "Message headers can be manipulated when Envoy forwards requests to, or responses from, a destination service. Header manipulation rules can be specified for a specific route destination or for all destinations. The following VirtualService adds a `test` header with the value `true` to requests that are routed to any `reviews` service destination. It also romoves the `foo` response header, but only from responses coming from the `v1` subset (version) of the `reviews` service.",
          type: "object",
          properties: {
            response: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.Headers.HeaderOperations",
            },
            request: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.Headers.HeaderOperations",
            },
          },
        },
        "istio.networking.v1alpha3.Headers.HeaderOperations": {
          description:
            "HeaderOperations Describes the header manipulations to apply",
          type: "object",
          properties: {
            set: {
              description:
                "Overwrite the headers specified by key with the given values",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            add: {
              description:
                "Append the given values to the headers specified by keys (will create a comma-separated list of values)",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            remove: {
              description: "Remove a the specified headers",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.TLSMatchAttributes": {
          description: "TLS connection match attributes.",
          type: "object",
          properties: {
            port: {
              description:
                "Specifies the port on the host that is being addressed. Many services only expose a single port or label ports with the protocols they support, in these cases it is not required to explicitly select the port.",
              type: "integer",
            },
            gateways: {
              description:
                "Names of gateways where the rule should be applied. Gateway names in the top-level `gateways` field of the VirtualService (if any) are overridden. The gateway match is independent of sourceLabels.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sourceLabels: {
              description:
                "One or more labels that constrain the applicability of a rule to workloads with the given labels. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it should include the reserved gateway `mesh` in order for this field to be applicable.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            sourceNamespace: {
              description:
                "Source namespace constraining the applicability of a rule to workloads in that namespace. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "string",
              format: "string",
            },
            destinationSubnets: {
              description:
                "IPv4 or IPv6 ip addresses of destination with optional subnet. E.g., a.b.c.d/xx form or just a.b.c.d.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sniHosts: {
              description:
                "SNI (server name indicator) to match on. Wildcard prefixes can be used in the SNI value, e.g., *.com will match foo.example.com as well as example.com. An SNI value must be a subset (i.e., fall within the domain) of the corresponding virtual serivce's hosts.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.RouteDestination": {
          description: "L4 routing rule weighted destination.",
          type: "object",
          properties: {
            destination: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.Destination",
            },
            weight: {
              description:
                "The proportion of traffic to be forwarded to the service version. If there is only one destination in a rule, all traffic will be routed to it irrespective of the weight.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.networking.v1alpha3.L4MatchAttributes": {
          description:
            "L4 connection match attributes. Note that L4 connection matching support is incomplete.",
          type: "object",
          properties: {
            port: {
              description:
                "Specifies the port on the host that is being addressed. Many services only expose a single port or label ports with the protocols they support, in these cases it is not required to explicitly select the port.",
              type: "integer",
            },
            gateways: {
              description:
                "Names of gateways where the rule should be applied. Gateway names in the top-level `gateways` field of the VirtualService (if any) are overridden. The gateway match is independent of sourceLabels.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sourceLabels: {
              description:
                "One or more labels that constrain the applicability of a rule to workloads with the given labels. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it should include the reserved gateway `mesh` in order for this field to be applicable.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            sourceNamespace: {
              description:
                "Source namespace constraining the applicability of a rule to workloads in that namespace. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "string",
              format: "string",
            },
            destinationSubnets: {
              description:
                "IPv4 or IPv6 ip addresses of destination with optional subnet. E.g., a.b.c.d/xx form or just a.b.c.d.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sourceSubnet: {
              description:
                "IPv4 or IPv6 ip address of source with optional subnet. E.g., a.b.c.d/xx form or just a.b.c.d $hide_from_docs",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.StringMatch": {
          description:
            "Describes how to match a given string in HTTP headers. Match is case-sensitive.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["exact"],
                    properties: {
                      exact: {
                        description: "exact string match",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["prefix"],
                    properties: {
                      prefix: {
                        description: "prefix-based match",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["regex"],
                    properties: {
                      regex: {
                        description:
                          "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["exact"],
              properties: {
                exact: {
                  description: "exact string match",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["prefix"],
              properties: {
                prefix: {
                  description: "prefix-based match",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["regex"],
              properties: {
                regex: {
                  description:
                    "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.networking.v1alpha3.HTTPFaultInjection.Delay": {
          description:
            'Delay specification is used to inject latency into the request forwarding path. The following example will introduce a 5 second delay in 1 out of every 1000 requests to the "v1" version of the "reviews" service from all pods with label env: prod',
          type: "object",
          properties: {
            percent: {
              description:
                "Percentage of requests on which the delay will be injected (0-100). Use of integer `percent` value is deprecated. Use the double `percentage` field instead.",
              type: "integer",
              format: "int32",
              deprecated: true,
            },
            percentage: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Percent",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["fixedDelay"],
                    properties: {
                      fixedDelay: {
                        description:
                          "Add a fixed delay before forwarding the request. Format: 1h/1m/1s/1ms. MUST be \u003e=1ms.",
                        type: "string",
                      },
                    },
                  },
                  {
                    required: ["exponentialDelay"],
                    properties: {
                      exponentialDelay: {
                        type: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["fixedDelay"],
              properties: {
                fixedDelay: {
                  description:
                    "Add a fixed delay before forwarding the request. Format: 1h/1m/1s/1ms. MUST be \u003e=1ms.",
                  type: "string",
                },
              },
            },
            {
              required: ["exponentialDelay"],
              properties: {
                exponentialDelay: {
                  type: "string",
                },
              },
            },
          ],
        },
        "istio.networking.v1alpha3.HTTPFaultInjection.Abort": {
          description:
            'Abort specification is used to prematurely abort a request with a pre-specified error code. The following example will return an HTTP 400 error code for 1 out of every 1000 requests to the "ratings" service "v1".',
          type: "object",
          properties: {
            percentage: {
              $ref: "#/components/schemas/istio.networking.v1alpha3.Percent",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["httpStatus"],
                    properties: {
                      httpStatus: {
                        description:
                          "HTTP status code to use to abort the Http request.",
                        type: "integer",
                        format: "int32",
                      },
                    },
                  },
                  {
                    required: ["grpcStatus"],
                    properties: {
                      grpcStatus: {
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["http2Error"],
                    properties: {
                      http2Error: {
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["httpStatus"],
              properties: {
                httpStatus: {
                  description:
                    "HTTP status code to use to abort the Http request.",
                  type: "integer",
                  format: "int32",
                },
              },
            },
            {
              required: ["grpcStatus"],
              properties: {
                grpcStatus: {
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["http2Error"],
              properties: {
                http2Error: {
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting load balancing, outlier detection, etc.",
      version: "v1alpha3",
    },
    components: {
      schemas: {
        "istio.networking.v1alpha3.DestinationRule": {
          description:
            "DestinationRule defines policies that apply to traffic intended for a service after routing has occurred.",
          type: "object",
          properties: {
            host: {
              description:
                "The name of a service from the service registry. Service names are looked up from the platform's service registry (e.g., Kubernetes services, Consul services, etc.) and from the hosts declared by [ServiceEntries](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry). Rules defined for services that do not exist in the service registry will be ignored.",
              type: "string",
              format: "string",
            },
            trafficPolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.TrafficPolicy",
            },
            subsets: {
              description:
                "One or more named sets that represent individual versions of a service. Traffic policies can be overridden at subset level.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1alpha3.Subset",
              },
            },
            exportTo: {
              description:
                "A list of namespaces to which this destination rule is exported. The resolution of a destination rule to apply to a service occurs in the context of a hierarchy of namespaces. Exporting a destination rule allows it to be included in the resolution hierarchy for services in other namespaces. This feature provides a mechanism for service owners and mesh administrators to control the visibility of destination rules across namespace boundaries.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.TrafficPolicy": {
          description:
            "Traffic policies to apply for a specific destination, across all destination ports. See DestinationRule for examples.",
          type: "object",
          properties: {
            loadBalancer: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings",
            },
            connectionPool: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings",
            },
            outlierDetection: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.OutlierDetection",
            },
            tls: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings",
            },
            portLevelSettings: {
              description:
                "Traffic policies specific to individual ports. Note that port level settings will override the destination-level settings. Traffic settings specified at the destination-level will not be inherited when overridden by port-level settings, i.e. default values will be applied to fields omitted in port-level traffic policies.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.TrafficPolicy.PortTrafficPolicy",
              },
            },
          },
        },
        "istio.networking.v1alpha3.Subset": {
          description:
            "A subset of endpoints of a service. Subsets can be used for scenarios like A/B testing, or routing to a specific version of a service. Refer to [VirtualService](https://istio.io/docs/reference/config/networking/virtual-service/#VirtualService) documentation for examples of using subsets in these scenarios. In addition, traffic policies defined at the service-level can be overridden at a subset-level. The following rule uses a round robin load balancing policy for all traffic going to a subset named testversion that is composed of endpoints (e.g., pods) with labels (version:v3).",
          type: "object",
          properties: {
            name: {
              description:
                "Name of the subset. The service name and the subset name can be used for traffic splitting in a route rule.",
              type: "string",
              format: "string",
            },
            trafficPolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.TrafficPolicy",
            },
            labels: {
              description:
                "Labels apply a filter over the endpoints of a service in the service registry. See route rules for examples of usage.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1alpha3.LoadBalancerSettings": {
          description:
            "Load balancing policies to apply for a specific destination. See Envoy's load balancing [documentation](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancing) for more details.",
          type: "object",
          properties: {
            localityLbSetting: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.LocalityLoadBalancerSetting",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["simple"],
                    properties: {
                      simple: {
                        $ref:
                          "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings.SimpleLB",
                      },
                    },
                  },
                  {
                    required: ["consistentHash"],
                    properties: {
                      consistentHash: {
                        $ref:
                          "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings.ConsistentHashLB",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["simple"],
              properties: {
                simple: {
                  $ref:
                    "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings.SimpleLB",
                },
              },
            },
            {
              required: ["consistentHash"],
              properties: {
                consistentHash: {
                  $ref:
                    "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings.ConsistentHashLB",
                },
              },
            },
          ],
        },
        "istio.networking.v1alpha3.ConnectionPoolSettings": {
          description:
            "Connection pool settings for an upstream host. The settings apply to each individual host in the upstream service. See Envoy's [circuit breaker](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking) for more details. Connection pool settings can be applied at the TCP level as well as at HTTP level.",
          type: "object",
          properties: {
            tcp: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings.TCPSettings",
            },
            http: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings.HTTPSettings",
            },
          },
        },
        "istio.networking.v1alpha3.OutlierDetection": {
          description:
            "A Circuit breaker implementation that tracks the status of each individual host in the upstream service. Applicable to both HTTP and TCP services. For HTTP services, hosts that continually return 5xx errors for API calls are ejected from the pool for a pre-defined period of time. For TCP services, connection timeouts or connection failures to a given host counts as an error when measuring the consecutive errors metric. See Envoy's [outlier detection](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/outlier) for more details.",
          type: "object",
          properties: {
            interval: {
              description:
                "Time interval between ejection sweep analysis. format: 1h/1m/1s/1ms. MUST BE \u003e=1ms. Default is 10s.",
              type: "string",
            },
            consecutiveErrors: {
              description:
                "Number of errors before a host is ejected from the connection pool. Defaults to 5. When the upstream host is accessed over HTTP, a 502, 503, or 504 return code qualifies as an error. When the upstream host is accessed over an opaque TCP connection, connect timeouts and connection error/failure events qualify as an error. $hide_from_docs",
              type: "integer",
              format: "int32",
              deprecated: true,
            },
            consecutiveGatewayErrors: {
              description:
                "Number of gateway errors before a host is ejected from the connection pool. When the upstream host is accessed over HTTP, a 502, 503, or 504 return code qualifies as a gateway error. When the upstream host is accessed over an opaque TCP connection, connect timeouts and connection error/failure events qualify as a gateway error. This feature is disabled by default or when set to the value 0.",
              type: "integer",
              nullable: true,
            },
            consecutive5xxErrors: {
              description:
                "Number of 5xx errors before a host is ejected from the connection pool. When the upstream host is accessed over an opaque TCP connection, connect timeouts, connection error/failure and request failure events qualify as a 5xx error. This feature defaults to 5 but can be disabled by setting the value to 0.",
              type: "integer",
              nullable: true,
            },
            baseEjectionTime: {
              description:
                "Minimum ejection duration. A host will remain ejected for a period equal to the product of minimum ejection duration and the number of times the host has been ejected. This technique allows the system to automatically increase the ejection period for unhealthy upstream servers. format: 1h/1m/1s/1ms. MUST BE \u003e=1ms. Default is 30s.",
              type: "string",
            },
            maxEjectionPercent: {
              description:
                "Maximum % of hosts in the load balancing pool for the upstream service that can be ejected. Defaults to 10%.",
              type: "integer",
              format: "int32",
            },
            minHealthPercent: {
              description:
                "Outlier detection will be enabled as long as the associated load balancing pool has at least min_health_percent hosts in healthy mode. When the percentage of healthy hosts in the load balancing pool drops below this threshold, outlier detection will be disabled and the proxy will load balance across all hosts in the pool (healthy and unhealthy). The threshold can be disabled by setting it to 0%. The default is 0% as it's not typically applicable in k8s environments with few pods per service.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.networking.v1alpha3.ClientTLSSettings": {
          description:
            "SSL/TLS related settings for upstream connections. See Envoy's [TLS context](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/auth/cert.proto.html) for more details. These settings are common to both HTTP and TCP upstreams.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings.TLSmode",
            },
            clientCertificate: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client-side TLS certificate to use. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client's private key. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "OPTIONAL: The path to the file containing certificate authority certificates to use in verifying a presented server certificate. If omitted, the proxy will not verify the server's certificate. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "The name of the secret that holds the TLS certs for the client including the CA certificates. Applicable only on Kubernetes. Secret must exist in the same namespace with the proxy using the certificates. The secret (of type `generic`)should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for client certificates along with ca.crt key for CA certificates is also supported. Only one of client certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate. If specified, the proxy will verify that the server certificate's subject alt name matches one of the specified values. If specified, this list overrides the value of subject_alt_names from the ServiceEntry.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sni: {
              description:
                "SNI string to present to the server during TLS handshake.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.TrafficPolicy.PortTrafficPolicy": {
          description:
            "Traffic policies that apply to specific ports of the service",
          type: "object",
          properties: {
            loadBalancer: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings",
            },
            connectionPool: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings",
            },
            outlierDetection: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.OutlierDetection",
            },
            tls: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings",
            },
            port: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.PortSelector",
            },
          },
        },
        "istio.networking.v1alpha3.PortSelector": {
          description:
            "PortSelector specifies the number of a port to be used for matching or selection for final routing.",
          type: "object",
          properties: {
            number: {
              description: "Valid port number",
              type: "integer",
            },
          },
        },
        "istio.networking.v1alpha3.LocalityLoadBalancerSetting": {
          description:
            "Locality-weighted load balancing allows administrators to control the distribution of traffic to endpoints based on the localities of where the traffic originates and where it will terminate. These localities are specified using arbitrary labels that designate a hierarchy of localities in {region}/{zone}/{sub-zone} form. For additional detail refer to [Locality Weight](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/locality_weight) The following example shows how to setup locality weights mesh-wide.",
          type: "object",
          properties: {
            distribute: {
              description:
                "Optional: only one of distribute or failover can be set. Explicitly specify loadbalancing weight across different zones and geographical locations. Refer to [Locality weighted load balancing](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/locality_weight) If empty, the locality weight is set according to the endpoints number within it.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.LocalityLoadBalancerSetting.Distribute",
              },
            },
            failover: {
              description:
                "Optional: only failover or distribute can be set. Explicitly specify the region traffic will land on when endpoints in local region becomes unhealthy. Should be used together with OutlierDetection to detect unhealthy endpoints. Note: if no OutlierDetection specified, this will not take effect.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.LocalityLoadBalancerSetting.Failover",
              },
            },
            enabled: {
              description:
                "enable locality load balancing, this is DestinationRule-level and will override mesh wide settings in entirety. e.g. true means that turn on locality load balancing for this DestinationRule no matter what mesh wide settings is.",
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.networking.v1alpha3.LoadBalancerSettings.SimpleLB": {
          description:
            "Standard load balancing algorithms that require no tuning.",
          type: "string",
          enum: ["ROUND_ROBIN", "LEAST_CONN", "RANDOM", "PASSTHROUGH"],
        },
        "istio.networking.v1alpha3.LoadBalancerSettings.ConsistentHashLB": {
          description:
            "Consistent Hash-based load balancing can be used to provide soft session affinity based on HTTP headers, cookies or other properties. This load balancing policy is applicable only for HTTP connections. The affinity to a particular destination host will be lost when one or more hosts are added/removed from the destination service.",
          type: "object",
          properties: {
            minimumRingSize: {
              description:
                "The minimum number of virtual nodes to use for the hash ring. Defaults to 1024. Larger ring sizes result in more granular load distributions. If the number of hosts in the load balancing pool is larger than the ring size, each host will be assigned a single virtual node.",
              type: "integer",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["httpHeaderName"],
                    properties: {
                      httpHeaderName: {
                        description: "Hash based on a specific HTTP header.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["httpCookie"],
                    properties: {
                      httpCookie: {
                        $ref:
                          "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings.ConsistentHashLB.HTTPCookie",
                      },
                    },
                  },
                  {
                    required: ["useSourceIp"],
                    properties: {
                      useSourceIp: {
                        description: "Hash based on the source IP address.",
                        type: "boolean",
                      },
                    },
                  },
                  {
                    required: ["httpQueryParameterName"],
                    properties: {
                      httpQueryParameterName: {
                        description:
                          "Hash based on a specific HTTP query parameter.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["httpHeaderName"],
              properties: {
                httpHeaderName: {
                  description: "Hash based on a specific HTTP header.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["httpCookie"],
              properties: {
                httpCookie: {
                  $ref:
                    "#/components/schemas/istio.networking.v1alpha3.LoadBalancerSettings.ConsistentHashLB.HTTPCookie",
                },
              },
            },
            {
              required: ["useSourceIp"],
              properties: {
                useSourceIp: {
                  description: "Hash based on the source IP address.",
                  type: "boolean",
                },
              },
            },
            {
              required: ["httpQueryParameterName"],
              properties: {
                httpQueryParameterName: {
                  description: "Hash based on a specific HTTP query parameter.",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.networking.v1alpha3.LoadBalancerSettings.ConsistentHashLB.HTTPCookie": {
          description:
            "Describes a HTTP cookie that will be used as the hash key for the Consistent Hash load balancer. If the cookie is not present, it will be generated.",
          type: "object",
          properties: {
            path: {
              description: "Path to set for the cookie.",
              type: "string",
              format: "string",
            },
            name: {
              description: "Name of the cookie.",
              type: "string",
              format: "string",
            },
            ttl: {
              description: "Lifetime of the cookie.",
              type: "string",
            },
          },
        },
        "istio.networking.v1alpha3.ConnectionPoolSettings.TCPSettings": {
          description:
            "Settings common to both HTTP and TCP upstream connections.",
          type: "object",
          properties: {
            maxConnections: {
              description:
                "Maximum number of HTTP1 /TCP connections to a destination host. Default 2^32-1.",
              type: "integer",
              format: "int32",
            },
            connectTimeout: {
              description:
                "TCP connection timeout. format: 1h/1m/1s/1ms. MUST BE \u003e=1ms. Default is 10s.",
              type: "string",
            },
            tcpKeepalive: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings.TCPSettings.TcpKeepalive",
            },
          },
        },
        "istio.networking.v1alpha3.ConnectionPoolSettings.HTTPSettings": {
          description: "Settings applicable to HTTP1.1/HTTP2/GRPC connections.",
          type: "object",
          properties: {
            http1MaxPendingRequests: {
              description:
                "Maximum number of pending HTTP requests to a destination. Default 2^32-1.",
              type: "integer",
              format: "int32",
            },
            http2MaxRequests: {
              description:
                "Maximum number of requests to a backend. Default 2^32-1.",
              type: "integer",
              format: "int32",
            },
            maxRequestsPerConnection: {
              description:
                'Maximum number of requests per connection to a backend. Setting this parameter to 1 disables keep alive. Default 0, meaning "unlimited", up to 2^29.',
              type: "integer",
              format: "int32",
            },
            maxRetries: {
              description:
                "Maximum number of retries that can be outstanding to all hosts in a cluster at a given time. Defaults to 2^32-1.",
              type: "integer",
              format: "int32",
            },
            idleTimeout: {
              description:
                "The idle timeout for upstream connection pool connections. The idle timeout is defined as the period in which there are no active requests. If not set, the default is 1 hour. When the idle timeout is reached the connection will be closed. Note that request based timeouts mean that HTTP/2 PINGs will not keep the connection alive. Applies to both HTTP1.1 and HTTP2 connections.",
              type: "string",
            },
            h2UpgradePolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings.HTTPSettings.H2UpgradePolicy",
            },
          },
        },
        "istio.networking.v1alpha3.ConnectionPoolSettings.TCPSettings.TcpKeepalive": {
          description: "TCP keepalive.",
          type: "object",
          properties: {
            time: {
              description:
                "The time duration a connection needs to be idle before keep-alive probes start being sent. Default is to use the OS level configuration (unless overridden, Linux defaults to 7200s (ie 2 hours.)",
              type: "string",
            },
            probes: {
              description:
                "Maximum number of keepalive probes to send without response before deciding the connection is dead. Default is to use the OS level configuration (unless overridden, Linux defaults to 9.)",
              type: "integer",
            },
            interval: {
              description:
                "The time duration between keep-alive probes. Default is to use the OS level configuration (unless overridden, Linux defaults to 75s.)",
              type: "string",
            },
          },
        },
        "istio.networking.v1alpha3.ConnectionPoolSettings.HTTPSettings.H2UpgradePolicy": {
          description: "Policy for upgrading http1.1 connections to http2.",
          type: "string",
          enum: ["DEFAULT", "DO_NOT_UPGRADE", "UPGRADE"],
        },
        "istio.networking.v1alpha3.ClientTLSSettings.TLSmode": {
          description: "TLS connection mode",
          type: "string",
          enum: ["DISABLE", "SIMPLE", "MUTUAL", "ISTIO_MUTUAL"],
        },
        "istio.networking.v1alpha3.LocalityLoadBalancerSetting.Distribute": {
          description:
            "Describes how traffic originating in the 'from' zone or sub-zone is distributed over a set of 'to' zones. Syntax for specifying a zone is {region}/{zone}/{sub-zone} and terminal wildcards are allowed on any segment of the specification. Examples: * - matches all localities us-west/* - all zones and sub-zones within the us-west region us-west/zone-1/* - all sub-zones within us-west/zone-1",
          type: "object",
          properties: {
            from: {
              description:
                "Originating locality, '/' separated, e.g. 'region/zone/sub_zone'.",
              type: "string",
              format: "string",
            },
            to: {
              description:
                "Map of upstream localities to traffic distribution weights. The sum of all weights should be == 100. Any locality not assigned a weight will receive no traffic.",
              type: "object",
              additionalProperties: {
                type: "integer",
              },
            },
          },
        },
        "istio.networking.v1alpha3.LocalityLoadBalancerSetting.Failover": {
          description:
            "Specify the traffic failover policy across regions. Since zone and sub-zone failover is supported by default this only needs to be specified for regions when the operator needs to constrain traffic failover so that the default behavior of failing over to any endpoint globally does not apply. This is useful when failing over traffic across regions would not improve service health or may need to be restricted for other reasons like regulatory controls.",
          type: "object",
          properties: {
            from: {
              description: "Originating region.",
              type: "string",
              format: "string",
            },
            to: {
              description:
                "Destination region the traffic will fail over to when endpoints in the 'from' region becomes unhealthy.",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting network reachability of a sidecar.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.networking.v1beta1.ClientTLSSettings": {
          description:
            "SSL/TLS related settings for upstream connections. See Envoy's [TLS context](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/auth/cert.proto.html) for more details. These settings are common to both HTTP and TCP upstreams.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ClientTLSSettings.TLSmode",
            },
            clientCertificate: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client-side TLS certificate to use. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client's private key. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "OPTIONAL: The path to the file containing certificate authority certificates to use in verifying a presented server certificate. If omitted, the proxy will not verify the server's certificate. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "The name of the secret that holds the TLS certs for the client including the CA certificates. Applicable only on Kubernetes. Secret must exist in the same namespace with the proxy using the certificates. The secret (of type `generic`)should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for client certificates along with ca.crt key for CA certificates is also supported. Only one of client certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate. If specified, the proxy will verify that the server certificate's subject alt name matches one of the specified values. If specified, this list overrides the value of subject_alt_names from the ServiceEntry.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sni: {
              description:
                "SNI string to present to the server during TLS handshake.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.PortSelector": {
          description:
            "PortSelector specifies the number of a port to be used for matching or selection for final routing.",
          type: "object",
          properties: {
            number: {
              description: "Valid port number",
              type: "integer",
            },
          },
        },
        "istio.networking.v1beta1.ClientTLSSettings.TLSmode": {
          description: "TLS connection mode",
          type: "string",
          enum: ["DISABLE", "SIMPLE", "MUTUAL", "ISTIO_MUTUAL"],
        },
        "istio.networking.v1beta1.Port": {
          description:
            "Port describes the properties of a specific port of a service.",
          type: "object",
          properties: {
            number: {
              description: "A valid non-negative integer port number.",
              type: "integer",
            },
            name: {
              description: "Label assigned to the port.",
              type: "string",
              format: "string",
            },
            protocol: {
              description:
                "The protocol exposed on the port. MUST BE one of HTTP|HTTPS|GRPC|HTTP2|MONGO|TCP|TLS. TLS implies the connection will be routed based on the SNI header to the destination without terminating the TLS connection.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.ServerTLSSettings": {
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings.TLSmode",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server's private key.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to a file containing certificate authority certificates to use in verifying a presented client side certificate.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "For gateways running on Kubernetes, the name of the secret that holds the TLS certs including the CA certificates. Applicable only on Kubernetes, and only if the dynamic credential fetching feature is enabled in the proxy by setting `ISTIO_META_USER_SDS` metadata variable. The secret (of type `generic`) should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for server certificates along with ca.crt key for CA certificates is also supported. Only one of server certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate presented by the client.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            httpsRedirect: {
              description:
                "If set to true, the load balancer will send a 301 redirect for all http connections, asking the clients to use HTTPS.",
              type: "boolean",
            },
            serverCertificate: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server-side TLS certificate to use.",
              type: "string",
              format: "string",
            },
            verifyCertificateSpki: {
              description:
                "An optional list of base64-encoded SHA-256 hashes of the SKPIs of authorized client certificates. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            verifyCertificateHash: {
              description:
                "An optional list of hex-encoded SHA-256 hashes of the authorized client certificates. Both simple and colon separated formats are acceptable. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            minProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings.TLSProtocol",
            },
            maxProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings.TLSProtocol",
            },
            cipherSuites: {
              description:
                "Optional: If specified, only support the specified cipher list. Otherwise default to the default cipher list supported by Envoy.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.ServerTLSSettings.TLSmode": {
          description: "TLS modes enforced by the proxy",
          type: "string",
          enum: [
            "PASSTHROUGH",
            "SIMPLE",
            "MUTUAL",
            "AUTO_PASSTHROUGH",
            "ISTIO_MUTUAL",
          ],
        },
        "istio.networking.v1beta1.ServerTLSSettings.TLSProtocol": {
          description: "TLS protocol versions.",
          type: "string",
          enum: ["TLS_AUTO", "TLSV1_0", "TLSV1_1", "TLSV1_2", "TLSV1_3"],
        },
        "istio.networking.v1beta1.WorkloadSelector": {
          description:
            "`WorkloadSelector` specifies the criteria used to determine if the `Gateway`, `Sidecar`, or `EnvoyFilter` configuration can be applied to a proxy. The matching criteria includes the metadata associated with a proxy, workload instance info such as labels attached to the pod/VM, or any other info that the proxy provides to Istio during the initial handshake. If multiple conditions are specified, all conditions need to match in order for the workload instance to be selected. Currently, only label based selection mechanism is supported.",
          type: "object",
          properties: {
            labels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which this `Sidecar` configuration should be applied. The scope of label search is restricted to the configuration namespace in which the the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.Sidecar": {
          description:
            "`Sidecar` describes the configuration of the sidecar proxy that mediates inbound and outbound communication of the workload instance to which it is attached.",
          type: "object",
          properties: {
            workloadSelector: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.WorkloadSelector",
            },
            ingress: {
              description:
                "Ingress specifies the configuration of the sidecar for processing inbound traffic to the attached workload instance. If omitted, Istio will automatically configure the sidecar based on the information about the workload obtained from the orchestration platform (e.g., exposed ports, services, etc.). If specified, inbound ports are configured if and only if the workload instance is associated with a service.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.IstioIngressListener",
              },
            },
            egress: {
              description:
                "Egress specifies the configuration of the sidecar for processing outbound traffic from the attached workload instance to other services in the mesh. If not specified, inherits the system detected defaults from the namespace-wide or the global default Sidecar.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.IstioEgressListener",
              },
            },
            outboundTrafficPolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.OutboundTrafficPolicy",
            },
            localhost: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Localhost",
            },
          },
        },
        "istio.networking.v1beta1.IstioIngressListener": {
          description:
            "`IstioIngressListener` specifies the properties of an inbound traffic listener on the sidecar proxy attached to a workload instance.",
          type: "object",
          properties: {
            port: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Port",
            },
            bind: {
              description:
                "The IP to which the listener should be bound. Must be in the format `x.x.x.x`. Unix domain socket addresses are not allowed in the bind field for ingress listeners. If omitted, Istio will automatically configure the defaults based on imported services and the workload instances to which this configuration is applied to.",
              type: "string",
              format: "string",
            },
            defaultEndpoint: {
              description:
                "The loopback IP endpoint or Unix domain socket to which traffic should be forwarded to. This configuration can be used to redirect traffic arriving at the bind `IP:Port` on the sidecar to a `localhost:port` or Unix domain socket where the application workload instance is listening for connections. Format should be `127.0.0.1:PORT` or `unix:///path/to/socket`",
              type: "string",
              format: "string",
            },
            captureMode: {
              $ref: "#/components/schemas/istio.networking.v1beta1.CaptureMode",
            },
            localhostClientTls: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ClientTLSSettings",
            },
          },
        },
        "istio.networking.v1beta1.IstioEgressListener": {
          description:
            "`IstioEgressListener` specifies the properties of an outbound traffic listener on the sidecar proxy attached to a workload instance.",
          type: "object",
          properties: {
            port: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Port",
            },
            bind: {
              description:
                "The IP or the Unix domain socket to which the listener should be bound to. Port MUST be specified if bind is not empty. Format: `x.x.x.x` or `unix:///path/to/uds` or `unix://@foobar` (Linux abstract namespace). If omitted, Istio will automatically configure the defaults based on imported services, the workload instances to which this configuration is applied to and the captureMode. If captureMode is `NONE`, bind will default to 127.0.0.1.",
              type: "string",
              format: "string",
            },
            hosts: {
              description:
                "One or more service hosts exposed by the listener in `namespace/dnsName` format. Services in the specified namespace matching `dnsName` will be exposed. The corresponding service can be a service in the service registry (e.g., a Kubernetes or cloud foundry service) or a service specified using a `ServiceEntry` or `VirtualService` configuration. Any associated `DestinationRule` in the same namespace will also be used.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            captureMode: {
              $ref: "#/components/schemas/istio.networking.v1beta1.CaptureMode",
            },
            localhostServerTls: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings",
            },
          },
        },
        "istio.networking.v1beta1.OutboundTrafficPolicy": {
          description:
            "`OutboundTrafficPolicy` sets the default behavior of the sidecar for handling outbound traffic from the application. If your application uses one or more external services that are not known apriori, setting the policy to `ALLOW_ANY` will cause the sidecars to route any unknown traffic originating from the application to its requested destination. Users are strongly encouraged to use `ServiceEntry` configurations to explicitly declare any external dependencies, instead of using `ALLOW_ANY`, so that traffic to these services can be monitored.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.OutboundTrafficPolicy.Mode",
            },
            egressProxy: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Destination",
            },
          },
        },
        "istio.networking.v1beta1.Localhost": {
          description:
            "`Localhost` describes the sidecar settings related to the communication between the sidecar and the workload it is attached to in a Kubernetes Pod or a VM. These settings apply by default to all ingress and egress listeners in a sidecar unless overridden.",
          type: "object",
          properties: {
            clientTls: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ClientTLSSettings",
            },
            serverTls: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings",
            },
          },
        },
        "istio.networking.v1beta1.CaptureMode": {
          description:
            "`CaptureMode` describes how traffic to a listener is expected to be captured. Applicable only when the listener is bound to an IP.",
          type: "string",
          enum: ["DEFAULT", "IPTABLES", "NONE"],
        },
        "istio.networking.v1beta1.OutboundTrafficPolicy.Mode": {
          type: "string",
          enum: ["REGISTRY_ONLY", "ALLOW_ANY"],
        },
        "istio.networking.v1beta1.Destination": {
          description:
            "Destination indicates the network addressable service to which the request/connection will be sent after processing a routing rule. The destination.host should unambiguously refer to a service in the service registry. Istio's service registry is composed of all the services found in the platform's service registry (e.g., Kubernetes services, Consul services), as well as services declared through the [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry) resource.",
          type: "object",
          properties: {
            host: {
              description:
                "The name of a service from the service registry. Service names are looked up from the platform's service registry (e.g., Kubernetes services, Consul services, etc.) and from the hosts declared by [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry). Traffic forwarded to destinations that are not found in either of the two, will be dropped.",
              type: "string",
              format: "string",
            },
            port: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.PortSelector",
            },
            subset: {
              description:
                "The name of a subset within the service. Applicable only to services within the mesh. The subset must be defined in a corresponding DestinationRule.",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting service registry.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.networking.v1beta1.Port": {
          description:
            "Port describes the properties of a specific port of a service.",
          type: "object",
          properties: {
            number: {
              description: "A valid non-negative integer port number.",
              type: "integer",
            },
            name: {
              description: "Label assigned to the port.",
              type: "string",
              format: "string",
            },
            protocol: {
              description:
                "The protocol exposed on the port. MUST BE one of HTTP|HTTPS|GRPC|HTTP2|MONGO|TCP|TLS. TLS implies the connection will be routed based on the SNI header to the destination without terminating the TLS connection.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.ServiceEntry": {
          description:
            "ServiceEntry enables adding additional entries into Istio's internal service registry.",
          type: "object",
          properties: {
            exportTo: {
              description:
                "A list of namespaces to which this service is exported. Exporting a service allows it to be used by sidecars, gateways and virtual services defined in other namespaces. This feature provides a mechanism for service owners and mesh administrators to control the visibility of services across namespace boundaries.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            subjectAltNames: {
              description:
                "If specified, the proxy will verify that the server certificate's subject alternate name matches one of the specified values.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            hosts: {
              description:
                "The hosts associated with the ServiceEntry. Could be a DNS name with wildcard prefix.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            addresses: {
              description:
                "The virtual IP addresses associated with the service. Could be CIDR prefix. For HTTP traffic, generated route configurations will include http route domains for both the `addresses` and `hosts` field values and the destination will be identified based on the HTTP Host/Authority header. If one or more IP addresses are specified, the incoming traffic will be identified as belonging to this service if the destination IP matches the IP/CIDRs specified in the addresses field. If the Addresses field is empty, traffic will be identified solely based on the destination port. In such scenarios, the port on which the service is being accessed must not be shared by any other service in the mesh. In other words, the sidecar will behave as a simple TCP proxy, forwarding incoming traffic on a specified port to the specified destination endpoint IP/host. Unix domain socket addresses are not supported in this field.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            ports: {
              description:
                "The ports associated with the external service. If the Endpoints are Unix domain socket addresses, there must be exactly one port.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1beta1.Port",
              },
            },
            location: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServiceEntry.Location",
            },
            resolution: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServiceEntry.Resolution",
            },
            endpoints: {
              description:
                "One or more endpoints associated with the service. Only one of `endpoints` or `workloadSelector` can be specified.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.WorkloadEntry",
              },
            },
            workloadSelector: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.WorkloadSelector",
            },
          },
        },
        "istio.networking.v1beta1.ServiceEntry.Location": {
          description:
            "Location specifies whether the service is part of Istio mesh or outside the mesh. Location determines the behavior of several features, such as service-to-service mTLS authentication, policy enforcement, etc. When communicating with services outside the mesh, Istio's mTLS authentication is disabled, and policy enforcement is performed on the client-side as opposed to server-side.",
          type: "string",
          enum: ["MESH_EXTERNAL", "MESH_INTERNAL"],
        },
        "istio.networking.v1beta1.ServiceEntry.Resolution": {
          description:
            "Resolution determines how the proxy will resolve the IP addresses of the network endpoints associated with the service, so that it can route to one of them. The resolution mode specified here has no impact on how the application resolves the IP address associated with the service. The application may still have to use DNS to resolve the service to an IP so that the outbound traffic can be captured by the Proxy. Alternatively, for HTTP services, the application could directly communicate with the proxy (e.g., by setting HTTP_PROXY) to talk to these services.",
          type: "string",
          enum: ["NONE", "STATIC", "DNS"],
        },
        "istio.networking.v1beta1.WorkloadEntry": {
          description:
            "WorkloadEntry enables specifying the properties of a single non-Kubernetes workload such a VM or a bare metal services that can be referred to by service entries.",
          type: "object",
          properties: {
            labels: {
              description: "One or more labels associated with the endpoint.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            ports: {
              description:
                "Set of ports associated with the endpoint. The ports must be associated with a port name that was declared as part of the service. Do not use for `unix://` addresses.",
              type: "object",
              additionalProperties: {
                type: "integer",
              },
            },
            weight: {
              description:
                "The load balancing weight associated with the endpoint. Endpoints with higher weights will receive proportionally higher traffic.",
              type: "integer",
            },
            address: {
              description:
                "Address associated with the network endpoint without the port. Domain names can be used if and only if the resolution is set to DNS, and must be fully-qualified without wildcards. Use the form unix:///absolute/path/to/socket for Unix domain socket endpoints.",
              type: "string",
              format: "string",
            },
            network: {
              description:
                "Network enables Istio to group endpoints resident in the same L3 domain/network. All endpoints in the same network are assumed to be directly reachable from one another. When endpoints in different networks cannot reach each other directly, an Istio Gateway can be used to establish connectivity (usually using the `AUTO_PASSTHROUGH` mode in a Gateway Server). This is an advanced configuration used typically for spanning an Istio mesh over multiple clusters.",
              type: "string",
              format: "string",
            },
            locality: {
              description:
                'The locality associated with the endpoint. A locality corresponds to a failure domain (e.g., country/region/zone). Arbitrary failure domain hierarchies can be represented by separating each encapsulating failure domain by /. For example, the locality of an an endpoint in US, in US-East-1 region, within availability zone az-1, in data center rack r11 can be represented as us/us-east-1/az-1/r11. Istio will configure the sidecar to route to endpoints within the same locality as the sidecar. If none of the endpoints in the locality are available, endpoints parent locality (but within the same network ID) will be chosen. For example, if there are two endpoints in same network (networkID "n1"), say e1 with locality us/us-east-1/az-1/r11 and e2 with locality us/us-east-1/az-2/r12, a sidecar from us/us-east-1/az-1/r11 locality will prefer e1 from the same locality over e2 from a different locality. Endpoint e2 could be the IP associated with a gateway (that bridges networks n1 and n2), or the IP associated with a standard service endpoint.',
              type: "string",
              format: "string",
            },
            serviceAccount: {
              description:
                "The service account associated with the workload if a sidecar is present in the workload. The service account must be present in the same namespace as the configuration ( WorkloadEntry or a ServiceEntry)",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.WorkloadSelector": {
          description:
            "`WorkloadSelector` specifies the criteria used to determine if the `Gateway`, `Sidecar`, or `EnvoyFilter` configuration can be applied to a proxy. The matching criteria includes the metadata associated with a proxy, workload instance info such as labels attached to the pod/VM, or any other info that the proxy provides to Istio during the initial handshake. If multiple conditions are specified, all conditions need to match in order for the workload instance to be selected. Currently, only label based selection mechanism is supported.",
          type: "object",
          properties: {
            labels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which this `Sidecar` configuration should be applied. The scope of label search is restricted to the configuration namespace in which the the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting edge load balancer.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.networking.v1beta1.Gateway": {
          description:
            "Gateway describes a load balancer operating at the edge of the mesh receiving incoming or outgoing HTTP/TCP connections.",
          type: "object",
          properties: {
            servers: {
              description: "A list of server specifications.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1beta1.Server",
              },
            },
            selector: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which this gateway configuration should be applied. The scope of label search is restricted to the configuration namespace in which the the resource is present. In other words, the Gateway resource must reside in the same namespace as the gateway workload instance. If selector is nil, the Gateway will be applied to all workloads.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.Server": {
          description:
            "`Server` describes the properties of the proxy on a given load balancer port. For example,",
          type: "object",
          properties: {
            name: {
              description:
                "An optional name of the server, when set must be unique across all servers. This will be used for variety of purposes like prefixing stats generated with this name etc.",
              type: "string",
              format: "string",
            },
            tls: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings",
            },
            port: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Port",
            },
            bind: {
              description:
                "The ip or the Unix domain socket to which the listener should be bound to. Format: `x.x.x.x` or `unix:///path/to/uds` or `unix://@foobar` (Linux abstract namespace). When using Unix domain sockets, the port number should be 0.",
              type: "string",
              format: "string",
            },
            hosts: {
              description:
                "One or more hosts exposed by this gateway. While typically applicable to HTTP services, it can also be used for TCP services using TLS with SNI. A host is specified as a `dnsName` with an optional `namespace/` prefix. The `dnsName` should be specified using FQDN format, optionally including a wildcard character in the left-most component (e.g., `prod/*.example.com`). Set the `dnsName` to `*` to select all `VirtualService` hosts from the specified namespace (e.g.,`prod/*`).",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            defaultEndpoint: {
              description:
                "The loopback IP endpoint or Unix domain socket to which traffic should be forwarded to by default. Format should be `127.0.0.1:PORT` or `unix:///path/to/socket` or `unix://@foobar` (Linux abstract namespace). NOT IMPLEMENTED. $hide_from_docs",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.Port": {
          description:
            "Port describes the properties of a specific port of a service.",
          type: "object",
          properties: {
            number: {
              description: "A valid non-negative integer port number.",
              type: "integer",
            },
            name: {
              description: "Label assigned to the port.",
              type: "string",
              format: "string",
            },
            protocol: {
              description:
                "The protocol exposed on the port. MUST BE one of HTTP|HTTPS|GRPC|HTTP2|MONGO|TCP|TLS. TLS implies the connection will be routed based on the SNI header to the destination without terminating the TLS connection.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.ServerTLSSettings": {
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings.TLSmode",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server's private key.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to a file containing certificate authority certificates to use in verifying a presented client side certificate.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "For gateways running on Kubernetes, the name of the secret that holds the TLS certs including the CA certificates. Applicable only on Kubernetes, and only if the dynamic credential fetching feature is enabled in the proxy by setting `ISTIO_META_USER_SDS` metadata variable. The secret (of type `generic`) should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for server certificates along with ca.crt key for CA certificates is also supported. Only one of server certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate presented by the client.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            httpsRedirect: {
              description:
                "If set to true, the load balancer will send a 301 redirect for all http connections, asking the clients to use HTTPS.",
              type: "boolean",
            },
            serverCertificate: {
              description:
                "REQUIRED if mode is `SIMPLE` or `MUTUAL`. The path to the file holding the server-side TLS certificate to use.",
              type: "string",
              format: "string",
            },
            verifyCertificateSpki: {
              description:
                "An optional list of base64-encoded SHA-256 hashes of the SKPIs of authorized client certificates. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            verifyCertificateHash: {
              description:
                "An optional list of hex-encoded SHA-256 hashes of the authorized client certificates. Both simple and colon separated formats are acceptable. Note: When both verify_certificate_hash and verify_certificate_spki are specified, a hash matching either value will result in the certificate being accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            minProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings.TLSProtocol",
            },
            maxProtocolVersion: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ServerTLSSettings.TLSProtocol",
            },
            cipherSuites: {
              description:
                "Optional: If specified, only support the specified cipher list. Otherwise default to the default cipher list supported by Envoy.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.ServerTLSSettings.TLSmode": {
          description: "TLS modes enforced by the proxy",
          type: "string",
          enum: [
            "PASSTHROUGH",
            "SIMPLE",
            "MUTUAL",
            "AUTO_PASSTHROUGH",
            "ISTIO_MUTUAL",
          ],
        },
        "istio.networking.v1beta1.ServerTLSSettings.TLSProtocol": {
          description: "TLS protocol versions.",
          type: "string",
          enum: ["TLS_AUTO", "TLSV1_0", "TLSV1_1", "TLSV1_2", "TLSV1_3"],
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting VMs onboarded into the mesh.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.networking.v1beta1.WorkloadEntry": {
          description:
            "WorkloadEntry enables specifying the properties of a single non-Kubernetes workload such a VM or a bare metal services that can be referred to by service entries.",
          type: "object",
          properties: {
            labels: {
              description: "One or more labels associated with the endpoint.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            ports: {
              description:
                "Set of ports associated with the endpoint. The ports must be associated with a port name that was declared as part of the service. Do not use for `unix://` addresses.",
              type: "object",
              additionalProperties: {
                type: "integer",
              },
            },
            weight: {
              description:
                "The load balancing weight associated with the endpoint. Endpoints with higher weights will receive proportionally higher traffic.",
              type: "integer",
            },
            address: {
              description:
                "Address associated with the network endpoint without the port. Domain names can be used if and only if the resolution is set to DNS, and must be fully-qualified without wildcards. Use the form unix:///absolute/path/to/socket for Unix domain socket endpoints.",
              type: "string",
              format: "string",
            },
            network: {
              description:
                "Network enables Istio to group endpoints resident in the same L3 domain/network. All endpoints in the same network are assumed to be directly reachable from one another. When endpoints in different networks cannot reach each other directly, an Istio Gateway can be used to establish connectivity (usually using the `AUTO_PASSTHROUGH` mode in a Gateway Server). This is an advanced configuration used typically for spanning an Istio mesh over multiple clusters.",
              type: "string",
              format: "string",
            },
            locality: {
              description:
                'The locality associated with the endpoint. A locality corresponds to a failure domain (e.g., country/region/zone). Arbitrary failure domain hierarchies can be represented by separating each encapsulating failure domain by /. For example, the locality of an an endpoint in US, in US-East-1 region, within availability zone az-1, in data center rack r11 can be represented as us/us-east-1/az-1/r11. Istio will configure the sidecar to route to endpoints within the same locality as the sidecar. If none of the endpoints in the locality are available, endpoints parent locality (but within the same network ID) will be chosen. For example, if there are two endpoints in same network (networkID "n1"), say e1 with locality us/us-east-1/az-1/r11 and e2 with locality us/us-east-1/az-2/r12, a sidecar from us/us-east-1/az-1/r11 locality will prefer e1 from the same locality over e2 from a different locality. Endpoint e2 could be the IP associated with a gateway (that bridges networks n1 and n2), or the IP associated with a standard service endpoint.',
              type: "string",
              format: "string",
            },
            serviceAccount: {
              description:
                "The service account associated with the workload if a sidecar is present in the workload. The service account must be present in the same namespace as the configuration ( WorkloadEntry or a ServiceEntry)",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting label/content routing, sni routing, etc.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.networking.v1beta1.PortSelector": {
          description:
            "PortSelector specifies the number of a port to be used for matching or selection for final routing.",
          type: "object",
          properties: {
            number: {
              description: "Valid port number",
              type: "integer",
            },
          },
        },
        "istio.networking.v1beta1.Destination": {
          description:
            "Destination indicates the network addressable service to which the request/connection will be sent after processing a routing rule. The destination.host should unambiguously refer to a service in the service registry. Istio's service registry is composed of all the services found in the platform's service registry (e.g., Kubernetes services, Consul services), as well as services declared through the [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry) resource.",
          type: "object",
          properties: {
            host: {
              description:
                "The name of a service from the service registry. Service names are looked up from the platform's service registry (e.g., Kubernetes services, Consul services, etc.) and from the hosts declared by [ServiceEntry](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry). Traffic forwarded to destinations that are not found in either of the two, will be dropped.",
              type: "string",
              format: "string",
            },
            port: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.PortSelector",
            },
            subset: {
              description:
                "The name of a subset within the service. Applicable only to services within the mesh. The subset must be defined in a corresponding DestinationRule.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.VirtualService": {
          description: "Configuration affecting traffic routing.",
          type: "object",
          properties: {
            exportTo: {
              description:
                "A list of namespaces to which this virtual service is exported. Exporting a virtual service allows it to be used by sidecars and gateways defined in other namespaces. This feature provides a mechanism for service owners and mesh administrators to control the visibility of virtual services across namespace boundaries.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            tls: {
              description:
                "An ordered list of route rule for non-terminated TLS \u0026 HTTPS traffic. Routing is typically performed using the SNI value presented by the ClientHello message. TLS routes will be applied to platform service ports named 'https-*', 'tls-*', unterminated gateway ports using HTTPS/TLS protocols (i.e. with \"passthrough\" TLS mode) and service entry ports using HTTPS/TLS protocols. The first rule matching an incoming request is used. NOTE: Traffic 'https-*' or 'tls-*' ports without associated virtual service will be treated as opaque TCP traffic.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1beta1.TLSRoute",
              },
            },
            tcp: {
              description:
                "An ordered list of route rules for opaque TCP traffic. TCP routes will be applied to any port that is not a HTTP or TLS port. The first rule matching an incoming request is used.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1beta1.TCPRoute",
              },
            },
            http: {
              description:
                "An ordered list of route rules for HTTP traffic. HTTP routes will be applied to platform service ports named 'http-*'/'http2-*'/'grpc-*', gateway ports with protocol HTTP/HTTP2/GRPC/ TLS-terminated-HTTPS and service entry ports using HTTP/HTTP2/GRPC protocols. The first rule matching an incoming request is used.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1beta1.HTTPRoute",
              },
            },
            hosts: {
              description:
                "The destination hosts to which traffic is being sent. Could be a DNS name with wildcard prefix or an IP address. Depending on the platform, short-names can also be used instead of a FQDN (i.e. has no dots in the name). In such a scenario, the FQDN of the host would be derived based on the underlying platform.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            gateways: {
              description:
                "The names of gateways and sidecars that should apply these routes. Gateways in other namespaces may be referred to by `\u003cgateway namespace\u003e/\u003cgateway name\u003e`; specifying a gateway with no namespace qualifier is the same as specifying the VirtualService's namespace. A single VirtualService is used for sidecars inside the mesh as well as for one or more gateways. The selection condition imposed by this field can be overridden using the source field in the match conditions of protocol-specific routes. The reserved word `mesh` is used to imply all the sidecars in the mesh. When this field is omitted, the default gateway (`mesh`) will be used, which would apply the rule to all sidecars in the mesh. If a list of gateway names is provided, the rules will apply only to the gateways. To apply the rules to both gateways and sidecars, specify `mesh` as one of the gateway names.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.HTTPRoute": {
          description:
            "Describes match conditions and actions for routing HTTP/1.1, HTTP2, and gRPC traffic. See VirtualService for usage examples.",
          type: "object",
          properties: {
            name: {
              description:
                "The name assigned to the route for debugging purposes. The route's name will be concatenated with the match's name and will be logged in the access logs for requests matching this route/match.",
              type: "string",
              format: "string",
            },
            match: {
              description:
                "Match conditions to be satisfied for the rule to be activated. All conditions inside a single match block have AND semantics, while the list of match blocks have OR semantics. The rule is matched if any one of the match blocks succeed.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.HTTPMatchRequest",
              },
            },
            route: {
              description:
                "A HTTP rule can either redirect or forward (default) traffic. The forwarding target can be one of several versions of a service (see glossary in beginning of document). Weights associated with the service version determine the proportion of traffic it receives.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.HTTPRouteDestination",
              },
            },
            redirect: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.HTTPRedirect",
            },
            delegate: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Delegate",
            },
            rewrite: {
              $ref: "#/components/schemas/istio.networking.v1beta1.HTTPRewrite",
            },
            timeout: {
              description: "Timeout for HTTP requests.",
              type: "string",
            },
            retries: {
              $ref: "#/components/schemas/istio.networking.v1beta1.HTTPRetry",
            },
            fault: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.HTTPFaultInjection",
            },
            mirror: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Destination",
            },
            mirrorPercent: {
              description:
                "Percentage of the traffic to be mirrored by the `mirror` field. Use of integer `mirror_percent` value is deprecated. Use the double `mirror_percentage` field instead",
              type: "integer",
              deprecated: true,
              nullable: true,
            },
            mirrorPercentage: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Percent",
            },
            corsPolicy: {
              $ref: "#/components/schemas/istio.networking.v1beta1.CorsPolicy",
            },
            headers: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Headers",
            },
          },
        },
        "istio.networking.v1beta1.TLSRoute": {
          description:
            'Describes match conditions and actions for routing unterminated TLS traffic (TLS/HTTPS) The following routing rule forwards unterminated TLS traffic arriving at port 443 of gateway called "mygateway" to internal services in the mesh based on the SNI value.',
          type: "object",
          properties: {
            match: {
              description:
                "Match conditions to be satisfied for the rule to be activated. All conditions inside a single match block have AND semantics, while the list of match blocks have OR semantics. The rule is matched if any one of the match blocks succeed.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.TLSMatchAttributes",
              },
            },
            route: {
              description:
                "The destination to which the connection should be forwarded to.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.RouteDestination",
              },
            },
          },
        },
        "istio.networking.v1beta1.TCPRoute": {
          description:
            "Describes match conditions and actions for routing TCP traffic. The following routing rule forwards traffic arriving at port 27017 for mongo.prod.svc.cluster.local to another Mongo server on port 5555.",
          type: "object",
          properties: {
            match: {
              description:
                "Match conditions to be satisfied for the rule to be activated. All conditions inside a single match block have AND semantics, while the list of match blocks have OR semantics. The rule is matched if any one of the match blocks succeed.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.L4MatchAttributes",
              },
            },
            route: {
              description:
                "The destination to which the connection should be forwarded to.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.RouteDestination",
              },
            },
          },
        },
        "istio.networking.v1beta1.HTTPMatchRequest": {
          description:
            "HttpMatchRequest specifies a set of criterion to be met in order for the rule to be applied to the HTTP request. For example, the following restricts the rule to match only requests where the URL path starts with /ratings/v2/ and the request contains a custom `end-user` header with value `jason`.",
          type: "object",
          properties: {
            name: {
              description:
                "The name assigned to a match. The match's name will be concatenated with the parent route's name and will be logged in the access logs for requests matching this route.",
              type: "string",
              format: "string",
            },
            method: {
              $ref: "#/components/schemas/istio.networking.v1beta1.StringMatch",
            },
            port: {
              description:
                "Specifies the ports on the host that is being addressed. Many services only expose a single port or label ports with the protocols they support, in these cases it is not required to explicitly select the port.",
              type: "integer",
            },
            gateways: {
              description:
                "Names of gateways where the rule should be applied. Gateway names in the top-level `gateways` field of the VirtualService (if any) are overridden. The gateway match is independent of sourceLabels.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            headers: {
              description:
                "The header keys must be lowercase and use hyphen as the separator, e.g. _x-request-id_.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.StringMatch",
              },
            },
            uri: {
              $ref: "#/components/schemas/istio.networking.v1beta1.StringMatch",
            },
            scheme: {
              $ref: "#/components/schemas/istio.networking.v1beta1.StringMatch",
            },
            authority: {
              $ref: "#/components/schemas/istio.networking.v1beta1.StringMatch",
            },
            sourceLabels: {
              description:
                "One or more labels that constrain the applicability of a rule to workloads with the given labels. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            queryParams: {
              description: "Query parameters for matching.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.StringMatch",
              },
            },
            ignoreUriCase: {
              description:
                "Flag to specify whether the URI matching should be case-insensitive.",
              type: "boolean",
            },
            withoutHeaders: {
              description:
                "withoutHeader has the same syntax with the header, but has opposite meaning. If a header is matched with a matching rule among withoutHeader, the traffic becomes not matched one.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.StringMatch",
              },
            },
            sourceNamespace: {
              description:
                "Source namespace constraining the applicability of a rule to workloads in that namespace. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.HTTPRouteDestination": {
          description:
            'Each routing rule is associated with one or more service versions (see glossary in beginning of document). Weights associated with the version determine the proportion of traffic it receives. For example, the following rule will route 25% of traffic for the "reviews" service to instances with the "v2" tag and the remaining traffic (i.e., 75%) to "v1".',
          type: "object",
          properties: {
            headers: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Headers",
            },
            destination: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Destination",
            },
            weight: {
              description:
                "The proportion of traffic to be forwarded to the service version. (0-100). Sum of weights across destinations SHOULD BE == 100. If there is only one destination in a rule, the weight value is assumed to be 100.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.networking.v1beta1.HTTPRedirect": {
          description:
            "HTTPRedirect can be used to send a 301 redirect response to the caller, where the Authority/Host and the URI in the response can be swapped with the specified values. For example, the following rule redirects requests for /v1/getProductRatings API on the ratings service to /v1/bookRatings provided by the bookratings service.",
          type: "object",
          properties: {
            uri: {
              description:
                "On a redirect, overwrite the Path portion of the URL with this value. Note that the entire path will be replaced, irrespective of the request URI being matched as an exact path or prefix.",
              type: "string",
              format: "string",
            },
            authority: {
              description:
                "On a redirect, overwrite the Authority/Host portion of the URL with this value.",
              type: "string",
              format: "string",
            },
            redirectCode: {
              description:
                "On a redirect, Specifies the HTTP status code to use in the redirect response. The default response code is MOVED_PERMANENTLY (301).",
              type: "integer",
            },
          },
        },
        "istio.networking.v1beta1.Delegate": {
          description:
            "Describes the delegate VirtualService. The following routing rules forward the traffic to `/productpage` by a delegate VirtualService named `productpage`, forward the traffic to `/reviews` by a delegate VirtualService named `reviews`.",
          type: "object",
          properties: {
            name: {
              description:
                "Name specifies the name of the delegate VirtualService.",
              type: "string",
              format: "string",
            },
            namespace: {
              description:
                "Namespace specifies the namespace where the delegate VirtualService resides. By default, it is same to the root's.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.HTTPRewrite": {
          description:
            "HTTPRewrite can be used to rewrite specific parts of a HTTP request before forwarding the request to the destination. Rewrite primitive can be used only with HTTPRouteDestination. The following example demonstrates how to rewrite the URL prefix for api call (/ratings) to ratings service before making the actual API call.",
          type: "object",
          properties: {
            uri: {
              description:
                "rewrite the path (or the prefix) portion of the URI with this value. If the original URI was matched based on prefix, the value provided in this field will replace the corresponding matched prefix.",
              type: "string",
              format: "string",
            },
            authority: {
              description: "rewrite the Authority/Host header with this value.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.HTTPRetry": {
          description:
            "Describes the retry policy to use when a HTTP request fails. For example, the following rule sets the maximum number of retries to 3 when calling ratings:v1 service, with a 2s timeout per retry attempt.",
          type: "object",
          properties: {
            attempts: {
              description:
                "Number of retries for a given request. The interval between retries will be determined automatically (25ms+). Actual number of retries attempted depends on the request `timeout` of the [HTTP route](https://istio.io/docs/reference/config/networking/virtual-service/#HTTPRoute).",
              type: "integer",
              format: "int32",
            },
            perTryTimeout: {
              description:
                "Timeout per retry attempt for a given request. format: 1h/1m/1s/1ms. MUST BE \u003e=1ms.",
              type: "string",
            },
            retryOn: {
              description:
                "Specifies the conditions under which retry takes place. One or more policies can be specified using a ‘,’ delimited list. See the [retry policies](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/router_filter#x-envoy-retry-on) and [gRPC retry policies](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/router_filter#x-envoy-retry-grpc-on) for more details.",
              type: "string",
              format: "string",
            },
            retryRemoteLocalities: {
              description:
                "Flag to specify whether the retries should retry to other localities. See the [retry plugin configuration](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/http/http_connection_management#retry-plugin-configuration) for more details.",
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.networking.v1beta1.HTTPFaultInjection": {
          description:
            "HTTPFaultInjection can be used to specify one or more faults to inject while forwarding HTTP requests to the destination specified in a route. Fault specification is part of a VirtualService rule. Faults include aborting the Http request from downstream service, and/or delaying proxying of requests. A fault rule MUST HAVE delay or abort or both.",
          type: "object",
          properties: {
            delay: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.HTTPFaultInjection.Delay",
            },
            abort: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.HTTPFaultInjection.Abort",
            },
          },
        },
        "istio.networking.v1beta1.Percent": {
          description:
            "Percent specifies a percentage in the range of [0.0, 100.0].",
          type: "object",
          properties: {
            value: {
              type: "number",
              format: "double",
            },
          },
        },
        "istio.networking.v1beta1.CorsPolicy": {
          description:
            "Describes the Cross-Origin Resource Sharing (CORS) policy, for a given service. Refer to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) for further details about cross origin resource sharing. For example, the following rule restricts cross origin requests to those originating from example.com domain using HTTP POST/GET, and sets the `Access-Control-Allow-Credentials` header to false. In addition, it only exposes `X-Foo-bar` header and sets an expiry period of 1 day.",
          type: "object",
          properties: {
            allowOrigin: {
              description:
                "The list of origins that are allowed to perform CORS requests. The content will be serialized into the Access-Control-Allow-Origin header. Wildcard * will allow all origins. $hide_from_docs",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
              deprecated: true,
            },
            allowOrigins: {
              description:
                "String patterns that match allowed origins. An origin is allowed if any of the string matchers match. If a match is found, then the outgoing Access-Control-Allow-Origin would be set to the origin as provided by the client.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.StringMatch",
              },
            },
            allowMethods: {
              description:
                "List of HTTP methods allowed to access the resource. The content will be serialized into the Access-Control-Allow-Methods header.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            allowHeaders: {
              description:
                "List of HTTP headers that can be used when requesting the resource. Serialized to Access-Control-Allow-Headers header.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            exposeHeaders: {
              description:
                "A white list of HTTP headers that the browsers are allowed to access. Serialized into Access-Control-Expose-Headers header.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            maxAge: {
              description:
                "Specifies how long the results of a preflight request can be cached. Translates to the `Access-Control-Max-Age` header.",
              type: "string",
            },
            allowCredentials: {
              description:
                "Indicates whether the caller is allowed to send the actual request (not the preflight) using credentials. Translates to `Access-Control-Allow-Credentials` header.",
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.networking.v1beta1.Headers": {
          description:
            "Message headers can be manipulated when Envoy forwards requests to, or responses from, a destination service. Header manipulation rules can be specified for a specific route destination or for all destinations. The following VirtualService adds a `test` header with the value `true` to requests that are routed to any `reviews` service destination. It also romoves the `foo` response header, but only from responses coming from the `v1` subset (version) of the `reviews` service.",
          type: "object",
          properties: {
            response: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.Headers.HeaderOperations",
            },
            request: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.Headers.HeaderOperations",
            },
          },
        },
        "istio.networking.v1beta1.Headers.HeaderOperations": {
          description:
            "HeaderOperations Describes the header manipulations to apply",
          type: "object",
          properties: {
            set: {
              description:
                "Overwrite the headers specified by key with the given values",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            add: {
              description:
                "Append the given values to the headers specified by keys (will create a comma-separated list of values)",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            remove: {
              description: "Remove a the specified headers",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.TLSMatchAttributes": {
          description: "TLS connection match attributes.",
          type: "object",
          properties: {
            port: {
              description:
                "Specifies the port on the host that is being addressed. Many services only expose a single port or label ports with the protocols they support, in these cases it is not required to explicitly select the port.",
              type: "integer",
            },
            gateways: {
              description:
                "Names of gateways where the rule should be applied. Gateway names in the top-level `gateways` field of the VirtualService (if any) are overridden. The gateway match is independent of sourceLabels.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sourceLabels: {
              description:
                "One or more labels that constrain the applicability of a rule to workloads with the given labels. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it should include the reserved gateway `mesh` in order for this field to be applicable.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            sourceNamespace: {
              description:
                "Source namespace constraining the applicability of a rule to workloads in that namespace. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "string",
              format: "string",
            },
            destinationSubnets: {
              description:
                "IPv4 or IPv6 ip addresses of destination with optional subnet. E.g., a.b.c.d/xx form or just a.b.c.d.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sniHosts: {
              description:
                "SNI (server name indicator) to match on. Wildcard prefixes can be used in the SNI value, e.g., *.com will match foo.example.com as well as example.com. An SNI value must be a subset (i.e., fall within the domain) of the corresponding virtual serivce's hosts.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.RouteDestination": {
          description: "L4 routing rule weighted destination.",
          type: "object",
          properties: {
            destination: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Destination",
            },
            weight: {
              description:
                "The proportion of traffic to be forwarded to the service version. If there is only one destination in a rule, all traffic will be routed to it irrespective of the weight.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.networking.v1beta1.L4MatchAttributes": {
          description:
            "L4 connection match attributes. Note that L4 connection matching support is incomplete.",
          type: "object",
          properties: {
            port: {
              description:
                "Specifies the port on the host that is being addressed. Many services only expose a single port or label ports with the protocols they support, in these cases it is not required to explicitly select the port.",
              type: "integer",
            },
            gateways: {
              description:
                "Names of gateways where the rule should be applied. Gateway names in the top-level `gateways` field of the VirtualService (if any) are overridden. The gateway match is independent of sourceLabels.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sourceLabels: {
              description:
                "One or more labels that constrain the applicability of a rule to workloads with the given labels. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it should include the reserved gateway `mesh` in order for this field to be applicable.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            sourceNamespace: {
              description:
                "Source namespace constraining the applicability of a rule to workloads in that namespace. If the VirtualService has a list of gateways specified in the top-level `gateways` field, it must include the reserved gateway `mesh` for this field to be applicable.",
              type: "string",
              format: "string",
            },
            destinationSubnets: {
              description:
                "IPv4 or IPv6 ip addresses of destination with optional subnet. E.g., a.b.c.d/xx form or just a.b.c.d.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sourceSubnet: {
              description:
                "IPv4 or IPv6 ip address of source with optional subnet. E.g., a.b.c.d/xx form or just a.b.c.d $hide_from_docs",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.StringMatch": {
          description:
            "Describes how to match a given string in HTTP headers. Match is case-sensitive.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["exact"],
                    properties: {
                      exact: {
                        description: "exact string match",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["prefix"],
                    properties: {
                      prefix: {
                        description: "prefix-based match",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["regex"],
                    properties: {
                      regex: {
                        description:
                          "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["exact"],
              properties: {
                exact: {
                  description: "exact string match",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["prefix"],
              properties: {
                prefix: {
                  description: "prefix-based match",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["regex"],
              properties: {
                regex: {
                  description:
                    "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.networking.v1beta1.HTTPFaultInjection.Delay": {
          description:
            'Delay specification is used to inject latency into the request forwarding path. The following example will introduce a 5 second delay in 1 out of every 1000 requests to the "v1" version of the "reviews" service from all pods with label env: prod',
          type: "object",
          properties: {
            percent: {
              description:
                "Percentage of requests on which the delay will be injected (0-100). Use of integer `percent` value is deprecated. Use the double `percentage` field instead.",
              type: "integer",
              format: "int32",
              deprecated: true,
            },
            percentage: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Percent",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["fixedDelay"],
                    properties: {
                      fixedDelay: {
                        description:
                          "Add a fixed delay before forwarding the request. Format: 1h/1m/1s/1ms. MUST be \u003e=1ms.",
                        type: "string",
                      },
                    },
                  },
                  {
                    required: ["exponentialDelay"],
                    properties: {
                      exponentialDelay: {
                        type: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["fixedDelay"],
              properties: {
                fixedDelay: {
                  description:
                    "Add a fixed delay before forwarding the request. Format: 1h/1m/1s/1ms. MUST be \u003e=1ms.",
                  type: "string",
                },
              },
            },
            {
              required: ["exponentialDelay"],
              properties: {
                exponentialDelay: {
                  type: "string",
                },
              },
            },
          ],
        },
        "istio.networking.v1beta1.HTTPFaultInjection.Abort": {
          description:
            'Abort specification is used to prematurely abort a request with a pre-specified error code. The following example will return an HTTP 400 error code for 1 out of every 1000 requests to the "ratings" service "v1".',
          type: "object",
          properties: {
            percentage: {
              $ref: "#/components/schemas/istio.networking.v1beta1.Percent",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["httpStatus"],
                    properties: {
                      httpStatus: {
                        description:
                          "HTTP status code to use to abort the Http request.",
                        type: "integer",
                        format: "int32",
                      },
                    },
                  },
                  {
                    required: ["grpcStatus"],
                    properties: {
                      grpcStatus: {
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["http2Error"],
                    properties: {
                      http2Error: {
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["httpStatus"],
              properties: {
                httpStatus: {
                  description:
                    "HTTP status code to use to abort the Http request.",
                  type: "integer",
                  format: "int32",
                },
              },
            },
            {
              required: ["grpcStatus"],
              properties: {
                grpcStatus: {
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["http2Error"],
              properties: {
                http2Error: {
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting load balancing, outlier detection, etc.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.networking.v1beta1.DestinationRule": {
          description:
            "DestinationRule defines policies that apply to traffic intended for a service after routing has occurred.",
          type: "object",
          properties: {
            host: {
              description:
                "The name of a service from the service registry. Service names are looked up from the platform's service registry (e.g., Kubernetes services, Consul services, etc.) and from the hosts declared by [ServiceEntries](https://istio.io/docs/reference/config/networking/service-entry/#ServiceEntry). Rules defined for services that do not exist in the service registry will be ignored.",
              type: "string",
              format: "string",
            },
            trafficPolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.TrafficPolicy",
            },
            subsets: {
              description:
                "One or more named sets that represent individual versions of a service. Traffic policies can be overridden at subset level.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.networking.v1beta1.Subset",
              },
            },
            exportTo: {
              description:
                "A list of namespaces to which this destination rule is exported. The resolution of a destination rule to apply to a service occurs in the context of a hierarchy of namespaces. Exporting a destination rule allows it to be included in the resolution hierarchy for services in other namespaces. This feature provides a mechanism for service owners and mesh administrators to control the visibility of destination rules across namespace boundaries.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.TrafficPolicy": {
          description:
            "Traffic policies to apply for a specific destination, across all destination ports. See DestinationRule for examples.",
          type: "object",
          properties: {
            loadBalancer: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings",
            },
            connectionPool: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ConnectionPoolSettings",
            },
            outlierDetection: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.OutlierDetection",
            },
            tls: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ClientTLSSettings",
            },
            portLevelSettings: {
              description:
                "Traffic policies specific to individual ports. Note that port level settings will override the destination-level settings. Traffic settings specified at the destination-level will not be inherited when overridden by port-level settings, i.e. default values will be applied to fields omitted in port-level traffic policies.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.TrafficPolicy.PortTrafficPolicy",
              },
            },
          },
        },
        "istio.networking.v1beta1.Subset": {
          description:
            "A subset of endpoints of a service. Subsets can be used for scenarios like A/B testing, or routing to a specific version of a service. Refer to [VirtualService](https://istio.io/docs/reference/config/networking/virtual-service/#VirtualService) documentation for examples of using subsets in these scenarios. In addition, traffic policies defined at the service-level can be overridden at a subset-level. The following rule uses a round robin load balancing policy for all traffic going to a subset named testversion that is composed of endpoints (e.g., pods) with labels (version:v3).",
          type: "object",
          properties: {
            name: {
              description:
                "Name of the subset. The service name and the subset name can be used for traffic splitting in a route rule.",
              type: "string",
              format: "string",
            },
            trafficPolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.TrafficPolicy",
            },
            labels: {
              description:
                "Labels apply a filter over the endpoints of a service in the service registry. See route rules for examples of usage.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.networking.v1beta1.LoadBalancerSettings": {
          description:
            "Load balancing policies to apply for a specific destination. See Envoy's load balancing [documentation](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancing) for more details.",
          type: "object",
          properties: {
            localityLbSetting: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.LocalityLoadBalancerSetting",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["simple"],
                    properties: {
                      simple: {
                        $ref:
                          "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings.SimpleLB",
                      },
                    },
                  },
                  {
                    required: ["consistentHash"],
                    properties: {
                      consistentHash: {
                        $ref:
                          "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings.ConsistentHashLB",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["simple"],
              properties: {
                simple: {
                  $ref:
                    "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings.SimpleLB",
                },
              },
            },
            {
              required: ["consistentHash"],
              properties: {
                consistentHash: {
                  $ref:
                    "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings.ConsistentHashLB",
                },
              },
            },
          ],
        },
        "istio.networking.v1beta1.ConnectionPoolSettings": {
          description:
            "Connection pool settings for an upstream host. The settings apply to each individual host in the upstream service. See Envoy's [circuit breaker](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking) for more details. Connection pool settings can be applied at the TCP level as well as at HTTP level.",
          type: "object",
          properties: {
            tcp: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ConnectionPoolSettings.TCPSettings",
            },
            http: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ConnectionPoolSettings.HTTPSettings",
            },
          },
        },
        "istio.networking.v1beta1.OutlierDetection": {
          description:
            "A Circuit breaker implementation that tracks the status of each individual host in the upstream service. Applicable to both HTTP and TCP services. For HTTP services, hosts that continually return 5xx errors for API calls are ejected from the pool for a pre-defined period of time. For TCP services, connection timeouts or connection failures to a given host counts as an error when measuring the consecutive errors metric. See Envoy's [outlier detection](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/outlier) for more details.",
          type: "object",
          properties: {
            interval: {
              description:
                "Time interval between ejection sweep analysis. format: 1h/1m/1s/1ms. MUST BE \u003e=1ms. Default is 10s.",
              type: "string",
            },
            consecutiveErrors: {
              description:
                "Number of errors before a host is ejected from the connection pool. Defaults to 5. When the upstream host is accessed over HTTP, a 502, 503, or 504 return code qualifies as an error. When the upstream host is accessed over an opaque TCP connection, connect timeouts and connection error/failure events qualify as an error. $hide_from_docs",
              type: "integer",
              format: "int32",
              deprecated: true,
            },
            consecutiveGatewayErrors: {
              description:
                "Number of gateway errors before a host is ejected from the connection pool. When the upstream host is accessed over HTTP, a 502, 503, or 504 return code qualifies as a gateway error. When the upstream host is accessed over an opaque TCP connection, connect timeouts and connection error/failure events qualify as a gateway error. This feature is disabled by default or when set to the value 0.",
              type: "integer",
              nullable: true,
            },
            consecutive5xxErrors: {
              description:
                "Number of 5xx errors before a host is ejected from the connection pool. When the upstream host is accessed over an opaque TCP connection, connect timeouts, connection error/failure and request failure events qualify as a 5xx error. This feature defaults to 5 but can be disabled by setting the value to 0.",
              type: "integer",
              nullable: true,
            },
            baseEjectionTime: {
              description:
                "Minimum ejection duration. A host will remain ejected for a period equal to the product of minimum ejection duration and the number of times the host has been ejected. This technique allows the system to automatically increase the ejection period for unhealthy upstream servers. format: 1h/1m/1s/1ms. MUST BE \u003e=1ms. Default is 30s.",
              type: "string",
            },
            maxEjectionPercent: {
              description:
                "Maximum % of hosts in the load balancing pool for the upstream service that can be ejected. Defaults to 10%.",
              type: "integer",
              format: "int32",
            },
            minHealthPercent: {
              description:
                "Outlier detection will be enabled as long as the associated load balancing pool has at least min_health_percent hosts in healthy mode. When the percentage of healthy hosts in the load balancing pool drops below this threshold, outlier detection will be disabled and the proxy will load balance across all hosts in the pool (healthy and unhealthy). The threshold can be disabled by setting it to 0%. The default is 0% as it's not typically applicable in k8s environments with few pods per service.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.networking.v1beta1.ClientTLSSettings": {
          description:
            "SSL/TLS related settings for upstream connections. See Envoy's [TLS context](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/auth/cert.proto.html) for more details. These settings are common to both HTTP and TCP upstreams.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ClientTLSSettings.TLSmode",
            },
            clientCertificate: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client-side TLS certificate to use. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client's private key. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "OPTIONAL: The path to the file containing certificate authority certificates to use in verifying a presented server certificate. If omitted, the proxy will not verify the server's certificate. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "The name of the secret that holds the TLS certs for the client including the CA certificates. Applicable only on Kubernetes. Secret must exist in the same namespace with the proxy using the certificates. The secret (of type `generic`)should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for client certificates along with ca.crt key for CA certificates is also supported. Only one of client certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate. If specified, the proxy will verify that the server certificate's subject alt name matches one of the specified values. If specified, this list overrides the value of subject_alt_names from the ServiceEntry.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sni: {
              description:
                "SNI string to present to the server during TLS handshake.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1beta1.TrafficPolicy.PortTrafficPolicy": {
          description:
            "Traffic policies that apply to specific ports of the service",
          type: "object",
          properties: {
            loadBalancer: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings",
            },
            connectionPool: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ConnectionPoolSettings",
            },
            outlierDetection: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.OutlierDetection",
            },
            tls: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ClientTLSSettings",
            },
            port: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.PortSelector",
            },
          },
        },
        "istio.networking.v1beta1.PortSelector": {
          description:
            "PortSelector specifies the number of a port to be used for matching or selection for final routing.",
          type: "object",
          properties: {
            number: {
              description: "Valid port number",
              type: "integer",
            },
          },
        },
        "istio.networking.v1beta1.LocalityLoadBalancerSetting": {
          description:
            "Locality-weighted load balancing allows administrators to control the distribution of traffic to endpoints based on the localities of where the traffic originates and where it will terminate. These localities are specified using arbitrary labels that designate a hierarchy of localities in {region}/{zone}/{sub-zone} form. For additional detail refer to [Locality Weight](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/locality_weight) The following example shows how to setup locality weights mesh-wide.",
          type: "object",
          properties: {
            distribute: {
              description:
                "Optional: only one of distribute or failover can be set. Explicitly specify loadbalancing weight across different zones and geographical locations. Refer to [Locality weighted load balancing](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/locality_weight) If empty, the locality weight is set according to the endpoints number within it.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.LocalityLoadBalancerSetting.Distribute",
              },
            },
            failover: {
              description:
                "Optional: only failover or distribute can be set. Explicitly specify the region traffic will land on when endpoints in local region becomes unhealthy. Should be used together with OutlierDetection to detect unhealthy endpoints. Note: if no OutlierDetection specified, this will not take effect.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1beta1.LocalityLoadBalancerSetting.Failover",
              },
            },
            enabled: {
              description:
                "enable locality load balancing, this is DestinationRule-level and will override mesh wide settings in entirety. e.g. true means that turn on locality load balancing for this DestinationRule no matter what mesh wide settings is.",
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.networking.v1beta1.LoadBalancerSettings.SimpleLB": {
          description:
            "Standard load balancing algorithms that require no tuning.",
          type: "string",
          enum: ["ROUND_ROBIN", "LEAST_CONN", "RANDOM", "PASSTHROUGH"],
        },
        "istio.networking.v1beta1.LoadBalancerSettings.ConsistentHashLB": {
          description:
            "Consistent Hash-based load balancing can be used to provide soft session affinity based on HTTP headers, cookies or other properties. This load balancing policy is applicable only for HTTP connections. The affinity to a particular destination host will be lost when one or more hosts are added/removed from the destination service.",
          type: "object",
          properties: {
            minimumRingSize: {
              description:
                "The minimum number of virtual nodes to use for the hash ring. Defaults to 1024. Larger ring sizes result in more granular load distributions. If the number of hosts in the load balancing pool is larger than the ring size, each host will be assigned a single virtual node.",
              type: "integer",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["httpHeaderName"],
                    properties: {
                      httpHeaderName: {
                        description: "Hash based on a specific HTTP header.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["httpCookie"],
                    properties: {
                      httpCookie: {
                        $ref:
                          "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings.ConsistentHashLB.HTTPCookie",
                      },
                    },
                  },
                  {
                    required: ["useSourceIp"],
                    properties: {
                      useSourceIp: {
                        description: "Hash based on the source IP address.",
                        type: "boolean",
                      },
                    },
                  },
                  {
                    required: ["httpQueryParameterName"],
                    properties: {
                      httpQueryParameterName: {
                        description:
                          "Hash based on a specific HTTP query parameter.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["httpHeaderName"],
              properties: {
                httpHeaderName: {
                  description: "Hash based on a specific HTTP header.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["httpCookie"],
              properties: {
                httpCookie: {
                  $ref:
                    "#/components/schemas/istio.networking.v1beta1.LoadBalancerSettings.ConsistentHashLB.HTTPCookie",
                },
              },
            },
            {
              required: ["useSourceIp"],
              properties: {
                useSourceIp: {
                  description: "Hash based on the source IP address.",
                  type: "boolean",
                },
              },
            },
            {
              required: ["httpQueryParameterName"],
              properties: {
                httpQueryParameterName: {
                  description: "Hash based on a specific HTTP query parameter.",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.networking.v1beta1.LoadBalancerSettings.ConsistentHashLB.HTTPCookie": {
          description:
            "Describes a HTTP cookie that will be used as the hash key for the Consistent Hash load balancer. If the cookie is not present, it will be generated.",
          type: "object",
          properties: {
            path: {
              description: "Path to set for the cookie.",
              type: "string",
              format: "string",
            },
            name: {
              description: "Name of the cookie.",
              type: "string",
              format: "string",
            },
            ttl: {
              description: "Lifetime of the cookie.",
              type: "string",
            },
          },
        },
        "istio.networking.v1beta1.ConnectionPoolSettings.TCPSettings": {
          description:
            "Settings common to both HTTP and TCP upstream connections.",
          type: "object",
          properties: {
            maxConnections: {
              description:
                "Maximum number of HTTP1 /TCP connections to a destination host. Default 2^32-1.",
              type: "integer",
              format: "int32",
            },
            connectTimeout: {
              description: "TCP connection timeout.",
              type: "string",
            },
            tcpKeepalive: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ConnectionPoolSettings.TCPSettings.TcpKeepalive",
            },
          },
        },
        "istio.networking.v1beta1.ConnectionPoolSettings.HTTPSettings": {
          description: "Settings applicable to HTTP1.1/HTTP2/GRPC connections.",
          type: "object",
          properties: {
            http1MaxPendingRequests: {
              description:
                "Maximum number of pending HTTP requests to a destination. Default 2^32-1.",
              type: "integer",
              format: "int32",
            },
            http2MaxRequests: {
              description:
                "Maximum number of requests to a backend. Default 2^32-1.",
              type: "integer",
              format: "int32",
            },
            maxRequestsPerConnection: {
              description:
                'Maximum number of requests per connection to a backend. Setting this parameter to 1 disables keep alive. Default 0, meaning "unlimited", up to 2^29.',
              type: "integer",
              format: "int32",
            },
            maxRetries: {
              description:
                "Maximum number of retries that can be outstanding to all hosts in a cluster at a given time. Defaults to 2^32-1.",
              type: "integer",
              format: "int32",
            },
            idleTimeout: {
              description:
                "The idle timeout for upstream connection pool connections. The idle timeout is defined as the period in which there are no active requests. If not set, the default is 1 hour. When the idle timeout is reached the connection will be closed. Note that request based timeouts mean that HTTP/2 PINGs will not keep the connection alive. Applies to both HTTP1.1 and HTTP2 connections.",
              type: "string",
            },
            h2UpgradePolicy: {
              $ref:
                "#/components/schemas/istio.networking.v1beta1.ConnectionPoolSettings.HTTPSettings.H2UpgradePolicy",
            },
          },
        },
        "istio.networking.v1beta1.ConnectionPoolSettings.TCPSettings.TcpKeepalive": {
          description: "TCP keepalive.",
          type: "object",
          properties: {
            time: {
              description:
                "The time duration a connection needs to be idle before keep-alive probes start being sent. Default is to use the OS level configuration (unless overridden, Linux defaults to 7200s (ie 2 hours.)",
              type: "string",
            },
            probes: {
              description:
                "Maximum number of keepalive probes to send without response before deciding the connection is dead. Default is to use the OS level configuration (unless overridden, Linux defaults to 9.)",
              type: "integer",
            },
            interval: {
              description:
                "The time duration between keep-alive probes. Default is to use the OS level configuration (unless overridden, Linux defaults to 75s.)",
              type: "string",
            },
          },
        },
        "istio.networking.v1beta1.ConnectionPoolSettings.HTTPSettings.H2UpgradePolicy": {
          description: "Policy for upgrading http1.1 connections to http2.",
          type: "string",
          enum: ["DEFAULT", "DO_NOT_UPGRADE", "UPGRADE"],
        },
        "istio.networking.v1beta1.ClientTLSSettings.TLSmode": {
          description: "TLS connection mode",
          type: "string",
          enum: ["DISABLE", "SIMPLE", "MUTUAL", "ISTIO_MUTUAL"],
        },
        "istio.networking.v1beta1.LocalityLoadBalancerSetting.Distribute": {
          description:
            "Describes how traffic originating in the 'from' zone or sub-zone is distributed over a set of 'to' zones. Syntax for specifying a zone is {region}/{zone}/{sub-zone} and terminal wildcards are allowed on any segment of the specification. Examples: * - matches all localities us-west/* - all zones and sub-zones within the us-west region us-west/zone-1/* - all sub-zones within us-west/zone-1",
          type: "object",
          properties: {
            from: {
              description:
                "Originating locality, '/' separated, e.g. 'region/zone/sub_zone'.",
              type: "string",
              format: "string",
            },
            to: {
              description:
                "Map of upstream localities to traffic distribution weights. The sum of all weights should be == 100. Any locality not assigned a weight will receive no traffic.",
              type: "object",
              additionalProperties: {
                type: "integer",
              },
            },
          },
        },
        "istio.networking.v1beta1.LocalityLoadBalancerSetting.Failover": {
          description:
            "Specify the traffic failover policy across regions. Since zone and sub-zone failover is supported by default this only needs to be specified for regions when the operator needs to constrain traffic failover so that the default behavior of failing over to any endpoint globally does not apply. This is useful when failing over traffic across regions would not improve service health or may need to be restricted for other reasons like regulatory controls.",
          type: "object",
          properties: {
            from: {
              description: "Originating region.",
              type: "string",
              format: "string",
            },
            to: {
              description:
                "Destination region the traffic will fail over to when endpoints in the 'from' region becomes unhealthy.",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Definition of a workload selector.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.type.v1beta1.WorkloadSelector": {
          description:
            "WorkloadSelector specifies the criteria used to determine if a policy can be applied to a proxy. The matching criteria includes the metadata associated with a proxy, workload instance info such as labels attached to the pod/VM, or any other info that the proxy provides to Istio during the initial handshake. If multiple conditions are specified, all conditions need to match in order for the workload instance to be selected. Currently, only label based selection mechanism is supported.",
          type: "object",
          properties: {
            matchLabels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which a policy should be applied. The scope of label search is restricted to the configuration namespace in which the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration affecting the service mesh as a whole.",
      version: "v1alpha1",
    },
    components: {
      schemas: {
        "istio.mesh.v1alpha1.MeshConfig": {
          description:
            "MeshConfig defines mesh-wide variables shared by all Envoy instances in the Istio service mesh.",
          type: "object",
          properties: {
            localityLbSetting: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.LocalityLoadBalancerSetting",
            },
            connectTimeout: {
              description:
                "Connection timeout used by Envoy. (MUST BE \u003e=1ms)",
              type: "string",
            },
            tcpKeepalive: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings.TCPSettings.TcpKeepalive",
            },
            h2UpgradePolicy: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.H2UpgradePolicy",
            },
            outboundTrafficPolicy: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.OutboundTrafficPolicy",
            },
            mixerCheckServer: {
              description:
                "Address of the server that will be used by the proxies for policy check calls. By using different names for mixerCheckServer and mixerReportServer, it is possible to have one set of Mixer servers handle policy check calls while another set of Mixer servers handle telemetry calls.",
              type: "string",
              format: "string",
              deprecated: true,
            },
            mixerReportServer: {
              description:
                "Address of the server that will be used by the proxies for policy report calls.",
              type: "string",
              format: "string",
              deprecated: true,
            },
            disablePolicyChecks: {
              description:
                "Disable policy checks by the Mixer service. Default is false, i.e. Mixer policy check is enabled by default.",
              type: "boolean",
              deprecated: true,
            },
            disableMixerHttpReports: {
              description:
                "Disable telemetry reporting by the Mixer service for HTTP traffic. Default is false (telemetry reporting via Mixer is enabled). This option provides a transition path for Istio extensibility v2.",
              type: "boolean",
              deprecated: true,
            },
            policyCheckFailOpen: {
              description:
                "Allow all traffic in cases when the Mixer policy service cannot be reached. Default is false which means the traffic is denied when the client is unable to connect to Mixer.",
              type: "boolean",
              deprecated: true,
            },
            sidecarToTelemetrySessionAffinity: {
              description:
                "Enable session affinity for Envoy Mixer reports so that calls from a proxy will always target the same Mixer instance.",
              type: "boolean",
              deprecated: true,
            },
            proxyListenPort: {
              description:
                "Port on which Envoy should listen for incoming connections from other services.",
              type: "integer",
              format: "int32",
            },
            proxyHttpPort: {
              description:
                "Port on which Envoy should listen for HTTP PROXY requests if set.",
              type: "integer",
              format: "int32",
            },
            protocolDetectionTimeout: {
              description:
                "Automatic protocol detection uses a set of heuristics to determine whether the connection is using TLS or not (on the server side), as well as the application protocol being used (e.g., http vs tcp). These heuristics rely on the client sending the first bits of data. For server first protocols like MySQL, MongoDB, etc., Envoy will timeout on the protocol detection after the specified period, defaulting to non mTLS plain TCP traffic. Set this field to tweak the period that Envoy will wait for the client to send the first bits of data. (MUST BE \u003e=1ms or 0s to disable)",
              type: "string",
            },
            ingressClass: {
              description:
                'Class of ingress resources to be processed by Istio ingress controller. This corresponds to the value of "kubernetes.io/ingress.class" annotation.',
              type: "string",
              format: "string",
            },
            ingressService: {
              description:
                "Name of the Kubernetes service used for the istio ingress controller.",
              type: "string",
              format: "string",
            },
            ingressControllerMode: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.IngressControllerMode",
            },
            ingressSelector: {
              description:
                "Defines which gateway deployment to use as the Ingress controller. This field corresponds to the Gateway.selector field, and will be set as `istio: INGRESS_SELECTOR`. By default, `ingressgateway` is used, which will select the default IngressGateway as it has the `istio: ingressgateway` labels. It is recommended that this is the same value as ingress_service.",
              type: "string",
              format: "string",
            },
            authPolicy: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.AuthPolicy",
              deprecated: true,
            },
            rdsRefreshDelay: {
              type: "string",
              deprecated: true,
            },
            enableTracing: {
              description:
                "Flag to control generation of trace spans and request IDs. Requires a trace span collector defined in the proxy configuration.",
              type: "boolean",
            },
            accessLogFile: {
              description:
                "File address for the proxy access log (e.g. /dev/stdout). Empty value disables access logging.",
              type: "string",
              format: "string",
            },
            accessLogFormat: {
              description:
                "Format for the proxy access log Empty value results in proxy's default access log format",
              type: "string",
              format: "string",
            },
            accessLogEncoding: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.AccessLogEncoding",
            },
            enableEnvoyAccessLogService: {
              description:
                "This flag enables Envoy's gRPC Access Log Service. See [Access Log Service](https://www.envoyproxy.io/docs/envoy/latest/api-v2/config/accesslog/v2/als.proto) for details about Envoy's gRPC Access Log Service API.",
              type: "boolean",
            },
            defaultConfig: {
              $ref: "#/components/schemas/istio.mesh.v1alpha1.ProxyConfig",
            },
            mixerAddress: {
              type: "string",
              format: "string",
              deprecated: true,
            },
            enableClientSidePolicyCheck: {
              description: "Enables client side policy checks.",
              type: "boolean",
            },
            sdsUdsPath: {
              description:
                "Unix Domain Socket through which Envoy communicates with NodeAgent SDS to get key/cert for mTLS. Use secret-mount files instead of SDS if set to empty. @deprecated - istio agent will detect and send the path to envoy.",
              type: "string",
              format: "string",
              deprecated: true,
            },
            sdsRefreshDelay: {
              type: "string",
              deprecated: true,
            },
            configSources: {
              description:
                "ConfigSource describes a source of configuration data for networking rules, and other Istio configuration artifacts. Multiple data sources can be configured for a single control plane.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mesh.v1alpha1.ConfigSource",
              },
            },
            enableAutoMtls: {
              description:
                "This flag is used to enable mutual TLS automatically for service to service communication within the mesh, default true. If set to true, and a given service does not have a corresponding DestinationRule configured, or its DestinationRule does not have ClientTLSSettings specified, Istio configures client side TLS configuration appropriately. More specifically, If the upstream authentication policy is in STRICT mode, use Istio provisioned certificate for mutual TLS to connect to upstream. If upstream service is in plain text mode, use plain text. If the upstream authentication policy is in PERMISSIVE mode, Istio configures clients to use mutual TLS when server sides are capable of accepting mutual TLS traffic. If service DestinationRule exists and has ClientTLSSettings specified, that is always used instead.",
              type: "boolean",
              nullable: true,
            },
            enableSdsTokenMount: {
              description:
                "This flag is used by secret discovery service(SDS). If set to true ([prerequisite](https://kubernetes.io/docs/concepts/storage/volumes/#projected)), Istio will inject volumes mount for Kubernetes service account trustworthy JWT(which is available with Kubernetes 1.12 or higher), so that the Kubernetes API server mounts Kubernetes service account trustworthy JWT to the Envoy container, which will be used to request key/cert eventually. This isn't supported for non-Kubernetes cases.",
              type: "boolean",
            },
            sdsUseK8sSaJwt: {
              description:
                "This flag is used by secret discovery service(SDS). If set to true, Envoy will fetch a normal Kubernetes service account JWT from '/var/run/secrets/kubernetes.io/serviceaccount/token' (https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#accessing-the-api-from-a-pod) and pass to sds server, which will be used to request key/cert eventually. If both enable_sds_token_mount and sds_use_k8s_sa_jwt are set to true, enable_sds_token_mount(trustworthy jwt) takes precedence. This isn't supported for non-k8s case.",
              type: "boolean",
            },
            trustDomain: {
              description:
                "The trust domain corresponds to the trust root of a system. Refer to [SPIFFE-ID](https://github.com/spiffe/spiffe/blob/master/standards/SPIFFE-ID.md#21-trust-domain)",
              type: "string",
              format: "string",
            },
            trustDomainAliases: {
              description:
                'The trust domain aliases represent the aliases of `trust_domain`. For example, if we have ```yaml trustDomain: td1 trustDomainAliases: ["td2", "td3"] ``` Any service with the identity `td1/ns/foo/sa/a-service-account`, `td2/ns/foo/sa/a-service-account`, or `td3/ns/foo/sa/a-service-account` will be treated the same in the Istio mesh.',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            defaultServiceExportTo: {
              description:
                "The default value for the ServiceEntry.export_to field and services imported through container registry integrations, e.g. this applies to Kubernetes Service resources. The value is a list of namespace names and reserved namespace aliases. The allowed namespace aliases are: * - All Namespaces . - Current Namespace ~ - No Namespace",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            defaultVirtualServiceExportTo: {
              description:
                "The default value for the VirtualService.export_to field. Has the same syntax as 'default_service_export_to'.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            defaultDestinationRuleExportTo: {
              description:
                "The default value for the DestinationRule.export_to field. Has the same syntax as 'default_service_export_to'.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            rootNamespace: {
              description:
                "The namespace to treat as the administrative root namespace for Istio configuration. When processing a leaf namespace Istio will search for declarations in that namespace first and if none are found it will search in the root namespace. Any matching declaration found in the root namespace is processed as if it were declared in the leaf namespace.",
              type: "string",
              format: "string",
            },
            dnsRefreshRate: {
              description:
                "Configures DNS refresh rate for Envoy clusters of type STRICT_DNS",
              type: "string",
            },
            disableReportBatch: {
              description: "The flag to disable report batch.",
              type: "boolean",
              deprecated: true,
            },
            reportBatchMaxEntries: {
              description:
                "When disable_report_batch is false, this value specifies the maximum number of requests that are batched in report. If left unspecified, the default value of report_batch_max_entries == 0 will use the hardcoded defaults of istio::mixerclient::ReportOptions.",
              type: "integer",
              deprecated: true,
            },
            reportBatchMaxTime: {
              description:
                "When disable_report_batch is false, this value specifies the maximum elapsed time a batched report will be sent after a user request is processed. If left unspecified, the default report_batch_max_time == 0 will use the hardcoded defaults of istio::mixerclient::ReportOptions.",
              type: "string",
              deprecated: true,
            },
            inboundClusterStatName: {
              description:
                "Name to be used while emitting statistics for inbound clusters. The same pattern is used while computing stat prefix for network filters like TCP and Redis. By default, Istio emits statistics with the pattern `inbound|\u003cport\u003e|\u003cport-name\u003e|\u003cservice-FQDN\u003e`. For example `inbound|7443|grpc-reviews|reviews.prod.svc.cluster.local`. This can be used to override that pattern.",
              type: "string",
              format: "string",
            },
            outboundClusterStatName: {
              description:
                "Name to be used while emitting statistics for outbound clusters. The same pattern is used while computing stat prefix for network filters like TCP and Redis. By default, Istio emits statistics with the pattern `outbound|\u003cport\u003e|\u003csubsetname\u003e|\u003cservice-FQDN\u003e`. For example `outbound|8080|v2|reviews.prod.svc.cluster.local`. This can be used to override that pattern.",
              type: "string",
              format: "string",
            },
            certificates: {
              description: "Configure the provision of certificates.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mesh.v1alpha1.Certificate",
              },
            },
            thriftConfig: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.ThriftConfig",
            },
            serviceSettings: {
              description: "Settings to be applied to select services.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.ServiceSettings",
              },
            },
            enablePrometheusMerge: {
              description:
                'If enabled, Istio agent will merge metrics exposed by the application with metrics from Envoy and Istio agent. The sidecar injection will replace `prometheus.io` annotations present on the pod and redirect them towards Istio agent, which will then merge metrics of from the application with Istio metrics. This relies on the annotations `prometheus.io/scrape`, `prometheus.io/port`, and `prometheus.io/path` annotations. If you are running a separately managed Envoy with an Istio sidecar, this may cause issues, as the metrics will collide. In this case, it is recommended to disable aggregation on that deployment with the `prometheus.istio.io/merge-metrics: "false"` annotation. If not specified, this will be enabled by default.',
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.mesh.v1alpha1.MeshConfig.IngressControllerMode": {
          type: "string",
          enum: ["UNSPECIFIED", "OFF", "DEFAULT", "STRICT"],
        },
        "istio.mesh.v1alpha1.MeshConfig.AuthPolicy": {
          type: "string",
          enum: ["NONE", "MUTUAL_TLS"],
        },
        "istio.mesh.v1alpha1.MeshConfig.AccessLogEncoding": {
          type: "string",
          enum: ["TEXT", "JSON"],
        },
        "istio.mesh.v1alpha1.ProxyConfig": {
          description:
            "ProxyConfig defines variables for individual Envoy instances.",
          type: "object",
          properties: {
            configPath: {
              description:
                "Path to the generated configuration file directory. Proxy agent generates the actual configuration and stores it in this directory.",
              type: "string",
              format: "string",
            },
            binaryPath: {
              description: "Path to the proxy binary",
              type: "string",
              format: "string",
            },
            serviceCluster: {
              description:
                "Service cluster defines the name for the service_cluster that is shared by all Envoy instances. This setting corresponds to _--service-cluster_ flag in Envoy. In a typical Envoy deployment, the _service-cluster_ flag is used to identify the caller, for source-based routing scenarios.",
              type: "string",
              format: "string",
            },
            drainDuration: {
              description:
                "The time in seconds that Envoy will drain connections during a hot restart. MUST be \u003e=1s (e.g., _1s/1m/1h_)",
              type: "string",
            },
            parentShutdownDuration: {
              description:
                "The time in seconds that Envoy will wait before shutting down the parent process during a hot restart. MUST be \u003e=1s (e.g., _1s/1m/1h_). MUST BE greater than _drain_duration_ parameter.",
              type: "string",
            },
            discoveryAddress: {
              description:
                "Address of the discovery service exposing xDS with mTLS connection. The inject configuration may override this value.",
              type: "string",
              format: "string",
            },
            discoveryRefreshDelay: {
              type: "string",
              deprecated: true,
            },
            zipkinAddress: {
              description:
                "Address of the Zipkin service (e.g. _zipkin:9411_). DEPRECATED: Use [tracing][istio.mesh.v1alpha1.ProxyConfig.tracing] instead.",
              type: "string",
              format: "string",
              deprecated: true,
            },
            statsdUdpAddress: {
              description:
                "IP Address and Port of a statsd UDP listener (e.g. _10.75.241.127:9125_).",
              type: "string",
              format: "string",
            },
            envoyMetricsServiceAddress: {
              type: "string",
              format: "string",
              deprecated: true,
            },
            proxyAdminPort: {
              description:
                "Port on which Envoy should listen for administrative commands.",
              type: "integer",
              format: "int32",
            },
            availabilityZone: {
              type: "string",
              format: "string",
              deprecated: true,
            },
            controlPlaneAuthPolicy: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.AuthenticationPolicy",
            },
            customConfigFile: {
              description:
                "File path of custom proxy configuration, currently used by proxies in front of Mixer and Pilot.",
              type: "string",
              format: "string",
            },
            statNameLength: {
              description:
                "Maximum length of name field in Envoy's metrics. The length of the name field is determined by the length of a name field in a service and the set of labels that comprise a particular version of the service. The default value is set to 189 characters. Envoy's internal metrics take up 67 characters, for a total of 256 character name per metric. Increase the value of this field if you find that the metrics from Envoys are truncated.",
              type: "integer",
              format: "int32",
            },
            concurrency: {
              description:
                "The number of worker threads to run. If unset, this will be automatically determined based on CPU requests/limits. If set to 0, all cores on the machine will be used.",
              type: "integer",
              nullable: true,
            },
            proxyBootstrapTemplatePath: {
              description: "Path to the proxy bootstrap template file",
              type: "string",
              format: "string",
            },
            interceptionMode: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.ProxyConfig.InboundInterceptionMode",
            },
            tracing: {
              $ref: "#/components/schemas/istio.mesh.v1alpha1.Tracing",
            },
            sds: {
              $ref: "#/components/schemas/istio.mesh.v1alpha1.SDS",
            },
            envoyAccessLogService: {
              $ref: "#/components/schemas/istio.mesh.v1alpha1.RemoteService",
            },
            envoyMetricsService: {
              $ref: "#/components/schemas/istio.mesh.v1alpha1.RemoteService",
            },
            proxyMetadata: {
              description:
                "Additional env variables for the proxy. Names starting with ISTIO_META_ will be included in the generated bootstrap and sent to the XDS server.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            statusPort: {
              description:
                "Port on which the agent should listen for administrative commands such as readiness probe.",
              type: "integer",
              format: "int32",
            },
            extraStatTags: {
              description:
                "An additional list of tags to extract from the in-proxy Istio telemetry. These extra tags can be added by configuring the telemetry extension. Each additional tag needs to be present in this list. Extra tags emitted by the telemetry extensions must be listed here so that they can be processed and exposed as Prometheus metrics.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            gatewayTopology: {
              $ref: "#/components/schemas/istio.mesh.v1alpha1.Topology",
            },
            terminationDrainDuration: {
              description:
                "The amount of time allowed for connections to complete on proxy shutdown. On receiving SIGTERM or SIGINT, istio-agent tells the active Envoy to start draining, preventing any new connections and allowing existing connections to complete. It then sleeps for the termination_drain_duration and then kills any remaining active Envoy processes. If not set, a default of 5s will be applied.",
              type: "string",
            },
            meshId: {
              description:
                "The unique identifier for the [service mesh](https://istio.io/latest/docs/reference/glossary/#service-mesh) All control planes running in the same service mesh should specify the same mesh ID. Mesh ID is used to label telemetry reports for cases where telemetry from multiple meshes is mixed together.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.mesh.v1alpha1.MeshConfig.OutboundTrafficPolicy": {
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.OutboundTrafficPolicy.Mode",
            },
          },
        },
        "istio.mesh.v1alpha1.ConfigSource": {
          description:
            "ConfigSource describes information about a configuration store inside a mesh. A single control plane instance can interact with one or more data sources.",
          type: "object",
          properties: {
            address: {
              description:
                "Address of the server implementing the Istio Mesh Configuration protocol (MCP). Can be IP address or a fully qualified DNS name. Use fs:/// to specify a file-based backend with absolute path to the directory.",
              type: "string",
              format: "string",
            },
            tlsSettings: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings",
            },
            subscribedResources: {
              description:
                "Describes the source of configuration, if nothing is specified default is MCP",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mesh.v1alpha1.Resource",
              },
            },
          },
        },
        "istio.mesh.v1alpha1.MeshConfig.H2UpgradePolicy": {
          description:
            "Default Policy for upgrading http1.1 connections to http2.",
          type: "string",
          enum: ["DO_NOT_UPGRADE", "UPGRADE"],
        },
        "istio.mesh.v1alpha1.Certificate": {
          description:
            "Certificate configures the provision of a certificate and its key. Example 1: key and cert stored in a secret { secretName: galley-cert secretNamespace: istio-system dnsNames: - galley.istio-system.svc - galley.mydomain.com } Example 2: key and cert stored in a directory { dnsNames: - pilot.istio-system - pilot.istio-system.svc - pilot.mydomain.com }",
          type: "object",
          properties: {
            secretName: {
              description:
                "Name of the secret the certificate and its key will be stored into. If it is empty, it will not be stored into a secret. Instead, the certificate and its key will be stored into a hard-coded directory.",
              type: "string",
              format: "string",
            },
            dnsNames: {
              description:
                "The DNS names for the certificate. A certificate may contain multiple DNS names.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.mesh.v1alpha1.MeshConfig.ThriftConfig": {
          type: "object",
          properties: {
            rateLimitUrl: {
              description:
                "Specify thrift rate limit service URL. If pilot has thrift protocol support enabled, this will enable the rate limit service for destinations that have matching rate limit configurations.",
              type: "string",
              format: "string",
            },
            rateLimitTimeout: {
              description:
                "Specify thrift rate limit service timeout, in milliseconds. Default is 50ms",
              type: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.MeshConfig.ServiceSettings": {
          description: "Settings to be applied to select services.",
          type: "object",
          properties: {
            hosts: {
              description:
                "The services to which the Settings should be applied. Services are selected using the hostname matching rules used by DestinationRule.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            settings: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.MeshConfig.ServiceSettings.Settings",
            },
          },
        },
        "istio.mesh.v1alpha1.MeshConfig.OutboundTrafficPolicy.Mode": {
          type: "string",
          enum: ["REGISTRY_ONLY", "ALLOW_ANY"],
        },
        "istio.mesh.v1alpha1.MeshConfig.ServiceSettings.Settings": {
          description: "Settings for the selected services.",
          type: "object",
          properties: {
            clusterLocal: {
              description:
                "If true, specifies that the client and service endpoints must reside in the same cluster. By default, in multi-cluster deployments, the Istio control plane assumes all service endpoints to be reachable from any client in any of the clusters which are part of the mesh. This configuration option limits the set of service endpoints visible to a client to be cluster scoped.",
              type: "boolean",
            },
          },
        },
        "istio.mesh.v1alpha1.Resource": {
          description: "Resource describes the source of configuration",
          type: "string",
          enum: ["SERVICE_REGISTRY"],
        },
        "istio.mesh.v1alpha1.Network": {
          description:
            "Network provides information about the endpoints in a routable L3 network. A single routable L3 network can have one or more service registries. Note that the network has no relation to the locality of the endpoint. The endpoint locality will be obtained from the service registry.",
          type: "object",
          properties: {
            endpoints: {
              description:
                "The list of endpoints in the network (obtained through the constituent service registries or from CIDR ranges). All endpoints in the network are directly accessible to one another.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mesh.v1alpha1.Network.NetworkEndpoints",
              },
            },
            gateways: {
              description: "Set of gateways associated with the network.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mesh.v1alpha1.Network.IstioNetworkGateway",
              },
            },
          },
        },
        "istio.mesh.v1alpha1.Network.NetworkEndpoints": {
          description:
            "NetworkEndpoints describes how the network associated with an endpoint should be inferred. An endpoint will be assigned to a network based on the following rules: 1. Implicitly: If the registry explicitly provides information about the network to which the endpoint belongs to. In some cases, its possible to indicate the network associated with the endpoint by adding the `ISTIO_META_NETWORK` environment variable to the sidecar.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["fromCidr"],
                    properties: {
                      fromCidr: {
                        description:
                          "A CIDR range for the set of endpoints in this network. The CIDR ranges for endpoints from different networks must not overlap.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["fromRegistry"],
                    properties: {
                      fromRegistry: {
                        description:
                          "Add all endpoints from the specified registry into this network. The names of the registries should correspond to the kubeconfig file name inside the secret that was used to configure the registry (Kubernetes multicluster) or supplied by MCP server.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["fromCidr"],
              properties: {
                fromCidr: {
                  description:
                    "A CIDR range for the set of endpoints in this network. The CIDR ranges for endpoints from different networks must not overlap.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["fromRegistry"],
              properties: {
                fromRegistry: {
                  description:
                    "Add all endpoints from the specified registry into this network. The names of the registries should correspond to the kubeconfig file name inside the secret that was used to configure the registry (Kubernetes multicluster) or supplied by MCP server.",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.mesh.v1alpha1.Network.IstioNetworkGateway": {
          description:
            "The gateway associated with this network. Traffic from remote networks will arrive at the specified gateway:port. All incoming traffic must use mTLS.",
          type: "object",
          properties: {
            port: {
              description: "The port associated with the gateway.",
              type: "integer",
            },
            locality: {
              description:
                "The locality associated with an explicitly specified gateway (i.e. ip)",
              type: "string",
              format: "string",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["registryServiceName"],
                    properties: {
                      registryServiceName: {
                        description:
                          "A fully qualified domain name of the gateway service. Pilot will lookup the service from the service registries in the network and obtain the endpoint IPs of the gateway from the service registry. Note that while the service name is a fully qualified domain name, it need not be resolvable outside the orchestration platform for the registry. e.g., this could be istio-ingressgateway.istio-system.svc.cluster.local.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["address"],
                    properties: {
                      address: {
                        description:
                          "IP address or externally resolvable DNS address associated with the gateway.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["registryServiceName"],
              properties: {
                registryServiceName: {
                  description:
                    "A fully qualified domain name of the gateway service. Pilot will lookup the service from the service registries in the network and obtain the endpoint IPs of the gateway from the service registry. Note that while the service name is a fully qualified domain name, it need not be resolvable outside the orchestration platform for the registry. e.g., this could be istio-ingressgateway.istio-system.svc.cluster.local.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["address"],
              properties: {
                address: {
                  description:
                    "IP address or externally resolvable DNS address associated with the gateway.",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.mesh.v1alpha1.MeshNetworks": {
          description:
            "MeshNetworks (config map) provides information about the set of networks inside a mesh and how to route to endpoints in each network. For example",
          type: "object",
          properties: {
            networks: {
              description:
                "The set of networks inside this mesh. Each network should have a unique name and information about how to infer the endpoints in the network as well as the gateways associated with the network.",
              type: "object",
              additionalProperties: {
                $ref: "#/components/schemas/istio.mesh.v1alpha1.Network",
              },
            },
          },
        },
        "istio.mesh.v1alpha1.AuthenticationPolicy": {
          description:
            "AuthenticationPolicy defines authentication policy. It can be set for different scopes (mesh, service …), and the most narrow scope with non-INHERIT value will be used. Mesh policy cannot be INHERIT.",
          type: "string",
          enum: ["NONE", "MUTUAL_TLS", "INHERIT"],
        },
        "istio.mesh.v1alpha1.Tracing": {
          description:
            "Tracing defines configuration for the tracing performed by Envoy instances.",
          type: "object",
          properties: {
            tlsSettings: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings",
            },
            customTags: {
              description:
                "Configures the custom tags to be added to active span by all proxies (i.e. sidecars and gateways). The key represents the name of the tag. Ex: ```yaml custom_tags: new_tag_name: header: name: custom-http-header-name default_value: defaulted-value-from-custom-header ``` $hide_from_docs",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mesh.v1alpha1.Tracing.CustomTag",
              },
            },
            maxPathTagLength: {
              description:
                "Configures the maximum length of the request path to extract and include in the HttpUrl tag. Used to truncate length request paths to meet the needs of tracing backend. If not set, then a length of 256 will be used. $hide_from_docs",
              type: "integer",
            },
            sampling: {
              description:
                "The percentage of requests (0.0 - 100.0) that will be randomly selected for trace generation, if not requested by the client or not forced. Default is 100. $hide_from_docs",
              type: "number",
              format: "double",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["zipkin"],
                    properties: {
                      zipkin: {
                        $ref:
                          "#/components/schemas/istio.mesh.v1alpha1.Tracing.Zipkin",
                      },
                    },
                  },
                  {
                    required: ["lightstep"],
                    properties: {
                      lightstep: {
                        $ref:
                          "#/components/schemas/istio.mesh.v1alpha1.Tracing.Lightstep",
                      },
                    },
                  },
                  {
                    required: ["datadog"],
                    properties: {
                      datadog: {
                        $ref:
                          "#/components/schemas/istio.mesh.v1alpha1.Tracing.Datadog",
                      },
                    },
                  },
                  {
                    required: ["stackdriver"],
                    properties: {
                      stackdriver: {
                        $ref:
                          "#/components/schemas/istio.mesh.v1alpha1.Tracing.Stackdriver",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["zipkin"],
              properties: {
                zipkin: {
                  $ref:
                    "#/components/schemas/istio.mesh.v1alpha1.Tracing.Zipkin",
                },
              },
            },
            {
              required: ["lightstep"],
              properties: {
                lightstep: {
                  $ref:
                    "#/components/schemas/istio.mesh.v1alpha1.Tracing.Lightstep",
                },
              },
            },
            {
              required: ["datadog"],
              properties: {
                datadog: {
                  $ref:
                    "#/components/schemas/istio.mesh.v1alpha1.Tracing.Datadog",
                },
              },
            },
            {
              required: ["stackdriver"],
              properties: {
                stackdriver: {
                  $ref:
                    "#/components/schemas/istio.mesh.v1alpha1.Tracing.Stackdriver",
                },
              },
            },
          ],
        },
        "istio.mesh.v1alpha1.Tracing.CustomTag": {
          description:
            "Configure custom tags that will be added to any active span. Tags can be generated via literals, environment variables or an incoming request header. $hide_from_docs",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["literal"],
                    properties: {
                      literal: {
                        $ref:
                          "#/components/schemas/istio.mesh.v1alpha1.Tracing.Literal",
                      },
                    },
                  },
                  {
                    required: ["environment"],
                    properties: {
                      environment: {
                        $ref:
                          "#/components/schemas/istio.mesh.v1alpha1.Tracing.Environment",
                      },
                    },
                  },
                  {
                    required: ["header"],
                    properties: {
                      header: {
                        $ref:
                          "#/components/schemas/istio.mesh.v1alpha1.Tracing.RequestHeader",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["literal"],
              properties: {
                literal: {
                  $ref:
                    "#/components/schemas/istio.mesh.v1alpha1.Tracing.Literal",
                },
              },
            },
            {
              required: ["environment"],
              properties: {
                environment: {
                  $ref:
                    "#/components/schemas/istio.mesh.v1alpha1.Tracing.Environment",
                },
              },
            },
            {
              required: ["header"],
              properties: {
                header: {
                  $ref:
                    "#/components/schemas/istio.mesh.v1alpha1.Tracing.RequestHeader",
                },
              },
            },
          ],
        },
        "istio.mesh.v1alpha1.Tracing.Zipkin": {
          description: "Zipkin defines configuration for a Zipkin tracer.",
          type: "object",
          properties: {
            address: {
              description:
                "Address of the Zipkin service (e.g. _zipkin:9411_).",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.Tracing.Lightstep": {
          description: "Defines configuration for a Lightstep tracer.",
          type: "object",
          properties: {
            address: {
              description: "Address of the Lightstep Satellite pool.",
              type: "string",
              format: "string",
            },
            accessToken: {
              description: "The Lightstep access token.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.Tracing.Datadog": {
          description: "Datadog defines configuration for a Datadog tracer.",
          type: "object",
          properties: {
            address: {
              description: "Address of the Datadog Agent.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.Tracing.Stackdriver": {
          description:
            "Stackdriver defines configuration for a Stackdriver tracer. See [Opencensus trace config](https://github.com/census-instrumentation/opencensus-proto/blob/master/src/opencensus/proto/trace/v1/trace_config.proto) for details.",
          type: "object",
          properties: {
            debug: {
              description:
                "debug enables trace output to stdout. $hide_from_docs",
              type: "boolean",
            },
            maxNumberOfAttributes: {
              description:
                "The global default max number of attributes per span. default is 200. $hide_from_docs",
              type: "integer",
              nullable: true,
            },
            maxNumberOfAnnotations: {
              description:
                "The global default max number of annotation events per span. default is 200. $hide_from_docs",
              type: "integer",
              nullable: true,
            },
            maxNumberOfMessageEvents: {
              description:
                "The global default max number of message events per span. default is 200. $hide_from_docs",
              type: "integer",
              nullable: true,
            },
          },
        },
        "istio.mesh.v1alpha1.Tracing.Literal": {
          description:
            "Literal type represents a static value. $hide_from_docs",
          type: "object",
          properties: {
            value: {
              description:
                "Static literal value used to populate the tag value.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.Tracing.Environment": {
          description:
            "Environment is the proxy's environment variable to be used for populating the custom span tag. $hide_from_docs",
          type: "object",
          properties: {
            name: {
              description:
                "Name of the environment variable used to populate the tag's value",
              type: "string",
              format: "string",
            },
            defaultValue: {
              description:
                "When the environment variable is not found, the tag's value will be populated with this default value if specified, otherwise the tag will not be populated.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.Tracing.RequestHeader": {
          description:
            "RequestHeader is the HTTP request header which will be used to populate the span tag. A default value can be configured if the header does not exist. $hide_from_docs",
          type: "object",
          properties: {
            name: {
              description:
                "HTTP header name used to obtain the value from to populate the tag value.",
              type: "string",
              format: "string",
            },
            defaultValue: {
              description:
                "Default value to be used for the tag when the named HTTP header does not exist. The tag will be skipped if no default value is provided.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.SDS": {
          description:
            "SDS defines secret discovery service(SDS) configuration to be used by the proxy. For workload, its values are set in sidecar injector(passed as arguments to istio-proxy container). For pilot/mixer, it's passed as arguments to istio-proxy container in pilot/mixer deployment yaml files directly.",
          type: "object",
          properties: {
            enabled: {
              description: "True if SDS is enabled.",
              type: "boolean",
            },
            k8sSaJwtPath: {
              description: "Path of k8s service account JWT path.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mesh.v1alpha1.Topology": {
          description:
            "Topology describes the configuration for relative location of a proxy with respect to intermediate trusted proxies and the client. These settings control how the client attributes are retrieved from the incoming traffic by the gateway proxy and propagated to the upstream services in the cluster.",
          type: "object",
          properties: {
            numTrustedProxies: {
              description:
                "Number of trusted proxies deployed in front of the Istio gateway proxy. When this option is set to value N greater than zero, the trusted client address is assumed to be the Nth address from the right end of the X-Forwarded-For (XFF) header from the incoming request. If the X-Forwarded-For (XFF) header is missing or has fewer than N addresses, the gateway proxy falls back to using the immediate downstream connection's source address as the trusted client address. Note that the gateway proxy will append the downstream connection's source address to the X-Forwarded-For (XFF) address and set the X-Envoy-External-Address header to the trusted client address before forwarding it to the upstream services in the cluster. The default value of num_trusted_proxies is 0. See [Envoy XFF] (https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_conn_man/headers#config-http-conn-man-headers-x-forwarded-for) header handling for more details.",
              type: "integer",
            },
            forwardClientCertDetails: {
              $ref:
                "#/components/schemas/istio.mesh.v1alpha1.Topology.ForwardClientCertDetails",
            },
          },
        },
        "istio.mesh.v1alpha1.Topology.ForwardClientCertDetails": {
          description:
            "ForwardClientCertDetails controls how the x-forwarded-client-cert (XFCC) header is handled by the gateway proxy. See [Envoy XFCC](https://www.envoyproxy.io/docs/envoy/latest/api-v2/config/filter/network/http_connection_manager/v2/http_connection_manager.proto#envoy-api-enum-config-filter-network-http-connection-manager-v2-httpconnectionmanager-forwardclientcertdetails) header handling for more details.",
          type: "string",
          enum: [
            "UNDEFINED",
            "SANITIZE",
            "FORWARD_ONLY",
            "APPEND_FORWARD",
            "SANITIZE_SET",
            "ALWAYS_FORWARD_ONLY",
          ],
        },
        "istio.mesh.v1alpha1.ProxyConfig.InboundInterceptionMode": {
          description:
            "The mode used to redirect inbound traffic to Envoy. This setting has no effect on outbound traffic: iptables REDIRECT is always used for outbound connections.",
          type: "string",
          enum: ["REDIRECT", "TPROXY"],
        },
        "istio.mesh.v1alpha1.RemoteService": {
          type: "object",
          properties: {
            tcpKeepalive: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ConnectionPoolSettings.TCPSettings.TcpKeepalive",
            },
            address: {
              description:
                "Address of a remove service used for various purposes (access log receiver, metrics receiver, etc.). Can be IP address or a fully qualified DNS name.",
              type: "string",
              format: "string",
            },
            tlsSettings: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings",
            },
          },
        },
        "istio.networking.v1alpha3.ClientTLSSettings": {
          description:
            "Use the tls_settings to specify the tls mode to use. If the remote service uses Istio mutual TLS and shares the root CA with Pilot, specify the TLS mode as `ISTIO_MUTUAL`.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.networking.v1alpha3.ClientTLSSettings.TLSmode",
            },
            clientCertificate: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client-side TLS certificate to use. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            privateKey: {
              description:
                "REQUIRED if mode is `MUTUAL`. The path to the file holding the client's private key. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            caCertificates: {
              description:
                "OPTIONAL: The path to the file containing certificate authority certificates to use in verifying a presented server certificate. If omitted, the proxy will not verify the server's certificate. Should be empty if mode is `ISTIO_MUTUAL`.",
              type: "string",
              format: "string",
            },
            credentialName: {
              description:
                "The name of the secret that holds the TLS certs for the client including the CA certificates. Applicable only on Kubernetes. Secret must exist in the same namespace with the proxy using the certificates. The secret (of type `generic`)should contain the following keys and values: `key: \u003cprivateKey\u003e`, `cert: \u003cserverCert\u003e`, `cacert: \u003cCACertificate\u003e`. Secret of type tls for client certificates along with ca.crt key for CA certificates is also supported. Only one of client certificates and CA certificate or credentialName can be specified.",
              type: "string",
              format: "string",
            },
            subjectAltNames: {
              description:
                "A list of alternate names to verify the subject identity in the certificate. If specified, the proxy will verify that the server certificate's subject alt name matches one of the specified values. If specified, this list overrides the value of subject_alt_names from the ServiceEntry.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            sni: {
              description:
                "SNI string to present to the server during TLS handshake.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.networking.v1alpha3.ConnectionPoolSettings.TCPSettings.TcpKeepalive": {
          description:
            "If set then set SO_KEEPALIVE on the socket to enable TCP Keepalives.",
          type: "object",
          properties: {
            time: {
              description:
                "The time duration a connection needs to be idle before keep-alive probes start being sent. Default is to use the OS level configuration (unless overridden, Linux defaults to 7200s (ie 2 hours.)",
              type: "string",
            },
            probes: {
              description:
                "Maximum number of keepalive probes to send without response before deciding the connection is dead. Default is to use the OS level configuration (unless overridden, Linux defaults to 9.)",
              type: "integer",
            },
            interval: {
              description:
                "The time duration between keep-alive probes. Default is to use the OS level configuration (unless overridden, Linux defaults to 75s.)",
              type: "string",
            },
          },
        },
        "istio.networking.v1alpha3.LocalityLoadBalancerSetting": {
          description:
            "Locality based load balancing distribution or failover settings.",
          type: "object",
          properties: {
            distribute: {
              description:
                "Optional: only one of distribute or failover can be set. Explicitly specify loadbalancing weight across different zones and geographical locations. Refer to [Locality weighted load balancing](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/locality_weight) If empty, the locality weight is set according to the endpoints number within it.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.LocalityLoadBalancerSetting.Distribute",
              },
            },
            failover: {
              description:
                "Optional: only failover or distribute can be set. Explicitly specify the region traffic will land on when endpoints in local region becomes unhealthy. Should be used together with OutlierDetection to detect unhealthy endpoints. Note: if no OutlierDetection specified, this will not take effect.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.networking.v1alpha3.LocalityLoadBalancerSetting.Failover",
              },
            },
            enabled: {
              description:
                "enable locality load balancing, this is DestinationRule-level and will override mesh wide settings in entirety. e.g. true means that turn on locality load balancing for this DestinationRule no matter what mesh wide settings is.",
              type: "boolean",
              nullable: true,
            },
          },
        },
        "istio.networking.v1alpha3.ClientTLSSettings.TLSmode": {
          description:
            "Indicates whether connections to this port should be secured using TLS. The value of this field determines how TLS is enforced.",
          type: "string",
          enum: ["DISABLE", "SIMPLE", "MUTUAL", "ISTIO_MUTUAL"],
        },
        "istio.networking.v1alpha3.LocalityLoadBalancerSetting.Distribute": {
          type: "object",
          properties: {
            from: {
              description:
                "Originating locality, '/' separated, e.g. 'region/zone/sub_zone'.",
              type: "string",
              format: "string",
            },
            to: {
              description:
                "Map of upstream localities to traffic distribution weights. The sum of all weights should be == 100. Any locality not assigned a weight will receive no traffic.",
              type: "object",
              additionalProperties: {
                type: "integer",
              },
            },
          },
        },
        "istio.networking.v1alpha3.LocalityLoadBalancerSetting.Failover": {
          type: "object",
          properties: {
            from: {
              description: "Originating region.",
              type: "string",
              format: "string",
            },
            to: {
              description:
                "Destination region the traffic will fail over to when endpoints in the 'from' region becomes unhealthy.",
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "",
      version: "v1alpha1",
    },
    components: {
      schemas: {
        "istio.authentication.v1alpha1.StringMatch": {
          description:
            "Describes how to match a given string. Match is case-sensitive.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["exact"],
                    properties: {
                      exact: {
                        description: "exact string match.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["prefix"],
                    properties: {
                      prefix: {
                        description: "prefix-based match.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["suffix"],
                    properties: {
                      suffix: {
                        description: "suffix-based match.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["regex"],
                    properties: {
                      regex: {
                        description:
                          "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["exact"],
              properties: {
                exact: {
                  description: "exact string match.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["prefix"],
              properties: {
                prefix: {
                  description: "prefix-based match.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["suffix"],
              properties: {
                suffix: {
                  description: "suffix-based match.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["regex"],
              properties: {
                regex: {
                  description:
                    "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.authentication.v1alpha1.MutualTls": {
          description:
            "Deprecated. Please use security/v1beta1/PeerAuthentication instead. TLS authentication params.",
          type: "object",
          properties: {
            allowTls: {
              description:
                "Deprecated. Please use mode = PERMISSIVE instead. If set, will translate to `TLS_PERMISSIVE` mode. Set this flag to true to allow regular TLS (i.e without client x509 certificate). If request carries client certificate, identity will be extracted and used (set to peer identity). Otherwise, peer identity will be left unset. When the flag is false (default), request must have client certificate.",
              type: "boolean",
              deprecated: true,
            },
            mode: {
              $ref:
                "#/components/schemas/istio.authentication.v1alpha1.MutualTls.Mode",
            },
          },
        },
        "istio.authentication.v1alpha1.MutualTls.Mode": {
          description: "Defines the acceptable connection TLS mode.",
          type: "string",
          enum: ["STRICT", "PERMISSIVE"],
        },
        "istio.authentication.v1alpha1.Jwt": {
          description:
            "Deprecated. Please use security/v1beta1/RequestAuthentication instead. JSON Web Token (JWT) token format for authentication as defined by [RFC 7519](https://tools.ietf.org/html/rfc7519). See [OAuth 2.0](https://tools.ietf.org/html/rfc6749) and [OIDC 1.0](http://openid.net/connect) for how this is used in the whole authentication flow.",
          type: "object",
          properties: {
            issuer: {
              description:
                "Identifies the issuer that issued the JWT. See [issuer](https://tools.ietf.org/html/rfc7519#section-4.1.1) Usually a URL or an email address.",
              type: "string",
              format: "string",
            },
            audiences: {
              description:
                "The list of JWT [audiences](https://tools.ietf.org/html/rfc7519#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            jwksUri: {
              description:
                "URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).",
              type: "string",
              format: "string",
            },
            jwks: {
              description:
                "JSON Web Key Set of public keys to validate signature of the JWT. See https://auth0.com/docs/jwks.",
              type: "string",
              format: "string",
            },
            jwtHeaders: {
              description:
                "JWT is sent in a request header. `header` represents the header name.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            jwtParams: {
              description:
                "JWT is sent in a query parameter. `query` represents the query parameter name.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            triggerRules: {
              description:
                "List of trigger rules to decide if this JWT should be used to validate the request. The JWT validation happens if any one of the rules matched. If the list is not empty and none of the rules matched, authentication will skip the JWT validation. Leave this empty to always trigger the JWT validation.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.authentication.v1alpha1.Jwt.TriggerRule",
              },
            },
          },
        },
        "istio.authentication.v1alpha1.Jwt.TriggerRule": {
          description:
            "Trigger rule to match against a request. The trigger rule is satisfied if and only if both rules, excluded_paths and include_paths are satisfied.",
          type: "object",
          properties: {
            excludedPaths: {
              description:
                "List of paths to be excluded from the request. The rule is satisfied if request path does not match to any of the path in this list.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.authentication.v1alpha1.StringMatch",
              },
            },
            includedPaths: {
              description:
                "List of paths that the request must include. If the list is not empty, the rule is satisfied if request path matches at least one of the path in the list. If the list is empty, the rule is ignored, in other words the rule is always satisfied.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.authentication.v1alpha1.StringMatch",
              },
            },
          },
        },
        "istio.authentication.v1alpha1.PeerAuthenticationMethod": {
          description:
            'Deprecated. Please use security/v1beta1/PeerAuthentication instead. PeerAuthenticationMethod defines one particular type of authentication. Only mTLS is supported at the moment. The type can be progammatically determine by checking the type of the "params" field.',
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["mtls"],
                    properties: {
                      mtls: {
                        $ref:
                          "#/components/schemas/istio.authentication.v1alpha1.MutualTls",
                      },
                    },
                  },
                  {
                    required: ["jwt"],
                    properties: {
                      jwt: {
                        $ref:
                          "#/components/schemas/istio.authentication.v1alpha1.Jwt",
                        deprecated: true,
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["mtls"],
              properties: {
                mtls: {
                  $ref:
                    "#/components/schemas/istio.authentication.v1alpha1.MutualTls",
                },
              },
            },
            {
              required: ["jwt"],
              properties: {
                jwt: {
                  $ref:
                    "#/components/schemas/istio.authentication.v1alpha1.Jwt",
                  deprecated: true,
                },
              },
            },
          ],
        },
        "istio.authentication.v1alpha1.OriginAuthenticationMethod": {
          description:
            "Deprecated. Please use security/v1beta1/RequestAuthentication instead. OriginAuthenticationMethod defines authentication method/params for origin authentication. Origin could be end-user, device, delegate service etc. Currently, only JWT is supported for origin authentication.",
          type: "object",
          properties: {
            jwt: {
              $ref: "#/components/schemas/istio.authentication.v1alpha1.Jwt",
            },
          },
        },
        "istio.authentication.v1alpha1.PrincipalBinding": {
          description:
            "Deprecated. When using security/v1beta1/RequestAuthentication, the request principal always comes from request authentication (i.e JWT). Associates authentication with request principal.",
          type: "string",
          enum: ["USE_PEER", "USE_ORIGIN"],
        },
        "istio.authentication.v1alpha1.Policy": {
          description:
            "Policy defines what authentication methods can be accepted on workload(s), and if authenticated, which method/certificate will set the request principal (i.e request.auth.principal attribute).",
          type: "object",
          properties: {
            targets: {
              description:
                "Deprecated. Only mesh-level and namespace-level policies are supported. List rules to select workloads that the policy should be applied on. If empty, policy will be used on all workloads in the same namespace.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.authentication.v1alpha1.TargetSelector",
              },
              deprecated: true,
            },
            peers: {
              description:
                "Deprecated. Please use security/v1beta1/PeerAuthentication instead. List of authentication methods that can be used for peer authentication. They will be evaluated in order; the first validate one will be used to set peer identity (source.user) and other peer attributes. If none of these methods pass, request will be rejected with authentication failed error (401). Leave the list empty if peer authentication is not required",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.authentication.v1alpha1.PeerAuthenticationMethod",
              },
            },
            peerIsOptional: {
              description:
                "Deprecated. Should set mTLS to PERMISSIVE instead. Set this flag to true to accept request (for peer authentication perspective), even when none of the peer authentication methods defined above satisfied. Typically, this is used to delay the rejection decision to next layer (e.g authorization). This flag is ignored if no authentication defined for peer (peers field is empty).",
              type: "boolean",
              deprecated: true,
            },
            origins: {
              description:
                "Deprecated. Please use security/v1beta1/RequestAuthentication instead. List of authentication methods that can be used for origin authentication. Similar to peers, these will be evaluated in order; the first validate one will be used to set origin identity and attributes (i.e request.auth.user, request.auth.issuer etc). If none of these methods pass, request will be rejected with authentication failed error (401). A method may be skipped, depends on its trigger rule. If all of these methods are skipped, origin authentication will be ignored, as if it is not defined. Leave the list empty if origin authentication is not required.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.authentication.v1alpha1.OriginAuthenticationMethod",
              },
              deprecated: true,
            },
            originIsOptional: {
              description:
                "Deprecated. Please use security/v1beta1/RequestAuthentication instead. Set this flag to true to accept request (for origin authentication perspective), even when none of the origin authentication methods defined above satisfied. Typically, this is used to delay the rejection decision to next layer (e.g authorization). This flag is ignored if no authentication defined for origin (origins field is empty).",
              type: "boolean",
              deprecated: true,
            },
            principalBinding: {
              $ref:
                "#/components/schemas/istio.authentication.v1alpha1.PrincipalBinding",
              deprecated: true,
            },
          },
        },
        "istio.authentication.v1alpha1.TargetSelector": {
          description:
            "Deprecated. Only support mesh and namespace level policy in the future. TargetSelector defines a matching rule to a workload. A workload is selected if it is associated with the service name and service port(s) specified in the selector rule.",
          type: "object",
          properties: {
            name: {
              description:
                "The name must be a short name from the service registry. The fully qualified domain name will be resolved in a platform specific manner.",
              type: "string",
              format: "string",
            },
            ports: {
              description:
                "Specifies the ports. Note that this is the port(s) exposed by the service, not workload instance ports. For example, if a service is defined as below, then `8000` should be used, not `9000`. ```yaml kind: Service metadata: ... spec: ports: - name: http port: 8000 targetPort: 9000 selector: app: backend ``` Leave empty to match all ports that are exposed.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.authentication.v1alpha1.PortSelector",
              },
            },
          },
        },
        "istio.authentication.v1alpha1.PortSelector": {
          description:
            "Deprecated. Only support mesh and namespace level policy in the future. PortSelector specifies the name or number of a port to be used for matching targets for authentication policy. This is copied from networking API to avoid dependency.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["number"],
                    properties: {
                      number: {
                        description: "Valid port number",
                        type: "integer",
                      },
                    },
                  },
                  {
                    required: ["name"],
                    properties: {
                      name: {
                        description: "Port name",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["number"],
              properties: {
                number: {
                  description: "Valid port number",
                  type: "integer",
                },
              },
            },
            {
              required: ["name"],
              properties: {
                name: {
                  description: "Port name",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title:
        "Describes the rules used to configure Mixer's policy and telemetry features.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.policy.v1beta1.Duration": {
          description:
            "An instance field of type Duration denotes that the expression for the field must evaluate to [ValueType.DURATION][istio.policy.v1beta1.ValueType.DURATION]",
          type: "object",
          properties: {
            value: {
              description: "Duration encoded as google.protobuf.Duration.",
              type: "string",
            },
          },
        },
        "istio.policy.v1beta1.Value": {
          description:
            'An instance field of type Value denotes that the expression for the field is of dynamic type and can evaluate to any [ValueType][istio.policy.v1beta1.ValueType] enum values. For example, when authoring an instance configuration for a template that has a field `data` of type `istio.policy.v1beta1.Value`, both of the following expressions are valid `data: source.ip | ip("0.0.0.0")`, `data: request.id | ""`; the resulting type is either ValueType.IP_ADDRESS or ValueType.STRING for the two cases respectively.',
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["stringValue"],
                    properties: {
                      stringValue: {
                        description: "Used for values of type STRING",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["int64Value"],
                    properties: {
                      int64Value: {
                        description: "Used for values of type INT64",
                        type: "integer",
                        format: "int64",
                      },
                    },
                  },
                  {
                    required: ["doubleValue"],
                    properties: {
                      doubleValue: {
                        description: "Used for values of type DOUBLE",
                        type: "number",
                        format: "double",
                      },
                    },
                  },
                  {
                    required: ["boolValue"],
                    properties: {
                      boolValue: {
                        description: "Used for values of type BOOL",
                        type: "boolean",
                      },
                    },
                  },
                  {
                    required: ["ipAddressValue"],
                    properties: {
                      ipAddressValue: {
                        $ref:
                          "#/components/schemas/istio.policy.v1beta1.IPAddress",
                      },
                    },
                  },
                  {
                    required: ["timestampValue"],
                    properties: {
                      timestampValue: {
                        $ref:
                          "#/components/schemas/istio.policy.v1beta1.TimeStamp",
                      },
                    },
                  },
                  {
                    required: ["durationValue"],
                    properties: {
                      durationValue: {
                        $ref:
                          "#/components/schemas/istio.policy.v1beta1.Duration",
                      },
                    },
                  },
                  {
                    required: ["emailAddressValue"],
                    properties: {
                      emailAddressValue: {
                        $ref:
                          "#/components/schemas/istio.policy.v1beta1.EmailAddress",
                      },
                    },
                  },
                  {
                    required: ["dnsNameValue"],
                    properties: {
                      dnsNameValue: {
                        $ref:
                          "#/components/schemas/istio.policy.v1beta1.DNSName",
                      },
                    },
                  },
                  {
                    required: ["uriValue"],
                    properties: {
                      uriValue: {
                        $ref: "#/components/schemas/istio.policy.v1beta1.Uri",
                      },
                    },
                  },
                  {
                    required: ["stringMapValue"],
                    properties: {
                      stringMapValue: {
                        $ref:
                          "#/components/schemas/istio.policy.v1beta1.StringMap",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["stringValue"],
              properties: {
                stringValue: {
                  description: "Used for values of type STRING",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["int64Value"],
              properties: {
                int64Value: {
                  description: "Used for values of type INT64",
                  type: "integer",
                  format: "int64",
                },
              },
            },
            {
              required: ["doubleValue"],
              properties: {
                doubleValue: {
                  description: "Used for values of type DOUBLE",
                  type: "number",
                  format: "double",
                },
              },
            },
            {
              required: ["boolValue"],
              properties: {
                boolValue: {
                  description: "Used for values of type BOOL",
                  type: "boolean",
                },
              },
            },
            {
              required: ["ipAddressValue"],
              properties: {
                ipAddressValue: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.IPAddress",
                },
              },
            },
            {
              required: ["timestampValue"],
              properties: {
                timestampValue: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.TimeStamp",
                },
              },
            },
            {
              required: ["durationValue"],
              properties: {
                durationValue: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.Duration",
                },
              },
            },
            {
              required: ["emailAddressValue"],
              properties: {
                emailAddressValue: {
                  $ref:
                    "#/components/schemas/istio.policy.v1beta1.EmailAddress",
                },
              },
            },
            {
              required: ["dnsNameValue"],
              properties: {
                dnsNameValue: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.DNSName",
                },
              },
            },
            {
              required: ["uriValue"],
              properties: {
                uriValue: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.Uri",
                },
              },
            },
            {
              required: ["stringMapValue"],
              properties: {
                stringMapValue: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.StringMap",
                },
              },
            },
          ],
        },
        "istio.policy.v1beta1.AttributeManifest": {
          description:
            "AttributeManifest describes a set of Attributes produced by some component of an Istio deployment.",
          type: "object",
          properties: {
            name: {
              description:
                "Name of the component producing these attributes. This can be the proxy (with the canonical name `istio-proxy`) or the name of an `attributes` kind adapter in Mixer.",
              type: "string",
              format: "string",
            },
            revision: {
              description: "The revision of this document. Assigned by server.",
              type: "string",
              format: "string",
            },
            attributes: {
              description:
                "The set of attributes this Istio component will be responsible for producing at runtime. We map from attribute name to the attribute's specification. The name of an attribute, which is how attributes are referred to in aspect configuration, must conform to: Name = IDENT { SEPARATOR IDENT };",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.policy.v1beta1.AttributeManifest.AttributeInfo",
              },
            },
          },
        },
        "istio.policy.v1beta1.AttributeManifest.AttributeInfo": {
          description:
            "AttributeInfo describes the schema of an Istio `Attribute`.",
          type: "object",
          properties: {
            description: {
              description:
                "A human-readable description of the attribute's purpose.",
              type: "string",
              format: "string",
            },
            valueType: {
              $ref: "#/components/schemas/istio.policy.v1beta1.ValueType",
            },
          },
        },
        "istio.policy.v1beta1.ValueType": {
          description:
            "ValueType describes the types that values in the Istio system can take. These are used to describe the type of Attributes at run time, describe the type of the result of evaluating an expression, and to describe the runtime type of fields of other descriptors.",
          type: "string",
          enum: [
            "VALUE_TYPE_UNSPECIFIED",
            "STRING",
            "INT64",
            "DOUBLE",
            "BOOL",
            "TIMESTAMP",
            "IP_ADDRESS",
            "EMAIL_ADDRESS",
            "URI",
            "DNS_NAME",
            "DURATION",
            "STRING_MAP",
          ],
        },
        "istio.policy.v1beta1.Rule": {
          description:
            "A Rule is a selector and a set of intentions to be executed when the selector is `true`",
          type: "object",
          properties: {
            match: {
              description:
                "Match is an attribute based predicate. When Mixer receives a request it evaluates the match expression and executes all the associated `actions` if the match evaluates to true.",
              type: "string",
              format: "string",
            },
            actions: {
              description:
                "The actions that will be executed when match evaluates to `true`.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.policy.v1beta1.Action",
              },
            },
            requestHeaderOperations: {
              description:
                "Templatized operations on the request headers using values produced by the rule actions. Require the check action result to be OK.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.policy.v1beta1.Rule.HeaderOperationTemplate",
              },
            },
            responseHeaderOperations: {
              description:
                "Templatized operations on the response headers using values produced by the rule actions. Require the check action result to be OK.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.policy.v1beta1.Rule.HeaderOperationTemplate",
              },
            },
            sampling: {
              $ref: "#/components/schemas/istio.policy.v1beta1.Sampling",
            },
          },
        },
        "istio.policy.v1beta1.Action": {
          description:
            "Action describes which [Handler][istio.policy.v1beta1.Handler] to invoke and what data to pass to it for processing.",
          type: "object",
          properties: {
            name: {
              description: "A handle to refer to the results of the action.",
              type: "string",
              format: "string",
            },
            handler: {
              description:
                "Fully qualified name of the handler to invoke. Must match the `name` of a [Handler][istio.policy.v1beta1.Handler.name].",
              type: "string",
              format: "string",
            },
            instances: {
              description:
                "Each value must match the fully qualified name of the [Instance][istio.policy.v1beta1.Instance.name]s. Referenced instances are evaluated by resolving the attributes/literals for all the fields. The constructed objects are then passed to the `handler` referenced within this action.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.policy.v1beta1.Rule.HeaderOperationTemplate": {
          description:
            "A template for an HTTP header manipulation. Values in the template are expressions that may reference action outputs by name. For example, if an action `x` produces an output with a field `f`, then the header value expressions may use attribute `x.output.f` to reference the field value: ```yaml request_header_operations: - name: x-istio-header values: - x.output.f ```",
          type: "object",
          properties: {
            name: {
              description: "Header name literal value.",
              type: "string",
              format: "string",
            },
            values: {
              description: "Header value expressions.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            operation: {
              $ref:
                "#/components/schemas/istio.policy.v1beta1.Rule.HeaderOperationTemplate.Operation",
            },
          },
        },
        "istio.policy.v1beta1.Sampling": {
          description:
            "Sampling provides configuration of sampling strategies for Rule actions. Multiple sampling strategies are supported. When multiple strategies are configured, a request must be selected by all configured sampling strategies.",
          type: "object",
          properties: {
            random: {
              $ref: "#/components/schemas/istio.policy.v1beta1.RandomSampling",
            },
            rateLimit: {
              $ref:
                "#/components/schemas/istio.policy.v1beta1.RateLimitSampling",
            },
          },
        },
        "istio.policy.v1beta1.Rule.HeaderOperationTemplate.Operation": {
          description: "Header operation type.",
          type: "string",
          enum: ["REPLACE", "REMOVE", "APPEND"],
        },
        "istio.policy.v1beta1.Instance": {
          description:
            "An Instance tells Mixer how to create instances for particular template.",
          type: "object",
          properties: {
            name: {
              description: "The name of this instance",
              type: "string",
              format: "string",
            },
            compiledTemplate: {
              description:
                "The name of the compiled in template this instance creates instances for. For referencing non compiled-in templates, use the `template` field instead.",
              type: "string",
              format: "string",
            },
            template: {
              description:
                "The name of the template this instance creates instances for. For referencing compiled-in templates, use the `compiled_template` field instead.",
              type: "string",
              format: "string",
            },
            params: {
              description:
                "Depends on referenced template. Struct representation of a proto defined by the template; this varies depending on the value of field `template`.",
              type: "object",
            },
            attributeBindings: {
              description:
                'Defines attribute bindings to map the output of attribute-producing adapters back into the attribute space. The variable `output` refers to the output template instance produced by the adapter. The following example derives `source.namespace` from `source.uid` in the context of Kubernetes: ```yaml params: # Pass the required attribute data to the adapter source_uid: source.uid | "" attribute_bindings: # Fill the new attributes from the adapter produced output source.namespace: output.source_namespace ```',
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.policy.v1beta1.Handler": {
          description:
            "Handler allows the operator to configure a specific adapter implementation. Each adapter implementation defines its own `params` proto.",
          type: "object",
          properties: {
            name: {
              description:
                "Must be unique in the entire Mixer configuration. Used by [Actions][istio.policy.v1beta1.Action.handler] to refer to this handler.",
              type: "string",
              format: "string",
            },
            params: {
              description:
                "Depends on adapter implementation. Struct representation of a proto defined by the adapter implementation; this varies depending on the value of field `adapter`.",
              type: "object",
            },
            compiledAdapter: {
              description:
                "The name of the compiled in adapter this handler instantiates. For referencing non compiled-in adapters, use the `adapter` field instead.",
              type: "string",
              format: "string",
            },
            adapter: {
              description:
                "The name of a specific adapter implementation. For referencing compiled-in adapters, use the `compiled_adapter` field instead.",
              type: "string",
              format: "string",
            },
            connection: {
              $ref: "#/components/schemas/istio.policy.v1beta1.Connection",
            },
          },
        },
        "istio.policy.v1beta1.Connection": {
          description:
            "Connection allows the operator to specify the endpoint for out-of-process infrastructure backend. Connection is part of the handler custom resource and is specified alongside adapter specific configuration.",
          type: "object",
          properties: {
            address: {
              description: "The address of the backend.",
              type: "string",
              format: "string",
            },
            timeout: {
              description: "Timeout for remote calls to the backend.",
              type: "string",
            },
            authentication: {
              $ref: "#/components/schemas/istio.policy.v1beta1.Authentication",
            },
          },
        },
        "istio.policy.v1beta1.Authentication": {
          description:
            "Authentication allows the operator to specify the authentication of connections to out-of-process infrastructure backend.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["tls"],
                    properties: {
                      tls: {
                        $ref: "#/components/schemas/istio.policy.v1beta1.Tls",
                      },
                    },
                  },
                  {
                    required: ["mutual"],
                    properties: {
                      mutual: {
                        $ref:
                          "#/components/schemas/istio.policy.v1beta1.Mutual",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["tls"],
              properties: {
                tls: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.Tls",
                },
              },
            },
            {
              required: ["mutual"],
              properties: {
                mutual: {
                  $ref: "#/components/schemas/istio.policy.v1beta1.Mutual",
                },
              },
            },
          ],
        },
        "istio.policy.v1beta1.RandomSampling": {
          description:
            "RandomSampling will filter based on the comparison of a randomly-generated value against the threshold provided.",
          type: "object",
          properties: {
            attributeExpression: {
              description:
                "Specifies an attribute expression to use to override the numerator in the `percent_sampled` field. If this value is set, but no value is found OR if that value is not a numeric value, then the derived sampling rate will be 0 (meaning no `Action`s are executed for a `Rule`).",
              type: "string",
              format: "string",
            },
            percentSampled: {
              $ref:
                "#/components/schemas/istio.policy.v1beta1.FractionalPercent",
            },
            useIndependentRandomness: {
              description:
                "By default sampling will be based on the value of the request header `x-request-id`. This behavior will cause consistent sampling across `Rule`s and for the full trace of a request through a mesh (across hosts). If that value is not present and/or `use_independent_randomness` is set to true, the sampling will be done based on the value of attribute specified in `attribute_epxression`. If that attribute does not exist, the system will behave as if the sampling rate was 0 (meaning no `Action`s are executed for a `Rule`).",
              type: "boolean",
            },
          },
        },
        "istio.policy.v1beta1.RateLimitSampling": {
          description:
            "RateLimitSampling provides the ability to limit the number of Rule action executions that occur over a period of time.",
          type: "object",
          properties: {
            samplingDuration: {
              description: "Window in which to enforce the sampling rate.",
              type: "string",
            },
            maxUnsampledEntries: {
              description:
                "Number of entries to allow during the `sampling_duration` before sampling is enforced.",
              type: "integer",
              format: "int64",
            },
            samplingRate: {
              description:
                "The rate at which to sample entries once the unsampled limit has been reached. Sampling will be enforced as 1 per every `sampling_rate` entries allowed.",
              type: "integer",
              format: "int64",
            },
          },
        },
        "istio.policy.v1beta1.FractionalPercent": {
          description:
            "A fractional percentage is used in cases in which for performance reasons performing floating point to integer conversions during randomness calculations is undesirable. The message includes both a numerator and denominator that together determine the final fractional value.",
          type: "object",
          properties: {
            numerator: {
              description: "Specifies the numerator. Defaults to 0.",
              type: "integer",
            },
            denominator: {
              $ref:
                "#/components/schemas/istio.policy.v1beta1.FractionalPercent.DenominatorType",
            },
          },
        },
        "istio.policy.v1beta1.FractionalPercent.DenominatorType": {
          description:
            "Fraction percentages support several fixed denominator values.",
          type: "string",
          enum: ["HUNDRED", "TEN_THOUSAND"],
        },
        "istio.policy.v1beta1.Tls": {
          description:
            "Tls let operator specify client authentication setting when TLS is used for connection to the backend.",
          type: "object",
          properties: {
            caCertificates: {
              description:
                "The path to the file holding additional CA certificates to well known public certs.",
              type: "string",
              format: "string",
            },
            serverName: {
              description:
                "Used to configure mixer TLS client to verify the hostname on the returned certificates. It is also included in the client's handshake to support SNI.",
              type: "string",
              format: "string",
            },
          },
          allOf: [
            {
              oneOf: [
                {
                  not: {
                    anyOf: [
                      {
                        required: ["tokenPath"],
                        properties: {
                          tokenPath: {
                            description:
                              "The path to the file holding the auth token (password, jwt token, api key, etc).",
                            type: "string",
                            format: "string",
                          },
                        },
                      },
                      {
                        required: ["oauth"],
                        properties: {
                          oauth: {
                            $ref:
                              "#/components/schemas/istio.policy.v1beta1.OAuth",
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  required: ["tokenPath"],
                  properties: {
                    tokenPath: {
                      description:
                        "The path to the file holding the auth token (password, jwt token, api key, etc).",
                      type: "string",
                      format: "string",
                    },
                  },
                },
                {
                  required: ["oauth"],
                  properties: {
                    oauth: {
                      $ref: "#/components/schemas/istio.policy.v1beta1.OAuth",
                    },
                  },
                },
              ],
            },
            {
              oneOf: [
                {
                  not: {
                    anyOf: [
                      {
                        required: ["authHeader"],
                        properties: {
                          authHeader: {
                            $ref:
                              "#/components/schemas/istio.policy.v1beta1.Tls.AuthHeader",
                          },
                        },
                      },
                      {
                        required: ["customHeader"],
                        properties: {
                          customHeader: {
                            description:
                              "Customized header key to hold access token, e.g. x-api-key. Token will be passed as what it is.",
                            type: "string",
                            format: "string",
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  required: ["authHeader"],
                  properties: {
                    authHeader: {
                      $ref:
                        "#/components/schemas/istio.policy.v1beta1.Tls.AuthHeader",
                    },
                  },
                },
                {
                  required: ["customHeader"],
                  properties: {
                    customHeader: {
                      description:
                        "Customized header key to hold access token, e.g. x-api-key. Token will be passed as what it is.",
                      type: "string",
                      format: "string",
                    },
                  },
                },
              ],
            },
          ],
        },
        "istio.policy.v1beta1.Mutual": {
          description:
            "Mutual let operator specify TLS configuration for Mixer as client if mutual TLS is used to secure connection to adapter backend.",
          type: "object",
          properties: {
            caCertificates: {
              description:
                "The path to the file holding additional CA certificates that are needed to verify the presented adapter certificates. By default Mixer should already include Istio CA certificates and system certificates in cert pool.",
              type: "string",
              format: "string",
            },
            serverName: {
              description:
                "Used to configure mixer mutual TLS client to supply server name for SNI. It is not used to verify the hostname of the peer certificate, since Istio verifies whitelisted SAN fields in mutual TLS.",
              type: "string",
              format: "string",
            },
            privateKey: {
              description:
                "The path to the file holding the private key for mutual TLS. If omitted, the default Mixer private key will be used.",
              type: "string",
              format: "string",
            },
            clientCertificate: {
              description:
                "The path to the file holding client certificate for mutual TLS. If omitted, the default Mixer certificates will be used.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.policy.v1beta1.OAuth": {
          description:
            "OAuth let operator specify config to fetch access token via oauth when using TLS for connection to the backend.",
          type: "object",
          properties: {
            clientId: {
              description: "OAuth client id for mixer.",
              type: "string",
              format: "string",
            },
            clientSecret: {
              description:
                "The path to the file holding the client secret for oauth.",
              type: "string",
              format: "string",
            },
            tokenUrl: {
              description: "The Resource server's token endpoint URL.",
              type: "string",
              format: "string",
            },
            scopes: {
              description: "List of requested permissions.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            endpointParams: {
              description:
                "Additional parameters for requests to the token endpoint.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.policy.v1beta1.Tls.AuthHeader": {
          description:
            "AuthHeader specifies how to pass access token with authorization header.",
          type: "string",
          enum: ["PLAIN", "BEARER"],
        },
        "istio.policy.v1beta1.DirectHttpResponse": {
          description:
            "Direct HTTP response for a client-facing error message which can be attached to an RPC error.",
          type: "object",
          properties: {
            body: {
              description: "HTTP response body.",
              type: "string",
              format: "string",
            },
            code: {
              $ref: "#/components/schemas/istio.policy.v1beta1.HttpStatusCode",
            },
            headers: {
              description: "HTTP response headers.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.policy.v1beta1.HttpStatusCode": {
          description:
            "HTTP response codes. For more details: http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml",
          type: "string",
          enum: [
            "Empty",
            "Continue",
            "OK",
            "Created",
            "Accepted",
            "NonAuthoritativeInformation",
            "NoContent",
            "ResetContent",
            "PartialContent",
            "MultiStatus",
            "AlreadyReported",
            "IMUsed",
            "MultipleChoices",
            "MovedPermanently",
            "Found",
            "SeeOther",
            "NotModified",
            "UseProxy",
            "TemporaryRedirect",
            "PermanentRedirect",
            "BadRequest",
            "Unauthorized",
            "PaymentRequired",
            "Forbidden",
            "NotFound",
            "MethodNotAllowed",
            "NotAcceptable",
            "ProxyAuthenticationRequired",
            "RequestTimeout",
            "Conflict",
            "Gone",
            "LengthRequired",
            "PreconditionFailed",
            "PayloadTooLarge",
            "URITooLong",
            "UnsupportedMediaType",
            "RangeNotSatisfiable",
            "ExpectationFailed",
            "MisdirectedRequest",
            "UnprocessableEntity",
            "Locked",
            "FailedDependency",
            "UpgradeRequired",
            "PreconditionRequired",
            "TooManyRequests",
            "RequestHeaderFieldsTooLarge",
            "InternalServerError",
            "NotImplemented",
            "BadGateway",
            "ServiceUnavailable",
            "GatewayTimeout",
            "HTTPVersionNotSupported",
            "VariantAlsoNegotiates",
            "InsufficientStorage",
            "LoopDetected",
            "NotExtended",
            "NetworkAuthenticationRequired",
          ],
        },
        "istio.policy.v1beta1.IPAddress": {
          description:
            "An instance field of type IPAddress denotes that the expression for the field must evaluate to [ValueType.IP_ADDRESS][istio.policy.v1beta1.ValueType.IP_ADDRESS]",
          type: "object",
          properties: {
            value: {
              description: "IPAddress encoded as bytes.",
              type: "string",
              format: "binary",
            },
          },
        },
        "istio.policy.v1beta1.TimeStamp": {
          description:
            "An instance field of type TimeStamp denotes that the expression for the field must evaluate to [ValueType.TIMESTAMP][istio.policy.v1beta1.ValueType.TIMESTAMP]",
          type: "object",
          properties: {
            value: {
              description: "TimeStamp encoded as google.protobuf.Timestamp.",
              type: "string",
              format: "dateTime",
            },
          },
        },
        "istio.policy.v1beta1.EmailAddress": {
          description:
            "DO NOT USE !! Under Development An instance field of type EmailAddress denotes that the expression for the field must evaluate to [ValueType.EMAIL_ADDRESS][istio.policy.v1beta1.ValueType.EMAIL_ADDRESS]",
          type: "object",
          properties: {
            value: {
              description: "EmailAddress encoded as string.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.policy.v1beta1.DNSName": {
          description:
            "An instance field of type DNSName denotes that the expression for the field must evaluate to [ValueType.DNS_NAME][istio.policy.v1beta1.ValueType.DNS_NAME]",
          type: "object",
          properties: {
            value: {
              description: "DNSName encoded as string.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.policy.v1beta1.Uri": {
          description:
            "DO NOT USE !! Under Development An instance field of type Uri denotes that the expression for the field must evaluate to [ValueType.URI][istio.policy.v1beta1.ValueType.URI]",
          type: "object",
          properties: {
            value: {
              description: "Uri encoded as string.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.policy.v1beta1.StringMap": {
          description:
            "An instance field of type StringMap denotes that the expression for the field must evaluate to [ValueType.STRING_MAP][istio.policy.v1beta1.ValueType.STRING_MAP]",
          type: "object",
          properties: {
            value: {
              description: "StringMap encoded as a map of strings",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration for access control on workloads.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.security.v1beta1.AuthorizationPolicy": {
          description:
            "AuthorizationPolicy enables access control on workloads.",
          type: "object",
          properties: {
            selector: {
              $ref: "#/components/schemas/istio.type.v1beta1.WorkloadSelector",
            },
            rules: {
              description:
                "Optional. A list of rules to match the request. A match occurs when at least one rule matches the request.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.security.v1beta1.Rule",
              },
            },
            action: {
              $ref:
                "#/components/schemas/istio.security.v1beta1.AuthorizationPolicy.Action",
            },
          },
        },
        "istio.security.v1beta1.Rule": {
          description:
            "Rule matches requests from a list of sources that perform a list of operations subject to a list of conditions. A match occurs when at least one source, operation and condition matches the request. An empty rule is always matched.",
          type: "object",
          properties: {
            from: {
              description: "Optional. from specifies the source of a request.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.security.v1beta1.Rule.From",
              },
            },
            to: {
              description: "Optional. to specifies the operation of a request.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.security.v1beta1.Rule.To",
              },
            },
            when: {
              description:
                "Optional. when specifies a list of additional conditions of a request.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.security.v1beta1.Condition",
              },
            },
          },
        },
        "istio.security.v1beta1.AuthorizationPolicy.Action": {
          description: "Action specifies the operation to take.",
          type: "string",
          enum: ["ALLOW", "DENY"],
        },
        "istio.security.v1beta1.Rule.From": {
          description: "From includes a list or sources.",
          type: "object",
          properties: {
            source: {
              $ref: "#/components/schemas/istio.security.v1beta1.Source",
            },
          },
        },
        "istio.security.v1beta1.Rule.To": {
          description: "To includes a list or operations.",
          type: "object",
          properties: {
            operation: {
              $ref: "#/components/schemas/istio.security.v1beta1.Operation",
            },
          },
        },
        "istio.security.v1beta1.Condition": {
          description: "Condition specifies additional required attributes.",
          type: "object",
          properties: {
            key: {
              description:
                "The name of an Istio attribute. See the [full list of supported attributes](https://istio.io/docs/reference/config/security/conditions/).",
              type: "string",
              format: "string",
            },
            values: {
              description:
                "Optional. A list of allowed values for the attribute. Note: at least one of values or not_values must be set.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notValues: {
              description:
                "Optional. A list of negative match of values for the attribute. Note: at least one of values or not_values must be set.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.security.v1beta1.Source": {
          description:
            "Source specifies the source identities of a request. Fields in the source are ANDed together.",
          type: "object",
          properties: {
            principals: {
              description:
                'Optional. A list of source peer identities (i.e. service account), which matches to the "source.principal" attribute. This field requires mTLS enabled.',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notPrincipals: {
              description:
                "Optional. A list of negative match of source peer identities.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            requestPrincipals: {
              description:
                'Optional. A list of request identities (i.e. "iss/sub" claims), which matches to the "request.auth.principal" attribute.',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notRequestPrincipals: {
              description:
                "Optional. A list of negative match of request identities.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            namespaces: {
              description:
                'Optional. A list of namespaces, which matches to the "source.namespace" attribute. This field requires mTLS enabled.',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notNamespaces: {
              description: "Optional. A list of negative match of namespaces.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            ipBlocks: {
              description:
                'Optional. A list of IP blocks, which matches to the "source.ip" attribute. Single IP (e.g. "1.2.3.4") and CIDR (e.g. "1.2.3.0/24") are supported.',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notIpBlocks: {
              description: "Optional. A list of negative match of IP blocks.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.security.v1beta1.Operation": {
          description:
            "Operation specifies the operations of a request. Fields in the operation are ANDed together.",
          type: "object",
          properties: {
            hosts: {
              description:
                'Optional. A list of hosts, which matches to the "request.host" attribute.',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notHosts: {
              description: "Optional. A list of negative match of hosts.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            ports: {
              description:
                'Optional. A list of ports, which matches to the "destination.port" attribute.',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notPorts: {
              description: "Optional. A list of negative match of ports.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            methods: {
              description:
                'Optional. A list of methods, which matches to the "request.method" attribute. For gRPC service, this will always be "POST".',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notMethods: {
              description: "Optional. A list of negative match of methods.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            paths: {
              description:
                'Optional. A list of paths, which matches to the "request.url_path" attribute. For gRPC service, this will be the fully-qualified name in the form of "/package.service/method".',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            notPaths: {
              description: "Optional. A list of negative match of paths.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.type.v1beta1.WorkloadSelector": {
          description:
            "The selector determines the workloads to apply the RequestAuthentication on. If not set, the policy will be applied to all workloads in the same namespace as the policy.",
          type: "object",
          properties: {
            matchLabels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which a policy should be applied. The scope of label search is restricted to the configuration namespace in which the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration to validate JWT.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.security.v1beta1.JWTRule": {
          description:
            "JSON Web Token (JWT) token format for authentication as defined by [RFC 7519](https://tools.ietf.org/html/rfc7519). See [OAuth 2.0](https://tools.ietf.org/html/rfc6749) and [OIDC 1.0](http://openid.net/connect) for how this is used in the whole authentication flow.",
          type: "object",
          properties: {
            issuer: {
              description:
                "Identifies the issuer that issued the JWT. See [issuer](https://tools.ietf.org/html/rfc7519#section-4.1.1) A JWT with different `iss` claim will be rejected.",
              type: "string",
              format: "string",
            },
            audiences: {
              description:
                "The list of JWT [audiences](https://tools.ietf.org/html/rfc7519#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            jwksUri: {
              description:
                "URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).",
              type: "string",
              format: "string",
            },
            jwks: {
              description:
                "JSON Web Key Set of public keys to validate signature of the JWT. See https://auth0.com/docs/jwks.",
              type: "string",
              format: "string",
            },
            fromHeaders: {
              description:
                'List of header locations from which JWT is expected. For example, below is the location spec if JWT is expected to be found in `x-jwt-assertion` header, and have "Bearer " prefix: ``` fromHeaders: - name: x-jwt-assertion prefix: "Bearer " ```',
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.security.v1beta1.JWTHeader",
              },
            },
            fromParams: {
              description:
                'List of query parameters from which JWT is expected. For example, if JWT is provided via query parameter `my_token` (e.g /path?my_token=\u003cJWT\u003e), the config is: ``` fromParams: - "my_token" ```',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            outputPayloadToHeader: {
              description:
                "This field specifies the header name to output a successfully verified JWT payload to the backend. The forwarded data is `base64_encoded(jwt_payload_in_JSON)`. If it is not specified, the payload will not be emitted.",
              type: "string",
              format: "string",
            },
            forwardOriginalToken: {
              description:
                "If set to true, the orginal token will be kept for the ustream request. Default is false.",
              type: "boolean",
            },
          },
        },
        "istio.security.v1beta1.JWTHeader": {
          description:
            "This message specifies a header location to extract JWT token.",
          type: "object",
          properties: {
            name: {
              description: "The HTTP header name.",
              type: "string",
              format: "string",
            },
            prefix: {
              description:
                'The prefix that should be stripped before decoding the token. For example, for "Authorization: Bearer \u003ctoken\u003e", prefix="Bearer " with a space at the end. If the header doesn\'t have this exact prefix, it is considerred invalid.',
              type: "string",
              format: "string",
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Request authentication configuration for workloads.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.security.v1beta1.JWTRule": {
          description:
            "JSON Web Token (JWT) token format for authentication as defined by [RFC 7519](https://tools.ietf.org/html/rfc7519). See [OAuth 2.0](https://tools.ietf.org/html/rfc6749) and [OIDC 1.0](http://openid.net/connect) for how this is used in the whole authentication flow.",
          type: "object",
          properties: {
            issuer: {
              description:
                "Identifies the issuer that issued the JWT. See [issuer](https://tools.ietf.org/html/rfc7519#section-4.1.1) A JWT with different `iss` claim will be rejected.",
              type: "string",
              format: "string",
            },
            audiences: {
              description:
                "The list of JWT [audiences](https://tools.ietf.org/html/rfc7519#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            jwksUri: {
              description:
                "URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).",
              type: "string",
              format: "string",
            },
            jwks: {
              description:
                "JSON Web Key Set of public keys to validate signature of the JWT. See https://auth0.com/docs/jwks.",
              type: "string",
              format: "string",
            },
            fromHeaders: {
              description:
                'List of header locations from which JWT is expected. For example, below is the location spec if JWT is expected to be found in `x-jwt-assertion` header, and have "Bearer " prefix: ``` fromHeaders: - name: x-jwt-assertion prefix: "Bearer " ```',
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.security.v1beta1.JWTHeader",
              },
            },
            fromParams: {
              description:
                'List of query parameters from which JWT is expected. For example, if JWT is provided via query parameter `my_token` (e.g /path?my_token=\u003cJWT\u003e), the config is: ``` fromParams: - "my_token" ```',
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            outputPayloadToHeader: {
              description:
                "This field specifies the header name to output a successfully verified JWT payload to the backend. The forwarded data is `base64_encoded(jwt_payload_in_JSON)`. If it is not specified, the payload will not be emitted.",
              type: "string",
              format: "string",
            },
            forwardOriginalToken: {
              description:
                "If set to true, the orginal token will be kept for the ustream request. Default is false.",
              type: "boolean",
            },
          },
        },
        "istio.security.v1beta1.JWTHeader": {
          description:
            "This message specifies a header location to extract JWT token.",
          type: "object",
          properties: {
            name: {
              description: "The HTTP header name.",
              type: "string",
              format: "string",
            },
            prefix: {
              description:
                'The prefix that should be stripped before decoding the token. For example, for "Authorization: Bearer \u003ctoken\u003e", prefix="Bearer " with a space at the end. If the header doesn\'t have this exact prefix, it is considerred invalid.',
              type: "string",
              format: "string",
            },
          },
        },
        "istio.security.v1beta1.RequestAuthentication": {
          description:
            "RequestAuthentication defines what request authentication methods are supported by a workload. If will reject a request if the request contains invalid authentication information, based on the configured authentication rules. A request that does not contain any authentication credentials will be accepted but will not have any authenticated identity. To restrict access to authenticated requests only, this should be accompanied by an authorization rule. Examples: - Require JWT for all request for workloads that have label `app:httpbin`",
          type: "object",
          properties: {
            selector: {
              $ref: "#/components/schemas/istio.type.v1beta1.WorkloadSelector",
            },
            jwtRules: {
              description:
                "Define the list of JWTs that can be validated at the selected workloads' proxy. A valid token will be used to extract the authenticated identity. Each rule will be activated only when a token is presented at the location recorgnized by the rule. The token will be validated based on the JWT rule config. If validation fails, the request will be rejected. Note: if more than one token is presented (at different locations), the output principal is nondeterministic.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.security.v1beta1.JWTRule",
              },
            },
          },
        },
        "istio.type.v1beta1.WorkloadSelector": {
          description:
            "The selector determines the workloads to apply the RequestAuthentication on. If not set, the policy will be applied to all workloads in the same namespace as the policy.",
          type: "object",
          properties: {
            matchLabels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which a policy should be applied. The scope of label search is restricted to the configuration namespace in which the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Peer authentication configuration for workloads.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.security.v1beta1.PeerAuthentication": {
          description:
            "PeerAuthentication defines how traffic will be tunneled (or not) to the sidecar.",
          type: "object",
          properties: {
            selector: {
              $ref: "#/components/schemas/istio.type.v1beta1.WorkloadSelector",
            },
            mtls: {
              $ref:
                "#/components/schemas/istio.security.v1beta1.PeerAuthentication.MutualTLS",
            },
            portLevelMtls: {
              description: "Port specific mutual TLS settings.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.security.v1beta1.PeerAuthentication.MutualTLS",
              },
            },
          },
        },
        "istio.security.v1beta1.PeerAuthentication.MutualTLS": {
          description: "Mutual TLS settings.",
          type: "object",
          properties: {
            mode: {
              $ref:
                "#/components/schemas/istio.security.v1beta1.PeerAuthentication.MutualTLS.Mode",
            },
          },
        },
        "istio.security.v1beta1.PeerAuthentication.MutualTLS.Mode": {
          type: "string",
          enum: ["UNSET", "DISABLE", "PERMISSIVE", "STRICT"],
        },
        "istio.type.v1beta1.WorkloadSelector": {
          description:
            "The selector determines the workloads to apply the RequestAuthentication on. If not set, the policy will be applied to all workloads in the same namespace as the policy.",
          type: "object",
          properties: {
            matchLabels: {
              description:
                "One or more labels that indicate a specific set of pods/VMs on which a policy should be applied. The scope of label search is restricted to the configuration namespace in which the resource is present.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title:
        "This package defines the Mixer API that the sidecar proxy uses to perform precondition checks, manage quotas, and report telemetry.",
      version: "v1",
    },
    components: {
      schemas: {
        "istio.mixer.v1.Attributes": {
          description:
            "Attributes represents a set of typed name/value pairs. Many of Mixer's API either consume and/or return attributes.",
          type: "object",
          properties: {
            attributes: {
              description: "A map of attribute name to its value.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.Attributes.AttributeValue",
              },
            },
          },
        },
        "istio.mixer.v1.Attributes.AttributeValue": {
          description: "Specifies one attribute value with different type.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["stringValue"],
                    properties: {
                      stringValue: {
                        description:
                          "Used for values of type STRING, DNS_NAME, EMAIL_ADDRESS, and URI",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["int64Value"],
                    properties: {
                      int64Value: {
                        description: "Used for values of type INT64",
                        type: "integer",
                        format: "int64",
                      },
                    },
                  },
                  {
                    required: ["doubleValue"],
                    properties: {
                      doubleValue: {
                        description: "Used for values of type DOUBLE",
                        type: "number",
                        format: "double",
                      },
                    },
                  },
                  {
                    required: ["boolValue"],
                    properties: {
                      boolValue: {
                        description: "Used for values of type BOOL",
                        type: "boolean",
                      },
                    },
                  },
                  {
                    required: ["bytesValue"],
                    properties: {
                      bytesValue: {
                        description: "Used for values of type BYTES",
                        type: "string",
                        format: "binary",
                      },
                    },
                  },
                  {
                    required: ["timestampValue"],
                    properties: {
                      timestampValue: {
                        description: "Used for values of type TIMESTAMP",
                        type: "string",
                        format: "dateTime",
                      },
                    },
                  },
                  {
                    required: ["durationValue"],
                    properties: {
                      durationValue: {
                        description: "Used for values of type DURATION",
                        type: "string",
                      },
                    },
                  },
                  {
                    required: ["stringMapValue"],
                    properties: {
                      stringMapValue: {
                        $ref:
                          "#/components/schemas/istio.mixer.v1.Attributes.StringMap",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["stringValue"],
              properties: {
                stringValue: {
                  description:
                    "Used for values of type STRING, DNS_NAME, EMAIL_ADDRESS, and URI",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["int64Value"],
              properties: {
                int64Value: {
                  description: "Used for values of type INT64",
                  type: "integer",
                  format: "int64",
                },
              },
            },
            {
              required: ["doubleValue"],
              properties: {
                doubleValue: {
                  description: "Used for values of type DOUBLE",
                  type: "number",
                  format: "double",
                },
              },
            },
            {
              required: ["boolValue"],
              properties: {
                boolValue: {
                  description: "Used for values of type BOOL",
                  type: "boolean",
                },
              },
            },
            {
              required: ["bytesValue"],
              properties: {
                bytesValue: {
                  description: "Used for values of type BYTES",
                  type: "string",
                  format: "binary",
                },
              },
            },
            {
              required: ["timestampValue"],
              properties: {
                timestampValue: {
                  description: "Used for values of type TIMESTAMP",
                  type: "string",
                  format: "dateTime",
                },
              },
            },
            {
              required: ["durationValue"],
              properties: {
                durationValue: {
                  description: "Used for values of type DURATION",
                  type: "string",
                },
              },
            },
            {
              required: ["stringMapValue"],
              properties: {
                stringMapValue: {
                  $ref:
                    "#/components/schemas/istio.mixer.v1.Attributes.StringMap",
                },
              },
            },
          ],
        },
        "istio.mixer.v1.Attributes.StringMap": {
          description: "Defines a string map.",
          type: "object",
          properties: {
            entries: {
              description: "Holds a set of name/value pairs.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.mixer.v1.CompressedAttributes": {
          description:
            "Defines a list of attributes in compressed format optimized for transport. Within this message, strings are referenced using integer indices into one of two string dictionaries. Positive integers index into the global deployment-wide dictionary, whereas negative integers index into the message-level dictionary instead. The message-level dictionary is carried by the `words` field of this message, the deployment-wide dictionary is determined via configuration.",
          type: "object",
          properties: {
            strings: {
              description:
                "Holds attributes of type STRING, DNS_NAME, EMAIL_ADDRESS, URI",
              type: "object",
              additionalProperties: {
                type: "integer",
                format: "int32",
              },
            },
            bytes: {
              description: "Holds attributes of type BYTES",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "binary",
              },
            },
            words: {
              description: "The message-level dictionary.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            int64s: {
              description: "Holds attributes of type INT64",
              type: "object",
              additionalProperties: {
                type: "integer",
                format: "int64",
              },
            },
            doubles: {
              description: "Holds attributes of type DOUBLE",
              type: "object",
              additionalProperties: {
                type: "number",
                format: "double",
              },
            },
            bools: {
              description: "Holds attributes of type BOOL",
              type: "object",
              additionalProperties: {
                type: "boolean",
              },
            },
            timestamps: {
              description: "Holds attributes of type TIMESTAMP",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "dateTime",
              },
            },
            durations: {
              description: "Holds attributes of type DURATION",
              type: "object",
              additionalProperties: {
                type: "string",
              },
            },
            stringMaps: {
              description: "Holds attributes of type STRING_MAP",
              type: "object",
              additionalProperties: {
                $ref: "#/components/schemas/istio.mixer.v1.StringMap",
              },
            },
          },
        },
        "istio.mixer.v1.StringMap": {
          description:
            "A map of string to string. The keys and values in this map are dictionary indices (see the [Attributes][istio.mixer.v1.CompressedAttributes] message for an explanation)",
          type: "object",
          properties: {
            entries: {
              description: "Holds a set of name/value pairs.",
              type: "object",
              additionalProperties: {
                type: "integer",
                format: "int32",
              },
            },
          },
        },
        "istio.mixer.v1.CheckRequest": {
          description:
            "Used to get a thumbs-up/thumbs-down before performing an action.",
          type: "object",
          properties: {
            attributes: {
              $ref: "#/components/schemas/istio.mixer.v1.CompressedAttributes",
            },
            globalWordCount: {
              description:
                "The number of words in the global dictionary, used with to populate the attributes. This value is used as a quick way to determine whether the client is using a dictionary that the server understands.",
              type: "integer",
            },
            deduplicationId: {
              description:
                "Used for deduplicating `Check` calls in the case of failed RPCs and retries. This should be a UUID per call, where the same UUID is used for retries of the same call.",
              type: "string",
              format: "string",
            },
            quotas: {
              description: "The individual quotas to allocate",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.CheckRequest.QuotaParams",
              },
            },
          },
        },
        "istio.mixer.v1.CheckRequest.QuotaParams": {
          description: "parameters for a quota allocation",
          type: "object",
          properties: {
            amount: {
              description: "Amount of quota to allocate",
              type: "integer",
              format: "int64",
            },
            bestEffort: {
              description:
                "When true, supports returning less quota than what was requested.",
              type: "boolean",
            },
          },
        },
        "istio.mixer.v1.CheckResponse": {
          description: "The response generated by the Check method.",
          type: "object",
          properties: {
            quotas: {
              description:
                "The resulting quota, one entry per requested quota.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.CheckResponse.QuotaResult",
              },
            },
            precondition: {
              $ref:
                "#/components/schemas/istio.mixer.v1.CheckResponse.PreconditionResult",
            },
          },
        },
        "istio.mixer.v1.CheckResponse.PreconditionResult": {
          description: "Expresses the result of a precondition check.",
          type: "object",
          properties: {
            status: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
            validDuration: {
              description:
                "The amount of time for which this result can be considered valid.",
              type: "string",
            },
            validUseCount: {
              description:
                "The number of uses for which this result can be considered valid.",
              type: "integer",
              format: "int32",
            },
            referencedAttributes: {
              $ref: "#/components/schemas/istio.mixer.v1.ReferencedAttributes",
            },
            routeDirective: {
              $ref: "#/components/schemas/istio.mixer.v1.RouteDirective",
            },
          },
        },
        "istio.mixer.v1.CheckResponse.QuotaResult": {
          description: "Expresses the result of a quota allocation.",
          type: "object",
          properties: {
            status: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
            validDuration: {
              description:
                "The amount of time for which this result can be considered valid.",
              type: "string",
            },
            referencedAttributes: {
              $ref: "#/components/schemas/istio.mixer.v1.ReferencedAttributes",
            },
            grantedAmount: {
              description:
                "The amount of granted quota. When `QuotaParams.best_effort` is true, this will be \u003e= 0. If `QuotaParams.best_effort` is false, this will be either 0 or \u003e= `QuotaParams.amount`.",
              type: "integer",
              format: "int64",
            },
          },
        },
        "istio.mixer.v1.ReferencedAttributes": {
          description:
            "Describes the attributes that were used to determine the response. This can be used to construct a response cache.",
          type: "object",
          properties: {
            words: {
              description:
                "The message-level dictionary. Refer to [CompressedAttributes][istio.mixer.v1.CompressedAttributes] for information on using dictionaries.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            attributeMatches: {
              description: "Describes a set of attributes.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.ReferencedAttributes.AttributeMatch",
              },
            },
          },
        },
        "istio.mixer.v1.RouteDirective": {
          description:
            "Expresses the routing manipulation actions to be performed on behalf of Mixer in response to a precondition check.",
          type: "object",
          properties: {
            requestHeaderOperations: {
              description: "Operations on the request headers.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mixer.v1.HeaderOperation",
              },
            },
            responseHeaderOperations: {
              description: "Operations on the response headers.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mixer.v1.HeaderOperation",
              },
            },
            directResponseCode: {
              description:
                "If set, enables a direct response without proxying the request to the routing destination. Required to be a value in the 2xx or 3xx range.",
              type: "integer",
            },
            directResponseBody: {
              description:
                "Supplies the response body for the direct response. If this setting is omitted, no body is included in the generated response.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mixer.v1.ReferencedAttributes.AttributeMatch": {
          description: "Describes a single attribute match.",
          type: "object",
          properties: {
            name: {
              description:
                "The name of the attribute. This is a dictionary index encoded in a manner identical to all strings in the [CompressedAttributes][istio.mixer.v1.CompressedAttributes] message.",
              type: "integer",
              format: "int32",
            },
            condition: {
              $ref:
                "#/components/schemas/istio.mixer.v1.ReferencedAttributes.Condition",
            },
            regex: {
              description:
                "If a REGEX condition is provided for a STRING_MAP attribute, clients should use the regex value to match against map keys. RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
              type: "string",
              format: "string",
            },
            mapKey: {
              description:
                "A key in a STRING_MAP. When multiple keys from a STRING_MAP attribute were referenced, there will be multiple AttributeMatch messages with different map_key values. Values for map_key SHOULD be ignored for attributes that are not STRING_MAP.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.mixer.v1.ReferencedAttributes.Condition": {
          description: "How an attribute's value was matched",
          type: "string",
          enum: ["CONDITION_UNSPECIFIED", "ABSENCE", "EXACT", "REGEX"],
        },
        "istio.mixer.v1.HeaderOperation": {
          description:
            'Operation on HTTP headers to replace, append, or remove a header. Header names are normalized to lower-case with dashes, e.g. "x-request-id". Pseudo-headers ":path", ":authority", and ":method" are supported to modify the request headers.',
          type: "object",
          properties: {
            name: {
              description: "Header name.",
              type: "string",
              format: "string",
            },
            value: {
              description: "Header value.",
              type: "string",
              format: "string",
            },
            operation: {
              $ref:
                "#/components/schemas/istio.mixer.v1.HeaderOperation.Operation",
            },
          },
        },
        "istio.mixer.v1.HeaderOperation.Operation": {
          description: "Operation type.",
          type: "string",
          enum: ["REPLACE", "REMOVE", "APPEND"],
        },
        "istio.mixer.v1.ReportRequest": {
          description:
            "Used to report telemetry after performing one or more actions.",
          type: "object",
          properties: {
            attributes: {
              description: "next value: 5",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.CompressedAttributes",
              },
            },
            globalWordCount: {
              description:
                "The number of words in the global dictionary. To detect global dictionary out of sync between client and server.",
              type: "integer",
            },
            repeatedAttributesSemantics: {
              $ref:
                "#/components/schemas/istio.mixer.v1.ReportRequest.RepeatedAttributesSemantics",
            },
            defaultWords: {
              description:
                "The default message-level dictionary for all the attributes. Individual attribute messages can have their own dictionaries, but if they don't then this set of words, if it is provided, is used instead.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.mixer.v1.ReportRequest.RepeatedAttributesSemantics": {
          description:
            "Used to signal how the sets of compressed attributes should be reconstituted server-side.",
          type: "string",
          enum: ["DELTA_ENCODING", "INDEPENDENT_ENCODING"],
        },
        "istio.mixer.v1.ReportResponse": {
          description: "Used to carry responses to telemetry reports",
          type: "object",
        },
        "google.rpc.Status": {
          description:
            "A status code of OK indicates quota was fetched successfully. Any other code indicates error in fetching quota.",
          type: "object",
          properties: {
            code: {
              description:
                "The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code].",
              type: "integer",
              format: "int32",
            },
            message: {
              description:
                "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the [google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client.",
              type: "string",
              format: "string",
            },
            details: {
              description:
                "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
              type: "array",
              items: {
                type: "object",
                required: ["@type"],
                properties: {
                  "@type": {
                    description:
                      'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                    type: "string",
                    format: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Configuration state for the Mixer client library.",
      version: "client",
    },
    components: {
      schemas: {
        "istio.mixer.v1.config.client.HTTPAPISpec": {
          description:
            "HTTPAPISpec defines the canonical configuration for generating API-related attributes from HTTP requests based on the method and uri templated path matches. It is sufficient for defining the API surface of a service for the purposes of API attribute generation. It is not intended to represent auth, quota, documentation, or other information commonly found in other API specifications, e.g. OpenAPI.",
          type: "object",
          properties: {
            attributes: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
            patterns: {
              description: "List of HTTP patterns to match.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.HTTPAPISpecPattern",
              },
            },
            apiKeys: {
              description:
                "List of APIKey that describes how to extract an API-KEY from an HTTP request. The first API-Key match found in the list is used, i.e. 'OR' semantics.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.APIKey",
              },
            },
          },
        },
        "istio.mixer.v1.config.client.HTTPAPISpecPattern": {
          description:
            "HTTPAPISpecPattern defines a single pattern to match against incoming HTTP requests. The per-pattern list of attributes is generated if both the http_method and uri_template match. In addition, the top-level list of attributes in the HTTPAPISpec is also generated.",
          type: "object",
          properties: {
            attributes: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
            httpMethod: {
              description:
                "HTTP request method to match against as defined by [rfc7231](https://tools.ietf.org/html/rfc7231#page-21). For example: GET, HEAD, POST, PUT, DELETE.",
              type: "string",
              format: "string",
            },
          },
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["uriTemplate"],
                    properties: {
                      uriTemplate: {
                        description:
                          "URI template to match against as defined by [rfc6570](https://tools.ietf.org/html/rfc6570). For example, the following are valid URI templates: /pets /pets/{id} /dictionary/{term:1}/{term} /search{?q*,lang}",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["regex"],
                    properties: {
                      regex: {
                        description:
                          "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax)",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["uriTemplate"],
              properties: {
                uriTemplate: {
                  description:
                    "URI template to match against as defined by [rfc6570](https://tools.ietf.org/html/rfc6570). For example, the following are valid URI templates: /pets /pets/{id} /dictionary/{term:1}/{term} /search{?q*,lang}",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["regex"],
              properties: {
                regex: {
                  description:
                    "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax)",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.mixer.v1.config.client.APIKey": {
          description:
            "APIKey defines the explicit configuration for generating the `request.api_key` attribute from HTTP requests.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["query"],
                    properties: {
                      query: {
                        description:
                          "API Key is sent as a query parameter. `query` represents the query string parameter name.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["header"],
                    properties: {
                      header: {
                        description:
                          "API key is sent in a request header. `header` represents the header name.",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["cookie"],
                    properties: {
                      cookie: {
                        description:
                          "API key is sent in a [cookie](https://swagger.io/docs/specification/authentication/cookie-authentication),",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["query"],
              properties: {
                query: {
                  description:
                    "API Key is sent as a query parameter. `query` represents the query string parameter name.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["header"],
              properties: {
                header: {
                  description:
                    "API key is sent in a request header. `header` represents the header name.",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["cookie"],
              properties: {
                cookie: {
                  description:
                    "API key is sent in a [cookie](https://swagger.io/docs/specification/authentication/cookie-authentication),",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.mixer.v1.config.client.HTTPAPISpecReference": {
          description:
            "HTTPAPISpecReference defines a reference to an HTTPAPISpec. This is typically used for establishing bindings between an HTTPAPISpec and an IstioService. For example, the following defines an HTTPAPISpecReference for service `foo` in namespace `bar`.",
          type: "object",
          properties: {
            name: {
              description:
                "The short name of the HTTPAPISpec. This is the resource name defined by the metadata name field.",
              type: "string",
              format: "string",
            },
            namespace: {
              description:
                "Optional namespace of the HTTPAPISpec. Defaults to the encompassing HTTPAPISpecBinding's metadata namespace field.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mixer.v1.config.client.HTTPAPISpecBinding": {
          description:
            "HTTPAPISpecBinding defines the binding between HTTPAPISpecs and one or more IstioService. For example, the following establishes a binding between the HTTPAPISpec `petstore` and service `foo` in namespace `bar`.",
          type: "object",
          properties: {
            services: {
              description:
                "One or more services to map the listed HTTPAPISpec onto.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.IstioService",
              },
            },
            apiSpecs: {
              description:
                "One or more HTTPAPISpec references that should be mapped to the specified service(s). The aggregate collection of match conditions defined in the HTTPAPISpecs should not overlap.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.HTTPAPISpecReference",
              },
            },
          },
        },
        "istio.mixer.v1.config.client.IstioService": {
          description:
            'IstioService identifies a service and optionally service version. The FQDN of the service is composed from the name, namespace, and implementation-specific domain suffix (e.g. on Kubernetes, "reviews" + "default" + "svc.cluster.local" -\u003e "reviews.default.svc.cluster.local").',
          type: "object",
          properties: {
            name: {
              description: 'The short name of the service such as "foo".',
              type: "string",
              format: "string",
            },
            namespace: {
              description:
                "Optional namespace of the service. Defaults to value of metadata namespace field.",
              type: "string",
              format: "string",
            },
            domain: {
              description:
                "Domain suffix used to construct the service FQDN in implementations that support such specification.",
              type: "string",
              format: "string",
            },
            service: {
              description: "The service FQDN.",
              type: "string",
              format: "string",
            },
            labels: {
              description:
                "Optional one or more labels that uniquely identify the service version.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.mixer.v1.config.client.NetworkFailPolicy": {
          description:
            "Specifies the behavior when the client is unable to connect to Mixer.",
          type: "object",
          properties: {
            policy: {
              $ref:
                "#/components/schemas/istio.mixer.v1.config.client.NetworkFailPolicy.FailPolicy",
            },
            maxRetry: {
              description: "Max retries on transport error.",
              type: "integer",
            },
            baseRetryWait: {
              description:
                "Base time to wait between retries. Will be adjusted by exponential backoff and jitter.",
              type: "string",
            },
            maxRetryWait: {
              description: "Max time to wait between retries.",
              type: "string",
            },
          },
        },
        "istio.mixer.v1.config.client.NetworkFailPolicy.FailPolicy": {
          description: "Describes the policy.",
          type: "string",
          enum: ["FAIL_OPEN", "FAIL_CLOSE"],
        },
        "istio.mixer.v1.config.client.ServiceConfig": {
          description: "Defines the per-service client configuration.",
          type: "object",
          properties: {
            disableCheckCalls: {
              description: "If true, do not call Mixer Check.",
              type: "boolean",
            },
            disableReportCalls: {
              description: "If true, do not call Mixer Report.",
              type: "boolean",
            },
            mixerAttributes: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
            httpApiSpec: {
              description:
                "HTTP API specifications to generate API attributes.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.HTTPAPISpec",
              },
            },
            quotaSpec: {
              description:
                "Quota specifications to generate quota requirements.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.QuotaSpec",
              },
            },
            networkFailPolicy: {
              $ref:
                "#/components/schemas/istio.mixer.v1.config.client.NetworkFailPolicy",
            },
            forwardAttributes: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
          },
        },
        "istio.mixer.v1.config.client.QuotaSpec": {
          description: "Determines the quotas used for individual requests.",
          type: "object",
          properties: {
            rules: {
              description: "A list of Quota rules.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.QuotaRule",
              },
            },
          },
        },
        "istio.mixer.v1.config.client.TransportConfig": {
          description: "Defines the transport config on how to call Mixer.",
          type: "object",
          properties: {
            networkFailPolicy: {
              $ref:
                "#/components/schemas/istio.mixer.v1.config.client.NetworkFailPolicy",
            },
            disableCheckCache: {
              description: "The flag to disable check cache.",
              type: "boolean",
            },
            disableQuotaCache: {
              description: "The flag to disable quota cache.",
              type: "boolean",
            },
            disableReportBatch: {
              description: "The flag to disable report batch.",
              type: "boolean",
            },
            statsUpdateInterval: {
              description:
                "Specify refresh interval to write Mixer client statistics to Envoy share memory. If not specified, the interval is 10 seconds.",
              type: "string",
            },
            checkCluster: {
              description:
                'Name of the cluster that will forward check calls to a pool of mixer servers. Defaults to "mixer_server". By using different names for checkCluster and reportCluster, it is possible to have one set of Mixer servers handle check calls, while another set of Mixer servers handle report calls.',
              type: "string",
              format: "string",
            },
            reportCluster: {
              description:
                'Name of the cluster that will forward report calls to a pool of mixer servers. Defaults to "mixer_server". By using different names for checkCluster and reportCluster, it is possible to have one set of Mixer servers handle check calls, while another set of Mixer servers handle report calls.',
              type: "string",
              format: "string",
            },
            attributesForMixerProxy: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
            reportBatchMaxEntries: {
              description:
                "When disable_report_batch is false, this value specifies the maximum number of requests that are batched in report. If left unspecified, the default value of report_batch_max_entries == 0 will use the hardcoded defaults of istio::mixerclient::ReportOptions.",
              type: "integer",
            },
            reportBatchMaxTime: {
              description:
                "When disable_report_batch is false, this value specifies the maximum elapsed time a batched report will be sent after a user request is processed. If left unspecified, the default report_batch_max_time == 0 will use the hardcoded defaults of istio::mixerclient::ReportOptions.",
              type: "string",
            },
          },
        },
        "istio.mixer.v1.config.client.HttpClientConfig": {
          description: "Defines the client config for HTTP.",
          type: "object",
          properties: {
            mixerAttributes: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
            forwardAttributes: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
            transport: {
              $ref:
                "#/components/schemas/istio.mixer.v1.config.client.TransportConfig",
            },
            serviceConfigs: {
              description:
                "Map of control configuration indexed by destination.service. This is used to support per-service configuration for cases where a mixerclient serves multiple services.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.ServiceConfig",
              },
            },
            defaultDestinationService: {
              description:
                "Default destination service name if none was specified in the client request.",
              type: "string",
              format: "string",
            },
            ignoreForwardedAttributes: {
              description:
                'Whether or not to use attributes forwarded in the request headers to create the attribute bag to send to mixer. For intra-mesh traffic, this should be set to "false". For ingress/egress gateways, this should be set to "true".',
              type: "boolean",
            },
          },
        },
        "istio.mixer.v1.config.client.TcpClientConfig": {
          description: "Defines the client config for TCP.",
          type: "object",
          properties: {
            disableCheckCalls: {
              description: "If set to true, disables Mixer check calls.",
              type: "boolean",
            },
            disableReportCalls: {
              description: "If set to true, disables Mixer check calls.",
              type: "boolean",
            },
            mixerAttributes: {
              $ref: "#/components/schemas/istio.mixer.v1.Attributes",
            },
            transport: {
              $ref:
                "#/components/schemas/istio.mixer.v1.config.client.TransportConfig",
            },
            connectionQuotaSpec: {
              $ref:
                "#/components/schemas/istio.mixer.v1.config.client.QuotaSpec",
            },
            reportInterval: {
              description:
                "Specify report interval to send periodical reports for long TCP connections. If not specified, the interval is 10 seconds. This interval should not be less than 1 second, otherwise it will be reset to 1 second.",
              type: "string",
            },
          },
        },
        "istio.mixer.v1.config.client.QuotaRule": {
          description:
            "Specifies a rule with list of matches and list of quotas. If any clause matched, the list of quotas will be used.",
          type: "object",
          properties: {
            quotas: {
              description: "The list of quotas to charge.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mixer.v1.config.client.Quota",
              },
            },
            match: {
              description:
                "If empty, match all request. If any of match is true, it is matched.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.AttributeMatch",
              },
            },
          },
        },
        "istio.mixer.v1.config.client.AttributeMatch": {
          description: "Specifies a match clause to match Istio attributes",
          type: "object",
          properties: {
            clause: {
              description:
                "Map of attribute names to StringMatch type. Each map element specifies one condition to match.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.StringMatch",
              },
            },
          },
        },
        "istio.mixer.v1.config.client.Quota": {
          description: "Specifies a quota to use with quota name and amount.",
          type: "object",
          properties: {
            quota: {
              description: "The quota name to charge",
              type: "string",
              format: "string",
            },
            charge: {
              description: "The quota amount to charge",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.mixer.v1.config.client.StringMatch": {
          description:
            "Describes how to match a given string in HTTP headers. Match is case-sensitive.",
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["exact"],
                    properties: {
                      exact: {
                        description: "exact string match",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["prefix"],
                    properties: {
                      prefix: {
                        description: "prefix-based match",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["regex"],
                    properties: {
                      regex: {
                        description:
                          "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["exact"],
              properties: {
                exact: {
                  description: "exact string match",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["prefix"],
              properties: {
                prefix: {
                  description: "prefix-based match",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["regex"],
              properties: {
                regex: {
                  description:
                    "RE2 style regex-based match (https://github.com/google/re2/wiki/Syntax).",
                  type: "string",
                  format: "string",
                },
              },
            },
          ],
        },
        "istio.mixer.v1.config.client.QuotaSpecBinding": {
          description:
            "QuotaSpecBinding defines the binding between QuotaSpecs and one or more IstioService.",
          type: "object",
          properties: {
            services: {
              description:
                "One or more services to map the listed QuotaSpec onto.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.IstioService",
              },
            },
            quotaSpecs: {
              description:
                "One or more QuotaSpec references that should be mapped to the specified service(s). The aggregate collection of match conditions defined in the QuotaSpecs should not overlap.",
              type: "array",
              items: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.config.client.QuotaSpecBinding.QuotaSpecReference",
              },
            },
          },
        },
        "istio.mixer.v1.config.client.QuotaSpecBinding.QuotaSpecReference": {
          description:
            "QuotaSpecReference uniquely identifies the QuotaSpec used in the Binding.",
          type: "object",
          properties: {
            name: {
              description:
                "The short name of the QuotaSpec. This is the resource name defined by the metadata name field.",
              type: "string",
              format: "string",
            },
            namespace: {
              description:
                "Optional namespace of the QuotaSpec. Defaults to the value of the metadata namespace field.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mixer.v1.Attributes": {
          description:
            'Default attributes to send to Mixer in both Check and Report. This typically includes "destination.ip" and "destination.uid" attributes.',
          type: "object",
          properties: {
            attributes: {
              description: "A map of attribute name to its value.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.v1.Attributes.AttributeValue",
              },
            },
          },
        },
        "istio.mixer.v1.Attributes.AttributeValue": {
          type: "object",
          oneOf: [
            {
              not: {
                anyOf: [
                  {
                    required: ["stringValue"],
                    properties: {
                      stringValue: {
                        description:
                          "Used for values of type STRING, DNS_NAME, EMAIL_ADDRESS, and URI",
                        type: "string",
                        format: "string",
                      },
                    },
                  },
                  {
                    required: ["int64Value"],
                    properties: {
                      int64Value: {
                        description: "Used for values of type INT64",
                        type: "integer",
                        format: "int64",
                      },
                    },
                  },
                  {
                    required: ["doubleValue"],
                    properties: {
                      doubleValue: {
                        description: "Used for values of type DOUBLE",
                        type: "number",
                        format: "double",
                      },
                    },
                  },
                  {
                    required: ["boolValue"],
                    properties: {
                      boolValue: {
                        description: "Used for values of type BOOL",
                        type: "boolean",
                      },
                    },
                  },
                  {
                    required: ["bytesValue"],
                    properties: {
                      bytesValue: {
                        description: "Used for values of type BYTES",
                        type: "string",
                        format: "binary",
                      },
                    },
                  },
                  {
                    required: ["timestampValue"],
                    properties: {
                      timestampValue: {
                        description: "Used for values of type TIMESTAMP",
                        type: "string",
                        format: "dateTime",
                      },
                    },
                  },
                  {
                    required: ["durationValue"],
                    properties: {
                      durationValue: {
                        description: "Used for values of type DURATION",
                        type: "string",
                      },
                    },
                  },
                  {
                    required: ["stringMapValue"],
                    properties: {
                      stringMapValue: {
                        $ref:
                          "#/components/schemas/istio.mixer.v1.Attributes.StringMap",
                      },
                    },
                  },
                ],
              },
            },
            {
              required: ["stringValue"],
              properties: {
                stringValue: {
                  description:
                    "Used for values of type STRING, DNS_NAME, EMAIL_ADDRESS, and URI",
                  type: "string",
                  format: "string",
                },
              },
            },
            {
              required: ["int64Value"],
              properties: {
                int64Value: {
                  description: "Used for values of type INT64",
                  type: "integer",
                  format: "int64",
                },
              },
            },
            {
              required: ["doubleValue"],
              properties: {
                doubleValue: {
                  description: "Used for values of type DOUBLE",
                  type: "number",
                  format: "double",
                },
              },
            },
            {
              required: ["boolValue"],
              properties: {
                boolValue: {
                  description: "Used for values of type BOOL",
                  type: "boolean",
                },
              },
            },
            {
              required: ["bytesValue"],
              properties: {
                bytesValue: {
                  description: "Used for values of type BYTES",
                  type: "string",
                  format: "binary",
                },
              },
            },
            {
              required: ["timestampValue"],
              properties: {
                timestampValue: {
                  description: "Used for values of type TIMESTAMP",
                  type: "string",
                  format: "dateTime",
                },
              },
            },
            {
              required: ["durationValue"],
              properties: {
                durationValue: {
                  description: "Used for values of type DURATION",
                  type: "string",
                },
              },
            },
            {
              required: ["stringMapValue"],
              properties: {
                stringMapValue: {
                  $ref:
                    "#/components/schemas/istio.mixer.v1.Attributes.StringMap",
                },
              },
            },
          ],
        },
        "istio.mixer.v1.Attributes.StringMap": {
          description: "Used for values of type STRING_MAP",
          type: "object",
          properties: {
            entries: {
              description: "Holds a set of name/value pairs.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title: "Definitions used to create adapters and templates.",
      version: "v1beta1",
    },
    components: {
      schemas: {
        "istio.mixer.adapter.model.v1beta1.CheckResult": {
          description: "Expresses the result of a precondition check.",
          type: "object",
          properties: {
            status: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
            validDuration: {
              description:
                "The amount of time for which this result can be considered valid.",
              type: "string",
            },
            validUseCount: {
              description:
                "The number of uses for which this result can be considered valid.",
              type: "integer",
              format: "int32",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.TemplateVariety": {
          description:
            "The available varieties of templates, controlling the semantics of what an adapter does with each instance.",
          type: "string",
          enum: [
            "TEMPLATE_VARIETY_CHECK",
            "TEMPLATE_VARIETY_REPORT",
            "TEMPLATE_VARIETY_QUOTA",
            "TEMPLATE_VARIETY_ATTRIBUTE_GENERATOR",
            "TEMPLATE_VARIETY_CHECK_WITH_OUTPUT",
          ],
        },
        "istio.mixer.adapter.model.v1beta1.Info": {
          description:
            "Info describes an adapter or a backend that wants to provide telemetry and policy functionality to Mixer as an out of process adapter.",
          type: "object",
          properties: {
            name: {
              description:
                "Name of the adapter. It must be an RFC 1035 compatible DNS label matching the `^[a-z]([-a-z0-9]*[a-z0-9])?$` regular expression. Name is used in Istio configuration, therefore it should be descriptive but short. example: denier Vendor adapters should use a vendor prefix. example: mycompany-denier",
              type: "string",
              format: "string",
            },
            description: {
              description: "User-friendly description of the adapter.",
              type: "string",
              format: "string",
            },
            templates: {
              description: "Names of the templates the adapter supports.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            config: {
              description:
                "Base64 encoded proto descriptor of the adapter configuration.",
              type: "string",
              format: "string",
            },
            sessionBased: {
              description:
                "True if backend has implemented the [InfrastructureBackend](https://github.com/istio/api/blob/master/mixer/adapter/model/v1beta1/infrastructure_backend.proto) service; false otherwise.",
              type: "boolean",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.CreateSessionRequest": {
          description: "Request message for `CreateSession` method.",
          type: "object",
          properties: {
            adapterConfig: {
              description: "Adapter specific configuration.",
              type: "object",
              required: ["@type"],
              properties: {
                "@type": {
                  description:
                    'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                  type: "string",
                  format: "string",
                },
              },
            },
            inferredTypes: {
              description:
                "Map of instance names to their template-specific inferred type.",
              type: "object",
              additionalProperties: {
                type: "object",
                required: ["@type"],
                properties: {
                  "@type": {
                    description:
                      'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                    type: "string",
                    format: "string",
                  },
                },
              },
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.CreateSessionResponse": {
          description: "Response message for `CreateSession` method.",
          type: "object",
          properties: {
            status: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
            sessionId: {
              description: "Id of the created session.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.ValidateRequest": {
          description: "Request message for `Validate` method.",
          type: "object",
          properties: {
            adapterConfig: {
              description: "Adapter specific configuration.",
              type: "object",
              required: ["@type"],
              properties: {
                "@type": {
                  description:
                    'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                  type: "string",
                  format: "string",
                },
              },
            },
            inferredTypes: {
              description:
                "Map of instance names to their template-specific inferred type.",
              type: "object",
              additionalProperties: {
                type: "object",
                required: ["@type"],
                properties: {
                  "@type": {
                    description:
                      'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                    type: "string",
                    format: "string",
                  },
                },
              },
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.ValidateResponse": {
          description: "Response message for `Validate` method.",
          type: "object",
          properties: {
            status: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.CloseSessionRequest": {
          description: "Request message for `CloseSession` method.",
          type: "object",
          properties: {
            sessionId: {
              description: "Id of the session to be closed.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.CloseSessionResponse": {
          description: "Response message for `CloseSession` method.",
          type: "object",
          properties: {
            status: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.QuotaRequest": {
          description: "Expresses the quota allocation request.",
          type: "object",
          properties: {
            quotas: {
              description: "The individual quotas to allocate",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.adapter.model.v1beta1.QuotaRequest.QuotaParams",
              },
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.QuotaRequest.QuotaParams": {
          description: "parameters for a quota allocation",
          type: "object",
          properties: {
            amount: {
              description: "Amount of quota to allocate",
              type: "integer",
              format: "int64",
            },
            bestEffort: {
              description:
                "When true, supports returning less quota than what was requested.",
              type: "boolean",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.QuotaResult": {
          description: "Expresses the result of multiple quota allocations.",
          type: "object",
          properties: {
            quotas: {
              description:
                "The resulting quota, one entry per requested quota.",
              type: "object",
              additionalProperties: {
                $ref:
                  "#/components/schemas/istio.mixer.adapter.model.v1beta1.QuotaResult.Result",
              },
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.QuotaResult.Result": {
          description: "Expresses the result of a quota allocation.",
          type: "object",
          properties: {
            status: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
            validDuration: {
              description:
                "The amount of time for which this result can be considered valid.",
              type: "string",
            },
            grantedAmount: {
              description:
                "The amount of granted quota. When `QuotaParams.best_effort` is true, this will be \u003e= 0. If `QuotaParams.best_effort` is false, this will be either 0 or \u003e= `QuotaParams.amount`.",
              type: "integer",
              format: "int64",
            },
          },
        },
        "istio.mixer.adapter.model.v1beta1.ReportResult": {
          description: "Expresses the result of a report call.",
          type: "object",
        },
        "istio.mixer.adapter.model.v1beta1.Template": {
          description: "Template provides the details of a Mixer template.",
          type: "object",
          properties: {
            descriptor: {
              description: "Base64 encoded proto descriptor of the template.",
              type: "string",
              format: "string",
            },
          },
        },
        "google.rpc.Status": {
          description:
            "A status code of OK indicates quota was fetched successfully. Any other code indicates error in fetching quota.",
          type: "object",
          properties: {
            code: {
              description:
                "The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code].",
              type: "integer",
              format: "int32",
            },
            message: {
              description:
                "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the [google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client.",
              type: "string",
              format: "string",
            },
            details: {
              description:
                "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
              type: "array",
              items: {
                type: "object",
                required: ["@type"],
                properties: {
                  "@type": {
                    description:
                      'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                    type: "string",
                    format: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    openapi: "3.0.0",
    info: {
      title:
        "This package defines the common, core types used by the Mesh Configuration Protocol.",
      version: "v1alpha1",
    },
    components: {
      schemas: {
        "istio.mcp.v1alpha1.SinkNode": {
          description:
            "Identifies a specific MCP sink node instance. The node identifier is presented to the resource source, which may use this identifier to distinguish per sink configuration for serving. This information is not authoritative. Authoritative identity should come from the underlying transport layer (e.g. rpc credentials).",
          type: "object",
          properties: {
            id: {
              description: "An opaque identifier for the MCP node.",
              type: "string",
              format: "string",
            },
            annotations: {
              description: "Opaque annotations extending the node identifier.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.mcp.v1alpha1.MeshConfigRequest": {
          description:
            "A MeshConfigRequest requests a set of versioned resources of the same type for a given client.",
          type: "object",
          properties: {
            versionInfo: {
              description:
                "The version_info provided in the request messages will be the version_info received with the most recent successfully processed response or empty on the first request. It is expected that no new request is sent after a response is received until the client instance is ready to ACK/NACK the new configuration. ACK/NACK takes place by returning the new API config version as applied or the previous API config version respectively. Each type_url (see below) has an independent version associated with it.",
              type: "string",
              format: "string",
            },
            sinkNode: {
              $ref: "#/components/schemas/istio.mcp.v1alpha1.SinkNode",
            },
            typeUrl: {
              description:
                'Type of the resource that is being requested, e.g. "type.googleapis.com/istio.io.networking.v1alpha3.VirtualService".',
              type: "string",
              format: "string",
            },
            responseNonce: {
              description:
                "The nonce corresponding to MeshConfigResponse being ACK/NACKed. See above discussion on version_info and the MeshConfigResponse nonce comment. This may be empty if no nonce is available, e.g. at startup.",
              type: "string",
              format: "string",
            },
            errorDetail: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
          },
        },
        "istio.mcp.v1alpha1.MeshConfigResponse": {
          description:
            "A MeshConfigResponse delivers a set of versioned resources of the same type in response to a MeshConfigRequest.",
          type: "object",
          properties: {
            versionInfo: {
              description: "The version of the response data.",
              type: "string",
              format: "string",
            },
            typeUrl: {
              description:
                "Type URL for resources wrapped in the provided resources(s). This must be consistent with the type_url in the wrapper messages if resources is non-empty.",
              type: "string",
              format: "string",
            },
            resources: {
              description:
                "The response resources wrapped in the common MCP *Resource* message.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mcp.v1alpha1.Resource",
              },
            },
            nonce: {
              description:
                "The nonce provides a way to explicitly ack a specific MeshConfigResponse in a following MeshConfigRequest. Additional messages may have been sent by client to the management server for the previous version on the stream prior to this MeshConfigResponse, that were unprocessed at response send time. The nonce allows the management server to ignore any further MeshConfigRequests for the previous version until a MeshConfigRequest bearing the nonce.",
              type: "string",
              format: "string",
            },
          },
        },
        "istio.mcp.v1alpha1.Resource": {
          description:
            "Resource as transferred via the Mesh Configuration Protocol. Each resource is made up of common metadata, and a type-specific resource payload.",
          type: "object",
          properties: {
            body: {
              description: "The primary payload for the resource.",
              type: "object",
              required: ["@type"],
              properties: {
                "@type": {
                  description:
                    'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                  type: "string",
                  format: "string",
                },
              },
            },
            metadata: {
              $ref: "#/components/schemas/istio.mcp.v1alpha1.Metadata",
            },
          },
        },
        "istio.mcp.v1alpha1.IncrementalMeshConfigRequest": {
          description:
            "IncrementalMeshConfigRequest are be sent in 2 situations: 1. Initial message in a MCP bidirectional gRPC stream.",
          type: "object",
          properties: {
            sinkNode: {
              $ref: "#/components/schemas/istio.mcp.v1alpha1.SinkNode",
            },
            typeUrl: {
              description:
                'Type of the resource that is being requested, e.g. "type.googleapis.com/istio.io.networking.v1alpha3.VirtualService".',
              type: "string",
              format: "string",
            },
            responseNonce: {
              description:
                "When the IncrementalMeshConfigRequest is a ACK or NACK message in response to a previous IncrementalMeshConfigResponse, the response_nonce must be the nonce in the IncrementalMeshConfigResponse. Otherwise response_nonce must be omitted.",
              type: "string",
              format: "string",
            },
            errorDetail: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
            initialResourceVersions: {
              description:
                "When the IncrementalMeshConfigRequest is the first in a stream, the initial_resource_versions must be populated. Otherwise, initial_resource_versions must be omitted. The keys are the resources names of the MCP resources known to the MCP client. The values in the map are the associated resource level version info.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.mcp.v1alpha1.IncrementalMeshConfigResponse": {
          description:
            "IncrementalMeshConfigResponses do not need to include a full snapshot of the tracked resources. Instead they are a diff to the state of a MCP client. Per resource versions allow servers and clients to track state at the resource granularity. An MCP incremental session is always in the context of a gRPC bidirectional stream. This allows the MCP server to keep track of the state of MCP clients connected to it.",
          type: "object",
          properties: {
            resources: {
              description:
                "The response resources wrapped in the common MCP *Resource* message. These are typed resources that match the type url in the IncrementalMeshConfigRequest.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mcp.v1alpha1.Resource",
              },
            },
            nonce: {
              description:
                "The nonce provides a way for IncrementalMeshConfigRequests to uniquely reference an IncrementalMeshConfigResponse. The nonce is required.",
              type: "string",
              format: "string",
            },
            systemVersionInfo: {
              description:
                "The version of the response data (used for debugging).",
              type: "string",
              format: "string",
            },
            removedResources: {
              description:
                "Resources names of resources that have be deleted and to be removed from the MCP Client. Removed resources for missing resources can be ignored.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "istio.mcp.v1alpha1.RequestResources": {
          description:
            "A RequestResource can be sent in two situations: Initial message in an MCP bidirectional change stream as an ACK or NACK response to a previous Resources. In this case the response_nonce is set to the nonce value in the Resources. ACK/NACK is determined by the presence of error_detail.",
          type: "object",
          properties: {
            sinkNode: {
              $ref: "#/components/schemas/istio.mcp.v1alpha1.SinkNode",
            },
            responseNonce: {
              description:
                "When the RequestResources is an ACK or NACK message in response to a previous RequestResources, the response_nonce must be the nonce in the RequestResources. Otherwise response_nonce must be omitted.",
              type: "string",
              format: "string",
            },
            errorDetail: {
              $ref: "#/components/schemas/google.rpc.Status",
            },
            initialResourceVersions: {
              description:
                "When the RequestResources is the first in a stream, the initial_resource_versions must be populated. Otherwise, initial_resource_versions must be omitted. The keys are the resources names of the MCP resources known to the MCP client. The values in the map are the associated resource level version info.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            collection: {
              description:
                "Type of resource collection that is being requested, e.g.",
              type: "string",
              format: "string",
            },
            incremental: {
              description:
                "Request an incremental update for the specified collection. The source may choose to honor this request or ignore and and provide a full-state update in the corresponding `Resource` response.",
              type: "boolean",
            },
          },
        },
        "istio.mcp.v1alpha1.Resources": {
          description:
            "Resources do not need to include a full snapshot of the tracked resources. Instead they are a diff to the state of a MCP client. Per resource versions allow sources and sinks to track state at the resource granularity. An MCP incremental session is always in the context of a gRPC bidirectional stream. This allows the MCP source to keep track of the state of MCP sink connected to it.",
          type: "object",
          properties: {
            resources: {
              description:
                "The response resources wrapped in the common MCP *Resource* message. These are typed resources that match the type url in the RequestResources message.",
              type: "array",
              items: {
                $ref: "#/components/schemas/istio.mcp.v1alpha1.Resource",
              },
            },
            nonce: {
              description:
                "Required. The nonce provides a way for RequestChange to uniquely reference a RequestResources.",
              type: "string",
              format: "string",
            },
            systemVersionInfo: {
              description:
                "The version of the response data (used for debugging).",
              type: "string",
              format: "string",
            },
            removedResources: {
              description:
                "Names of resources that have been deleted and to be removed from the MCP sink node. Removed resources for missing resources can be ignored.",
              type: "array",
              items: {
                type: "string",
                format: "string",
              },
            },
            collection: {
              description:
                "Type of resource collection that is being requested, e.g.",
              type: "string",
              format: "string",
            },
            incremental: {
              description:
                "This resource response is an incremental update. The source should only send incremental updates if the sink requested them.",
              type: "boolean",
            },
          },
        },
        "istio.mcp.v1alpha1.Metadata": {
          description:
            "Metadata information that all resources within the Mesh Configuration Protocol must have.",
          type: "object",
          properties: {
            name: {
              description:
                "Fully qualified name of the resource. Unique in context of a collection.",
              type: "string",
              format: "string",
            },
            annotations: {
              description:
                "Map of string keys and values that can be used by source and sink to communicate arbitrary metadata about this resource.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
            createTime: {
              description: "The creation timestamp of the resource.",
              type: "string",
              format: "dateTime",
            },
            version: {
              description:
                "Resource version. This is used to determine when resources change across resource updates. It should be treated as opaque by consumers/sinks.",
              type: "string",
              format: "string",
            },
            labels: {
              description:
                "Map of string keys and values that can be used to organize and categorize resources within a collection.",
              type: "object",
              additionalProperties: {
                type: "string",
                format: "string",
              },
            },
          },
        },
        "google.rpc.Status": {
          description:
            "This is populated when the previously received resources could not be applied The *message* field in *error_details* provides the source internal error related to the failure.",
          type: "object",
          properties: {
            code: {
              description:
                "The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code].",
              type: "integer",
              format: "int32",
            },
            message: {
              description:
                "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the [google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client.",
              type: "string",
              format: "string",
            },
            details: {
              description:
                "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
              type: "array",
              items: {
                type: "object",
                required: ["@type"],
                properties: {
                  "@type": {
                    description:
                      'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `type.googleapis.com/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). The remaining fields of this object correspond to fields of the proto messsage. If the embedded message is well-known and has a custom JSON representation, that representation is assigned to the \'value\' field.',
                    type: "string",
                    format: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
];

const transformKey = k => {
	const bits = k.split(/\./g);
	return `/${bits[bits.length - 1]}-${bits[1]}-${bits[2]}.json`.toLowerCase();
}
const pathsToSchemas = schemas.reduce((agg,s) => {
	Object.keys(s.components.schemas).forEach(k => agg[transformKey(k)] = {
		components: { schemas: s.components.schemas[k] }});
	return agg;
}, {});
module.exports = pathsToSchemas;