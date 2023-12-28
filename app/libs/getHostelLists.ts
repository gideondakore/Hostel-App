const getHostelLists = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/hostellists", {
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch hostel list");
        }

        return res.json();
    } catch (error: any) {
        throw new Error("Error loading hostel list", error);
    }
}
export default getHostelLists;