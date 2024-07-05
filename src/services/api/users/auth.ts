import logError from "@/utils/logError";
import User from "@/types/user";

const auth = async (user: User)=> {
    try {
        const response = await fetch('/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        })
        return response.json();
    } catch (err) {
        logError(err)
    }
}
export default auth;
