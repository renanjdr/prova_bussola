import app from "./app"

function main() {
    try {
        app.listen(3000,"localhost", async () => {
            console.log("Server started on port 3000")
        })
    } catch (error) {
        console.error("Erro ao upar o servidor ", error)
    }
}

main()