# skywriter
`skywriter` is a util I use to post to BlueSky, written using Hono and deployed on CloudFlare Workers.

## Prerequisites
- Create a `.dev.vars` file with the environment variables shown in `.dev.vars.example`.
- For deployment, add the environment variables in the CloudFlare Workers dashboard.

## Usage

```sh
# Install dependencies
bun install

# Run the service locally
bun dev

# Deploy the service
bun deploy
```

## Authentication
If the `BEARER_TOKEN` environment variable is set, the service will require a `Bearer` token in the `Authorization` header to authenticate requests.
Otherwise, the service will not require authentication.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```