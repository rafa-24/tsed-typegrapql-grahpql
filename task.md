# Crear un esqueleto de Task para los resolvers -> Hecho
# Crear un resolver para el Task. -> Hecho
# Crear una Query para leer la lista de Tasks. -> Hecho
# Crear Mutaciones para crear, actualizar y eliminar Tasks. -> Hecho

## Data task
- Una tarea debe contener la siguiente información: -> Hecho
- Titulo
- Descripción
- Fecha de expiracion

### Se debe auto-generar la siguiente información
- Fecha de creación -> Hecho
- Fecha de edición. -> preguntar porque creo que esto es una mutacion


# Observaciones

- En el modelo, cuando tengas datos inmutables (como el id o el createdAt) ponles el prefijo readonly. Por ejemplo:
readonly id: string;

- El campo id es de tipo string en MongoDB.
- En todos los campos especifica su tipo de dato en el Field. Por ejemplo:
@Field(type => String)
title: string;

Yo se que TypeGraphQL lo infiere pero en mi experiencia cuando lo compilas aun así lo pide en casos ya mas complejos en todos los Modelos, entonces mejor ponérselos a todos desde el principio.
- En los @Field, @Query y @Mutation acostúmbrate a que TODOS deben tener descripción para que los clientes cuenten con esa documentación y tu no tengas que resolver dudas. Por ejemplo:
@Field(type => String, { description: "Título de la tarea" })
title: string;


