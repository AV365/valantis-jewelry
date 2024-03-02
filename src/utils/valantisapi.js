import {md5} from 'js-md5';
import axios from 'axios';


class ValantisApi {
    constructor(config) {
        this.url = config.url;
        this.password = config.password;

        //получаем текущую дату
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        this.passwordMD5 = md5(`${config.password}_${date.getFullYear()}${month}${day}`);
        // console.log(`${config.password}_${date.getFullYear()}${month}${day}`)
        // console.log(this.passwordMD5);


    }

    //Обертка для запросов
    getDataAxios(action = "get_ids", params = {}) {
        const requestQuery = {
            "action": action,
            "params": params
        }


        return axios.post(this.url,
            JSON.stringify(requestQuery),
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": this.passwordMD5,
                }

            })
            .then((res) => {
                return res.data.result
            })
            .catch((err) => {
                return err
            });
    }


    //Получаем продукты по массиву Id
    getItemsByIds(idArray) {
        return this.getDataAxios("get_items", {"ids": idArray})
    }

    //Получаем бренды
    getBrands() {
        const getUnique = (arr) => {
            return arr.filter((el, ind) => ind === arr.indexOf(el));
        };

        return this.getDataAxios("get_fields", {"field": "brand"}).then((res) => {

            const brands = getUnique(res);
            brands[0] = "All brands";
            return brands;

        }).catch((err) => {
            console.log('Ошибка getBrands')
            return err;

        })


    }

}

const valantisapi = new ValantisApi({url: 'https://api.valantis.store:41000/', password: 'Valantis'})

export default valantisapi;