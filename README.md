# INWT Python IDE

## Description

This is an extension pack bundling useful vscode extensions to develop Python
packages. It is used as a starting point and configuration to set up vscode
at INWT Statistics.

## TODOs

- Set all settings automatically
- Update local configuration files (setup.cfg, project.toml, etc)
- Install python packages in the same way official python package is doing it;
  by asking...

## Keybindings

- ctrl+enter: Execute selection or line in interactive window or debug console
  *and* step
- ctrl[-shift]-tab: Quick open of editors/files in group
- ctrl-p: open recent projects/folders
- [ctrl-]f12: Jump to or back from definition
- ctrl[-shift]-[up|down]: move or select block-wise

## Recommended Settings

These are workspace settings and they may already be set.

```json
{
    "python.autoComplete.addBrackets": true,
    "python.linting.flake8Enabled": true,
    "python.terminal.activateEnvInCurrentTerminal": true,
    "python.testing.pytestEnabled": true,
    "python.formatting.provider": "black",
    "files.autoSave": "afterDelay",
    "python.formatting.blackPath": "darker",
    "python.formatting.blackArgs": [],
    "python.sortImports.path": "isort",
    "python.sortImports.args": [],
    "python.languageServer": "Pylance",
    "python.linting.mypyEnabled": true,
    "rewrap.wrappingColumn": 80,
    "git.autofetch": true,
    "diffEditor.renderSideBySide": true,
    "diffEditor.ignoreTrimWhitespace": true,
    "gitlens.currentLine.enabled": false,
    "gitlens.hovers.enabled": false,
    "gitlens.hovers.currentLine.over": "line",
    "gitlens.codeLens.enabled": false,
    "gitlens.defaultDateStyle": "absolute",
    "tabnine.experimentalAutoImports": true,
    "cSpell.enabled": false,
    "cSpell.language": "de,de-DE,en",
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,
    "python.analysis.completeFunctionParens": true,
    "vsintellicode.sql.completionsEnabled": false,
    "[python]": {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.organizeImports": true
        }
    },
    "githubIssues.issueBranchTitle": "feature/${issueNumber}_${sanitizedIssueTitle}"
}

```

Also you may want to put the following into your user config:

```json
    "jupyter.runStartupCommands": [
        "%load_ext autoreload, %autoreload 2"
    ]
```

## Pipenv

Consider to add the following packages to your pipenv:

```pipfile
[pipenv]
allow_prereleases = true

[dev-packages]
pytest = {index = "pypi",version = "==6.1.2"}
wemake-python-styleguide = {index = "pypi",version = "*"}
isort = {index = "pypi",version = "*"}
darker = {index = "pypi",version = "*"}
mypy = {index = "pypi",version = "*"}
jupyter = {index = "pypi",version = "*"}
```

## Autoformat in legacy codebase

`black` is a pretty aggressive code formatter and currently does not provide an
option to only format changes. For that you may use `darker`. It is the default
in this configuration.

### Caveats

- Darker will only format code that appears in a git diff. A new file has no
  diff and will not be reformated. It is enough to stage the empty file.

## Troubleshooting

### pytest cannot find tests

- Update pytest to latest version, in your pipenv
- Check output of pytest. Discovery fails when there are
  - Syntax errors
  - or when dependencies cannot be resolved. In which case:
    - you check that you are inside the pipenv
    - the module is actually available: e.g. update pipenv / install correct version

### pytest reports module not found errors of project package

- Make sure in `setup.py` test folders and submodules are part of `package_data`
- Make sure all sub folder (modules) have a `__init__.py` file. This may
  include the `tests` folder. See
  https://github.com/microsoft/vscode-python/issues/14570 and
  https://github.com/microsoft/vscode-python/issues/14579

### GOTO definition (F12) is not responding

Can happen if we do a lot of search and replaces in files. May also be correlated
with false positive lints of the LSP.

- Restart language server by: `ctrl shift p`, then type *Restart language
  server*.
- Or sometimes restart vscode and try again.

### isort puts imports in wrong order

#### Use absolute path for isort!

(Most likely) This is becuase isort is not called within the pipenv. There is a
ticket for this in GitHub and no solution in sight. If isort behaves strangely
go to your `./.vscode/settings.json` and replace `isort` with the absolute path:

```json
    "python.sortImports.path": "<PATH TO ISORT>"
```

You get this path by typing `which isort` in your vscode terminal. It should
point to your virtual envvironment.

#### Update isort with pip3

This can also happen when isort is outdated on your system. It would be better
to use the one in the virutal env, but it may also be resolved by upgrading the
system isort version:

```sh
pip3 install -U isort
```
