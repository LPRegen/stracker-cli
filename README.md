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

CLI app to track work (or just things in general) on projects and tasks, across
sessions.

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

### Install from source

Clone the repository and enter the project directory:

```fish
git clone <repository-url>
cd session-tracker
```

Run the installation script:

```fish
chmod +x scripts/install.sh
scripts/install.sh
```

The script installs dependencies, builds the application, and creates a symlink
at `~/.local/bin/stracker` pointing to the compiled entry point.

Ensure `~/.local/bin` is in your `PATH`. For Fish, run:

```fish
fish_add_path ~/.local/bin
```

Verify the installation:

```fish
stracker --help
stracker project list
```

You can run `stracker` from any working directory.

> [!IMPORTANT]
>
> The symlink points into your cloned repository. Keep that directory in place;
> moving or deleting it will break the command.

### Updating

Navigate to the cloned repository, pull the latest changes, and rerun the
installation script:

```fish
cd ~/Dokumente/Arbeit/session-tracker
git pull
scripts/install.sh
```

The script reinstalls dependencies, rebuilds the application, and updates the
symlink to the compiled entry point.

### Uninstalling

Remove the symlink:

```fish
rm ~/.local/bin/stracker
```

> [!IMPORTANT]
>
> This does not delete the source repository, dependencies, or database.  
> Remove those separately if no longer needed.

## Usage

## Commands
