# INWT Python IDE

## Description

This is an extension pack bundling useful vscode extensions to develop Python
packages. It is used as a starting point and configuration to set up vscode
at INWT Statistics. It is opinionated and will introduce braking changes at
will.

## Recommended Settings

```json
{
    "python.autoComplete.addBrackets": true,
    "python.linting.flake8Enabled": true,
    "python.terminal.activateEnvInCurrentTerminal": true,
    "python.testing.pytestEnabled": true,
    "python.formatting.provider": "black",
    "files.autoSave": "afterDelay",
    "python.formatting.blackPath": "black",
    "python.formatting.blackArgs": [],
    "python.sortImports.path": "isort",
    "python.sortImports.args": [],
    "python.languageServer": "Pylance",
    "python.linting.mypyEnabled": true,
    "rewrap.wrappingColumn": 79,
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
    }
}

```

## Autoformat in legacy codebase

`black` is a pretty aggressive code formatter and currently does not provide an
option to only format changes. For that you may use `darker`. To install and
use `darker` follow these steps:

1. Do not touch pipenv, darker inside the pipenv does not work.
2. Install darker with `pip3 install darker`
3. Find where `darker` lives in your system with `which darker`
4. Copy-paste the path into the `python.formatting.blackPath` option
5. Add `--diffs` to the `python.formatting.blackArgs` option

Darker will only format code that appears in a git diff. A new file has no diff
and will not be reformated. It is enough to stage the empty file.

## Troubleshooting

### pytest cannot find tests

- Update pytest to latest version
- Check output of pytest. Discovery fails when there are
  - Syntax errors
  - or when dependencies cannot be resolved. In which case:
    - you check that you are inside the pipenv
    - the module is actually available: e.g. update pipenv / install correct version
