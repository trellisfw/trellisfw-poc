TODO:
---
    DONE - Merge audits in UI based on
      - Organization, product, operation
        - Product: /scope/products_observed/0/name (merge of alpha order?)
        - Organization: /organization/organizationid/id (or: /organization/name)
        - Operation: /scope/operations/0/operation_type (merge of alpha order?)

    - Received counters for connections
    - Have connections resolve oada domain from well-known

    - Add delete button for new connections
    - Add delete button for existing connections
      - Delete the webhook (how to do this? I don't have a token to delete from other cloud. Ask for permission again?)
      - Delete the webhook from /bookmarks/fpad/connections

    - Before create webhook POST to /authorizations to get scoped token
      to use in webhook (for token) so webhook does not have SUPER access.

    - Why does libs/oada-lib-arangodb/libs/exampledocs/users.js have gary under frank2 oidc???
