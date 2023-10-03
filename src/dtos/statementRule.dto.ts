import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, ValidateIf } from 'class-validator';

export class StatementRuleDto {
    @IsString()
    @IsOptional()
    public _id: string;

    @IsString()
    public label: string;

    @IsString()
    public simplerDescription: string;

    @ValidateIf(o => o.when || o.then)
    @IsString({
        message: "if 'when' or 'then' are set, 'me' field is required",
    })
    public me: string;

    @IsOptional()
    @IsString()
    public to: string;

    @IsOptional()
    @IsString()
    public given: string;

    @IsOptional()
    @IsString()
    public statusChange: string;

    @ValidateIf(o => !o.statusChange && !o.toSpecificPlayer && !o.toPlayerRole)
    @IsBoolean({
        message: 'this is required when toPlayerRole and toSpecificPlayer are null',
    })
    public toSelfPlayer: boolean;

    @ValidateIf(o => !o.statusChange && !o.toSelfPlayer && !o.toPlayerRole)
    @IsBoolean({
        message: 'this is required when toPlayerRole and toSelfPlayer are null',
    })
    public toSpecificPlayer: boolean;

    @ValidateIf(o => !o.statusChange && !o.toSpecificPlayer && !o.toSelfPlayer)
    @IsString({
        message: 'this is required when toSpecificPlayer and toSelfPlayer are null',
    })
    public toPlayerRole: string;

    @ValidateIf(o => !o.statusChange && !o.turns)
    @IsBoolean()
    public forever: boolean;

    @ValidateIf(o => !o.statusChange)
    @IsInt()
    @IsPositive()
    public turns: number;
}
