# Git忽略和 .gitignore

## Git 忽略

与他人共享您的代码时，通常有您不想共享的文件或项目的一部分。

例子

- 日志文件
- 临时文件
- 隐藏文件
- 个人档案
- 等等。

Git 可以使用文件指定 Git 应忽略项目的哪些文件或部分`.gitignore`。

Git 不会跟踪`.gitignore`. 但是，`.gitignore` 文件本身由**Git**跟踪。

------

## 创建 .gitignore

要创建`.gitignore`文件，请转到本地 Git 的根目录，然后创建它：

```
touch .gitignore
```

现在使用文本编辑器打开文件。

我们将添加两个简单的规则：

- 忽略任何带有`.log`扩展名的文件
- 忽略任何名为的目录中的所有内容`temp`

```shell
# ignore ALL .log files
*.log

# ignore ALL files in ANY directory named temp
temp/
```

现在，Git 将忽略文件夹`.log`中的所有文件和任何内容 。`temp`

**注意：**`.gitignore`在这种情况下，我们使用适用于整个存储库的单个。

也可以`.gitignore`在子目录中包含其他文件。这些仅适用于该目录中的文件或文件夹。

------

------

## .gitignore 的规则

以下是`.gitignore` 文件中匹配模式的一般规则： 

| Pattern                          | Explanation/Matches                                          | Examples                                                     |
| :------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
|                                  | Blank lines are ignored                                      |                                                              |
| # *text comment*                 | Lines starting with # are ignored                            |                                                              |
| *name*                           | All *name* files, *name* folders, and files and folders in any *name* folder | /name.log /name/file.txt /lib/name.log                       |
| *name*/                          | Ending with / specifies the pattern is for a folder. Matches all files and folders in any *name* folder | /name/file.txt /name/log/name.log  **no match:** /name.log   |
| *name*.*file*                    | All files with the *name.file*                               | /name.file /lib/name.file                                    |
| */name*.*file*                   | Starting with / specifies the pattern matches only files in the root folder | /name.file  **no match:** /lib/name.file                     |
| *lib/name*.*file*                | Patterns specifiing files in specific folders are always realative to root (even if you do not start with / ) | /lib/name.file  **no match:** name.file /test/lib/name.file  |
| ***/lib/name.file*               | Starting with ** before / specifies that it matches any folder in the repository. Not just on root. | /lib/name.file /test/lib/name.file                           |
| ***/name*                        | All *name* folders, and files and folders in any *name* folder | /name/log.file /lib/name/log.file /name/lib/log.file         |
| /lib/***/name*                   | All *name* folders, and files and folders in any *name* folder within the lib folder. | /lib/name/log.file /lib/test/name/log.file /lib/test/ver1/name/log.file  **no match:** /name/log.file |
| *.*file*                         | All files withe *.file* extention                            | /name.file /lib/name.file                                    |
| **name*/                         | All folders ending with *name*                               | /lastname/log.file /firstname/log.file                       |
| *name*?.*file*                   | ? matches a **single** non-specific character                | /names.file /name1.file  **no match:** /names1.file          |
| *name*[a-z].*file*               | [*range*] matches a **single** character in the specified range (in this case a character in the range of a-z, and also be numberic.) | /names.file /nameb.file  **no match:** /name1.file           |
| *name*[abc].*file*               | [*set*] matches a **single** character in the specified set of characters (in this case either a, b, or c) | /namea.file /nameb.file  **no match:** /names.file           |
| *name*[!abc].*file*              | [!*set*] matches a **single** character, **except** the ones spesified in the set of characters (in this case a, b, or c) | /names.file /namex.file  **no match:** /namesb.file          |
| *.*file*                         | All files withe *.file* extention                            | /name.file /lib/name.file                                    |
| *name*/ !*name*/secret.log       | ! specifies a negation or exception. Matches all files and folders in any *name* folder, except name/secret.log | /name/file.txt /name/log/name.log  **no match:** /name/secret.log |
| *.*file *!*name*.file            | ! specifies a negation or exception. All files withe *.file* extention, except name.file | /log.file /lastname.file  **no match:** /name.file           |
| *.*file *!*name*/**.file* junk.* | Adding new patterns after a negation will re-ignore a previous negated file All files withe *.file* extention, except the ones in *name* folder. Unless the file name is junk | /log.file /name/log.file  **no match:** /name/junk.file      |

------

## 本地和个人 Git 忽略规则

也可以忽略文件或文件夹，但不在分布式`.gitignore`文件中显示。

这些类型的忽略在` .git/info/exclude`文件中指定。它的工作方式与其他人相同， `.gitignore`但不会显示给其他任何人。