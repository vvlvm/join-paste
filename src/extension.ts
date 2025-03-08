import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('join-paste.join-paste', async () => {
		const clipboard = await vscode.env.clipboard.readText()

		if (!clipboard) {
			vscode.window.showInformationMessage('クリップボードが空です')
			return
		}

		const separator = await vscode.window.showInputBox({
			prompt: 'この文字列で繋げる',
		})

		if (separator === undefined) {
			return
		}

		const lines = clipboard.split(/[\n\r]+/g)
		const joinedText = lines.join(separator)

		const editor = vscode.window.activeTextEditor
		if (editor) {
			editor.edit((editBuilder) => {
				editor.selections.forEach((selection) => {
					editBuilder.replace(selection, joinedText)
				})
			})
		}
	})

	context.subscriptions.push(disposable)
}

export function deactivate() {}
