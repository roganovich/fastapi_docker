import {useState} from "react"
import MainLayout from "../../layouts/main"
import Table from './Table'

const defaultTable = {
    "1": {
        "1": "", "2": "", "3": ""
    },
    "2": {
        "1": "", "2": "", "3": ""
    },
    "3": {
        "1": "", "2": "", "3": ""
    }
}

const GameTable = () => {
    const [table, setTable] = useState(defaultTable)

    function restart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        console.log('restart', defaultTable)
        setTable(defaultTable)
    }

    return (
        <>
            <MainLayout>
                <div className="p-3">
                    <div className="p-1">
                        Крестики - нолики
                    </div>
                    <div>
                        <Table table={table} setTable={setTable}/>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={e => restart(e)}
                        >Restart
                        </button>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default GameTable