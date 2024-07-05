import logError from "@/utils/logError";

const getDocuments = async (userId: string)=> {
    try {
        const response = await fetch(`/api/documents/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        return response.json();
    } catch (err) {
        logError(err)
    }
}
export default getDocuments;
