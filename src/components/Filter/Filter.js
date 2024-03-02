import React, {useEffect, useState} from "react";
import {Dropdown} from 'primereact/dropdown';
import {InputText} from "primereact/inputtext";
import {InputNumber} from 'primereact/inputnumber';
import valantisapi from "../../utils/valantisapi";



export default function Filter({onChange, currentFilter}) {
    const [filter, setFilter] = useState(currentFilter);
    const [brands, setBrands] = useState([])


    //очищаем фильтр
    function clearFilter() {
        setFilter({})
        onChange({})
    }


    function handleSelectBrand(e) {
        setFilter({"brand": e.value})

        setTimeout(() => {
            onChange({
                "brand": e.value,
            })
        }, 500);


    }

    function handleSelectProduct(e) {

        if (e.target.value.length >= 3) {
            setTimeout(() => {
                onChange({
                    "product": e.target.value,
                })
            }, 2000);

        }
    }

    function handleSelectPrice(e) {

        if (String(e.value).length >= 3) {
            setTimeout(() => {
                onChange({
                    "price": e.value,
                })
            }, 2000);


        }
    }


    //Загружаем бренды
    const getBrands = async () => {
        try {
            const result = await valantisapi.getBrands()
            setBrands(result);
        } catch (e) {
            setBrands([]);
        }
    }

    useEffect(() => {


        getBrands();


    }, [])

    return (
        <div className="card flex justify-content-left">
            <Dropdown value={filter["brand"]} onChange={(e) => handleSelectBrand(e)} options={brands} optionLabel=""
                      placeholder="All brands" className="w-full md:w-14rem"/>
            <span className="p-input-icon-right">
                <i className="pi pi-times" onClick={() => clearFilter()}/>
                <InputText placeholder="Product" onChange={(e) => handleSelectProduct(e)} value={filter["product"]}  tooltip="Min 3 characters for search" tooltipOptions={{ event: 'focus' }} />
                {/*<Button icon="pi pi-times" text severity="danger" aria-label="Cancel" />*/}
            </span>
            <span className="p-input-icon-right">
                <i className="pi pi-times" onClick={() => clearFilter()}/>
                <InputNumber inputId="integeronly" placeholder="Price" onChange={(e) => handleSelectPrice(e) }
                             value={filter["price"]}  />
            </span>

        </div>

    )
}