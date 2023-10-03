export default interface IStatementRule {
    _id: string;
    label: string;
    simplerDescription: string;
    me: string;
    to: string;
    given: string;
    toSelf?: boolean;
    toSpecific?: string;
    forever?: boolean;
    turns?: number;
    statusChange: string;
}

export interface IStatementRuleDescription {
    me: string;
    to: string;
    given: string;
    when: string;
    then: string;
    otherwise: String;
}
