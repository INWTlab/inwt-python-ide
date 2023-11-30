// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    updateWorkspaceSettingsAccordingToINWTStandards();
}

// this method is called when your extension is deactivated
export function deactivate() {}

function updateWorkspaceSettingsAccordingToINWTStandards() {
    if (getConfigUpdateSettings()) {
        setWorkspaceSetting("files", "trimTrailingWhitespace", true);
        setWorkspaceSetting("files", "insertFinalNewline", true);
        setWorkspaceSetting("python", "autoComplete.addBrackets", true);
        setWorkspaceSetting("python", "linting.flake8Enabled", true);
        setWorkspaceSetting("python", "terminal.activateEnvInCurrentTerminal", true);
        setWorkspaceSetting("python", "testing.pytestEnabled", true);
        setWorkspaceSetting("python", "formatting.provider", "black");
        setWorkspaceSetting("python", "formatting.blackPath", "black");
        setWorkspaceSetting("python", "sortImports.path", "isort");
        setWorkspaceSetting("python", "languageServer", "Pylance");
        setWorkspaceSetting("python", "analysis.completeFunctionParens", true);
        setWorkspaceSetting("vsintellicode", "sql.completionsEnabled", false);
    }
}

async function setWorkspaceSetting(
    extension: string,
    key: string,
    value: string | boolean | number,
) {
    let config = vscode.workspace.getConfiguration(extension);
    let configState = config.inspect(key);
    if (configState !== undefined && configState.workspaceValue === undefined) {
        await config.update(key, value, false);
    }
}

function getConfigUpdateSettings(): boolean {
    return vscode.workspace.getConfiguration("INWT.Python.IDE.V2").updateWorkspaceSettings;
}
