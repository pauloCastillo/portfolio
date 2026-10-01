# Refactorización de Arquitectura - Clean Architecture + SOLID + Design Patterns

## Resumen de Cambios

Este documento describe la refactorización completa del proyecto aplicando:
- **Clean Architecture**
- **Clean Code**
- **Principios SOLID**
- **Design Patterns**

---

## 1. Nueva Estructura de Directorios

```
server/
├── main.py                          # Entry point de la aplicación
├── app/
│   ├── core/                      # Infraestructura y configuración
│   │   ├── __init__.py
│   │   ├── database.py            # Configuración de base de datos
│   │   └── dependencies.py        # Dependency Injection factories
│   ├── domain/                    # Capa de Dominio (reglas de negocio)
│   │   ├── __init__.py
│   │   ├── abc_repository.py      # Abstract Base Class para repositorios
│   │   └── generic_repository.py  # Generic Repository Pattern
│   ├── services/                  # Capa de Servicios (lógica de negocio)
│   │   ├── __init__.py
│   │   ├── base_service.py        # Service base genérico
│   │   ├── project_service.py
│   │   ├── user_service.py
│   │   ├── post_service.py
│   │   ├── skill_service.py
│   │   ├── tech_service.py
│   │   └── experience_service.py
│   ├── repositories/              # Capa de Persistencia
│   │   ├── __init__.py
│   │   ├── project_repository.py
│   │   ├── user_repo.py
│   │   ├── post_repo.py
│   │   ├── skill_repo.py
│   │   ├── tech_repo.py
│   │   └── experience_repo.py
│   ├── api/                       # Capa de Presentación (API REST)
│   │   └── v1/
│   │       ├── router.py
│   │       └── endpoints/
│   │           ├── projects.py
│   │           ├── users.py
│   │           ├── posts.py
│   │           ├── skills.py
│   │           ├── techs.py
│   │           └── experiences.py
│   └── db/
│       ├── models/                # Modelos SQLAlchemy (Infraestructura)
│       │   ├── users.py
│       │   ├── projects.py
│       │   ├── posts.py
│       │   ├── skills.py
│       │   ├── techs.py
│       │   └── experience.py
│       └── schemas/               # Pydantic DTOs (Presentación)
│           ├── user_dto.py
│           ├── project_dto.py
│           ├── post_dto.py
│           ├── skill_dto.py
│           ├── tech_dto.py
│           └── experience_dto.py
└── public/                        # Archivos estáticos
    └── media/
        └── imgs/
```

---

## 2. Patrones de Diseño Implementados

### 2.1 Repository Pattern
**Ubicación:** `app/domain/abc_repository.py`, `app/domain/generic_repository.py`

```python
class IRepository(ABC, Generic[T]):
    @abstractmethod
    def get_all(self, db) -> List[T]: pass

    @abstractmethod
    def get_by_id(self, db, id: int) -> Optional[T]: pass

    @abstractmethod
    def create(self, db, data) -> T: pass

    @abstractmethod
    def update(self, db, id: int, data) -> Optional[T]: pass

    @abstractmethod
    def delete(self, db, id: int) -> bool: pass
```

**Beneficios:**
- Abstracción del acceso a datos
- Testabilidad (mocking de repositorios)
- Cumple con Dependency Inversion Principle (DIP)

### 2.2 Generic Repository Pattern (DRY)
**Ubicación:** `app/domain/generic_repository.py`

```python
class GenericRepository(IRepository[T]):
    def __init__(self, model: T):
        self.model = model

    def get_all(self, db) -> List[T]:
        # Implementación genérica con manejo uniforme de errores
        ...
```

**Beneficios:**
- Elimina código duplicado en todos los repositorios
- Centraliza el manejo de errores
- Sigue el principio DRY (Don't Repeat Yourself)

### 2.3 Service Pattern
**Ubicación:** `app/services/base_service.py`

```python
class BaseService(Generic[T]):
    def __init__(self, repository: GenericRepository[T]):
        self.repository = repository

    def get_all(self, db) -> List[T]:
        return self.repository.get_all(db)
    # ... otros métodos
```

**Beneficios:**
- Separa lógica de negocio de la persistencia
- Single Responsibility Principle (SRP)
- Fácil de extender para validaciones específicas

### 2.4 Dependency Injection Pattern
**Ubicación:** `app/core/dependencies.py`

```python
@lru_cache
def get_project_service() -> ProjectService:
    return ProjectService()
```

**Beneficios:**
- Inversión de dependencias (DIP)
- Singleton con cache (lru_cache)
- Facilita testing con mocks

### 2.5 DTO / Response Pattern
**Ubicación:** `app/db/schemas/*.py`

```python
class ProjectBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    ...

class ProjectCreate(ProjectBase):
    user_id: UUID = Field(...)

class ProjectResponse(ProjectBase):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(...)

class ProjectUpdate(BaseModel):
    title: str | None = Field(None, ...)
```

**Beneficios:**
- Separación clara entre request/response
- Validación automática con Pydantic
- Tipos específicos para cada operación

---

## 3. Principios SOLID Aplicados

### 3.1 Single Responsibility Principle (SRP)
**Antes:** Los endpoints manejaban lógica de negocio y acceso a datos.

**Ahora:**
- **Endpoints:** Solo manejan HTTP y validación de entrada
- **Services:** Lógica de negocio y validaciones de dominio
- **Repositories:** Acceso a datos y queries

### 3.2 Open/Closed Principle (OCP)
**Antes:** Para agregar funcionalidad había que modificar cada repository.

**Ahora:**
- `GenericRepository` provee funcionalidad base
- Repositorios específicos extienden sin modificar
- Nuevos métodos de dominio se agregan en servicios

### 3.3 Liskov Substitution Principle (LSP)
Todos los servicios heredan de `BaseService` y pueden ser intercambiados.

### 3.4 Interface Segregation Principle (ISP)
Cada entidad tiene su propio repository con métodos específicos:
- `UserRepository.get_by_email()`
- `PostRepository.get_published_posts()`
- `ExperienceRepository.get_current_experiences()`

### 3.5 Dependency Inversion Principle (DIP)
**Antes:**
```python
service = UserRepository()  # Dependencia concreta
```

**Ahora:**
```python
service_dep = Annotated[UserService, Depends(get_user_service)]
# Dependencia de abstracción inyectada
```

---

## 4. Clean Code - Problemas Corregidos

### 4.1 Naming Correcto en Endpoints
| Archivo | Antes | Ahora |
|---------|-------|-------|
| users.py | `create_user(user: UserDTO_Response)` | `create_user(user: UserCreate)` |
| posts.py | `create_user(post: PostDTO_Response)` | `create_post(post: PostCreate)` |
| skills.py | `create_user(skill: SkillDTO_Response)` | `create_skill(skill: SkillCreate)` |
| techs.py | `create_user(tech: TechDTO_Response)` | `create_tech(tech: TechCreate)` |
| experiences.py | `create_user(experience: ExpDTO_Response)` | `create_experience(experience: ExpCreate)` |

### 4.2 Error Messages Correctos
**Antes:** Todos decían "No users found"

**Ahora:** Cada repository usa el nombre correcto:
- "No projects found"
- "No posts found"
- "No skills found"
- "No technologies found"
- "No experiences found"

### 4.3 Eliminado Código Innecesario
- Imports no usados (`from os import link`, `from time import strftime`)
- Propiedades de UI en modelos (`image_path`) - deben estar en el frontend
- Hardcoded string en main.py

### 4.4 Validaciones Mejradas
```python
# Antes
level: str | None = Field(..., example="medium")  # Tipo incorrecto

# Ahora
level: int = Field(..., ge=1, le=100, example=80)  # Validación numérica
```

### 4.5 Docstrings en endpoints
```python
@router.get("/", name="projects")
def read_projects(db: db_depends, service: service_dep):
    """Obtener todos los proyectos."""
    ...
```

---

## 5. Clean Architecture - Capas Separadas

### Capa de Dominio (`app/domain/`)
- Reglas de negocio puras
- Independiente de frameworks
- Sin dependencias externas

### Capa de Servicios (`app/services/`)
- Lógica de negocio específica
- Orquesta entre repositories y reglas

### Capa de Repositories (`app/repositories/`)
- Acceso a datos
- Implementación de persistencia

### Capa de Presentación (`app/api/`)
- Endpoints HTTP
- Validación de entrada/salida
- DTOs de Pydantic

### Capa de Infraestructura (`app/core/`)
- Configuración de database
- Dependency injection
- Settings externos

---

## 6. Mejoras Adicionales

### 6.1 CRUD Completo
Todos los endpoints ahora incluyen:
- `GET /` - Listar todos
- `GET /{id}` - Obtener por ID
- `POST /` - Crear
- `PUT /{id}` - Actualizar
- `DELETE /{id}` - Eliminar

### 6.2 Endpoints Específicos de Dominio
- `GET /projects/published` - Proyectos publicados
- `GET /users/active` - Usuarios activos
- `GET /posts/published` - Posts publicados
- `GET /skills/level/{level}` - Skills por nivel
- `GET /experiences/current` - Experiencias actuales

### 6.3 Health Check
```python
@app.get("/health", tags=["health"])
def health_check():
    return {"status": "healthy", "version": "1.0.0"}
```

### 6.4 CORS Configurado
Permite solicitudes desde el cliente frontend.

### 6.5 API Documentation
- Swagger UI: `/api/docs`
- ReDoc: `/api/redoc`

---

## 7. Resumen de Cambios por Archivo

| Archivo | Cambios |
|---------|---------|
| `main.py` | CORS, health check, mejor estructura |
| `app/db/config.py` | Movido a `app/core/database.py` |
| `app/db/models/*` | Import corregido, eliminadas propiedades UI |
| `app/db/schemas/*` | Refactorizados con Base/Create/Response/Update |
| `app/repositories/*` | Heredan de GenericRepository, sin duplicación |
| `app/api/v1/endpoints/*` | Usan Services + Dependency Injection |
| `app/domain/abc_repository.py` | **Nuevo** - Contrato de repositorios |
| `app/domain/generic_repository.py` | **Nuevo** - Implementación genérica |
| `app/services/base_service.py` | **Nuevo** - Service base |
| `app/services/*_service.py` | **Nuevo** - Servicios específicos |
| `app/core/dependencies.py` | **Nuevo** - Factories con cache |

---

## 8. Testing y Mantenibilidad

### Código Ahora es Testable
```python
# Mock de repository para testing
class MockUserRepository:
    def get_by_email(self, db, email):
        return User(email="test@test.com")

# Test de servicio
def test_user_service():
    repo = MockUserRepository()
    service = UserService(repo)
    result = service.get_by_email(None, "test@test.com")
    assert result.email == "test@test.com"
```

### Fácil de Extender
Para agregar nueva entidad:
1. Crear modelo en `app/db/models/`
2. Crear schemas en `app/db/schemas/`
3. Crear repository que herede de `GenericRepository`
4. Crear service que herede de `BaseService`
5. Crear endpoint usando dependencias
6. Registrar en router

---

## 9. Conclusión

El proyecto ahora sigue:
- **Clean Architecture**: Capas separadas y dependencias hacia el dominio
- **SOLID**: Todos los principios aplicados correctamente
- **Design Patterns**: Repository, Service, DI, DTO, Generic
- **Clean Code**: Naming correcto, sin duplicación, validaciones claras

El código es más:
- **Maintainable**: Cambios localizados en capas específicas
- **Testable**: Dependencias inyectadas y abstracciones
- **Extensible**: Nuevas características sin modificar código existente
- **Legible**: Estructura clara y nombres descriptivos
