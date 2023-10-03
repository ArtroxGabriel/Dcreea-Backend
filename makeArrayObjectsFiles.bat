@echo off
  set filename=%1
  copy /y .\src\controllers\statementRule.controller.ts .\src\controllers\%filename%.controller.ts
  copy /y .\src\dtos\statementRule.dto.ts .\src\dtos\%filename%.dto.ts
  copy /y .\src\interfaces\statementRule.interface.ts .\src\interfaces\%filename%.interface.ts
  copy /y .\src\routes\statementRule.route.ts .\src\routes\%filename%.route.ts
  copy /y .\src\models\statementRule.model.ts .\src\models\%filename%.model.ts
  copy /y .\src\services\statementRule.service.ts .\src\services\%filename%.service.ts