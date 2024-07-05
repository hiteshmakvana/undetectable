import logError from "@/utils/logError";

const postDocument = async (content: string, userId: string)=> {
    try {
        const response = await fetch('/api/documents', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                userId,
                content,
            })
        })
        return response.json();
    } catch (err) {
        logError(err)
    }
}
export default postDocument;
