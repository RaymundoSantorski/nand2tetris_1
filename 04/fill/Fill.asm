// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.
// 
// // Put your code here.
// 
(LOOP)
    @SCREEN
    D=A
    @screenbase
    M=D             // screen memory base location
    @KBD
    D=A
    @kbdbase
    M=D             // keyboard memory base location
    @i
    M=0             // iterator = 0

    @KBD
    D=M             // read keyboard
    @PAINTBLACK
    D;JNE           // GOTO paint black if keyboard value /= 0
    @PAINTWHITE
    D;JEQ           // GOTO paint white if keyboard value = 0

(PAINTBLACK)
    @screenbase
    D=M
    @i
    D=D+M
    @kbdbase
    D=M-D
    @LOOP
    D;JEQ           // GOTO LOOP if (screenbase + iterator) = kbdbase

    @screenbase
    D=M
    @i
    A=D+M           // set address to screenbase + iterator
    M=-1            // set register value to -1

    @i
    M=M+1           // iterator = iterator + 1
    @PAINTBLACK
    0;JMP           // jump to paintblack

(PAINTWHITE)
    @screenbase
    D=M
    @i
    D=D+M
    @kbdbase
    D=M-D
    @LOOP
    D;JEQ           // GOTO LOOP if (screenbase + iterator) = kbdbase

    @screenbase
    D=M
    @i
    A=D+M           // set address to screenbase + iterator
    M=0             // set register value to 0

    @i
    M=M+1           // iterator = iterator + 1
    @PAINTWHITE
    0;JMP           // jump to paintwhite

