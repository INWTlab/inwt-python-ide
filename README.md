# INWT Python IDE

## Description

This is an extension pack bundling useful vscode extensions to develop Python
packages. It is used as a starting point and configuration to set up vscode
at INWT Statistics.

## Troubleshooting

### pytest cannot find tests

- Update pytest to latest version
- Check output of pytest. Discovery fails when there are
  - Syntax errors
  - or when dependencies cannot be resolved. In which case:
    - you check that you are inside the pipenv
    - the module is actually available: e.g. update pipenv / install correct version
