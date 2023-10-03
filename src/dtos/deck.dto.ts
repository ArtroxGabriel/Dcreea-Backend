import { IsOptional, IsBoolean, ValidateNested, IsString, IsArray } from 'class-validator';

export class DeckFrontDto {
  @IsBoolean()
  public title: boolean;

  @IsBoolean()
  public art: boolean;

  @IsBoolean()
  public description: boolean;

  @IsBoolean()
  public effect: boolean;

  @IsBoolean()
  public cost: boolean;

  @IsBoolean()
  public level: boolean;

  @IsBoolean()
  public earning: boolean;
}

export class DeckBackDto {
  @IsBoolean()
  public title: boolean;

  @IsBoolean()
  public answers: boolean;

  @IsBoolean()
  public effect: boolean;

  @IsBoolean()
  public cost: boolean;

  @IsBoolean()
  public level: boolean;

  @IsBoolean()
  public earning: boolean;
}

export class DeckDto {
  @IsString()
  @IsOptional()
  public _id: string;

  @IsString()
  public game: string;

  @IsString()
  public name: string;

  @IsString()
  public color: string;

  @IsString()
  public description: string;

  @ValidateNested()
  public deckFront: DeckFrontDto;

  @IsOptional()
  @ValidateNested()
  public deckBack: DeckBackDto;
}
