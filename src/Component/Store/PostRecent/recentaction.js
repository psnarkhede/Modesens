import axios from "axios";
import { DELETERECENT, POSTRECENTERROR, POSTRECENTLOADING, POSTRECENTSUCCESS } from "./recenttype";


export const postrecentapi = (dispatch,category, productid) => {
    
    dispatch({type:POSTRECENTLOADING})

    axios
    .get(`https://modesensbackend.herokuapp.com/${category}`)
    .then((res) => {
        res.data.map((el) => {
            if(el.web_scraper_order === productid){
                axios
                .post("https://modesensbackend.herokuapp.com/recent",{
                    category:category,
                    web_scraper_order: el.web_scraper_order,
                    category_MenClothing:el.category_MenClothing,
                    brand_store:el.brand_store,
                    category_MenClothing_href:el.category_MenClothing_href,
                    product_name:el.product_name,
                    product_description:el.product_description,
                    product_price:el.product_price,
                    product_img_src:el.product_img_src
                }).then((res) => 
                axios
                .get(`https://modesensbackend.herokuapp.com/recent`)
                .then((res) => dispatch({type:POSTRECENTSUCCESS, payload:res.data}))
                )
            }
        })
    }
    ).catch(() => dispatch({type:POSTRECENTERROR}))
};



export const removerecentapi = (dispatch,id) => {
    console.log(id)
    axios
    .delete(`https://modesensbackend.herokuapp.com/recent/${id}`)
    .then(() => 
        axios
                .get(`https://modesensbackend.herokuapp.com/recent`)
                .then((res) => dispatch({type:DELETERECENT, payload:res.data}))
    )
};