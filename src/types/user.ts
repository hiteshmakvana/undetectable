type User = {
    id: string
    name: string
    email?: string
    avatar?: string
    queries?: []
    createdAt?: Date
    lastLogin?: Date
}
export default User;
