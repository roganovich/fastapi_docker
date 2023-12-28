import json


async def get_table_result(data: dict):
    win_rows = [
        {'11', '12', '13'},
        {'21', '22', '23'},
        {'31', '32', '33'},
        #
        {'11', '21', '31'},
        {'21', '22', '23'},
        {'31', '23', '33'},
        #
        {'11', '22', '33'},
        {'13', '22', '13'}
    ]
    results = {}
    for row in data:
        for col in data:
            tag = data[row][col]
            if not tag in results:
                results[tag] = {}
            item = row + col
            results[tag][item] = item

    print('win_rows', win_rows)
    print('results', results)

    for row in results:
        if results[row] in win_rows:
            print(row, results[row])
            return {"status": "200", "result": results}

    return {"status": "", "result": ""}
