@echo off
  set filename=%1
  copy /y .\src\controllers\role.controller.ts .\src\controllers\%filename%.controller.ts
  copy /y .\src\dtos\role.dto.ts .\src\dtos\%filename%.dto.ts
  copy /y .\src\interfaces\role.interface.ts .\src\interfaces\%filename%.interface.ts
  copy /y .\src\routes\role.route.ts .\src\routes\%filename%.route.ts
  copy /y .\src\models\role.model.ts .\src\models\%filename%.model.ts
  copy /y .\src\services\role.service.ts .\src\services\%filename%.service.ts