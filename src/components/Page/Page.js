import {useEffect, useState, useRef} from "react";
import valantisapi from "../../utils/valantisapi";
import Table from "../Table/Table";
import PageNav from "../PageNav/PageNav";
import Spinner from "../Spinner/Spinner";
import Filter from "../Filter/Filter";


export default function Page() {


    //Выводим записей
    const numItemsOnPage = 50;

    //
    const [allRows, setAllRows] = useState(0);

    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState((1))
    const [startRow, setStartRow] = useState(0);
    const [filter, setFilter] = useState({})
    const [random, setRandom] = useState(0);


    function reload() {
        setRandom(new Date().getTime())
    }


    function getUniqueItems(arr) {

        //Поиск ID в массиве
        function contains(arr, elem) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === elem) {
                    return true;
                }
            }
            return false;
        }


        let new_resultId = [];
        let new_result = [];


        //Пробегаем и сверяем ID на дубли
        arr.forEach((value, key) => {

            if (!contains(new_resultId, value.id)) {
                new_resultId.push(value.id)
                new_result.push(value)
            }
        })

        return new_result


    }


    const getIds = async () => {

        if (filter["brand"] || filter["product"] || filter["price"]) {

            var res1 = ''

            if (filter["brand"]) res1 = await valantisapi.getDataAxios("filter", {"brand": filter.brand})
            else if (filter["product"]) res1 = await valantisapi.getDataAxios("filter", {"product": filter.product})
            else if (filter["price"]) res1 = await valantisapi.getDataAxios("filter", {"price": filter.price})

            setAllRows(res1.length);

            try {
                const items = await valantisapi.getItemsByIds(res1)
                const new_result = getUniqueItems(items);

                setItems(new_result)
                setLoading(false);
                setData(res1);
            } catch (e) {
                console.error('Ошибка при получении items')
                setError('Ошибка при получении items')
                reload();
            }


        } else {


            const res = await valantisapi.getDataAxios()
            setAllRows(res.length);

            const action = "get_ids";
            let params = {
                "offset": startRow,
                "limit": numItemsOnPage
            }

            const res1 = await valantisapi.getDataAxios(action, params)


            try {
                const items = await valantisapi.getItemsByIds(res1)
                const new_result = getUniqueItems(items);

                setItems(new_result)
                setLoading(false);
                setData(res1);
            } catch (e) {
                console.error('Ошибка при получении items')
                setError('Ошибка при получении items')
                reload();
            }
        }


    }


    function handlePageChange(page) {
        setStartRow(page);
        setPage(page + 1);
        reload();

    }

    function handleSetFilterBrand(value) {
        if (value.brand == "All brands") {
            setFilter({})
        } else setFilter(value);
        reload()
    }

    useEffect(() => {

        setLoading(true);
        getIds();


    }, [random]);

    if (loading) {
        return <Spinner/>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (


        <>

            <div className="d-flex justify-content-center p-4">
                <h1 className="m-0">Valantis API</h1>
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex flex-column flex-shrink-0 p-4 w-100">

                    <p>Всего записей к показу: {allRows}</p>
                    <p>Первая запись: {page}</p>
                    <p>Выводим записей на страницу: {numItemsOnPage}</p>
                    <Filter onChange={handleSetFilterBrand} currentFilter={filter}/>
                    <PageNav totalRecords={allRows} onChange={handlePageChange} pageStart={page}
                             numRows={numItemsOnPage}/>
                    <Table items={items}/>
                    <PageNav totalRecords={allRows} onChange={handlePageChange} pageStart={page}
                             numRows={numItemsOnPage}/>
                </div>
            </div>

        </>
    );

}

