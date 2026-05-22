export interface ZeroTierVO {
    id: string;
    type: string;
    clock: number;
    networkId: string;
    nodeId: string;
    controllerId: string;
    hidden: boolean;
    name: string;
    description: string;
    lastOnline: number;
    lastSeen: number;
    config:Config;
    physicalAddress: string;
    physicalLocation: any;
    clientVersion: string;
    protocolVersion: number;
    supportsRulesEngine: boolean;
    arch: string;
    os: string;
}

export interface Config {
    ipAssignments:string[];
    authorized:boolean;
}
