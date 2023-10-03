import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ConditionalRuleDto } from './conditionalRule.dto';
import { StatementRuleDto } from './statementRule.dto';

export class CreateStateDto {
    @IsOptional()
    @IsString({})
    public _id: string;

    @IsString({
        message: 'Label is required',
    })
    public label: string;

    @IsString({
        message: 'Game is required',
    })
    public game: string;

    @IsOptional()
    @IsString()
    public purpose: string;

    @IsOptional()
    @IsString()
    public color: string;

    @IsOptional()
    @ValidateNested({ each: true })
    public statementRules: StatementRuleDto[];

    @IsOptional()
    @ValidateNested()
    public conditionalRule: ConditionalRuleDto;

    @IsOptional()
    @IsString()
    public transition: string;

    @IsOptional()
    @IsNumber()
    public x: number;

    @IsOptional()
    @IsNumber()
    public y: number;

    @IsOptional()
    @IsNumber()
    public width: number;

    @IsOptional()
    @IsNumber()
    public height: number;
}

export class SearchStateDto {
    @IsOptional()
    @IsString()
    public _id: string;

    @IsOptional()
    @IsString()
    public label: string;

    @IsString({
        message: 'Game is required',
    })
    public game: string;
}
