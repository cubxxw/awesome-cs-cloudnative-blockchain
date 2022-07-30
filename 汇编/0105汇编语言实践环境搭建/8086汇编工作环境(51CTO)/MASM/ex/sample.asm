stacks segment stack
       dw 128 dup(?)
stacks ends

datas segment
string db 'Welcome!',0dh,0ah,'$'
datas ends

codes segment
     assume cs:codes,ds:datas
     start:
      mov ax,datas
      mov ds,ax
      lea dx,string
      mov ah,9
      int 21h
      mov ah,4ch
      int 21h
codes ends
      end start
