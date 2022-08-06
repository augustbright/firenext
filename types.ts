export type TUserProfile = {
    uid: string;
    username: string | null;
    displayName: string | null;
    photoUrl: string | null;
};

export type TPost = {
    id: string;
    uid: string;
    title: string;
    content: string;
    published: boolean;
};