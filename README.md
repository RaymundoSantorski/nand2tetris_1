# Nand to tetris part 1

**Repositorio para guardar mi progreso en el curso Nand2Tetris part 1**

En este curso se explora como se construyen las computadoras modernas desde sus 'componentes más básicos' entre comillas pues no se profundiza en como se llega de un transistor a una compuerta lógica Nand, de ahí el nombre del curso, partimos desde una compuerta Nand, desarrollamos las compuertas faltantes y a partir de estas compuertas creamos componentes más elaborados como sumadores desde 1 bit hasta 16 bits, un contador que suma de 1 en 1, una ALU (Arithmetic Logic Unit), una memoria RAM (Random Access Memory), hasta llegar a formar el cpu, y armar finalmente una computadora de 16 bits.
Esto para luego escribir un ensamblador que traduce de hack assembly (lenguaje de ensamblador de esta computadora HACK) a lenguaje maquina (unos y ceros) que pueda interpretar nuestra computadora.

## Modulo 01 ***Compuertas logicas***

Se nos proporciona unicamente la compuerta Nand para describir las demás apartir de esta, en lenguaje hdl
    
-       Not
        Utilizo unicamente una compuerta Nand para describir su funcionalidad
        in | out
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

-       Not16
        Not de 16 bits, niega bit por bit del bus, por ejemplo:
               in        |       out
        0011010011011101 | 1100101100100010
        1010101010101010 | 0101010101010101

-       And16
        Tiene dos entradas de 16 bits y realiza la operación And bit a bit de los buses.

-       Or16
        Tiene dos entradas de 16 bits y realiza la operación Or bit a bit de los buses.

-       Mux16
        Tiene dos buses de entrada de 16 bits y una entrada sel de un solo bit, el cual determina cual bus de entrada es el que llegará a la salida.

-       Or8Way
        Contiene 8 entradas, o un bus de 8 bits, en el cuál se realizan operaciones Or bit por bit de este bus, y contiene solo una salida de un bit.

-       Mux4Way16
        Funciona como la compuerta Mux16, solo que esta cuenta con 4 buses de entrada de 16 bits y un bus de entrada de 2 bits que determina cual de las 4 entradas será pasada al bus de salida de 16 bits.

-       Mux8Way16
        Tiene un comportamiento igual al de Mux4way16, solo que tiene 8 en lugar de 4 buses de entrada de 16 bits y cuenta con un bus de entrada de 3 bits en lugar de 2, mantiene un solo bus de salida de 16 bits.

-       DMux4Way
        Un comportamiento similar al DMux sencillo, recibe una entrada de un bit y mediante un bus de entrada sel (selector) de dos bits decide a que salida asignar dicha entrada.

-       DMux8Way
        Comportamiento similar al DMux4Way, pero con un selector de 3 bits, con el cual decide entre 8 salidas para asignar a la unica entrada.


## Modulo 02 ***Lógica aritmetica***

Haciendo uso de las compuertas lógicas creadas en el modulo anterior, crearemos 5 chips para hacer algunas operaciones aritmeticas

-       HalfAdder
        Este chip suma dos bits de entrada y tiene una salida sum y una salida carry que se usa cuando 'llevamos' uno en la suma
         a |  b  | sum | carry
         0 |  0  |  0  |  0
         0 |  1  |  1  |  0
         1 |  0  |  1  |  0
         1 |  1  |  0  |  1
        
-       FullAdder
        Este chip es similar a HalfAdder, la diferencia es que este admite una entrada extra, que sería el carry de la suma anterior, sus entradas son a, b, c, siendo a la entrada conectada al carry anterior, y también cuenta con dos salidas, sum y carry.
        a | b | c | sum | carry
        0 | 0 | 0 |  0  |  0
        0 | 0 | 1 |  1  |  0
        0 | 1 | 0 |  1  |  0
        0 | 1 | 1 |  0  |  1
        1 | 0 | 0 |  1  |  0
        1 | 0 | 1 |  0  |  1
        1 | 1 | 0 |  0  |  1
        1 | 1 | 1 |  1  |  1

-       Add16
        Este chip suma dos valores de 16 bits, el bit más grande se ignora, lo cual quiere decir que de los FullAdders que se utilizan internamente, el carry del ultimo FullAdder no se toma en cuenta, tenga o no valor 