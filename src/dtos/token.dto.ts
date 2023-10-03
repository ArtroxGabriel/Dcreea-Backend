import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { SkillDto } from './role.dto';

export class TokenDto {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  public name: string;

  @IsString()
  public game: string;

  @ValidateNested()
  @IsOptional()
  public skill: SkillDto;
}
