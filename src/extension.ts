// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('inwt-python-ide.jupyterExecAndStep', async () => {
		smartSelect();
		await delay(100);
		vscode.commands.executeCommand('jupyter.execSelectionInteractive');
		step();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('inwt-python-ide.debugExecAndStep', async () => {
		smartSelect();
		await delay(100);
		vscode.commands.executeCommand('editor.debug.action.selectionToRepl');
		step();
	}));

	function step() {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			let line = editor.document.lineAt(editor.selection.active.line + 1);
			while ((!lineIsCode(line) || isDecorator(line.text)) && isNotLastLine(line.lineNumber, editor.document.lineCount)) {
				line = editor.document.lineAt(line.lineNumber + 1);
			}
			editor.selection = newSelectionForCursor(line);
		}
	}

	function smartSelect() {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			let selectionIsEmpty = editor?.selection.isEmpty;
			if (selectionIsEmpty) {
				// We respect the selection of the user and leave it to
				// juypyter extension to handle all edge cases.
				// When the selection is empty, we expand the selection to the
				// next 'best' thing:
				//   1. When we are in the defining line of a block (class,
				//      function, loop, control structure): select the entire
				//      block
				//   2. When we are not in case 1 or 2, select the current line
				let line = editor.document.lineAt(editor.selection.active.line);
				if (isPythonCodeBlock(line)) {
					// select the code block
					let endLine = findEndLineOfPythonCodeBlock(line, editor.document);
					let startLine = findStartLineOfPythonCodeBlock(line, editor.document);
					editor.selection = newSelectionForBlock(startLine, endLine);
				} else {
					// otherwise use current line
					editor.selection = newSelectionForLine(line);
				}
			}
		}
	}

	function findStartLineOfPythonCodeBlock(line: vscode.TextLine, document: vscode.TextDocument) {
		// we check if there are any decorators before the current line. If so,
		// we find the most top level and return that as starting line
		let finalLine = line;
		while (line.lineNumber - 1 >= 0) {
			line = document.lineAt(line.lineNumber - 1);
			if (isDecorator(line.text)) {
				// is it a decorator?
				finalLine = line;
			} else {
				// if not we just stop here
				break;
			}
		}
		return finalLine;
	}

	function findEndLineOfPythonCodeBlock(line: vscode.TextLine, document: vscode.TextDocument) {
		let rootIndentation = levelOfIndentation(line.text);
		let finalLine = line;
		while (isNotLastLine(line.lineNumber + 1, document.lineCount)) {
			line = document.lineAt(line.lineNumber + 1);
			if (lineIsCode(line)) {
				if (levelOfIndentation(line.text) <= rootIndentation && !isExcept(line.text) && !isFinally(line.text) && !isElif(line.text) && !isElse(line.text)) {
					break;
				} else {
					finalLine = line;
				}
			}
		}
		return finalLine;
	}

	function isPythonCodeBlock(line: vscode.TextLine) {
		let isFunction = /^\s*def\s/.test(line.text);
		let isClass = /^\s*class\s/.test(line.text);
		let isTry = /^\s*try:/.test(line.text);
		let isForLoop = /^\s*for\s/.test(line.text);
		let isWhileLoop = /^\s*while\s/.test(line.text);
		let isContextManager = /^\s*with\s/.test(line.text);
		let isIf = /^\s*if\s/.test(line.text);
		return isFunction || isClass || isTry || isForLoop || isWhileLoop || isContextManager || isIf;
	}

	function isDecorator(text: string) {
		return /^\s*@/.test(text);
	}

	function isExcept(text: string) {
		return /^\s*except[\s:]/.test(text);
	}

	function isFinally(text: string) {
		return /^\s*finally:/.test(text);
	}

	function isElif(text: string) {
		return /^\s*elif\s/.test(text);
	}

	function isElse(text: string) {
		return /^\s*else:/.test(text);
	}

	function levelOfIndentation(line: string) {
		let regexpMatch = line.match(/^\s*/);
		if (regexpMatch === null) {
			return 0;
		} else {
			return regexpMatch[0].length;
		}
	}

	function newSelectionForBlock(line: vscode.TextLine, endLine: vscode.TextLine) {
		return new vscode.Selection(
			line.lineNumber,
			line.range.start.character,
			endLine.lineNumber,
			endLine.range.end.character);
	}

	function newSelectionForCursor(line: vscode.TextLine) {
		return new vscode.Selection(
			line.lineNumber,
			line.range.start.character,
			line.lineNumber,
			line.range.start.character);
	}

	function newSelectionForLine(line: vscode.TextLine) {
		return new vscode.Selection(
			line.lineNumber,
			line.range.start.character,
			line.lineNumber,
			line.range.end.character);
	}

	function isNotLastLine(currentLine: number | undefined, lineCount: number | undefined) {
		return (currentLine || 0) < (lineCount || 0);
	}

	function lineIsCode(line: vscode.TextLine | undefined) {
		// A line is empty when its empty, contains only whitespaces or a comment
		let lineText = line?.text || "";
		return !(line?.isEmptyOrWhitespace || /^\s*#/.test(lineText));
	}

	function delay(ms: number) {
		return new Promise( resolve => setTimeout(resolve, ms) );
	}


}

// this method is called when your extension is deactivated
export function deactivate() { }
