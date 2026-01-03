# Trello CLI

A Node.js CLI tool that provides Trello integration with Claude Code. Manage your Trello boards, lists, and cards using natural language through Claude Code.

> **Based on:** This project is a TypeScript/Node.js port of the original [ZenoxZX/trello-cli](https://github.com/ZenoxZX/trello-cli) which was built with .NET.

## What is it?

`trello-cli` is a command-line tool that communicates with the Trello API. Claude Code uses this tool to:

- List your boards
- View, create, and update your cards
- Move cards between lists
- Track your tasks
- Manage attachments and comments

## Installation

### Prerequisites

- **Node.js 18.0 or later** (uses native fetch)
- Trello account with API access

### Install from Source

```bash
# Clone the repository
git clone https://github.com/marcosferr/trello-cli-ts.git
cd trello-cli

# Install dependencies
npm install

# Build TypeScript
npm run build

# Install globally (makes 'trello-cli' available everywhere)
npm link

# Verify installation
trello-cli --help
```

### Alternative: Run without Global Install

```bash
# Run directly with node
node dist/index.js --help

# Or use npm script
npm start -- --help
```

### Uninstalling

```bash
npm unlink -g trello-cli
```

### Setting Up Trello API Credentials

1. Get your **API Key** from https://trello.com/power-ups/admin (or https://trello.com/app-key)
2. Generate a **Token** by visiting:
   ```
   https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&name=TrelloCLI&key=YOUR_API_KEY
   ```
3. Configure the CLI:

```bash
# Set your credentials
trello-cli --set-auth <api-key> <token>

# Verify authentication
trello-cli --check-auth
```

> ⚠️ **Important:** The Token is different from the Secret. The Secret is for OAuth apps—you need the Token for direct API access.

## Usage with Claude Code

Simply mention "Trello" when talking to Claude Code:

```
"Show my Trello tasks"
"Add a new card to Trello: Login page design"
"Move this card to Done on Trello"
"List my Trello boards"
```

## Claude Code Skills

This repo includes a **Claude Code Skill** that teaches Claude how to use this CLI effectively.

### What is a Skill?

Skills are markdown files with YAML frontmatter that define how Claude Code should use specific tools. When you mention "Trello", Claude automatically loads the skill and knows exactly which commands to run.

### Installing the Skill

Copy the skill folder to your personal `.claude` directory:

```bash
# Linux/macOS
cp -r .claude/skills/trello-cli ~/.claude/skills/

# Windows (PowerShell)
Copy-Item -Recurse .claude\skills\trello-cli $env:USERPROFILE\.claude\skills\
```

After this, Claude Code will automatically activate this skill whenever you mention "Trello" in any project.

### Skill Structure

```
~/.claude/
└── skills/
    └── trello-cli/
        ├── SKILL.md       # Main skill definition (trigger rules, quick reference)
        └── REFERENCE.md   # Detailed command documentation
```

### SKILL.md Format

```markdown
---
name: trello-cli
description: Trello board, list and card management via CLI...
---

# Skill Content
...
```

- **name**: Unique identifier for the skill
- **description**: Determines when Claude activates this skill (contains trigger words like "Trello")

## Documentation

| File | Description |
|------|-------------|
| [docs/instruction.md](docs/instruction.md) | Detailed command reference and usage examples for AI |
| [docs/system-prompt.md](docs/system-prompt.md) | System prompt for AI integration |
| [.claude/skills/trello-cli/SKILL.md](.claude/skills/trello-cli/SKILL.md) | Claude Code skill definition |
| [.claude/skills/trello-cli/REFERENCE.md](.claude/skills/trello-cli/REFERENCE.md) | Complete command documentation |

## Command Summary

```bash
# Authentication
trello-cli --set-auth <api-key> <token>
trello-cli --check-auth
trello-cli --clear-auth

# Board operations
trello-cli --get-boards
trello-cli --get-board <board-id>

# List operations
trello-cli --get-lists <board-id>
trello-cli --create-list <board-id> "<name>"

# Card operations
trello-cli --get-cards <list-id>
trello-cli --get-all-cards <board-id>
trello-cli --get-card <card-id>
trello-cli --create-card <list-id> "<name>" [--desc "<desc>"] [--due "YYYY-MM-DD"]
trello-cli --update-card <card-id> [--name "<name>"] [--desc "<desc>"] [--due "<date>"]
trello-cli --move-card <card-id> <target-list-id>
trello-cli --delete-card <card-id>

# Comment operations
trello-cli --get-comments <card-id>
trello-cli --add-comment <card-id> "<text>"

# Attachment operations
trello-cli --list-attachments <card-id>
trello-cli --upload-attachment <card-id> <file-path> [--name "<name>"]
trello-cli --attach-url <card-id> <url> [--name "<name>"]
trello-cli --delete-attachment <card-id> <attachment-id>
```

> **Note:** Downloading attachments is not supported—Trello's download API requires browser authentication. Use `--attach-url` to link attachments.

## Project Structure

```
trello-cli/
├── src/                    # TypeScript source code
│   ├── index.ts            # CLI entry point
│   ├── commands/           # Command handlers
│   ├── services/           # API and config services
│   ├── models/             # Type definitions
│   └── utils/              # Output formatting
├── dist/                   # Compiled JavaScript (generated)
├── .claude/skills/         # Claude Code skill definition
├── docs/                   # Documentation
├── package.json
└── tsconfig.json
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development
npm run dev -- --get-boards
```

## License

This project is licensed under the [MIT License](LICENSE).
