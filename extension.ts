import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

var MsgText = null;

export const C51 = [
    { scheme: 'file', language: 'c' },
    { scheme: 'untitled', language: 'c' }
];

class GoDefinitionProvider implements vscode.DefinitionProvider {
    public provideDefinition(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
        let range = document.getWordRangeAtPosition(position);
        let text = document.getText(range);
        let lineText = document.lineAt(range.start.line).text;
        var c51Dir = vscode.workspace.getConfiguration("C51").get("binDir").toString();
        c51Dir = c51Dir.replace('\BIN', '');
        if (lineText.indexOf("#include") == 0) {
            var fileName = lineText.replace(" ","").replace("#include<", "").replace(">", "");
            return new vscode.Location(
                vscode.Uri.parse("file:///"+path.join(c51Dir, 'INC', fileName)), new vscode.Position(0, 0));
        }
        return null;
    }
}

export class C51HoverProvider implements vscode.HoverProvider {
    provideHover(document, position, token) {
        let range = document.getWordRangeAtPosition(position);
        let text = document.getText(range);
        if (MsgText.Hover.hasOwnProperty(text)) {
            var resText = "";
            if ((typeof MsgText.Hover[text]) == "object") {
                MsgText.Hover[text].forEach(element => {
                    resText += element + "\n\r";
                });
            } else {
                resText = MsgText.Hover[text];
            }
            return new vscode.Hover(resText);
        }
        return new vscode.Hover(null);
    }
}

function init(context) {
    fs.readFile(path.join(__dirname, 'text_zh.json'), 'utf-8', function (err, data) {
        MsgText = JSON.parse(data);
        activate(context);
    });
}

function activate(context) {
    console.log(MsgText.InitMsg);

    let hover = vscode.languages.registerHoverProvider(C51, new C51HoverProvider());
    let goDefinition = vscode.languages.registerDefinitionProvider(C51, new GoDefinitionProvider());
    context.subscriptions.push(hover);
    context.subscriptions.push(goDefinition);

    let disposable = vscode.commands.registerCommand('extension.buildC51', function () {
        var cmd = null;
        var binDir = vscode.workspace.getConfiguration("C51").get("binDir");
        var hexFile = vscode.workspace.getConfiguration("C51").get("OnlyOutputHexFile");
        if (vscode.window.activeTextEditor == null || vscode.window.activeTextEditor.document == null) {
            vscode.window.showErrorMessage(MsgText.AlertOpenFile);
            return;
        }
        //let digs=vscode.languages.getDiagnostics();
        for (let i = 0; i < vscode.window.terminals.length; i++) {
            if (vscode.window.terminals[i].name == "C51 CMD") {
                cmd = vscode.window.terminals[i];
                cmd.dispose();
            }
        }
        cmd = vscode.window.createTerminal("C51 CMD", "C:\\Windows\\System32\\cmd.exe");
        cmd.show();
        var filePath = vscode.window.activeTextEditor.document.fileName;
        filePath = filePath.replace(".c", "").replace(".C", "");
        cmd.sendText("@echo off");
        cmd.sendText("\"" + binDir + "\\C51.exe" + "\" " + "\"" + filePath + ".c\"", true);
        cmd.sendText("\"" + binDir + "\\BL51.exe" + "\" " + "\"" + filePath + ".OBJ\"", true);
        cmd.sendText("\"" + binDir + "\\OH51.exe" + "\" " + "\"" + filePath + "\"", true);
        if (hexFile) {
            cmd.sendText("del " + filePath + ".OBJ");
            cmd.sendText("del " + filePath + ".LST");
            cmd.sendText("del " + filePath + ".M51");
            cmd.sendText("del " + filePath);
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = init;

function deactivate() {
}
exports.deactivate = deactivate;