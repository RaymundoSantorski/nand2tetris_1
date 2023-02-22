# Nand to tetris part 1

**Repositorio para guardar mi progreso en el curso Nand2Tetris part 1**

En este curso se explora como se construyen las computadoras modernas desde sus 'componentes más básicos' entre comillas pues no se profundiza en como se llega de un transistor a una compuerta lógica Nand, de ahí el nombre del curso, partimos desde una compuerta Nand, desarrollamos las compuertas faltantes y a partir de estas compuertas creamos componentes más elaborados como sumadores desde 1 bit hasta 16 bits, un contador que suma de 1 en 1, una ALU (Arithmetic Logic Unit), una memoria RAM (Random Access Memory), hasta llegar a formar el cpu, y armar finalmente una computadora de 16 bits.
Esto para luego escribir un ensamblador que traduce de hack assembly (lenguaje de ensamblador de esta computadora HACK) a lenguaje maquina (unos y ceros) que pueda interpretar nuestra computadora.

## Modulo 01 ***Compuertas logicas***

Se nos proporciona unicamente la compuerta Nand para describir las demás apartir de esta, en lenguaje hdl
    
-       Not
        Utilizo unicamente una compuerta Nand para describir su funcionalidad
        a | out
        0 | 1 
        1 | 0

-       And
        Utilizo una compuerta Nand y una Not, previamente creada
        a | b | out
        0 | 0 | 0
        0 | 1 | 0
        1 | 0 | 0
        1 | 1 | 1

-       Or
        Utilizo dos compuertas Not y una Nand
        a | b | out
        0 | 0 | 0
        0 | 1 | 1
        1 | 0 | 1
        1 | 1 | 1

-       Xor
        Exclusive-or, utilizo dos compuertas Not y tres Nand
        a | b | out
        0 | 0 | 0
        0 | 1 | 1
        1 | 0 | 1
        1 | 1 | 0

-       Mux
        Multiplexor, utilizando una compuerta Not, dos And y un Or, decide cual de dos entradas pasar por la salida 
        a | b | sel | out
        0 | 0 |  0  | 0
        0 | 0 |  1  | 0
        0 | 1 |  0  | 0
        0 | 1 |  1  | 1
        1 | 0 |  0  | 1
        1 | 0 |  1  | 0
        1 | 1 |  0  | 1 
        1 | 1 |  1  | 1

-       DMux
        Demultiplexor, utilizando una compuerta Not y dos And, realiza el proceso contrario del Mux, dada una entrada principal y una entrada sel decide por cual salida emitir la entrada
        in | sel | a | b
         0 |  0  | 0 | 0
         0 |  1  | 0 | 0
         1 |  0  | 1 | 0
         1 |  1  | 0 | 1