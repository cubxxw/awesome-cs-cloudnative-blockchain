```shell
"vim的配置关于鼠标滚动滑动"""
if has("autocmd")
  au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
  set mouse=a
endif
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"C，C++ 按F5编译运行
map <F5> :call CompileRunGcc()<CR>
func! CompileRunGcc()
    exec "w"
    if &filetype == 'c'
        exec "!g++ % -o %<"
        exec "! ./%<"
    elseif &filetype == 'cpp'
        exec "!g++ % -o %<"
        exec "! ./%<"
    elseif &filetype == 'java' 
        exec "!javac %" 
        exec "!java %<"
    elseif &filetype == 'sh'
        :!./%
    endif
endfunc
"配置命令"
"C,C++的调试
"''''''''''''''''""""""""""""""""""""""""""""""""""'''''''''''''''''''''
map <F8> :call Rungdb()<CR>
func! Rungdb()
    exec "w"
    exec "!g++ % -g -o %<"
    exec "!gdb ./%<"
endfunc
 
""实用设置
" 设置当文件被改动时自动载入
set autoread
" quickfix模式
autocmd FileType c,cpp map <buffer> <leader><space> :w<cr>:make<cr>
"代码补全 
set completeopt=preview,menu  
"""""新文件标题""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"新建.c,.h,.sh,.java文件，自动插入文件头 
 
autocmd BufNewFile *.cpp,*py,*.[ch],*.go,*.sh,*.java exec ":call SetTitle()" 
 
""定义函数SetTitle，自动插入文件头 
 
func SetTitle() 
 
    "如果文件类型为.sh文件 
    if &filetype == 'sh' 
        call setline(1,"\#########################################################################") 
        call append(line("."), "\# File Name: ".expand("%")) 
        call append(line(".")+1, "\# Author: smile") 
        call append(line(".")+2, "\# mail: 3293172751nss@gmail.com") 
        call append(line(".")+3, "\# Created Time: ".strftime("%c")) 
        call append(line(".")+4, "\#########################################################################") 
        call append(line(".")+5, "\#!/bin/bash") 
        call append(line(".")+6, "") 
 
    else 
        call setline(1, "/*************************************************************************") 
        call append(line("."), "    > File Name: ".expand("%")) 
        call append(line(".")+1, "    > Author: smile") 
        call append(line(".")+2, "    > Mail: 3293172751nss@gmail.com ") 
        call append(line(".")+3, "    > Created Time: ".strftime("%c")) 
        call append(line(".")+4, " ************************************************************************/") 
        call append(line(".")+5, "")
 
    endif
 
    if &filetype == 'cpp'
 
        call append(line(".")+6, "#include<iostream>")
 
        call append(line(".")+7, "using namespace std;")
 
        call append(line(".")+8, "")
 
    endif

    if &filetype == 'c'
 
        call append(line(".")+6, "#include<stdio.h>")
 
        call append(line(".")+7, "")
 
    endif
 
    "新建文件后，自动定位到文件末尾
    autocmd BufNewFile * normal G
endfunc 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""自动补全

:inoremap ( ()<ESC>i

:inoremap ) <c-r>=ClosePair(')')<CR>

:inoremap { {<CR>}<ESC>O

:inoremap } <c-r>=ClosePair('}')<CR>

:inoremap [ []<ESC>i

:inoremap ] <c-r>=ClosePair(']')<CR>

:inoremap " ""<ESC>i
:inoremap ' ''<ESC>i
function! ClosePair(char)
    if getline('.')[col('.') - 1] == a:char
        return "\<Right>"
    else
        return a:char
    endif
endfunction
filetype plugin indent on
"打开文件类型检测, 加了这句才可以用智能补全

set completeopt=longest,menu
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""":::::::::::::
  noremap <F6> :set nu
  noremap <F4> :!python3 a  
  noremap <F7> :set ai
  noremap <F8> :syntax on
  set cursorline     " 突出显示当前行
  set magic          " 设置魔术
 "" noremap <F5> :! g++ -o a 
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
nmap wj :resize -3<CR>
nmap wk :resize +3<CR>
nmap wh :vertical resize -3<CR>
nmap wl :vertical resize +3<CR>
set guifont=Droid\ Sans\ Mono\ Nerd\ Font\ Complete:h18 " 设置字体
set guicursor=n-v-c:ver5    " 设置光标为竖线
set number ""# 显示行号
set autowrite "" # 自动保存
set ruler  ""# 显示打开状态栏标尺
set cursorline "" # 突出显示当前行

set showmatch "" # 匹配光标所经过的括号等.
set showcmd ""# 命令行显示输入的命令
set showmode ""命令行显示vim当前模式
set showtabline=0           " 隐藏Tab栏
set laststatus=2 """"'vim 窗口底部显示永久状态栏，显示文件名，行号，列号等.
let mapleader = ","      " 定义<leader>键
set nocompatible         " 设置不兼容原始vi模式
filetype on              " 设置开启文件类型侦测
filetype plugin on       " 设置加载对应文件类型的插件
set noeb                 " 关闭错误的提示
syntax enable            " 开启语法高亮功能
syntax on                " 自动语法高亮
set cmdheight=2          " 设置命令行的高度
set showcmd              " select模式下显示选中的行数
set ruler                " 总是显示光标位置
set laststatus=2         " 总是显示状态栏
set number               " 开启行号显示
set cursorline           " 高亮显示当前行
set whichwrap+=<,>,h,l   " 设置光标键跨行
set ttimeoutlen=0        " 设置<ESC>键响应时间
set virtualedit=block,onemore   " 允许光标出现在最后一个字符的后面

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 代码缩进和排版
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set autoindent           " 设置自动缩进
set cindent              " 设置使用C/C++语言的自动缩进方式
set cinoptions=g0,:0,N-s,(0    " 设置C/C++语言的具体缩进方式
set smartindent          " 智能的选择对其方式
filetype indent on       " 自适应不同语言的智能缩进
set expandtab            " 将制表符扩展为空格
set tabstop=4            " 设置编辑时制表符占用空格数
set shiftwidth=4         " 设置格式化时制表符占用空格数
set softtabstop=4        " 设置4个空格为制表符
set smarttab             " 在行和段开始处使用制表符
set nowrap               " 禁止折行
set backspace=2          " 使用回车键正常处理indent,eol,start等
set sidescroll=10        " 设置向右滚动字符数
set nofoldenable         " 禁用折叠代码

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 代码补全
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set wildmenu             " vim自身命名行模式智能补全
set completeopt-=preview " 补全时不显示窗口，只显示补全列表

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 搜索设置
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set hlsearch            " 高亮显示搜索结果
set incsearch           " 开启实时搜索功能
set ignorecase          " 搜索时大小写不敏感

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 缓存设置
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set nobackup            " 设置不备份
set noswapfile          " 禁止生成临时文件
set autoread            " 文件在vim之外修改过，自动重新读入
set autowrite           " 设置自动保存
set confirm             " 在处理未保存或只读文件的时候，弹出确认

""""""""""""""""""""""""""""""""""""""""""""""""""""
"调整窗
nmap wj :resize -3<CR>
nmap wk :resize +3<CR>
nmap wh :vertical resize -3<CR>
nmap wl :vertical resize +3<CR>

"编码"
set langmenu=zh_CN.UTF-8
set helplang=cn
set termencoding=utf-8
set encoding=utf8
set fileencodings=utf8,ucs-bom,gbk,cp936,gb2312,gb18030

"代码补全“
inoremap ' ''<ESC>i
inoremap " ""<ESC>i
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap { {<CR>}<ESC>O
 : set nu
 : set ai
 : syntax on
 : filetype on
  set tabstop=4
  set ignorecase
noremap <C-h> <C -w>h
noremap <C-j> <C -w>j
noremap <C-k> <C -w>r
noremap <C-l> <C -w>l
" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'
let g:coc_disable_startup_warning = 1 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

"目录数"defx"
" 文件树设置 {{{
" 关闭NERDTree快捷键
map <leader>t :NERDTreeToggle<CR>
""当NERDTree为剩下的唯一窗口时自动关闭
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
""修改树的显示图标
let g:NERDTreeDirArrowExpandable = '►'
let g:NERDTreeDirArrowCollapsible = '▼'
let NERDTreeAutoCenter=1
" 显示行号
let NERDTreeShowLineNumbers=1
" 是否显示隐藏文件
let NERDTreeShowHidden=1
" 设置宽度
let NERDTreeWinSize=25
" 在终端启动vim时，共享NERDTree
let g:nerdtree_tabs_open_on_console_startup=1
" 忽略一下文件的显示
let NERDTreeIgnore=['\.pyc','\~$','\.swp']
let g:NERDTreeIndicatorMapCustom = {
    \ "Modified"  : "✹",
    \ "Staged"    : "✚",
    \ "Untracked" : "✭",
    \ "Renamed"   : "➜",
    \ "Unmerged"  : "═",
    \ "Deleted"   : "✖",
    \ "Dirty"     : "✗",
    \ "Clean"     : "✔︎",
    \ 'Ignored'   : '☒',
    \ "Unknown"   : "?"
    \ }
" }}}
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
call plug#begin('~/.vim/plugged')

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"tmux"
"复用终端、分屏"
"let g:EasyMotion_startofline = 0 " keep cursor colum when JK motion
map <Leader><leader>h <Plug>(easymotion-linebackward)
map <Leader><Leader>j <Plug>(easymotion-j)
map <Leader><Leader>k <Plug>(easymotion-k)
map <Leader><leader>l <Plug>(easymotion-lineforward)
" 重复上一次操作, 类似repeat插件, 很强大
map <Leader><leader>. <Plug>(easymotion-repeat)
nmap s <Plug>(easymotion-s)
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""里面安装插件"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Plug 'mhinz/vim-startify'

"Plug 'vim-airline/vim-airline'
"Plug 'vim-airline/vim-airline-themes'

""P
Plug 'neoclide/coc.nvim', {'branch': 'reliase'}
"快速跳转"
Plug 'https://github.com/easymotion/vim-easymotion.git'

Plug 'https://github.com/tpope/vim-surround.git'
Plug 'terryma/vim-multiple-cursors'
Plug 'junegunn/vim-easy-align'
Plug 'https://github.com/tpope/vim-repeat.git'
Plug 'https://github.com/tpope/vim-fugitive.git' " Git integration
Plug 'junegunn/gv.vim' " Git log
Plug 'https://github.com/Yggdroot/LeaderF.git'
Plug 'https://github.com/skywind3000/asyncrun.vim.git'
Plug 'chrisbra/vim-diff-enhanced'
Plug 'francoiscabrol/ranger.vim'
"Plug 'preservim/nerdtree'
""""""""""""""""""""""''''""""""""""""""""
"模糊搜索"
Plug 'ctrlpvim/ctrlp.vim'
""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""''''"""""""""""""""""""""""""""""
if has('nvim')
  Plug 'Shougo/defx.nvim', { 'do': ':UpdateRemotePlugins' }
else
  Plug 'Shougo/defx.nvim'
  Plug 'roxma/nvim-yarp'
  Plug 'roxma/vim-hug-neovim-rpc'
endif
"defx注意看要求，需要vim8.2+"
""""""""""""""""""""""""""""""""""""""""""
"代码补全插件"
"deoplete.nvim"
""if has('nvim')
""  Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
""else
 "" Plug 'Shougo/deoplete.nvim'
 "" Plug 'roxma/nvim-yarp'
""  Plug 'roxma/vim-hug-neovim-rpc'
""endif
""let g:deoplete#enable_at_startup = 1
""""""""""""""""""""""""""""""""""""""""""
"solarized配色
Plug 'altercation/vim-colors-solarized'
"Plug 'w0ng/vim-hybrid'
" Initialize plugin system

  Plug 'preservim/nerdtree'

call plug#end()
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"目录树配置"

call defx#custom#option('_', {
      \ 'winwidth': 30,
      \ 'split': 'vertical',
      \ 'direction': 'topleft',
      \ 'show_ignored_files': 0,
      \ 'buffer_name': '',
      \ 'toggle': 1,
      \ 'resume': 1
      \ })
map <F3> :NERDTreeMirror<CR>

map <F3> :NERDTreeToggle<CR>"<F3>显示或隐藏"
"颜色--solarized方案"
syntax enable
set background=light
colorscheme solarized
syntax enable
set background=dark
colorscheme solarized
"coc"
" Use `[g` and `]g` to navigate diagnostics
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)


" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

map <C-n> :NERDTreeToggle<CR>

"模糊查询配置"
let g:ctrlp_map='<c-p>'
"使用c+P调用模糊查询"

"自动补全"
let g:deoplete#enable_at_startup =1
set completeopt-=preview

[root@mail ~]# vim ~/.vimrc
[root@mail ~]# cat ~/.vimrc
"C，C++ 按F5编译运行
map <F5> :call CompileRunGcc()<CR>
func! CompileRunGcc()
    exec "w"
    if &filetype == 'c'
        exec "!g++ % -o %<"
        exec "! ./%<"
    elseif &filetype == 'cpp'
        exec "!g++ % -o %<"
        exec "! ./%<"
    elseif &filetype == 'java' 
        exec "!javac %" 
        exec "!java %<"
    elseif &filetype == 'sh'
        :!./%
    endif
endfunc
"配置命令"
"C,C++的调试
"''''''''''''''''""""""""""""""""""""""""""""""""""'''''''''''''''''''''
map <F8> :call Rungdb()<CR>
func! Rungdb()
    exec "w"
    exec "!g++ % -g -o %<"
    exec "!gdb ./%<"
endfunc
 
""实用设置
" 设置当文件被改动时自动载入
set autoread
" quickfix模式
autocmd FileType c,cpp map <buffer> <leader><space> :w<cr>:make<cr>
"代码补全 
set completeopt=preview,menu  
"""""新文件标题""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"新建.c,.h,.sh,.java文件，自动插入文件头 
 
autocmd BufNewFile *.cpp,*py,*.[ch],*.go,*.sh,*.java exec ":call SetTitle()" 
 
""定义函数SetTitle，自动插入文件头 
 
func SetTitle() 
 
    "如果文件类型为.sh文件 
    if &filetype == 'sh' 
        call setline(1,"\#########################################################################") 
        call append(line("."), "\# File Name: ".expand("%")) 
        call append(line(".")+1, "\# Author: smile") 
        call append(line(".")+2, "\# mail: 3293172751nss@gmail.com") 
        call append(line(".")+3, "\# Created Time: ".strftime("%c")) 
        call append(line(".")+4, "\#########################################################################") 
        call append(line(".")+5, "\#!/bin/bash") 
        call append(line(".")+6, "") 
 
    else 
        call setline(1, "/*************************************************************************") 
        call append(line("."), "    > File Name: ".expand("%")) 
        call append(line(".")+1, "    > Author: smile") 
        call append(line(".")+2, "    > Mail: 3293172751nss@gmail.com ") 
        call append(line(".")+3, "    > Created Time: ".strftime("%c")) 
        call append(line(".")+4, " ************************************************************************/") 
        call append(line(".")+5, "")
 
    endif
 
    if &filetype == 'cpp'
 
        call append(line(".")+6, "#include<iostream>")
 
        call append(line(".")+7, "using namespace std;")
 
        call append(line(".")+8, "")
 
    endif

    if &filetype == 'c'
 
        call append(line(".")+6, "#include<stdio.h>")
 
        call append(line(".")+7, "")
 
    endif
 
    "新建文件后，自动定位到文件末尾
    autocmd BufNewFile * normal G
endfunc 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""自动补全

:inoremap ( ()<ESC>i

:inoremap ) <c-r>=ClosePair(')')<CR>

:inoremap { {<CR>}<ESC>O

:inoremap } <c-r>=ClosePair('}')<CR>

:inoremap [ []<ESC>i

:inoremap ] <c-r>=ClosePair(']')<CR>

:inoremap " ""<ESC>i
:inoremap ' ''<ESC>i
function! ClosePair(char)
    if getline('.')[col('.') - 1] == a:char
        return "\<Right>"
    else
        return a:char
    endif
endfunction
filetype plugin indent on
"打开文件类型检测, 加了这句才可以用智能补全

set completeopt=longest,menu
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""":::::::::::::
  noremap <F6> :set nu
  noremap <F4> :!python3 a  
  noremap <F7> :set ai
  noremap <F8> :syntax on
  set cursorline     " 突出显示当前行
  set magic          " 设置魔术
 "" noremap <F5> :! g++ -o a 
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
nmap wj :resize -3<CR>
nmap wk :resize +3<CR>
nmap wh :vertical resize -3<CR>
nmap wl :vertical resize +3<CR>
set guifont=Droid\ Sans\ Mono\ Nerd\ Font\ Complete:h18 " 设置字体
set guicursor=n-v-c:ver5    " 设置光标为竖线
set number ""# 显示行号
set autowrite "" # 自动保存
set ruler  ""# 显示打开状态栏标尺
set cursorline "" # 突出显示当前行

set showmatch "" # 匹配光标所经过的括号等.
set showcmd ""# 命令行显示输入的命令
set showmode ""命令行显示vim当前模式
set showtabline=0           " 隐藏Tab栏
set laststatus=2 """"'vim 窗口底部显示永久状态栏，显示文件名，行号，列号等.
let mapleader = ","      " 定义<leader>键
set nocompatible         " 设置不兼容原始vi模式
filetype on              " 设置开启文件类型侦测
filetype plugin on       " 设置加载对应文件类型的插件
set noeb                 " 关闭错误的提示
syntax enable            " 开启语法高亮功能
syntax on                " 自动语法高亮
set cmdheight=2          " 设置命令行的高度
set showcmd              " select模式下显示选中的行数
set ruler                " 总是显示光标位置
set laststatus=2         " 总是显示状态栏
set number               " 开启行号显示
set cursorline           " 高亮显示当前行
set whichwrap+=<,>,h,l   " 设置光标键跨行
set ttimeoutlen=0        " 设置<ESC>键响应时间
set virtualedit=block,onemore   " 允许光标出现在最后一个字符的后面

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 代码缩进和排版
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set autoindent           " 设置自动缩进
set cindent              " 设置使用C/C++语言的自动缩进方式
set cinoptions=g0,:0,N-s,(0    " 设置C/C++语言的具体缩进方式
set smartindent          " 智能的选择对其方式
filetype indent on       " 自适应不同语言的智能缩进
set expandtab            " 将制表符扩展为空格
set tabstop=4            " 设置编辑时制表符占用空格数
set shiftwidth=4         " 设置格式化时制表符占用空格数
set softtabstop=4        " 设置4个空格为制表符
set smarttab             " 在行和段开始处使用制表符
set nowrap               " 禁止折行
set backspace=2          " 使用回车键正常处理indent,eol,start等
set sidescroll=10        " 设置向右滚动字符数
set nofoldenable         " 禁用折叠代码

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 代码补全
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set wildmenu             " vim自身命名行模式智能补全
set completeopt-=preview " 补全时不显示窗口，只显示补全列表

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 搜索设置
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set hlsearch            " 高亮显示搜索结果
set incsearch           " 开启实时搜索功能
set ignorecase          " 搜索时大小写不敏感

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 缓存设置
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set nobackup            " 设置不备份
set noswapfile          " 禁止生成临时文件
set autoread            " 文件在vim之外修改过，自动重新读入
set autowrite           " 设置自动保存
set confirm             " 在处理未保存或只读文件的时候，弹出确认

""""""""""""""""""""""""""""""""""""""""""""""""""""
"调整窗
nmap wj :resize -3<CR>
nmap wk :resize +3<CR>
nmap wh :vertical resize -3<CR>
nmap wl :vertical resize +3<CR>

"编码"
set langmenu=zh_CN.UTF-8
set helplang=cn
set termencoding=utf-8
set encoding=utf8
set fileencodings=utf8,ucs-bom,gbk,cp936,gb2312,gb18030

"代码补全“
inoremap ' ''<ESC>i
inoremap " ""<ESC>i
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap { {<CR>}<ESC>O
 : set nu
 : set ai
 : syntax on
 : filetype on
  set tabstop=4
  set ignorecase
noremap <C-h> <C -w>h
noremap <C-j> <C -w>j
noremap <C-k> <C -w>r
noremap <C-l> <C -w>l
" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'
let g:coc_disable_startup_warning = 1 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

"目录数"defx"
" 文件树设置 {{{
" 关闭NERDTree快捷键
map <leader>t :NERDTreeToggle<CR>
""当NERDTree为剩下的唯一窗口时自动关闭
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
""修改树的显示图标
let g:NERDTreeDirArrowExpandable = '►'
let g:NERDTreeDirArrowCollapsible = '▼'
let NERDTreeAutoCenter=1
" 显示行号
let NERDTreeShowLineNumbers=1
" 是否显示隐藏文件
let NERDTreeShowHidden=1
" 设置宽度
let NERDTreeWinSize=25
" 在终端启动vim时，共享NERDTree
let g:nerdtree_tabs_open_on_console_startup=1
" 忽略一下文件的显示
let NERDTreeIgnore=['\.pyc','\~$','\.swp']
let g:NERDTreeIndicatorMapCustom = {
    \ "Modified"  : "✹",
    \ "Staged"    : "✚",
    \ "Untracked" : "✭",
    \ "Renamed"   : "➜",
    \ "Unmerged"  : "═",
    \ "Deleted"   : "✖",
    \ "Dirty"     : "✗",
    \ "Clean"     : "✔︎",
    \ 'Ignored'   : '☒',
    \ "Unknown"   : "?"
    \ }
" }}}
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
call plug#begin('~/.vim/plugged')

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"tmux"
"复用终端、分屏"
"let g:EasyMotion_startofline = 0 " keep cursor colum when JK motion
map <Leader><leader>h <Plug>(easymotion-linebackward)
map <Leader><Leader>j <Plug>(easymotion-j)
map <Leader><Leader>k <Plug>(easymotion-k)
map <Leader><leader>l <Plug>(easymotion-lineforward)
" 重复上一次操作, 类似repeat插件, 很强大
map <Leader><leader>. <Plug>(easymotion-repeat)
nmap s <Plug>(easymotion-s)
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""里面安装插件"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Plug 'mhinz/vim-startify'

"Plug 'vim-airline/vim-airline'
"Plug 'vim-airline/vim-airline-themes'

""P
Plug 'neoclide/coc.nvim', {'branch': 'reliase'}
"快速跳转"
Plug 'https://github.com/easymotion/vim-easymotion.git'

Plug 'https://github.com/tpope/vim-surround.git'
Plug 'terryma/vim-multiple-cursors'
Plug 'junegunn/vim-easy-align'
Plug 'https://github.com/tpope/vim-repeat.git'
Plug 'https://github.com/tpope/vim-fugitive.git' " Git integration
Plug 'junegunn/gv.vim' " Git log
Plug 'https://github.com/Yggdroot/LeaderF.git'
Plug 'https://github.com/skywind3000/asyncrun.vim.git'
Plug 'chrisbra/vim-diff-enhanced'
Plug 'francoiscabrol/ranger.vim'
"Plug 'preservim/nerdtree'
""""""""""""""""""""""''''""""""""""""""""
"模糊搜索"
Plug 'ctrlpvim/ctrlp.vim'
""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""''''"""""""""""""""""""""""""""""
if has('nvim')
  Plug 'Shougo/defx.nvim', { 'do': ':UpdateRemotePlugins' }
else
  Plug 'Shougo/defx.nvim'
  Plug 'roxma/nvim-yarp'
  Plug 'roxma/vim-hug-neovim-rpc'
endif
"defx注意看要求，需要vim8.2+"
""""""""""""""""""""""""""""""""""""""""""
"代码补全插件"
"deoplete.nvim"
""if has('nvim')
""  Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
""else
 "" Plug 'Shougo/deoplete.nvim'
 "" Plug 'roxma/nvim-yarp'
""  Plug 'roxma/vim-hug-neovim-rpc'
""endif
""let g:deoplete#enable_at_startup = 1
""""""""""""""""""""""""""""""""""""""""""
"solarized配色
Plug 'altercation/vim-colors-solarized'
"Plug 'w0ng/vim-hybrid'
" Initialize plugin system

  Plug 'preservim/nerdtree'

call plug#end()
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"目录树配置"

call defx#custom#option('_', {
      \ 'winwidth': 30,
      \ 'split': 'vertical',
      \ 'direction': 'topleft',
      \ 'show_ignored_files': 0,
      \ 'buffer_name': '',
      \ 'toggle': 1,
      \ 'resume': 1
      \ })
map <F3> :NERDTreeMirror<CR>

map <F3> :NERDTreeToggle<CR>"<F3>显示或隐藏"
"颜色--solarized方案"
syntax enable
set background=light
colorscheme solarized
syntax enable
set background=dark
colorscheme solarized
"coc"
" Use `[g` and `]g` to navigate diagnostics
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)


" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

map <C-n> :NERDTreeToggle<CR>

"模糊查询配置"
let g:ctrlp_map='<c-p>'
"使用c+P调用模糊查询"

"自动补全"
let g:deoplete#enable_at_startup =1
set completeopt-=preview
```

