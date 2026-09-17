# Demo deployment

The feature branch deploys its Expo static export to the isolated Cloudflare Worker `cultureowl-app-demo`. This is a review surface, not a production app-store build or merge. GitHub Actions runs typecheck, lint, static export and deployment. Cloudflare credentials stay in repository secrets.
