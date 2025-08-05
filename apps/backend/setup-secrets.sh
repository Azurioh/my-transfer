#!/bin/bash
set -euo pipefail

# Setup script for Docker secrets (local development)

# Set restrictive permissions for secret files
umask 077

echo "Setting up Docker secrets for local development..."

# Create secrets directory next to this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
mkdir -p "${SCRIPT_DIR}/secrets"
    echo "Please install openssl to continue:"
    echo "  - macOS: brew install openssl"
    echo "  - Ubuntu/Debian: sudo apt-get install openssl"
    echo "  - CentOS/RHEL: sudo yum install openssl"
    exit 1
fi

# Create secrets directory
mkdir -p secrets

# Generate random secrets if not provided
PASSWORD_SECRET=${PASSWORD_SECRET:-$(openssl rand -hex 32)}
JWT_SECRET=${JWT_SECRET:-$(openssl rand -hex 32)}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET:-$(openssl rand -hex 32)}

# Create secret files with restrictive permissions
echo "$PASSWORD_SECRET" > secrets/password_secret.txt
chmod 600 secrets/password_secret.txt

echo "$JWT_SECRET" > secrets/jwt_secret.txt
chmod 600 secrets/jwt_secret.txt

echo "$JWT_REFRESH_SECRET" > secrets/jwt_refresh_secret.txt
chmod 600 secrets/jwt_refresh_secret.txt

echo "✅ Secret files created successfully!"
echo ""
echo "Generated secrets:"
echo "  - password_secret.txt"
echo "  - jwt_secret.txt"
echo "  - jwt_refresh_secret.txt"
echo ""
echo "⚠️  IMPORTANT: These files are now in .gitignore and should never be committed to version control."
echo ""
echo "For production, replace these with your actual secret values."
