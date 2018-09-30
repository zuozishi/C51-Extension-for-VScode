const vscode = require('vscode');

/*
const C51 = [
    { scheme: 'file', language: 'c' },
    { scheme: 'untitled', language: 'c' }
];

export class C51HoverProvider {
    provideHover(document, position, token) {
        let range=document.getWordRangeAtPosition(position);
        let text=document.getText(range);
        return new vscode.Hover("");
    }
}
*/
function activate(context) {
    console.log('Congratulations, extension "c51" is now active!');
    //let hover = vscode.languages.registerHoverProvider(C51, new C51HoverProvider.C51HoverProvider());
    //context.subscriptions.push(hover);
    
    let disposable = vscode.commands.registerCommand('extension.buildC51', function () {
        var cmd=null;
        //let digs=vscode.languages.getDiagnostics();
        for (let i = 0; i < vscode.window.terminals.length; i++) {
            if(vscode.window.terminals[i].name=="C51 CMD")
            {
                cmd=vscode.window.terminals[i];
                cmd.dispose();
            }
        }
        cmd=vscode.window.createTerminal("C51 CMD","C:\\Windows\\System32\\cmd.exe");
        cmd.show();
        var binDir=vscode.workspace.getConfiguration("C51").get("binDir");
        var hexFile=vscode.workspace.getConfiguration("C51").get("OnlyOutputHexFile");
        if(vscode.window.activeTextEditor==null || vscode.window.activeTextEditor.document==null){
            vscode.window.showErrorMessage("Please open a c file.");
            return;
        }
        var filePath=vscode.workspace.textDocuments[0].fileName;
        filePath=filePath.replace(".c","").replace(".C","");
        cmd.sendText("@echo off");
        cmd.sendText("\""+binDir+"\\C51.exe"+"\" "+"\""+filePath+".c\"",true);
        cmd.sendText("\""+binDir+"\\BL51.exe"+"\" "+"\""+filePath+".OBJ\"",true);
        cmd.sendText("\""+binDir+"\\OH51.exe"+"\" "+"\""+filePath+"\"",true);
        if(hexFile){
            cmd.sendText("del "+filePath+".OBJ");
            cmd.sendText("del "+filePath+".LST");
            cmd.sendText("del "+filePath+".M51");
            cmd.sendText("del "+filePath);
        }
    });
    
    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;