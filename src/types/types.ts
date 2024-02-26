export type PhotosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    uniqueUrlName: string
    contacts: {
        github: string
    }
}