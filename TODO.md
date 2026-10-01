# Agent-ready status

Done:

- Link headers on the homepage
- Markdown negotiation (`Accept: text/markdown`, `/index.md`, `x-markdown-tokens`)
- Content Signals in robots.txt (`search=yes, ai-input=yes, ai-train=yes`) plus an Agentmap
- API catalog at `/.well-known/api-catalog`, backed by `/api/portfolio.json`, `/api/health`, and `/openapi.json`
- Agent skills index and the `debesh-portfolio` skill
- ARD manifest at `/.well-known/ai-catalog.json`
- WebMCP tools registered on page load

Skipped on purpose:

- DNS-AID
- OAuth/OIDC discovery, OAuth Protected Resource, and auth.md (the site has no protected APIs)
- MCP Server Card (no MCP server)

---

Goal: Include Link response headers for agent discovery (RFC 8288)

Status: done

Issue: No Link headers found on homepage

Fix: Add Link response headers to your homepage that point agents to useful resources. For example: Link: </.well-known/api-catalog>; rel="api-catalog" to advertise your API catalog, or Link: </docs/api>; rel="service-doc" for API documentation. See RFC 8288 for the Link header format and IANA Link Relations for registered relation types.

Skill: <https://isitagentready.com/.well-known/agent-skills/link-headers/SKILL.md>

Docs: <https://www.rfc-editor.org/rfc/rfc8288>, <https://www.rfc-editor.org/rfc/rfc9727#section-3>

---

Goal: Publish DNS for AI Discovery (DNS-AID) records for DNS-based agent discovery

Status: skipped

Issue: DNS for AI Discovery (DNS-AID) well-known entrypoint records not found

Fix: Publish DNS for AI Discovery (DNS-AID) records under your domain, for example _index._agents.example.com or _a2a._agents.example.com, using ServiceMode SVCB/HTTPS records with alpn and endpoint parameters. Sign the public discovery zone with DNSSEC so validating resolvers return authenticated data.

Skill: <https://isitagentready.com/.well-known/agent-skills/dns-aid/SKILL.md>

Docs: <https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/>, <https://www.rfc-editor.org/rfc/rfc9460>

---

Goal: Return HTML responses as markdown when agents request it

Status: done

Issue: Site returned status 500 for markdown request

Fix: Enable Markdown for Agents so requests with Accept: text/markdown return a markdown version of your HTML response while HTML stays the default for browsers. Confirm the response uses Content-Type: text/markdown (and x-markdown-tokens if available).

Skill: <https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md>

Docs: <https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/>

---

Goal: Publish an API catalog for automated API discovery (RFC 9727)

Status: done

Issue: API Catalog returned status 500

Fix: Create /.well-known/api-catalog returning application/linkset+json with a "linkset" array. Each entry should include an "anchor" URL for the API and link relations for service-desc (OpenAPI spec), service-doc (documentation), and status (health endpoint). See RFC 9727 Appendix A for examples.

Skill: <https://isitagentready.com/.well-known/agent-skills/api-catalog/SKILL.md>

Docs: <https://www.rfc-editor.org/rfc/rfc9727>, <https://www.rfc-editor.org/rfc/rfc9264>

---

Goal: Publish OAuth/OIDC discovery metadata so agents can authenticate with your APIs

Status: skipped

Issue: No OAuth/OIDC discovery metadata found

Fix: If your site has protected APIs, publish /.well-known/openid-configuration (for OpenID Connect) or /.well-known/oauth-authorization-server (for pure OAuth 2.0) with your issuer, authorization_endpoint, token_endpoint, jwks_uri, and grant_types_supported. This allows AI agents to programmatically discover how to authenticate.

Skill: <https://isitagentready.com/.well-known/agent-skills/oauth-discovery/SKILL.md>

Docs: <http://openid.net/specs/openid-connect-discovery-1_0.html>, <https://www.rfc-editor.org/rfc/rfc8414>

---

Goal: Publish OAuth Protected Resource Metadata so agents can discover how to authenticate

Status: skipped

Issue: No OAuth Protected Resource Metadata found

Fix: Publish /.well-known/oauth-protected-resource with your resource identifier, authorization_servers (list of OAuth/OIDC issuer URLs that can issue tokens for this resource), and scopes_supported. This tells agents how to obtain access tokens for your protected APIs.

Skill: <https://isitagentready.com/.well-known/agent-skills/oauth-protected-resource/SKILL.md>

Docs: <https://www.rfc-editor.org/rfc/rfc9728>

---

Goal: Publish Auth.md metadata for agent registration

Status: skipped

Issue: auth.md not found

Fix: Serve /auth.md at the site root with agent registration instructions, publish /.well-known/oauth-protected-resource, and include an agent_auth block in /.well-known/oauth-authorization-server with register_uri, supported identity types, credential types, and claim/revocation URLs where applicable.

Skill: <https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md>

Docs: <https://workos.com/auth-md>, <https://github.com/workos/auth.md>

---

Goal: Publish an MCP Server Card for agent discovery

Status: skipped

Issue: MCP Server Card not found

Fix: Serve an MCP Server Card (SEP-1649) at /.well-known/mcp/server-card.json with serverInfo (name, version), transport endpoint, and capabilities. The schema is being standardized at <https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127>

Skill: <https://isitagentready.com/.well-known/agent-skills/mcp-server-card/SKILL.md>

Docs: <https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127>

---

Goal: Publish an agent skills discovery index

Status: done

Issue: Agent Skills index not found

Fix: Publish a skills discovery index at /.well-known/agent-skills/index.json (per the Agent Skills Discovery RFC v0.2.0). Include a $schema field, and a skills array where each entry has name, type, description, url, and a sha256 digest.

Skill: <https://isitagentready.com/.well-known/agent-skills/agent-skills/SKILL.md>

Docs: <https://github.com/cloudflare/agent-skills-discovery-rfc>, <https://agentskills.io/>

---

Goal: Support WebMCP to expose site tools to AI agents via the browser

Status: done

Issue: No WebMCP tools detected on page load

Fix: Implement the WebMCP API by calling navigator.modelContext.provideContext() with tool definitions that expose your site's key actions to AI agents. Each tool needs a name, description, inputSchema (JSON Schema), and an execute callback function.

Skill: <https://isitagentready.com/.well-known/agent-skills/webmcp/SKILL.md>

Docs: <https://webmachinelearning.github.io/webmcp/>, <https://developer.chrome.com/blog/webmcp-epp>
