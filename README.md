# C51 Extension

The C51 Program Compile 

## Language snippets

* `#uchar`: 'typedef unsigned char uchar;'
* `#uint`: 'typedef unsigned char uint;'
* `#inc`: '#include <reg52.h>'

## Extension Settings

This extension contributes the following settings:

* `C51.binDir`: The C51 Bin Directory
* `C51.OnlyOutputHexFile`: Only Output Hex File

## How to use

0. Before you start, Setting the C51 bin dir.
 ![Setting](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/4.jpg)

1. Create a .c file and wite your program.
 ![Create and write a .c file](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/1.jpg)

2. Click the right mouse button then click "Build C51".
 ![Build C51](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/2.jpg)

3. If your program no error, the hex file will created in the current dir.
![Complete!!!](https://raw.githubusercontent.com/Zuozishi/C51-Extension-for-VScode/master/image/3.jpg)

## Known Issues

### EN:
If some error on installing, please update vscode.

Program file name must have once '.c'. 

E.x : File name not support 'test.c.c'.
### CH:
如果拓展安装失败请确保VScode为最新版。

源码文件的文件名必须有一个“.c”。

例如：文件名不支持“test.c.c”，应为“test.c”。

## 更新日志

### 0.0.8

1. 语法高亮支持.
2. 自动补全支持.
3. 修复编译时终端窗口不清空问题.

### 0.0.5

修复大写 '.C' 文件不支持的问题.
(Thanks @wangnengquan's issue on github)

### 0.0.4

添加Github链接.

### 0.0.3

在README.me中添加“How to use ?”信息.

### 0.0.2

在 .c 文件编辑窗口中添加“Build C51”右键选项.
添加 "Only output hex file" 设置.

### 0.0.1

第一个发行版本.