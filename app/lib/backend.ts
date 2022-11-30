import CalcRequest from "../interfaces/calc-request"

export async function fetchBackendAPI(req: CalcRequest) {
    console.log("fetchBackendAPI: ", process.env.BACKEND_API, JSON.stringify(req))
    const res = await fetch(process.env.BACKEND_API, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    })
    console.log(res)
    const json = await res.json()

    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }

    return json.data
}