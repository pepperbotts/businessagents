#!/bin/bash
# deploy.sh - Enforced deployment with verification
# NEVER deploy without running this script

set -e

SITE="businessagents.io"
PAGES="submit checklist support-tools sales-tools content-tools operations-tools tidio-vs-intercom apollo-vs-clay"

echo "=== Pre-deploy verification ==="

# 1. Check for uncommitted changes
if ! git diff --quiet; then
    echo "ERROR: Uncommitted changes. Commit first."
    exit 1
fi

# 2. Get current commit
COMMIT=$(git rev-parse --short HEAD)
echo "Deploying commit: $COMMIT"

# 3. Push
echo ""
echo "=== Pushing to GitHub ==="
git push origin master

# 4. Wait for deploy
echo ""
echo "=== Waiting 40s for GitHub Actions deploy ==="
sleep 40

# 5. Verify ALL pages
echo ""
echo "=== Verifying live site ==="
FAILED=0
for page in $PAGES; do
    if curl -sf "https://$SITE/$page" > /dev/null; then
        echo "✓ /$page - accessible"
    else
        echo "✗ /$page - FAILED"
        FAILED=1
    fi
done

if [ $FAILED -eq 1 ]; then
    echo ""
    echo "ERROR: Some pages failed verification!"
    exit 1
fi

echo ""
echo "=== Deploy verified at $(date -u '+%Y-%m-%d %H:%M UTC') ==="
echo "Commit $COMMIT is live on $SITE"
