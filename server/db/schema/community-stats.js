import { gql } from "apollo-server-core";


const baseStatFields = `
    e:ID!
    w:Weight!
    bw:Weight
    by:ID!
`;

const $types = gql`

interface BaseStat {
    ${baseStatFields}
}

type Heavyest implements BaseStat { 
    ymd:YMD!
    reps:Int!
    ${baseStatFields}
}

type Estimated1RM implements BaseStat {
    originalw:Weight!
    reps:Int!
    ymd:YMD!
    ${baseStatFields}
}

type MostVolume implements BaseStat { 
    totalReps:Int! 
    ${baseStatFields}
}

type OfficialExercise {
    id:ID!
    tag:String!
    variants:[String]!
    coolxbw:Float
}

type CommunityStats {

    title:String! 
    scanFrecuency:String! #--- cada cuantos minutos se escanea APROX
    timestamp:UTCDate
    heavyest:[Heavyest] 
    estimated:[Estimated1RM]
    volume:[MostVolume]
    exercises:[Exercise]
    users:[User]
}

enum Gender {
    MALE 
    FEMALE
}


type WeightClass {
    min:Float!
    max:Float!
    name:String!
    male:Boolean!
}
 
scalar SBDSlot

type SBDStat {
    wclass:WeightClass!
    graph:[SBDSlot!]
}

type SBDStats {
    total:Int! #total de lifts...
    date:String!
    perclass:[SBDStat]
}

extend type Query {  
    communityStats( gender:Gender, etype:String! ) :CommunityStats
    officialExercises:[OfficialExercise]!
    sbdStats:SBDStats
}
`;

export default $types;