import type { EventSummary } from './event';
export interface CulturalCollection {id:string;slug:string;title:string;eyebrow:string;description:string;imageUrl:string;eventIds:string[]}
export interface CulturalCollectionDetail extends CulturalCollection {events:EventSummary[]}
