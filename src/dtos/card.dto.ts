import { IsInt, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

export class CardFrontDto {
    @IsString({ message: 'front title is required' })
    public title: string;

    @IsOptional()
    @IsString()
    public art: string;

    @IsOptional()
    @IsString()
    public description: string;

    @IsOptional()
    @IsString()
    public effect: string;

    @IsOptional()
    @IsInt()
    public cost: number;

    @IsOptional()
    @IsInt()
    public level: number;

    @IsOptional()
    @IsInt()
    public earning: number;
}

export class CardBackDto {
    @IsOptional()
    @IsString()
    public title: string;

    @IsOptional()
    @IsString()
    public answers: string;

    @IsOptional()
    @IsString()
    public effect: string;

    @IsOptional()
    @IsInt()
    public cost: number;

    @IsOptional()
    @IsInt()
    public level: number;

    @IsOptional()
    @IsInt()
    public earning: number;
}

export class CardDto {
    @IsOptional()
    @IsString()
    public _id: string;

    @IsString()
    public deck: string;

    @IsInt()
    @IsPositive({ message: 'The number of repetitions must be greater than 0' })
    public repetitions: number;

    @ValidateNested()
    public cardFront: CardFrontDto;

    @IsOptional()
    @ValidateNested()
    public cardBack: CardBackDto;
}
