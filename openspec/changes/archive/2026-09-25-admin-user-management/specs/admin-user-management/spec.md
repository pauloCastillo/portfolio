# Spec Delta

## Purpose

Permite que un administrador autenticado gestione las cuentas de usuario del sistema desde el panel admin, incluyendo el recambio completo del usuario existente por uno nuevo, con validaciones simplificadas de telefono y contrasena.

## ADDED Requirements

### Requirement: Listar usuarios desde el panel admin

El sistema SHALL mostrar a un administrador autenticado la lista de usuarios registrados con su nombre de usuario, email, telefono y estado activo/inactivo.

#### Scenario: Admin ve la lista de usuarios

- **WHEN** un administrador autenticado navega a la seccion Users del panel
- **THEN** el sistema muestra todos los usuarios con username, email, telefono y estado

#### Scenario: Visitante no autenticado intenta acceder

- **WHEN** un usuario no autenticado solicita la seccion Users o sus APIs
- **THEN** el sistema responde 401 y redirige al login con `callbackUrl`

### Requirement: Crear usuario desde el panel admin

El sistema SHALL permitir a un administrador autenticado crear una nueva cuenta indicando username, email y password; el telefono SHALL ser opcional y el password SHALL requerir minimo 6 caracteres sin requisitos de complejidad.

#### Scenario: Creacion exitosa con campos minimos

- **WHEN** el admin envia username, email valido y password de 6+ caracteres sin telefono
- **THEN** el sistema crea el usuario con estado activo y lo muestra en la lista

#### Scenario: Email duplicado

- **WHEN** el admin intenta crear un usuario con un email ya registrado
- **THEN** el sistema rechaza la operacion con error 409 y mensaje "email ya registrado" sin crear duplicados

#### Scenario: Password demasiado corto

- **WHEN** el admin envia un password de menos de 6 caracteres
- **THEN** el sistema rechaza la operacion con error de validacion antes de llamar al backend

#### Scenario: Password hasheado en almacenamiento

- **WHEN** se crea un usuario con password en texto plano
- **THEN** el sistema almacena unicamente el hash bcrypt y nunca el texto plano

### Requirement: Editar y activar/desactivar usuario

El sistema SHALL permitir a un administrador autenticado actualizar username, email, telefono y estado activo de un usuario existente.

#### Scenario: Actualizacion exitosa

- **WHEN** el admin modifica los datos de un usuario y guarda
- **THEN** el sistema persiste los cambios y refleja el nuevo estado en la lista

#### Scenario: Desactivar usuario

- **WHEN** el admin desactiva un usuario
- **THEN** el sistema marca `isActive=false` y ese usuario ya no puede iniciar sesion

### Requirement: Eliminar usuario con proteccion de auto-borrado

El sistema SHALL permitir a un administrador autenticado eliminar un usuario, pero SHALL impedir que un administrador elimine su propia cuenta en sesion.

#### Scenario: Eliminacion de otro usuario

- **WHEN** el admin confirma la eliminacion de un usuario distinto al propio
- **THEN** el sistema elimina el registro y lo retira de la lista

#### Scenario: Intento de auto-eliminacion

- **WHEN** el admin intenta eliminar su propia cuenta
- **THEN** el sistema bloquea la operacion con un mensaje explicito y la cuenta permanece intacta

### Requirement: Recambio del usuario existente (opcion b)

El sistema SHALL soportar el recambio ordenado del usuario actual: crear el nuevo usuario, verificar que inicia sesion correctamente y solo entonces eliminar el anterior, de modo que nunca exista una ventana sin acceso administrativo.

#### Scenario: Recambio exitoso

- **WHEN** el admin crea el nuevo usuario, confirma su login y elimina el anterior
- **THEN** el nuevo usuario conserva acceso total al panel y el anterior deja de existir

### Requirement: Sin registro publico

El sistema SHALL NOT exponer ningun endpoint ni pantalla publica de auto-registro; toda creacion de cuentas SHALL requerir sesion de administrador.

#### Scenario: Intento de registro anonimo

- **WHEN** un visitante no autenticado intenta crear una cuenta por cualquier ruta
- **THEN** el sistema responde 401/403 y no crea ningun registro
