import { IsEmail, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EffectDto } from './effectRule.dto';

export class SkillDto {
    @ValidateNested()
    public goodSide: EffectDto;

    @IsOptional()
    @ValidateNested()
    public badSide: EffectDto;
}

export class RoleDto {
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
