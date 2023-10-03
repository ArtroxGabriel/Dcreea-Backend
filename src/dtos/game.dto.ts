import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, ValidateIf } from 'class-validator';

export class GameDto {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  public user: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public simplyGameplay: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public audience: string;

  @IsOptional()
  @IsString()
  public knowledgeField: string;

  @IsOptional()
  @IsString()
  public requirements: string;

  @IsOptional()
  @IsInt()
  public minNumberPlayers: number;

  @IsOptional()
  @IsInt()
  public maxNumberPlayers: number;

  @IsOptional()
  @IsString({ each: true })
  public authors: string[];
}
