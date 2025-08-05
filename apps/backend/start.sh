#!/bin/bash
set -euo pipefail
SECRETS_DIR="secrets"
REQUIRED_SECRETS=("password_secret.txt" "jwt_secret.txt" "jwt_refresh_secret.txt")

check_secrets() {
    if [ ! -d "$SECRETS_DIR" ]; then
        return 1
    fi

    for secret in "${REQUIRED_SECRETS[@]}"; do
        if [ ! -f "$SECRETS_DIR/$secret" ]; then
            return 1
        fi
    done

    return 0
}

if ! check_secrets; then
    echo "🔐 Secrets not found. Setting up secrets..."
    if [ ! -f "$SCRIPT_DIR/setup-secrets.sh" ]; then
        echo "❌ setup-secrets.sh not found." >&2
        exit 1
    fi
    chmod +x "$SCRIPT_DIR/setup-secrets.sh"
    "$SCRIPT_DIR/setup-secrets.sh"
    echo "✅ Secrets setup complete!"
    check_secrets || { echo "❌ Secrets setup failed." >&2; exit 1; }
fi
    chmod +x "$SCRIPT_DIR/setup-secrets.sh"
    "$SCRIPT_DIR/setup-secrets.sh"
    echo "✅ Secrets setup complete!"
    check_secrets || { echo "❌ Secrets setup failed." >&2; exit 1; }
 fi

docker compose --env-file .env.$1 up --build
