@echo off
  set filename=%1
  copy /y .\src\controllers\effectRule.controller.ts .\src\controllers\%filename%.controller.ts
  copy /y .\src\dtos\effectRule.dto.ts .\src\dtos\%filename%.dto.ts
  copy /y .\src\interfaces\effectRule.interface.ts .\src\interfaces\%filename%.interface.ts
  copy /y .\src\routes\effectRule.route.ts .\src\routes\%filename%.route.ts
  copy /y .\src\models\effectRule.model.ts .\src\models\%filename%.model.ts
  copy /y .\src\services\effectRule.service.ts .\src\services\%filename%.service.ts