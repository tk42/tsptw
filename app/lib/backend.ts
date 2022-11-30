import CalcRequest from "../interfaces/calc-request"

export async function fetchBackendAPI(req: CalcRequest) {
    const res = await fetch(process.env.BACKEND_API, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    })

    if (!res.ok) {
        console.error(res.status)
        throw new Error('Failed to fetch API')
    }

    return await res.json()
}