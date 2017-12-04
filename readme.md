# Submodule CLI

A small CLI utility that simplifies git submodules

# Install

```
npm install -g submodule-cli
```

## Usage

In your repository's directory, run the submodule command to execute the underlying git commands.

```
submodule <command>
```

```
Commands:
    pull    Recursively checks out master branch and pull and update all submodules
    init    Recursively checks out and initializes all submodules in a project
    help    List commands
```