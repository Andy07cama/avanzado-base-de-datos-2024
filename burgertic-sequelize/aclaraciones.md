# Aclaraciones

## ¿Qué hay que hacer?

1. Crear los modelos para las tablas de la base de datos.
    - Platos (ya está hecho)
    - Usuarios
    - Pedidos
    - PedidosPlatos (sí, también hay que hacer un modelo para esta tabla)
2. Crear las relaciones entre los modelos.
3. Modificar los services para que en lugar de hacer queries SQL directamente, usen los modelos de Sequelize.

### ¿Tengo que crear archivos nuevos?

Sí, podés crear los archivos que necesites. Por ejemplo, vas a necesitar un archivo nuevo para el modelo de PedidosPlatos. Podés crear un archivo únicamente para las relaciones, si te resulta más ordenado.

### ¿Cómo pruebo si hice las cosas bien?

Igual que como probaste el TP anterior. Este trabajo debería ser un 'refactor' del anterior, es decir, ninguna funcionalidad debería cambiar. Si todo está bien, deberías poder correr el proyecto y que funcione exactamente igual que antes.

### ¿Hasta cuándo tengo tiempo?

Si sos de la rotación ABD, tenés tiempo hasta el domingo 17 de noviembre a las 23:59hs.
