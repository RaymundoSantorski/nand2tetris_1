# Nand to tetris part 1

**Repositorio para guardar mi progreso en el curso Nand2Tetris part 1**

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