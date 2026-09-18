export type FriendshipStatus = 'pending' | 'accepted' | 'declined' | 'blocked';
export type AttendanceSource = 'manual' | 'ticket';
export type AttendanceVisibility = 'friends' | 'private';
export type InvitationStatus = 'pending' | 'viewed' | 'accepted' | 'declined';
export interface SocialUser { id:string; name:string; city?:string; avatarUrl?:string|null }
export interface Friendship { requesterUserId:string; recipientUserId:string; status:FriendshipStatus; createdAt:number }
export interface EventAttendance { userId:string; eventId:string; status:'going'; sources:AttendanceSource[]; visibility:AttendanceVisibility }
export interface EventInvitation { id:string; eventId:string; senderUserId:string; recipientUserId:string; status:InvitationStatus; createdAt:number }
export interface SavedEvent { userId:string; eventId:string; createdAt:number }
