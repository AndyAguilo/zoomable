grid1.jpg , grid2.jpg  y grid3.jpg son los archivos que hay que sustituir
Si le das a Add file Arriba a la derecha deberia de reemplazar el archivo anterior.

![Screenshot 2025-07-09 at 10 21 45](https://github.com/user-attachments/assets/f14624bd-1090-4c23-b1a6-cf6ac2d4c743)

Después arrastras la imagen con el nombre grid#.png # = 1,2,3 (1 es el layer, y puedes subir los tres archivos al mísmo tiempo)

![Screenshot 2025-07-09 at 10 22 28](https://github.com/user-attachments/assets/45a88a92-96fc-4466-a0c1-bdea2feef22c)

Apretas el botón verde de Commit changes (main branch) y esto va a sustituir la imagen anterior por una nueva.

Después le das refresh acá:

https://zoomables.netlify.app/

El archivo zoom.js es el que hace la magia y ahí esta el codigo hambien se pueden cambiar los niveles de zoom y las transiciones:


 Ahora esto no es nada relacionado al able jounal simplemente lo hice a ojo y tambien se puede modificar cambiando los números:

const ZOOM_LEVELS = {
    layer1: { min: 1, max: 1.5, fadeStart: 1.5, fadeEnd: 3 },
    layer2: { min: 1.5, max: 5.5, fadeStart: 5.5, fadeEnd: 10 },
    layer3: { min: 5.5, max: 10 }
};
