// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var player = require('play-sound')();

interface VSCodeKeybinding {
  key: string;
  command: string;
  when: string;
}

const packagejson: {
  contributes: {
    keybindings: VSCodeKeybinding[];
  }
} = require('../../package.json');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-typewriter" is now active!');

    for (let { key } of packagejson.contributes.keybindings) {
        const isShift = new RegExp('Shift\\+', "gi");

        if (isShift.test(key)) {
            key = key.replace(isShift, '').toLocaleUpperCase();
        }
        let disposable = vscode.commands.registerCommand(`extension.typewriter_${ key }`, () => {
            handleKey(key);
        });

        context.subscriptions.push(disposable);
    }
}

async function handleKey(key: string) : Promise<void> {
    switch(key){
        case 'backspace':
        await vscode.commands.executeCommand('deleteLeft');
        break;
        case 'tab':
        await vscode.commands.executeCommand('tab');
        break;
        case 'space':
        await vscode.commands.executeCommand('default:type', {
            text: ' '
        }); 
        break;
        default:
        await vscode.commands.executeCommand('default:type', {
            text: key
        }); 
        break;
    };
    return new Promise<void>((resolve, reject) => {  
        player.play(__dirname + '/../../audio/typewriter-key.mp3', err => { 
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}
