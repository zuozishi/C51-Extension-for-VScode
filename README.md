# C51 Extension

The C51 Program Compile 

## How to use

0. Before you start, Setting the C51 bin dir.
 ![Setting](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/4.jpg)

1. Create a .c file and wite your program.
 ![Create and write a .c file](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/1.jpg)

2. Click the right mouse button then click "Build C51".
 ![Build C51](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/2.jpg)

3. If your program no error, the hex file will created in the current dir.
![Complete!!!](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/3.jpg)

## Extension Settings

This extension contributes the following settings:

* `C51.binDir`: The C51 Bin Directory

## Known Issues

If some error on installing, please update vscode.

Program file name must have once '.c'. 

E.x : File name not support 'test.c.c'.

### 0.0.5

Fix .C file not support error.
(Thanks @wangnengquan's issue on github)

### 0.0.4

Add github link.

### 0.0.3

Update README.md file (Add block "How to use?").

### 0.0.2

Add "Build C51" context menu for .c file.
Add "Only output hex file" Setting.

### 0.0.1

First Release