# Estrategia de Backups

## Base de Datos (Supabase)

Si utilizas el plan Pro de Supabase, las copias de seguridad (Point in Time Recovery - PITR) se realizan de manera automática diaria o continuamente. En el plan gratuito:

- Es responsabilidad del administrador exportar periódicamente los datos (Dumps SQL).
- Se recomienda ejecutar un script mensual mediante `pg_dump` para asegurar los registros de la tabla `historial_busquedas`.

## Código Fuente

- Todo el código fuente está respaldado mediante Git y GitHub.
- La rama `main` debe ser siempre la versión estable y desplegable.

## Credenciales

- Las claves de API y `.env` **nunca** deben subirse al repositorio. Deben ser respaldadas de forma segura y encriptada por el líder técnico del proyecto utilizando gestores de contraseñas de equipo o bóvedas de seguridad.
