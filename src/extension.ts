// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('inwt-python-ide.jupyterExecAndStep', () => {
		vscode.commands.executeCommand('jupyter.execSelectionInteractive');
		vscode.commands.executeCommand('cursorDown');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('inwt-python-ide.debugExecAndStep', () => {
		let editor = vscode.window.activeTextEditor;
		let selectionIsEmpty = editor?.selection.isEmpty;
		if (selectionIsEmpty) {
			// When there is no selection, we select the current line.
			vscode.commands.executeCommand('expandLineSelection');
		}
		vscode.commands.executeCommand('editor.debug.action.selectionToRepl');
		// This looks bad. Essentially we just want to release the selection
		// and step into the next line. Moving the cursor up and down will do that.
		if (editor?.selection.isSingleLine && !selectionIsEmpty) {
			vscode.commands.executeCommand('cursorDown');
		}
		vscode.commands.executeCommand('cursorHome');
		//else {
		// 	vscode.commands.executeCommand('cursorUp');
		// 	vscode.commands.executeCommand('cursorDown');
		// }
	}));

}

// this method is called when your extension is deactivated
export function deactivate() { }
