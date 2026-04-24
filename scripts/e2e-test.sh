#!/bin/bash
set -e

echo "=== E2E Test: create-next-log ==="

# Setup
TEST_DIR=$(mktemp -d)
TEMPLATE_DIR="$(cd "$(dirname "$0")/.." && pwd)/packages/create-next-log/template"

echo "1. Creating test project at $TEST_DIR/test-blog..."
mkdir -p "$TEST_DIR/test-blog"
cp -r "$TEMPLATE_DIR"/* "$TEST_DIR/test-blog/" 2>/dev/null || { echo "Template not found. Run 'npm run build' in packages/create-next-log first."; exit 1; }

# Write test config
cat > "$TEST_DIR/test-blog/next-log.config.ts" << 'EOF'
const config = {
  title: "E2E Test Blog",
  description: "Testing create-next-log",
  url: "https://example.com",
  author: { name: "Tester" },
  social: { github: "", linkedin: "" },
  theme: { primaryColor: "#2563eb" },
  googleVerification: "",
  googleAnalyticsId: "",
};
export default config;
EOF

cd "$TEST_DIR/test-blog"

echo "2. Installing dependencies..."
npm install --silent

echo "3. Building project..."
npm run build

echo "4. Testing new-post script..."
node scripts/new-post.js "e2e-test-post"
if [ ! -f "posts/e2e-test-post/index.mdx" ]; then
  echo "FAIL: new-post script did not create post"
  exit 1
fi
# Verify frontmatter has correct author
if ! grep -q 'author: "Tester"' "posts/e2e-test-post/index.mdx"; then
  echo "FAIL: new-post did not read author from config"
  exit 1
fi

echo "5. Testing new-resume script..."
# Remove resume if it came from template (demo includes it)
rm -rf app/resume
node scripts/new-resume.js
if [ ! -f "app/resume/page.tsx" ] || [ ! -f "app/resume/data.ts" ]; then
  echo "FAIL: new-resume script did not create resume files"
  exit 1
fi

echo "6. Testing duplicate post detection..."
if node scripts/new-post.js "e2e-test-post" 2>/dev/null; then
  echo "FAIL: new-post should reject duplicate slug"
  exit 1
fi

echo "7. Testing duplicate resume detection..."
if node scripts/new-resume.js 2>/dev/null; then
  echo "FAIL: new-resume should reject if resume exists"
  exit 1
fi

echo "8. Rebuilding with resume page..."
npm run build

# Cleanup
cd /
rm -rf "$TEST_DIR"

echo ""
echo "=== All E2E tests passed ==="
