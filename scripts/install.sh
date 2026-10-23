#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
BIN_DIR="$HOME/.local/bin"
LINK="$BIN_DIR/stracker"
TARGET="$PROJECT_DIR/dist/src/index.js"

echo "Starting installation for stracker:"
echo "$PROJECT_DIR"
echo

# Check requirements.
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required." >&2
  exit 1
fi

if ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 24 ? 0 : 1)'; then
  echo "Error: Node.js 24 or newer is required." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required." >&2
  exit 1
fi

# Verify the entry point has a Node.js shebang.
if ! grep -q '^#!/usr/bin/env node' "$PROJECT_DIR/src/index.ts"; then
  echo "Error: Add '#!/usr/bin/env node' as the first line of src/index.ts." >&2
  exit 1
fi

cd "$PROJECT_DIR"

echo "-> Installing project dependencies..."
npm ci

echo
echo "-> Building stracker..."
npm run build

# Ensure the compiled entry point exists and is executable.
if [[ ! -f "$TARGET" ]]; then
  echo "Error: Compiled entry point not found: $TARGET" >&2
  exit 1
fi

chmod +x "$TARGET"

# Create the user-local executable directory.
mkdir -p "$BIN_DIR"

echo
echo "-> Creating stracker symlink..."

if [[ -L "$LINK" ]]; then
  # Update an existing symlink.
  ln -sfn "$TARGET" "$LINK"
elif [[ -e "$LINK" ]]; then
  # Never overwrite an unrelated regular file.
  echo "Error: $LINK already exists and is not a symlink." >&2
  echo "Inspect it with: ls -l \"$LINK\"" >&2
  exit 1
else
  ln -s "$TARGET" "$LINK"
fi

echo
echo "Installation complete."
echo "Executable: $LINK"
echo "Target:     $TARGET"
echo
echo "Verify the installation with:"
echo "  stracker --help"

if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
  echo
  echo "Warning: $BIN_DIR is not in your PATH."
  echo "For Fish, run: fish_add_path $BIN_DIR"
fi
