import React, { useState, useEffect } from "react"

const Table = ({ table, setTable }) => {

    const [step, setStep] = useState('Крестик')

    useEffect(() => {
        console.log('table', table.length, table)
    }, [table])

    const styles = {
        width: "fit-content",
    }
    const stylesBox = {
        "width": "5rem",
        "height": "5rem",
        "display": "inline-block",
        "background-color": "#e1e1cd",
        "border": "1px solid gray"
    }
    function handleClick(e) {
        e.preventDefault();
        const row = e.target.attributes.getNamedItem('data-row').value
        const col = e.target.attributes.getNamedItem('data-col').value
        if (table[row][col] == "") {
            table[row][col] = step
            let updatedValue = table;
            setTable(table => ({
                ...table,
                ...updatedValue
            }));

            if (step == 'Крестик'){
                setStep('Нолик')
            }else{
                setStep('Крестик')
            }
            console.log('Была нажата ссылка.', row, col, step);
        } else {
            console.log('Повторное нажатие.', row, col, step);
        }
    }

    return (
        <div>
            Игра
            <div className="" style={styles}>
                {
                    Object.keys(table).length ?
                        Object.keys(table).map((row) => (
                            <div key={row} className="">

                                {Object.keys(table[row]).map((col) => (
                                    <div key={col} className="rounded align-middle text-center" style={stylesBox}>
                                        <div className="w-100 h-100" onClick={handleClick} data-row={row} data-col={col}>
                                            {table[row][col]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                        : <div>No Posts</div>
                }
            </div>
        </div>
    )
}

export default Table