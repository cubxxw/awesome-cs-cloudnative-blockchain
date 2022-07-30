stacks segment 
        DB 256 DUP(0)
stacks ends

datas segment
 N EQU 6
 BUF   DB N+1
 COUNT DB 0
 CHAR  DB N+1 DUP(0)
 HELLO DB 'please input:',13,10,'$'
datas ends

codes segment
        ASSUME CS:CODES,DS:DATAS
start:
        MOV AX,DATAS
        MOV DS,AX
        LEA DX,HELLO
        MOV AH,9
        INT 21H
        LEA DX,BUF
        MOV AH,0AH
        INT 21H
	MOV AX,SEG CHAR
	MOV DS,AX
	LEA DX,CHAR
	MOV AH,9
	INT 21H
	MOV AH,4CH
        INT 21H
codes endS
        end start
