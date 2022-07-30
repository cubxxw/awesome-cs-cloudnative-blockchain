DATA SEGMENT
X DW 4F59H
DATA ENDS

CODE SEGMENT
        ASSUME CS:CODE,DS:DATA
     START:
        MOV AX,DATA
        MOV DS,AX
        MOV CH,4
        MOV BX,X
     L: MOV CL,4
        ROL BX,CL
        MOV DL,BL
        AND DL,0FH
        CMP DL,10
        JB  NEXT
        ADD DL,7H
  NEXT: ADD DL,30H
        MOV AH,2
        INT 21H
        DEC CH
        JNZ L
        MOV AH,4CH
        INT 21H
  CODE ENDS
        END START
        
            
