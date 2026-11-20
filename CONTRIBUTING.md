# Cómo contribuir

## Flujo de ramas (Git Flow)

| Rama                        | Para qué                                         | Se crea desde | Se fusiona en            |
| --------------------------- | ------------------------------------------------ | ------------- | ------------------------ |
| `main`                      | Producción. Cada push despliega en GitHub Pages. | —             | —                        |
| `develop`                   | Integración. Siempre debe compilar.              | `main`        | `main` (vía `release/*`) |
| `feature/<tema>`            | Funcionalidad nueva                              | `develop`     | `develop` (PR)           |
| `fix/<tema>`                | Error no urgente                                 | `develop`     | `develop` (PR)           |
| `chore/*`, `docs/*`, `ci/*` | Configuración, documentación, CI                 | `develop`     | `develop` (PR)           |
| `release/vX.Y.Z`            | Congelar versión, subir versión y CHANGELOG      | `develop`     | `main` **y** `develop`   |
| `hotfix/vX.Y.Z`             | Arreglo urgente en producción                    | `main`        | `main` **y** `develop`   |

- `main` y `develop` están protegidas: todo entra por Pull Request con el CI en verde.
- Los PR se fusionan con _merge commit_ (`--no-ff`) para conservar la historia de cada rama.
- Cada release lleva una etiqueta `vX.Y.Z` y su entrada en `CHANGELOG.md` ([SemVer](https://semver.org/lang/es/)).

## Commits

[Conventional Commits](https://www.conventionalcommits.org/es/) en español, en imperativo:

```
feat(servicios): muestra el precio en CUP con la tasa del día
fix(i18n): corrige la clave del menú en inglés
docs(readme): añade guía de despliegue en Vercel
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

## Antes de abrir un PR

```bash
pnpm check   # lint + tipos + formato + tests
pnpm build   # export estático en /out
```
