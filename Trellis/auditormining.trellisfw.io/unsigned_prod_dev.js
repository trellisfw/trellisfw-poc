module.exports = {
  "redirect_uris": [
      "https://auditormining.trellisfw.io:8080/oauth2/redirect.html"
  ],
  "token_endpoint_auth_method": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  "grant_types": [
    "implicit"
  ],
  "response_types": [
    "token",
    "id_token",
    "id_token token"
  ],
  "client_name": "AuditorMining",
  "client_uri": "https://auditormining.trellisfw.io/",
  "contacts": [
    "Sam Noel <sanoel@purdue.edu>"
  ]
}
