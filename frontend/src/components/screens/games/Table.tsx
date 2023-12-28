import { useState, useEffect } from "react"
import GameTableService from '../../../services/GameTableService.js'
import './Table.module.scss'

const Table = ({ table, setTable }) => {
    const [step, setStep] = useState('cross')
    useEffect(() => {
    }, [table])

    const checkResult = async () => {
        console.log('checkResult', table)
        const res = await GameTableService.checkResult(table)
        console.log('resultResponse', res)
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

            if (step == 'cross') {
                setStep('circle')
            } else {
                setStep('cross')
            }
            //console.log('Была нажата ссылка.', row, col, step);
        } else {
            //console.log('Повторное нажатие.', row, col, step);
        }
        checkResult()
    }

    function getColumnClass(value) {
        if (value == 'cross') {
            return "cross"
        }
        if (value == 'circle') {
            return "circle"
        }
        return ''
    }

    function getStepName() {
        if (step == 'cross') {
            return 'Крестик'
        }
        return 'Нолик'
    }

    return (
        <div>
            Игра: ХОД {getStepName()}
            <div className="fitBox">
                {
                    Object.keys(table).length ?
                        Object.keys(table).map((row) => (
                            <div key={row} className="">
                                {Object.keys(table[row]).map((col) => (
                                    <div key={col} className="stylesBox rounded align-middle text-center">
                                        <div className={getColumnClass(table[row][col]) + " w-100 h-100"} onClick={handleClick} data-row={row} data-col={col}>

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