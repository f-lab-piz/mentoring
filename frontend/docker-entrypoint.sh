#!/bin/sh
set -e

# Generate runtime config from environment variables
cat > /usr/share/nginx/html/config.js <<EOF
window.APP_CONFIG = {
  API_URL: "${VITE_API_URL:-http://localhost:8000}",
  ENV: "${VITE_ENV:-development}",
  VERSION: "${APP_VERSION:-unknown}"
};
EOF

echo "Generated runtime config:"
cat /usr/share/nginx/html/config.js

# Start nginx
exec nginx -g "daemon off;"
