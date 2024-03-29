# Nand to tetris part 1

**Repositorio para guardar mi progreso en el curso Nand2Tetris part 1**

En este curso se explora como se construyen las computadoras modernas desde sus 'componentes más básicos' entre comillas pues no se profundiza en como se llega de un transistor a una compuerta lógica Nand, de ahí el nombre del curso, partimos desde una compuerta Nand, desarrollamos las compuertas faltantes y a partir de estas compuertas creamos componentes más elaborados como sumadores desde 1 bit hasta 16 bits, un contador que suma de 1 en 1, una ALU (Arithmetic Logic Unit), una memoria RAM (Random Access Memory), hasta llegar a formar el cpu, y armar finalmente una computadora de 16 bits.
Esto para luego escribir un ensamblador que traduce de hack assembly (lenguaje de ensamblador de esta computadora HACK) a lenguaje maquina (unos y ceros) que pueda interpretar nuestra computadora.

## Modulo 01 ***Compuertas logicas***

Se nos proporciona unicamente la compuerta Nand para describir las demás apartir de esta, en lenguaje hdl
    
### **Not**
 Utilizo unicamente una compuerta Nand para describir su funcionalidad
```
        in | out
         0 | 1 
         1 | 0
```

### **And**
Utilizo una compuerta Nand y una Not, previamente creada
```
        a | b | out
        0 | 0 | 0
        0 | 1 | 0
        1 | 0 | 0
        1 | 1 | 1
```

### **Or**
Utilizo dos compuertas Not y una Nand
```
        a | b | out
        0 | 0 | 0
        0 | 1 | 1
        1 | 0 | 1
        1 | 1 | 1
```

### **Xor**
Exclusive-or, utilizo dos compuertas Not y tres Nand
```
        a | b | out
        0 | 0 | 0
        0 | 1 | 1
        1 | 0 | 1
        1 | 1 | 0
```

### **Mux**
Multiplexor, utilizando una compuerta Not, dos And y un Or, decide cual de dos entradas pasar por la salida 
```
        a | b | sel | out
        0 | 0 |  0  | 0
        0 | 0 |  1  | 0
        0 | 1 |  0  | 0
        0 | 1 |  1  | 1
        1 | 0 |  0  | 1
        1 | 0 |  1  | 0
        1 | 1 |  0  | 1 
        1 | 1 |  1  | 1
```

### **DMux**
Demultiplexor, utilizando una compuerta Not y dos And, realiza el proceso contrario del Mux, dada una entrada principal y una entrada sel decide por cual salida emitir la entrada
```
        in | sel | a | b
         0 |  0  | 0 | 0
         0 |  1  | 0 | 0
         1 |  0  | 1 | 0
         1 |  1  | 0 | 1
```        

### **Not16**
Not de 16 bits, niega bit por bit del bus, por ejemplo:
```
               in        |       out
        0011010011011101 | 1100101100100010
        1010101010101010 | 0101010101010101
```

### **And16**
Tiene dos entradas de 16 bits y realiza la operación And bit a bit de los buses.

### **Or16**
Tiene dos entradas de 16 bits y realiza la operación Or bit a bit de los buses.

### **Mux16**
Tiene dos buses de entrada de 16 bits y una entrada sel de un solo bit, el cual determina cual bus de entrada es el que llegará a la salida.

### **Or8Way**
Contiene 8 entradas, o un bus de 8 bits, en el cuál se realizan operaciones Or bit por bit de este bus, y contiene solo una salida de un bit.

### **Mux4Way16**
Funciona como la compuerta Mux16, solo que esta cuenta con 4 buses de entrada de 16 bits y un bus de entrada de 2 bits que determina cual de las 4 entradas será pasada al bus de salida de 16 bits.

### **Mux8Way16**
Tiene un comportamiento igual al de Mux4way16, solo que tiene 8 en lugar de 4 buses de entrada de 16 bits y cuenta con un bus de entrada de 3 bits en lugar de 2, mantiene un solo bus de salida de 16 bits.

### **DMux4Way**
Un comportamiento similar al DMux sencillo, recibe una entrada de un bit y mediante un bus de entrada sel (selector) de dos bits decide a que salida asignar dicha entrada.

### **DMux8Way**
Comportamiento similar al DMux4Way, pero con un selector de 3 bits, con el cual decide entre 8 salidas para asignar a la unica entrada.


## Modulo 02 ***Lógica aritmetica***

Haciendo uso de las compuertas lógicas creadas en el modulo anterior, crearemos 5 chips para hacer algunas operaciones aritmeticas

### **HalfAdder**
Este chip suma dos bits de entrada y tiene una salida sum y una salida carry que se usa cuando 'llevamos' uno en la suma
```
         a |  b  | sum | carry
         0 |  0  |  0  |  0
         0 |  1  |  1  |  0
         1 |  0  |  1  |  0
         1 |  1  |  0  |  1
```

### **FullAdder**
Este chip es similar a HalfAdder, la diferencia es que este admite una entrada extra, que sería el carry de la suma anterior, sus entradas son a, b, c, siendo a la entrada conectada al carry anterior, y también cuenta con dos salidas, sum y carry.
```
        a | b | c | sum | carry
        0 | 0 | 0 |  0  |  0
        0 | 0 | 1 |  1  |  0
        0 | 1 | 0 |  1  |  0
        0 | 1 | 1 |  0  |  1
        1 | 0 | 0 |  1  |  0
        1 | 0 | 1 |  0  |  1
        1 | 1 | 0 |  0  |  1
        1 | 1 | 1 |  1  |  1
```

### **Add16**
Este chip suma dos valores de 16 bits, el bit más grande se ignora, lo cual quiere decir que de los FullAdders que se utilizan internamente, el carry del ultimo FullAdder no se toma en cuenta, tenga o no valor 

### **Inc16**
Este chip se utiliza para incrementar uno al valor de 16 bits de entrada, se utilizan puros HalfAdders pues no se requieren más de dos entradas.

### **ALU**
Arithmetic Logic Unit (Unidad Lógica Aritmetica).
Tiene dos entradas de 16 bits 'x' y 'y', una entrada 'zx' (sirve para convertir la entrada x a 0), así mismo 'zy' (convierte a 0 la entrada y), tiene entradas 'nx' y 'ny' (que niegan las entradas 'x' y 'y' respectivamente), una entrada 'f' (calcula x + y si es igual a 1 o x & y si es igual a 0) y una entrada 'no' (niega el resultado de f y su resultado es la salida principal).
Tiene una salida 'out' de 16 bits, una salida 'zr' que nos dice si la salida es igual a 0, y una salida 'ng' que nos dice si la salida es nagativa.
Con esta configuración y sus distintas combinaciones podemos llevar a cabo diversas operaciones, tanto lógicas como aritmeticas, de ahi el nombre de este chip
Por ejemplo, se puede obtener resultado 0, 1 o -1, sea cual sean las entradas, también se puede obtener por resultado la entrada x o y, también dichas entradas negadas, o negativas, cualquiera de esas entradas más o menos 1, sumar o restar las entradas, u obtener x&y o x|y.
Dichas operaciones nos servirán más adelante para realizar procesos más complejos.


## Modulo 03 ***Lógica secuencial***

Utilizando los chips que ya hemos creado hasta el momento y mediante un chip dado en el curso, el DFF (D flip flop) crearemos chips que utilizan la lógica secuencial y no sólo la lógica combinacional como los anteriores.

### **DFF**
Chip dado en el curso como base para crear los chips subsecuentes

### **Bit**
Funciona como una memoria de un solo bit.
Este chip contiene dos entradas, 'in' que es el valor que quiere grabarse y 'load' que nos dice si grabamos el valor de 'in' (si load = 1) o mantenemos el valor almacenado (si load = 0).
Tiene una sola salida 'out' que nos da como resultado el valor almacenado en el chip, se utiliza para externar el resultado y para crear un bucle, en el que esta salida se conecta internamente a la entrada de un Mux (desarrollado anteriormente) en el que decidimos si usamos el valor 'out' en el chip o el valor 'in'.

### **Register**
Funciona como el chip anterior, como una memoria pero de 16 bits.
Tiene las mismas entradas y las mismas salidas, solo que 'in' y 'out' es de 16 bits, 'load' se mantiene de un bit al usarse solo para determinar si grabar un nuevo valor o no. Internamente consta de varios Bit trabajando juntos.

### **RAM8**
Es una memoria RAM sencilla que consta de 8 Registers, por lo tanto puede almacenar 8 valores de 16 bits.
Internamente contiene la entrada de 16 bits 'in', 'load' de un bit para determinar si se graba o se lee la información, 'address' de 3 bits que sirve para saber en que registro leer o grabar y una salida 'out' de 16 bits. 
Utiliza la entrada 'address' con 3 bits pues son los bits que necesitamos para tener 8 combinaciones, que son la cantidad de Resgiters que tenemos.

### **RAM64**
Es una memoria RAM con 64 registros, internamente se compone de 8 RAM8, sigue teniendo entrada 'in' y salida 'out' de 16 bits, entrada 'load' de un bit, ahora contiene una entrada 'address' de 6 bits, los ultimos 3 bits son para saber que RAM8 debe escribir o leer y los primeros 3 son conforman el 'address' que utlizará internamente el RAM8 para leer o escribir la información.

### **RAM512**
Es una memoria RAM con 512 registros, se compone de 8 RAM64, 'in', 'load' y 'out' se mantienen igual, mientras que 'address' ahora se compone de 9 bits, los primeros 6 bits son los que usa el chip RAM64, los ultimos 3 son para acceder al RAM64 correcto.

### **RAM4K**
Memoria RAM con 4,096 registros, se compone de 8 RAM512.
'address' se compone de 12 bits, los ultimos 3 para acceder al RAM512 correcto y los primeros 9 bits son los que usa el RAM512 internamente. Los demás pines se quedan igual.

### **RAM16K**
Memoria RAM con 16,384 registros y se compone de 4 RAM4K.
'address' de 14 bits, los ultimos dos para acceder al RAM4k y los 12 primeros son los que utiliza el RAM4K internamente.

### **PC**
'Program Counter' es un chip que nos permite contar (sumar de uno en uno), establecer un valor determinado y resetear el conteo (volver a cero).
El conteo lo hace con valores de 16 bits, por lo que su entrada 'in' y su salida 'out' son de 16 bits, 'out' es el valor almacenado en el chip, mientras que 'in' es el valor que se quiere almacenar, para hacerlo debe utilizarse la entrada 'load' (de 1 bit) con valor en 1, de lo contrario no se grabará.
Cuenta con una entrada 'inc' de 1 bit, que nos dice si sumamos 1 al valor almacenado (si 'inc' = 1). Y también una entrada de 1 bit 'reset' que nos dice si ajustamos el valor almacenado como 0 (si 'reset' = 1).

## Modulo 04 ***Lenguaje maquina***

En este modulo hacemos resolvemos unos problemas mediante programación en lenguaje Hack, que es el lenguaje ensamblador de la computadora que estamos construyendo.
Esto con el fin de tener un mejor entendimiento del lenguaje, para después programar nuestro ensamblador en el modulo 6. 

### **Fill.asm**
El programa detecta cuando hay una tecla presionada y entonces pinta la pantalla de negro y la mantiene así mientras la tecla este presionada. Luego cuando soltamos la tecla, vuelve a pintar la pantalla de blanco.
Se logra mediante un bucle, que es donde se detectará si hay una tecla presionada. Se detecta accediendo a la direccion de memoria asignada al teclado, que es un solo registro, en el cual si no hay una tecla presionada el valor es cero, de lo contrario el valor almacenado será el correspondiente a la tecla presionada.
Luego este valor lo comparamos con cero, si es igual, hacemos un salto en el programa hasta la linea donde tenemos la etiqueta PAINTWHITE. Tenemos un iterador al cual le asignamos el valor base de la dirección asignada a la pantalla, en valor del iterador, asignamos el valor 0 que corresponde a pintar de blanco, aumentamos 1 en el iterador y mientras siga siendo menor a la dirección del teclado saltamos en bucle a la etiqueta PAINTWHITE, de lo contrario hacemos al salto al bucle principal (LOOP).
Algo similar ocurre si hay una tecla presionada, si al leer el valor del teclado es distinto de 0, significa que hay una tecla presionada y hacemos un salto a PAINTBLACK, el funcionamiento es igual al de PAINTWHITE solo que en cada iteración asigna el valor -1 que corresponde a 1111111111111111 en binario a 16 bits, por lo cual pintamos cada pixel de negro.

### **Mult.asm**
Programa para multiplicar dos numeros.
Se deben asignar previamente los dos valores que se quieren multiplicar, en las direcciones de memoria 0 y 1 el programa guardará el resultado en la dirección de memoria 2.
Funciona mediante un bucle, el cual utiliza un iterador i que inicia en 0, el valor de la dirección 0 de memoria lo utiliza para comparar. Mientras i sea menor que el valor en la dirección 0 seguirá iterando, si son iguales hará un salto al final del programa y para evitar que el programa siga recorriendo toda la memoria, al final se hacen saltos infinitos al mismo final del programa.
Desde el principio del bucle se evalua si hay que saltar al final o no, de no ser así el programa toma el valor del resultado, inicializado en 0, y le suma el valor almacenado en la dirreción 1, luego hace salto al inicio del bucle. Esto se repetirá las veces necesarias y al final terminaremos con el resultado correcto en la dirección 2.

## Modulo 05 ***Arquitectura de la computadora***

En este modulo se crearán los ultimos chips necesarios para tener lista nuestra computadora. 'Memory', 'CPU' y 'Computer'. En el curso se nos proporcionan los archivos necesarios para probar el correcto funcionamiento de cada chip, así como el de la computadora en si. También se nos proporcionan programas que se pueden correr en la computadora para confirmar que funciona de manera correcta.

### **Memory**
Esta será nuestra memoria principal RAM que se compone de una RAM16K, un chip Screen y un Keyboard, estos dos ultimos son proporcionados en el curso.
Utilizamos como en todos los chips de memoria de este curso la entrada 'in y salida 'out' de 16 bits y entrada 'load' de un bit, y address de 15 bits, que se utlizan para decidir si queremos escribir o leer datos en la memoria principal, en la memoria de la pantalla o en la memoria del teclado.
Utilizamos DMux y Mux16 para lograr esta tarea.

### **CPU**
Nuestro chip de procesamiento central, de hecho es lo que significa, Central Processing Unit. 
Tenemos la ALU, el cuál hace las operaciones que se necesitan; un registro de datos, para guardar los datos que se calculan en la ALU o que vienen directamente de las instrucciones; y un registro de dirección, el cual almacena la dirección de la cual viene la instrucción que estamos ejecutando; tenemos un PC (Program Counter) el cual nos permite ejecutar la siguiente instrucción, ya sea la que sigue en el programa o si la ejecución nos pide hacer un salto especifico o hacer reset para reiniciar la ejecución del programa.
Internamente estas piezas están conectadas de manera que se pueda obtener la dirección de memoria que se quiere ejecutar desde la propia instrucción o desde el resultado que nos arroje la ALU, dependiendo de que requiera la instrucción. También tomar esa dirección para hacer algún cálculo con ella o con datos provenientes de la memoria RAM, comparandola contra los datos procesados por la ALU. 
Podemos especificar si el calculo lo queremos almacenar en la RAM, aunque también podemos guardar una dirección. Y podemos controlar el contador de programa de manera que salte a la instrucción que queramos, todo mediante combinaciones que podemos hacer con 16 bits, como se especifica en esta imagen proporcionada en el curso.
![Instrucciones que se pueden usar el la Hack Machine](./instructions.png)
Los primeros 3 ceros se usan como convención cuando se trata de una instrucción, cuando se trate de una dirección de memoria empezará con 0, dado que no contamos con el 100% de registros a los que podríamos acceder con 16 bits.
Dest es destination, donde queremos almacenar el valor y se usan 3 bits para las posibles combinaciones que tenemos, de almacenar en memory, data o address y sus posibles combinaciones.
Comp es compute, que calculo queremos hacer, los ultimos 6 bits de este fragmento de la instrucción corresponden a los 6 bits que requiere el ALU para hacer las operaciones que admite, las cuales también se describen en la imagen, el primero nos permite especificar si queremos hacer ese calculo con la dirección (address) y los datos (data) o con lo almacenado en memoria (memory) y los datos.
Jump nos permite especificar hacer un salto a la dirección que tengamos guardada en el registro address si la condición que evaluamos es verdadera.
Las condiciones se basan en un valor comp y una combinación de 3 bits que nos permiten hacer las siguientes combinaciones:
*       null (no hay salto)
*       mayor a 0 
*       igual a 0
*       mayor o igual a 0
*       menor 0
*       distinto de 0
*       menor o igual a 0
*       hay salto
y se hace el salto si el valor comp cumple con la condición con respecto de 0.

### **Computer**
Chip terminado de la computadora Hack. Contiene memoria ROM de 32K (ROM32K) dado como chip ya hecho, ya que es un chip bastante parecido a la RAM pero con ciertas diferencias en las que no tiene alcance el curso. Por ejemplo que los programas deben cargarse a la ROM de forma manual y especial, al ser de solo lectura (ROM es Read Only Memory) se hace con un proceso especial que no enseña este curso.
El chip Computer también contiene el CPU, y Memory y algunas de sus entradas y salidas están conectadas entre si para hacer funcionar al chip.
En realidad es un chip bastante simple, cuando se le ve unicamente por sus partes.
Incluye una entrada unica de un bit 'reset' que sirve para reiniciar el programa y normalmente sería como un botón de apagado y encendido.
El teclado y monitor que usa esta computadora se provee en el curso, dado que tampoco engloba como hacerlas ni como funcionan sus controladores.

## Modulo 06 ***Ensamblador***

El ensamblador es un programa que traduce instrucciones del lenguaje ensamblador a instrucciones binarias que pueda entender una computadora. En este caso nuestro lenguaje ensamblador es Hack Assembler, diseñado especificamente para aprovechar las caracteristicas de nuestra computadora Hack y para ser sencillo.

El curso no te impone un lenguaje en especifico para escribir nuestro ensamblador, aunque si especifica que normalmente se hacen con C o Java por su velocidad. Yo decidí hacerlo con Javascript.

En el curso dan una arquitectura determinada para el proyecto, aunque este lo hice sin seguirla. Quiza en el futuro cambie a dicha arquitectura, pero quise hacerlo para probarme que podía hacerlo también de otra manera. Siendo honesto no es tan elegante mi manera, pero me siento orgulloso de haberlo hecho por mi cuenta.

### **hackAssembler**
Tengo una función main, que es el punto de entrada a mi ensamblador, desde donde se mandan a llamar las siguientes funciones según sea necesario. Dentro del mismo main se ignoran los comentarios (Que empiezan por '/'), las lineas vacías y demás para dejar unicamente las instrucciones en ensamblador. Luego se manda a llamar a la función parser, lo que hace es interpretar las instrucciones para determinar de que tipo son, pueden ser de tipo address (si contienen @ al principio) o de tipo codigo.
Si son de tipo address se interpreta el número de la dirección que se quiere asignar y se manda a otra función 'fixBinary' que transforma el número decimal en número binario para poder crear la instrucción.
Si es de tipo codigo se separa en tres partes, destination, compute y jump y dichas instrucciones se transforman en binario, pero no mediante la función fixBinary, utilizamos un diccionario (objeto de javascript) para determinar que codigo binario se utiliza y se juntan para conformar la instrucción de codigo completa. 
Tenemos 4 diccionarios:
- symbolTable, que contiene todos los alías de direcciones que usaremos más tarde en el segundo curso para hacer nuestra Maquina Virtual y luego un lenguaje de programación, para finalmente con ese mismo lenguaje, programar un sistema operativo. Se accede al valor de estos simbolos de la forma '@' + < simbolo >
Incluye R0 a R15, SCREEN, KBD, SP (Stack Pointer), LCL (Local), ARG (Argument), THIS y THAT.
- compTable, tiene todas las combinaciones binarias para las operaciones que podemos hacer, como en la tabla de más arriba.
- destTable, para los posibles destinos donde guardar los resultados. 
- jumpTable, las condiciones para hacer los saltos.
```
let jumpTable = {
        'null': '000',
        'JGT': '001',
        'JEQ': '010',
        'JGE': '011',
        'JLT': '100',
        'JNE': '101',
        'JLE': '110',
        'JMP': '111'
}
```
El ensamblador barre por primera todo el programa, buscando etiquetas (labels) para agregarlas al diccionario symbolTable con el nombre de la etiqueta como llave y su posición en el código como valor, de manera que cuando se encuentre una llamada a esa etiqueta se pueda saber a que parte del programa hacer el salto. Las etiquetas se especifican entre parentesis y nornalmente en mayusculas y se llaman sus valores como cualquier simbolo:
```
(LABEL)
@LABEL
```
Después en la segunda barrida al programa es cuando interpreta las instrucciones y asigna variables de la forma  
``` 
@variable 
```
se sabe que es una variable y no un llamado a una etiqueta pues al dar la segunda barrida y no encontrar el simbolo 'variable' en el diccionario symbolTable, significa que no hay una etiqueta con ese nombre, no hay una instrucción 
```
(variable)
```
las etiquetas no generan codigo como tal, son solo puntos donde va a hacer saltos nuestro programa.

### **compare**
Un programa en javascript también que compara dos documentos, nos dice si son exactamente iguales o si tienen diferencias. Lo utilicé para darme cuenta que diferencias tenían los programas generados por mi ensamblador con los resultados esperados.
Lee linea por linea y compara, cuando encuentra una diferencia imprime un aviso y termina de ejecutarse. Si no encuentra ninguna diferencia, al terminar de comparar, imprime un mensaje que dice que los archivos son iguales.

## Fin del curso
Con la codificación del ensamblador terminamos el primer curso donde ya dejamos la computadora funcional y tenemos una manera de darle instrucciones mediante codigo de bajo nivel.
En el proximo curso se comenzará por crear una maquina virtual que será el punto intermedio entre un programa en base a pilas (stack) y un programa en ensamblador.
De esta manera escribiremos programas aun un poco más fácil pero no será el ultimo punto, pues programaremos un compilador también, el cuál se encargará de traducir de un lenguaje de programación de alto nivel (jack, diseñado para el curso), a lenguaje VM (virtual machine), que luego podrá ser traducido a hack assembler y de ahí mediante nuestro programa ensamblador será traducido a instrucciones binarias.

Después del compilador ya tendremos listo nuestro lenguaje de programación, con el cuál programaremos un sistema operativo y ahí será nuestro ultimo proyecto. 