# `stracker` CLI

> [!INFORMATION]
>
> Project on development
>
> .

---

## Table of contents

- [[#Features]]
- [[#Requirements]]
- [[#Installation]]
- [[#Usage]]
- [[#Commands]]

## Features

CLI app to track work (or just things in general) on projects and tasks, across sessions.

## Requirements

- Node.js `v26.12.0`
- npm
- Git
- Supported environment for `better-sqlite3`

## Runtime dependencies

- `better-sqlite3`
- `cli-table3`
- `commander`
- `drizzle-orm`

## Installation

<!-- TODO: Create installation script -->

1. Clone repository

```
git clone git@github.com:LPRegen/stracker-cli.git
cd session-tracker
```

2. Install dependencies

```
npm install
```

3. Build application

Compile source code into JS:

```
npm run build
```

The compiled application is generated in the dist/ directory. The build script also rewrites TypeScript path aliases so that the compiled code can run in Node.js.

4. Create system-wide command for current user

To run `stracker` from any working directory, create a symbolic link to the compiled entry point.

First, ensure that `~/.local/bin` exists:

```
mkdir -p dist/src/index.js
```

Make the entry point executable:

```
chmod +x dist/src/index.js
```

Create the symbolic link:

```
ln -s "$(pwd)/dist/src/index.js" ~/.local/bin/stracker
```

Ensure that `~/.local/bin` is included in your PATH. If you use Fish, you can add it with:

```
fish_add_path ~/.local/bin
```

Open a new terminal if necessary, then verify the installation:

```
stracker --help
```

## Usage

## Commands
