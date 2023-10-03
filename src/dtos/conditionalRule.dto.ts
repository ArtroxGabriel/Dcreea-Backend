import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { EffectDto } from './effectRule.dto';

export class ConditionDto {
  @IsString()
  public test: string;

  @IsString()
  public effectIfTrue: EffectDto;

  @IsString()
  public stateIfTrue: string;
}

export class ConditionalRuleDto {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  public label: string;

  @ValidateNested({ each: true })
  public conditions: ConditionDto[];

  @ValidateNested()
  public failureCondition: ConditionDto;
}
