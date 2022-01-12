# Change Log

## [0.6.0] - 2022-01-12

### Removed

-   CoenraadS.bracket-pair-colorizer-2 as dependency, see:
    https://github.com/CoenraadS/Bracket-Pair-Colorizer-2#readme for details.

### Changed

-   'python' is now the default smart execute engine, since
    https://github.com/microsoft/vscode-python/issues/15058 is resolved. We may remove the
    'internal' engine in a future release.

## [0.5.2] - 2021-08-06

### Fixed

-   Smart execute will now correctly identify function definitions where the signature is spanning
    multiple lines. We now also identify blocks of code which are defined by opening/closing
    paranthesis and spanning multiple lines. E.g. a list comprehension or definition of a dict.

## [0.5.1] - 2021-07-30

### Added

-   Added a INWT brand logo to the extension.

## [0.5.0] - 2021-07-30

### Added

-   We now set vscode workspace setting for vscode in a new project.
-   The extension now provides a smart execute option. Here we identify code blocks (def, class,
    if-else, while, for, etc) and execute the entire block in the REPL.

### Changed

-   Error Lens is disabled by default. You can enable it by setting `errorLens.messageEnabled` in
    your `settings.json`.
-   By default we now use the Python REPL instead of Jupyter interactive as REPL. You can change
    this behaviour in the settings.
