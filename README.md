# INWT Python IDE

## Description

This is an extension pack bundling useful vscode extensions to develop Python
packages. It is used as a starting point and configuration to set up vscode
at [INWT Statistics](https://www.inwt-statistics.de/home.html). This extension
provides the following features:

-   Smart execute for Python (Ctrl+Enter) - works also in debug mode
-   Fix to send decorators to REPL
-   Autoconfigure vscode settings accoring to our opinionated standards
-   Adds a set of useful extensions to develop in Python (next to the Python
    extension from Microsoft)

## Smart Execute for Python in vscode

This extension started as an extension bundle and now has one important
contribution: smart execute for Python. Samrt execute means that when you hit
Ctrl+Enter we look at the line your cursor is currently in and make a decision
if we think you better execute the complete block in the REPL instead of just
that line.

![smart-execute.gif](https://github.com/INWTlab/inwt-python-ide/blob/main/smart-execute.gif)

You can deactivate smart execute in the settings of the extension or by directly adding:

```json
"INWT.Python.IDE.smartExecute.blockSelect": false
```

If the official Python extension from Microsoft will add this we will most
likely switch to their version. Unfortunately implementation seems to have no
high priority and we have to wait:

-   https://github.com/microsoft/vscode-python/issues/7017
-   https://github.com/microsoft/vscode-python/issues/6669

## Send decorators to the REPL

There seem to be issues while sending decorators to the REPL using the
send-selection from the Python extension as well as send-selection to Python
interactive from the Jupyter extension. You can decide which way you prefer in
the settings. We also implemented an own version of it until it gets fixed in
the Python extension. While it is an ad-hoc solution it gets the job done for
now.

See the following tickets for progress:

-   https://github.com/microsoft/vscode-python/issues/15058
-   https://github.com/microsoft/vscode/issues/113736 (closed)

## Keybindings

-   ctrl+enter: (Smart) Execute selection or line in interactive window or debug console
    _and_ step
-   ctrl[-shift]-tab: Quick open of editors/files in group
-   ctrl-p: open recent projects/folders
-   [ctrl-]f12: Jump to or back from definition
-   ctrl[-shift]-[up|down]: move or select block-wise

## Recommended Settings

The extension will set a number of settings in your workspace configuration. If
you do not want the extension to update these settings you can disable that
behaviour by adding the following to your `settings.json`.

**settings.json**

```json
{
    "INWT.Python.IDE.updateWorkspaceSettings": false
}
```

For all tooling to work properly you can add the following configuration files
to your project.

**pyproject.toml**

```toml
[tool.nitpick]
style = "https://raw.githubusercontent.com/wemake-services/wemake-python-styleguide/master/styles/nitpick-style.toml"

[tool.flakehell]
base = "https://raw.githubusercontent.com/life4/flakehell/master/pyproject.toml"
baseline = ".flakehell_baseline"

[tool.black]
line-length = 100
target-version = ['py39']
include = '\.pyi?$'
exclude = '''
(
  /(
      \.eggs         # exclude a few common directories in the
    | \.git          # root of the project
    | \.hg
    | \.mypy_cache
    | \.tox
    | \.venv
    | _build
    | buck-out
    | build
    | dist
  )/
  | foo.py           # also separately exclude a file named foo.py in
                     # the root of the project
)
'''
```

**setup.cfg**

```
[darglint]
strictness = long

[flake8]
format = wemake
show-source = True
enable-extensions = G
radon-no-assert = True
radon-show-closures = True
max-string-usages = 5
max-line-length = 100
inline-quotes = "
# See https://wemake-python-stylegui.de/en/latest/pages/usage/configuration.html for all configurations
ignore =  D401,WPS305,   # ignore imperative mood check in docstring
# See https://wemake-python-stylegui.de/en/latest/pages/usage/violations/index.html for all error codes
per-file-ignores =
    # allow asserts in test files
    */tests/*: S101

[isort]
include_trailing_comma = True
multi_line_output = 3
line_length = 100
skip = setup.py
force_grid_wrap = 0
use_parentheses = True
ensure_newline_before_comments = True

[mypy]
ignore_missing_imports = True
```

## Pipenv

Consider to add the following packages to your pipenv:

```pipfile
[pipenv]
allow_prereleases = true

[dev-packages]
pytest = {version = "*"}
wemake-python-styleguide = {version = "*"}
isort = {version = "*"}
black = {version = "*"}
# darker = {version = "*"}
mypy = {version = "*"}
jupyter = {version = "*"}
```

## Autoformat in legacy codebase

`black` is a pretty aggressive code formatter and currently does not provide an
option to only format changes. For that you may use `darker`. Open
`./.vscode/settings.json` and change the black path to `darker`. Install darker
in your pipenv or system.

```json
"python.formatting.blackPath": "darker"
```

-   Darker will only format code that appears in a git diff. Run `git init` if your are not in a git repo already.
-   A new file has no diff and will not be reformated. It is enough to stage the empty file.

## Troubleshooting

### pytest cannot find tests

-   Update pytest to latest version, in your pipenv
-   Check output of pytest. Discovery fails when there are
    -   Syntax errors
    -   or when dependencies cannot be resolved. In which case:
        -   you check that you are inside the pipenv
        -   the module is actually available: e.g. update pipenv / install correct version

### pytest reports module not found errors of project package

-   Make sure in `setup.py` test folders and submodules are part of `package_data`
-   Make sure all sub folder (modules) have a `__init__.py` file. This may
    include the `tests` folder. See
    https://github.com/microsoft/vscode-python/issues/14570 and
    https://github.com/microsoft/vscode-python/issues/14579

### GOTO definition (F12) is not responding

Can happen if we do a lot of search and replaces in files. May also be correlated
with false positive lints of the LSP.

-   Restart language server by: `ctrl shift p`, then type _Restart language
    server_.
-   Or sometimes restart vscode and try again.

### isort puts imports in wrong order

#### Use absolute path for isort

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
