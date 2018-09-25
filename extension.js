// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "c51" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.buildC51', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        var cmd=null;
        for (let i = 0; i < vscode.window.terminals.length; i++) {
            if(vscode.window.terminals[i].name=="CMD")cmd=vscode.window.terminals[i];
        }
        if(cmd==null){
            cmd=vscode.window.createTerminal("CMD","C:\\Windows\\System32\\cmd.exe");
        }
        cmd.show();
        var log=vscode.window.createOutputChannel("C51");
        var binDir=vscode.workspace.getConfiguration("C51").get("binDir");
        var hexFile=vscode.workspace.getConfiguration("C51").get("OnlyOutputHexFile");
        var workDir=vscode.workspace.rootPath;
        if(workDir==undefined){
            vscode.window.showErrorMessage("请先打开工作目录");
            return;
        }
        if(vscode.workspace.textDocuments.length<=0){
            vscode.window.showErrorMessage("请先打开一个文件");
            return;
        }
        var filePath=vscode.workspace.textDocuments[0].fileName;
        filePath=filePath.replace(".c","");
        cmd.sendText("cls");
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

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;