import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8081/",
    headers: {
        "Content-type": "application/json",
    },
})

const getData = async () => {
    const response = await apiClient.get("/games/table/get")
    return response.data
}

const checkResult = async (gameData) => {
    const token = '85e56baf-0de9-4001-8720-c8ebcb0d0ed9'
    const headers = {
        'Authorization': 'Bearer ' + token
    }
    const response = await apiClient.post(`/games/table/result`, gameData, { headers })
    return response.data
}

const GamesTableService = {
    getData,
    checkResult
}

export default GamesTableService