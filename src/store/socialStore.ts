import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type {
  AttendanceVisibility,
  EventAttendance,
  EventInvitation,
  Friendship,
  SocialUser,
} from '../types/social';
export const CURRENT_USER_ID = 'usr-sean';
const users: SocialUser[] = [
  { id: CURRENT_USER_ID, name: 'Sean', city: 'Miami' },
  {
    id: 'usr-amy',
    name: 'Amy Rivera',
    city: 'Miami',
    avatarUrl: 'https://i.pravatar.cc/160?img=47',
  },
  {
    id: 'usr-maya',
    name: 'Maya Chen',
    city: 'Fort Lauderdale',
    avatarUrl: 'https://i.pravatar.cc/160?img=32',
  },
  {
    id: 'usr-leo',
    name: 'Leo Martin',
    city: 'Miami',
    avatarUrl: 'https://i.pravatar.cc/160?img=12',
  },
  {
    id: 'usr-nina',
    name: 'Nina Brooks',
    city: 'Palm Beach',
    avatarUrl: 'https://i.pravatar.cc/160?img=25',
  },
];
const friendships: Friendship[] = [
  {
    requesterUserId: CURRENT_USER_ID,
    recipientUserId: 'usr-amy',
    status: 'accepted',
    createdAt: 1,
  },
  {
    requesterUserId: 'usr-maya',
    recipientUserId: CURRENT_USER_ID,
    status: 'accepted',
    createdAt: 2,
  },
  { requesterUserId: 'usr-leo', recipientUserId: CURRENT_USER_ID, status: 'pending', createdAt: 3 },
];
const attendance: EventAttendance[] = [
  {
    userId: 'usr-amy',
    eventId: 'evt-1',
    status: 'going',
    sources: ['manual'],
    visibility: 'friends',
  },
  {
    userId: 'usr-maya',
    eventId: 'evt-1',
    status: 'going',
    sources: ['ticket'],
    visibility: 'friends',
  },
  {
    userId: 'usr-amy',
    eventId: 'evt-2',
    status: 'going',
    sources: ['ticket'],
    visibility: 'friends',
  },
  {
    userId: 'usr-nina',
    eventId: 'evt-2',
    status: 'going',
    sources: ['manual'],
    visibility: 'private',
  },
];
const invitations: EventInvitation[] = [
  {
    id: 'inv-1',
    eventId: 'evt-3',
    senderUserId: 'usr-amy',
    recipientUserId: CURRENT_USER_ID,
    status: 'pending',
    createdAt: 4,
  },
];
interface SocialState {
  users: SocialUser[];
  friendships: Friendship[];
  attendance: EventAttendance[];
  invitations: EventInvitation[];
  attendanceVisibility: AttendanceVisibility;
  accept: (id: string) => void;
  decline: (id: string) => void;
  addFriend: (id: string) => void;
  removeFriend: (id: string) => void;
  restoreFriendship: (friendship: Friendship) => void;
  toggleGoing: (eventId: string) => void;
  invite: (eventId: string, ids: string[]) => void;
  setAttendanceVisibility: (v: AttendanceVisibility) => void;
}
export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      users,
      friendships,
      attendance,
      invitations,
      attendanceVisibility: 'friends',
      accept: (id) =>
        set((s) => ({
          friendships: s.friendships.map((f) =>
            f.requesterUserId === id && f.recipientUserId === CURRENT_USER_ID
              ? { ...f, status: 'accepted' }
              : f,
          ),
        })),
      decline: (id) =>
        set((s) => ({
          friendships: s.friendships.map((f) =>
            f.requesterUserId === id && f.recipientUserId === CURRENT_USER_ID
              ? { ...f, status: 'declined' }
              : f,
          ),
        })),
      addFriend: (id) =>
        set((s) => ({
          friendships: [
            ...s.friendships,
            {
              requesterUserId: CURRENT_USER_ID,
              recipientUserId: id,
              status: 'pending',
              createdAt: Date.now(),
            },
          ],
        })),
      removeFriend: (id) =>
        set((s) => ({
          friendships: s.friendships.filter(
            (f) =>
              !(
                [f.requesterUserId, f.recipientUserId].includes(CURRENT_USER_ID) &&
                [f.requesterUserId, f.recipientUserId].includes(id)
              ),
          ),
        })),
      restoreFriendship: (friendship) =>
        set((s) => ({
          friendships: [
            ...s.friendships.filter(
              (f) =>
                !(
                  f.requesterUserId === friendship.requesterUserId &&
                  f.recipientUserId === friendship.recipientUserId
                ),
            ),
            friendship,
          ],
        })),
      toggleGoing: (eventId) =>
        set((s) => {
          const existing = s.attendance.find(
            (a) => a.userId === CURRENT_USER_ID && a.eventId === eventId,
          );
          if (existing?.sources.includes('manual')) {
            const sources = existing.sources.filter((x) => x !== 'manual');
            return {
              attendance: sources.length
                ? s.attendance.map((a) => (a === existing ? { ...a, sources } : a))
                : s.attendance.filter((a) => a !== existing),
            };
          }
          return {
            attendance: existing
              ? s.attendance.map((a) =>
                  a === existing ? { ...a, sources: [...a.sources, 'manual'] } : a,
                )
              : [
                  ...s.attendance,
                  {
                    userId: CURRENT_USER_ID,
                    eventId,
                    status: 'going',
                    sources: ['manual'],
                    visibility: get().attendanceVisibility,
                  },
                ],
          };
        }),
      invite: (eventId, ids) =>
        set((s) => ({
          invitations: [
            ...s.invitations,
            ...ids.map((recipientUserId, i) => ({
              id: `inv-${Date.now()}-${i}`,
              eventId,
              senderUserId: CURRENT_USER_ID,
              recipientUserId,
              status: 'pending' as const,
              createdAt: Date.now(),
            })),
          ],
        })),
      setAttendanceVisibility: (attendanceVisibility) => set({ attendanceVisibility }),
    }),
    { name: 'co-social-v1', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
export const otherUserId = (f: Friendship) =>
  f.requesterUserId === CURRENT_USER_ID ? f.recipientUserId : f.requesterUserId;
